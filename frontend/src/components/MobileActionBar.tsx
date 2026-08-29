import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { clinic, waLink } from "@/data/clinic";
import { useAppointment } from "@/components/Appointment";

export default function MobileActionBar() {
  const { open } = useAppointment();
  return (
    <div
      data-testid="mobile-action-bar"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-px border-t border-softline bg-white/90 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={clinic.phoneHref}
        data-testid="mobile-bar-call-button"
        className="flex flex-col items-center gap-1 py-3 text-[11px] font-bold text-navy-950"
      >
        <Phone className="size-4.5 text-azure-600" />
        Call
      </a>
      <a
        href={waLink(clinic.whatsappText)}
        target="_blank"
        rel="noreferrer"
        data-testid="mobile-bar-whatsapp-button"
        className="flex flex-col items-center gap-1 py-3 text-[11px] font-bold text-navy-950"
      >
        <MessageCircle className="size-4.5 text-brand-teal" />
        WhatsApp
      </a>
      <button
        onClick={() => open()}
        data-testid="mobile-bar-book-button"
        className="flex flex-col items-center gap-1 bg-navy-950 py-3 text-[11px] font-bold text-white"
      >
        <CalendarCheck className="size-4.5" />
        Book
      </button>
    </div>
  );
}
