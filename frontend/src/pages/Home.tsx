import Hero from "@/sections/Hero";
import Marquee from "@/components/Marquee";
import TrustStrip from "@/sections/TrustStrip";
import AboutPreview from "@/sections/AboutPreview";
import FeaturedServices from "@/sections/FeaturedServices";
import ServiceExplorer from "@/sections/ServiceExplorer";
import ImplantsEditorial from "@/sections/ImplantsEditorial";
import WhyChoose from "@/sections/WhyChoose";
import DoctorSection from "@/sections/DoctorSection";
import ReviewsSection from "@/sections/ReviewsSection";
import GalleryPreview from "@/sections/GalleryPreview";
import LocationHours from "@/sections/LocationHours";
import CtaBand from "@/sections/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <TrustStrip />
      <AboutPreview />
      <FeaturedServices />
      <ServiceExplorer />
      <ImplantsEditorial />
      <WhyChoose />
      <DoctorSection />
      <ReviewsSection />
      <GalleryPreview />
      <LocationHours />
      <CtaBand />
    </>
  );
}
