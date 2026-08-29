import { CalendarCheck, BadgeCheck } from "lucide-react";
import { images, clinic } from "@/data/clinic";
import { Reveal, SectionHead } from "@/components/Reveal";
import { useAppointment } from "@/components/Appointment";

const pendingFields = ["Qualification", "Specialisation", "Experience", "Memberships"];

export default function DoctorSection() {
  const { open } = useAppointment();
  return (
    <section className="bg-mist py-20 sm:py-28" data-testid="doctor-section">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={images.doctor}
              alt="Dentist at Jaidev Multispeciality Dental Care"
              loading="lazy"
              className="aspect-[4/4.4] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <div className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/85 px-4 py-2 text-xs font-bold text-navy-950 backdrop-blur">
            Profile being verified
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHead
            chapter="06"
            eyebrow="Meet your dentist"
            title={
              <>
                Dr. <span className="font-serif font-medium italic text-azure-600">Premkumar</span>
              </>
            }
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-bodyink">
              Dr. Premkumar leads patient care at {clinic.name}. Public patient feedback
              references the doctor by name — the full professional profile is being prepared
              with the clinic and will appear here once verified.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <dl className="mt-8 grid grid-cols-2 gap-3">
              {pendingFields.map((f) => (
                <div
                  key={f}
                  className="rounded-2xl border border-dashed border-navy-950/20 bg-white/70 px-4 py-3.5"
                  data-testid={`doctor-field-${f.toLowerCase()}`}
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-navy-950/45">
                    {f}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-navy-950/60">To be confirmed</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.36}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => open()}
                data-testid="doctor-book-button"
                className="inline-flex items-center gap-2.5 rounded-full bg-navy-950 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-azure-600"
              >
                <CalendarCheck className="size-4" />
                Book with Dr. Premkumar
              </button>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-navy-950/50">
                <BadgeCheck className="size-4 text-brand-teal" />
                No credentials published until verified
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
