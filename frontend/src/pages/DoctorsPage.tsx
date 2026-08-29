import PageHero from "@/components/PageHero";
import DoctorSection from "@/sections/DoctorSection";
import CtaBand from "@/sections/CtaBand";
import { Reveal } from "@/components/Reveal";
import { UserRoundPlus } from "lucide-react";

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title={
          <>
            Meet your{" "}
            <span className="font-serif font-medium italic text-azure-500">dentist</span>
          </>
        }
        lead="Public patient feedback references Dr. Premkumar at the clinic. Full professional profiles are published only after the clinic verifies them — nothing here is invented."
      />
      <DoctorSection />

      <section className="bg-white py-16 sm:py-20" data-testid="team-placeholder-section">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-navy-950/20 bg-mist p-10 text-center sm:p-14">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-azure-50 text-azure-600">
                <UserRoundPlus className="size-6" />
              </span>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy-950">
                Full team profiles coming soon
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-bodyink">
                Qualifications, specialisations, experience and professional memberships for
                each doctor will be added here once the clinic confirms them. Until then, this
                section intentionally stays a placeholder.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
