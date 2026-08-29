import { createContext, useContext, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2, MessageCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiPost } from "@/lib/api";
import { clinic, waLink, categories, treatmentsByCategory } from "@/data/clinic";

const TIME_SLOTS = [
  "10:00 AM – 12:00 PM",
  "12:00 – 2:00 PM",
  "2:00 – 4:00 PM",
  "4:00 – 6:00 PM",
  "6:00 – 8:00 PM",
  "8:00 – 9:00 PM",
];

interface AppointmentCtx {
  open: (treatment?: string) => void;
}

const Ctx = createContext<AppointmentCtx>({ open: () => {} });
export const useAppointment = () => useContext(Ctx);

type Status = "idle" | "loading" | "success" | "error";

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState("");

  const open = (treatment?: string) => {
    setPrefill(treatment ?? "");
    setIsOpen(true);
  };

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:max-w-lg sm:p-8"
          data-testid="appointment-dialog"
        >
          <DialogHeader>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-azure-600">
              {clinic.name}
            </p>
            <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-navy-950">
              Request an appointment
            </DialogTitle>
            <DialogDescription className="text-sm text-bodyink">
              Share your details and the clinic will call you back to confirm a slot.
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm prefill={prefill} onDone={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}

const inputCls =
  "w-full rounded-xl border border-softline bg-mist px-4 py-3 text-sm text-navy-950 outline-none transition-colors placeholder:text-navy-950/35 focus:border-azure-600 focus:bg-white";

export function AppointmentForm({
  prefill = "",
  onDone,
}: {
  prefill?: string;
  onDone?: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [treatment, setTreatment] = useState(prefill);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const whatsappMessage = `Hello, I'm ${name}. I'd like to request an appointment for ${treatment} on ${date} (${time}). My number is ${phone}.`;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return setError("Please enter your full name.");
    if (phone.replace(/\D/g, "").length < 8) return setError("Please enter a valid phone number.");
    if (!date) return setError("Please choose a preferred date.");
    if (!time) return setError("Please choose a preferred time.");
    setStatus("loading");
    try {
      await apiPost("/appointments", { name: name.trim(), phone: phone.trim(), date, time, treatment, message });
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong while sending your request. Please try again, or call the clinic directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="pt-2 text-center" data-testid="appointment-success">
        <CheckCircle2 className="mx-auto size-12 text-brand-teal" />
        <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight text-navy-950">
          Request received, {name.split(" ")[0]}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-bodyink">
          Your preferred slot is <strong>{date}</strong>, <strong>{time}</strong>. The clinic
          will call {phone} to confirm. For the fastest confirmation, send the same details on
          WhatsApp.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={waLink(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            data-testid="appointment-whatsapp-confirm-button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-teal px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-4" />
            Confirm on WhatsApp
          </a>
          <button
            onClick={onDone}
            data-testid="appointment-done-button"
            className="rounded-full border border-softline px-6 py-3 text-sm font-bold text-navy-950 transition-colors hover:bg-mist"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 pt-2" data-testid="appointment-form" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-950/60">
          Full name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            data-testid="appointment-name-input"
            className={inputCls}
            autoComplete="name"
          />
        </label>
        <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-950/60">
          Phone number
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 ..."
            inputMode="tel"
            data-testid="appointment-phone-input"
            className={inputCls}
            autoComplete="tel"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-950/60">
          Preferred date
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            data-testid="appointment-date-input"
            className={inputCls}
          />
        </label>
        <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-950/60">
          Preferred time
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger className={`${inputCls} flex w-full`} data-testid="appointment-time-select">
              <SelectValue placeholder="Choose a slot" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>
      <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-950/60">
        Treatment / reason for visit
        <Select value={treatment} onValueChange={setTreatment}>
          <SelectTrigger className={`${inputCls} flex w-full`} data-testid="appointment-treatment-select">
            <SelectValue placeholder="Not sure yet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Not sure yet">Not sure yet — need a consultation</SelectItem>
            {categories.map((c) => (
              <SelectGroup key={c.id}>
                <SelectLabel>{c.name}</SelectLabel>
                {treatmentsByCategory(c.id).map((t) => (
                  <SelectItem key={t.name} value={t.name}>{t.name}</SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </label>
      <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-950/60">
        Message <span className="font-normal normal-case tracking-normal text-navy-950/40">(optional)</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Anything the clinic should know?"
          data-testid="appointment-message-input"
          className={`${inputCls} resize-none`}
        />
      </label>

      {error && (
        <p className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" data-testid="appointment-error">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        data-testid="appointment-submit-button"
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-950 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-azure-600 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending request…
          </>
        ) : (
          "Request Appointment"
        )}
      </button>
      <p className="text-center text-xs text-navy-950/45">
        No payment or confirmation is taken online — the clinic confirms every slot by phone.
      </p>
    </form>
  );
}
