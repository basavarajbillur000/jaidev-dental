import { createContext, useContext, useState, type ReactNode } from "react";
import { Phone, CalendarCheck, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { clinic, categories } from "@/data/clinic";
import { useAppointment } from "@/components/Appointment";

export interface TreatmentInfo {
  name: string;
  blurb: string;
  category: string;
}

interface ModalCtx {
  show: (t: TreatmentInfo) => void;
}

const Ctx = createContext<ModalCtx>({ show: () => {} });
export const useTreatmentModal = () => useContext(Ctx);

export function TreatmentModalProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<TreatmentInfo | null>(null);
  const { open } = useAppointment();

  const categoryName = current
    ? categories.find((c) => c.id === current.category)?.name ?? "Dental Care"
    : "";

  return (
    <Ctx.Provider value={{ show: setCurrent }}>
      {children}
      <Dialog open={!!current} onOpenChange={(v) => !v && setCurrent(null)}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:max-w-lg sm:p-8" data-testid="treatment-modal">
          {current && (
            <>
              <DialogHeader>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-azure-600">
                  {categoryName}
                </p>
                <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-navy-950">
                  {current.name}
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed text-bodyink">
                  {current.blurb}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 pt-1">
                <p className="text-sm leading-relaxed text-bodyink">
                  <strong className="text-navy-950">{current.name}</strong> is offered at{" "}
                  {clinic.name}, {clinic.area}. During your consultation the dentist will
                  examine your concern, explain whether this treatment suits you, and walk you
                  through the steps, sittings and costs involved — before anything begins.
                </p>
                <ul className="grid gap-2">
                  {[
                    "Consultation-first approach with clear explanations",
                    "Treatment plan and pricing discussed before you decide",
                    "Questions welcome at every step",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-bodyink">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => { const n = current.name; setCurrent(null); open(n); }}
                    data-testid="treatment-modal-book-button"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-navy-950 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-azure-600"
                  >
                    <CalendarCheck className="size-4" />
                    Book a Consultation
                  </button>
                  <a
                    href={clinic.phoneHref}
                    data-testid="treatment-modal-call-button"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-softline py-3.5 text-sm font-bold text-navy-950 transition-colors hover:bg-mist"
                  >
                    <Phone className="size-4 text-azure-600" />
                    Call the Clinic
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
