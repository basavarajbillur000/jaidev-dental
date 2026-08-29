import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Phone, Star, MapPin } from "lucide-react";
import { clinic, images } from "@/data/clinic";
import { MaskedLine, Reveal } from "@/components/Reveal";
import { useAppointment } from "@/components/Appointment";

export default function Hero() {
  const { open } = useAppointment();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 110]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-hero-glow" data-testid="hero-section">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-28 lg:pt-40">
        <div className="lg:col-span-6">
          <MaskedLine delay={0.05}>
            <p className="flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-azure-600 sm:text-xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-teal" />
              </span>
              Multispeciality Dental Care — Electronic City, Bengaluru
            </p>
          </MaskedLine>

          <h1 className="mt-6 font-display text-[2.9rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy-950 sm:text-6xl lg:text-7xl">
            <MaskedLine delay={0.15}>Healthy Smiles.</MaskedLine>
            <MaskedLine delay={0.28} className="pb-2">
              <span className="font-serif font-medium italic tracking-normal text-azure-600">
                Confident You.
              </span>
            </MaskedLine>
          </h1>

          <Reveal delay={0.45}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-bodyink sm:text-lg">
              Comprehensive dental care focused on your comfort, clarity and long-term oral
              health — right here in {clinic.area}.
            </p>
          </Reveal>

          <Reveal delay={0.58}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => open()}
                data-testid="hero-book-appointment-button"
                className="group inline-flex items-center gap-2.5 rounded-full bg-navy-950 px-7 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-azure-600"
              >
                Book an Appointment
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a
                href={clinic.phoneHref}
                data-testid="hero-call-button"
                className="inline-flex items-center gap-2.5 rounded-full border border-navy-950/15 bg-white/60 px-7 py-4 text-sm font-bold text-navy-950 backdrop-blur transition-colors duration-300 hover:border-azure-600 hover:text-azure-600"
              >
                <Phone className="size-4" />
                Call {clinic.phoneDisplay}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-navy-950/70">
              <span className="flex items-center gap-2" data-testid="hero-rating">
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </span>
                {clinic.rating}/5 Google Rating
              </span>
              <span className="hidden h-4 w-px bg-navy-950/15 sm:block" />
              <span>{clinic.reviewCount} Patient Reviews</span>
              <span className="hidden h-4 w-px bg-navy-950/15 sm:block" />
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-azure-600" />
                {clinic.area}, {clinic.city}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 1.04, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2.5rem] border border-azure-600/20" aria-hidden="true" />
            <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-20px_rgba(11,25,44,0.25)]">
              <motion.img
                src={images.hero}
                alt="Dentist caring for a patient at a modern dental clinic"
                style={{ y: imgY }}
                className="aspect-[4/5] w-full scale-[1.12] object-cover sm:aspect-[5/5]"
                loading="eager"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-3 bottom-8 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur-xl sm:-left-8"
              data-testid="hero-rating-card"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-1.5 font-display text-2xl font-extrabold text-navy-950">
                {clinic.rating}<span className="text-sm font-bold text-navy-950/50"> / 5</span>
              </p>
              <p className="text-xs font-semibold text-navy-950/60">
                {clinic.reviewCount} verified Google reviews
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -right-2 top-8 rounded-full bg-navy-950 px-5 py-2.5 text-xs font-bold text-white shadow-lg sm:right-6"
            >
              {clinic.treatmentCount} treatments listed
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
