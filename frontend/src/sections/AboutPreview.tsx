import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { clinic, images } from "@/data/clinic";
import { Reveal, SectionHead } from "@/components/Reveal";

const points = [
  "Multispeciality treatment range",
  "Comfort-first consultations",
  "Clear explanation before treatment",
  "Convenient Electronic City access",
];

export default function AboutPreview() {
  return (
    <section className="bg-white py-20 sm:py-28" data-testid="about-section">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={images.about}
              alt="Modern dental treatment room"
              loading="lazy"
              className="aspect-[4/3.4] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -bottom-6 -right-3 hidden w-40 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block">
            <img src="/clinic/operatory.jpg" alt="Jaidev clinic operatory" loading="lazy" className="w-full object-cover" />
          </div>
        </Reveal>

        <div>
          <SectionHead
            chapter="01"
            eyebrow="About Jaidev"
            title={
              <>
                Complete dental care with a{" "}
                <span className="font-serif font-medium italic text-azure-600">patient-first</span>{" "}
                approach
              </>
            }
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-bodyink">
              {clinic.name} is a multispeciality dental clinic in {clinic.addressShort},{" "}
              {clinic.city}. The clinic's public treatment profile spans{" "}
              <strong className="text-navy-950">{clinic.treatmentCount} listed treatments</strong> —
              from everyday cleaning and fillings to implants, aligners and laser dentistry.
            </p>
            <p className="mt-4 text-base leading-relaxed text-bodyink">
              Every visit starts with listening: your concern is examined, your options are
              explained in plain language, and you decide how to proceed — with pricing and
              steps discussed upfront.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {points.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-softline bg-mist px-4 py-2 text-xs font-bold text-navy-950/75"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.36}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/services"
                data-testid="about-explore-services-button"
                className="group inline-flex items-center gap-2.5 rounded-full bg-navy-950 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-azure-600"
              >
                Explore Our Services
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                data-testid="about-more-link"
                className="inline-flex items-center gap-2 rounded-full border border-navy-950/15 px-7 py-3.5 text-sm font-bold text-navy-950 transition-colors hover:border-azure-600 hover:text-azure-600"
              >
                More about the clinic
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
