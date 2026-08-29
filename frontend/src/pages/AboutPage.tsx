import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Reveal, SectionHead } from "@/components/Reveal";
import { clinic, images } from "@/data/clinic";
import WhyChoose from "@/sections/WhyChoose";
import DoctorSection from "@/sections/DoctorSection";
import GalleryPreview from "@/sections/GalleryPreview";
import CtaBand from "@/sections/CtaBand";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the clinic"
        title={
          <>
            Dental care built around{" "}
            <span className="font-serif font-medium italic text-azure-500">you</span>
          </>
        }
        lead={`${clinic.name} is a multispeciality dental clinic in ${clinic.addressShort}, ${clinic.city} — with 57 treatments listed on its public profile and a 4.7/5 Google rating.`}
      />

      <section className="bg-white py-20 sm:py-24" data-testid="about-story">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHead
              chapter="01"
              eyebrow="Our approach"
              title={
                <>
                  Comfort first.{" "}
                  <span className="font-serif font-medium italic text-azure-600">Clarity always.</span>
                </>
              }
            />
            <Reveal delay={0.2}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-bodyink">
                <p>
                  A dental visit is easier when you know what to expect. At Jaidev, every
                  appointment starts with an examination and a plain-language explanation of
                  what's happening, what your options are, and what each option involves.
                </p>
                <p>
                  The clinic's treatment profile spans preventive care, root canal and
                  endodontics, implants, orthodontics and aligners, cosmetic dentistry,
                  restorative work, oral surgery, pediatric care, diagnostics and laser
                  dentistry — coordinated under one roof in Electronic City.
                </p>
                <p>
                  You'll find the clinic on Govind Shetty Palya, {clinic.landmark.toLowerCase()} —
                  open six days a week until 9 PM, and Sunday mornings.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.28}>
              <Link
                to="/services"
                data-testid="about-page-services-link"
                className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-navy-950 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-azure-600"
              >
                Browse treatments
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <Reveal className="relative">
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src={images.aboutAlt}
                alt="Dentist reviewing a patient's care plan"
                loading="lazy"
                className="aspect-[4/4.2] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-3 w-44 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:-left-6">
              <img
                src="/clinic/treatment-suite.jpg"
                alt="Jaidev treatment suite"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <WhyChoose />
      <DoctorSection />
      <GalleryPreview />
      <CtaBand />
    </>
  );
}
