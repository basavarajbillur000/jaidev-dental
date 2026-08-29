import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { clinic, navLinks, waLink } from "@/data/clinic";
import { useAppointment } from "@/components/Appointment";

export default function Footer() {
  const { open } = useAppointment();
  return (
    <footer data-testid="footer" className="bg-navy-950 pb-24 text-white md:pb-0">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/clinic/logo.jpg"
                alt="Jaidev Multispeciality Dental Care logo"
                className="h-11 w-11 rounded-xl object-cover"
                loading="lazy"
              />
              <span className="leading-tight">
                <span className="block font-display text-xl font-extrabold tracking-tight">
                  {clinic.wordmark}
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-azure-100/70">
                  {clinic.wordmarkSub}
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Multispeciality dental care in {clinic.area}, {clinic.city} — built around
              comfort, clarity and long-term oral health.
            </p>
            <button
              onClick={() => open()}
              data-testid="footer-book-button"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy-950 transition-colors duration-300 hover:bg-azure-100"
            >
              Book an Appointment
              <ArrowUpRight className="size-4" />
            </button>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Explore</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    data-testid={`footer-link-${l.label.toLowerCase()}`}
                    className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Visit</h3>
            <address className="mt-5 space-y-4 text-sm not-italic leading-relaxed text-white/70">
              <p className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-azure-500" />
                <span>
                  {clinic.addressLines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </span>
              </p>
              <a
                href={clinic.phoneHref}
                data-testid="footer-phone-link"
                className="flex items-center gap-2.5 font-bold text-white transition-colors hover:text-azure-100"
              >
                <Phone className="size-4 shrink-0 text-azure-500" />
                {clinic.phoneDisplay}
              </a>
            </address>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Hours</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-azure-500" />
                <span>
                  Mon – Sat
                  <span className="block font-semibold text-white">10:00 AM – 9:00 PM</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-azure-500" />
                <span>
                  Sunday
                  <span className="block font-semibold text-white">10:00 AM – 2:00 PM</span>
                </span>
              </li>
            </ul>
            <a
              href={waLink(clinic.whatsappText)}
              target="_blank"
              rel="noreferrer"
              data-testid="footer-whatsapp-link"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-azure-100 transition-colors hover:text-white"
            >
              Chat on WhatsApp
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <p className="select-none border-t border-white/10 py-10 text-center font-display text-[13vw] font-extrabold leading-none tracking-tight text-outline-white lg:text-[9rem]">
          {clinic.wordmark}
        </p>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.2em]">{clinic.area} · {clinic.city}</p>
        </div>
      </div>
    </footer>
  );
}
