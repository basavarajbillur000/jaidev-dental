import ipaddress
import logging
import os
import re
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from typing import List, Optional
from urllib.parse import urlparse

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from lib.db import client, db

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Jaidev Multispeciality Dental Care")
CLINIC_NOTIFY_EMAIL = os.environ.get("CLINIC_NOTIFY_EMAIL")
APP_URL = os.environ.get("APP_URL", "")
CLINIC_PHONE = "+91 80987 61238"


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    client.close()


app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r}")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r}")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r}")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r}")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to:
        payload["contact_email"] = reply_to
    try:
        async with httpx.AsyncClient(timeout=30) as client_http:
            resp = await client_http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        return None


class AppointmentCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=8, max_length=20)
    date: str = Field(min_length=4, max_length=20)
    time: str = Field(min_length=1, max_length=30)
    treatment: str = Field(default="Not sure yet", max_length=120)
    message: Optional[str] = Field(default="", max_length=1000)

    @field_validator("phone")
    @classmethod
    def phone_digits(cls, v: str) -> str:
        digits = re.sub(r"\D", "", v)
        if not (8 <= len(digits) <= 15):
            raise ValueError("invalid phone number")
        return v.strip()

    @field_validator("name")
    @classmethod
    def name_clean(cls, v: str) -> str:
        return v.strip()


class Appointment(BaseModel):
    id: str
    name: str
    phone: str
    date: str
    time: str
    treatment: str
    message: str
    status: str
    created_at: str


@api_router.get("/")
async def root():
    return {"message": "Jaidev Multispeciality Dental Care API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


def _appointment_email_html(a: AppointmentCreate) -> str:
    row = lambda label, value: (
        f'<tr><td style="padding:8px 16px;color:#64748B;font-size:13px;'
        f'text-transform:uppercase;letter-spacing:0.08em">{label}</td>'
        f'<td style="padding:8px 16px;color:#0B192C;font-size:15px;font-weight:600">{value}</td></tr>'
    )
    msg_row = row("Message", escape(a.message)) if a.message else ""
    return (
        '<table role="presentation" width="100%" style="background:#F8FAFC;padding:24px 0">'
        '<tr><td align="center"><table role="presentation" width="560" style="background:#FFFFFF;'
        'border:1px solid #E2E8F0;border-radius:12px;padding:24px;font-family:Arial,sans-serif">'
        f'<tr><td style="padding:0 16px 16px"><div style="font-size:12px;letter-spacing:0.15em;'
        f'color:#0088B0;text-transform:uppercase">New appointment request</div>'
        f'<div style="font-size:22px;font-weight:800;color:#0B192C;padding-top:6px">'
        f'{escape(EMAIL_FROM_NAME)}</div></td></tr>'
        '<tr><td><table role="presentation" width="100%">'
        + row("Patient", escape(a.name))
        + row("Phone", f'<a href="tel:{escape(a.phone)}" style="color:#0088B0">{escape(a.phone)}</a>')
        + row("Preferred date", escape(a.date))
        + row("Preferred time", escape(a.time))
        + row("Treatment", escape(a.treatment))
        + msg_row
        + '</table></td></tr>'
        f'<tr><td style="padding:16px;font-size:12px;color:#94A3B8;border-top:1px solid #E2E8F0">'
        f'Sent by the {escape(EMAIL_FROM_NAME)} website. Call the patient back on their number '
        f'or reach the clinic at {escape(CLINIC_PHONE)}.</td></tr>'
        '</table></td></tr></table>'
    )


@api_router.post("/appointments", status_code=201)
async def create_appointment(payload: AppointmentCreate):
    doc = {
        "id": str(uuid.uuid4()),
        **payload.model_dump(),
        "status": "requested",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.appointments.insert_one(doc)
    email_sent = False
    if CLINIC_NOTIFY_EMAIL and EMAIL_KEY:
        subject = f"New appointment request - {payload.name}"
        result = await send_email(to=CLINIC_NOTIFY_EMAIL, subject=subject, html=_appointment_email_html(payload))
        email_sent = result is not None
    else:
        logger.info("CLINIC_NOTIFY_EMAIL not configured; appointment stored without email notification")
    doc.pop("_id", None)
    return {"status": "success", "appointment": doc, "email_sent": email_sent}


@api_router.get("/appointments", response_model=List[Appointment])
async def list_appointments():
    docs = await db.appointments.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
