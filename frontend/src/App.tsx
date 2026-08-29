import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { initLenis, scrollToTop } from "@/lib/scroll";
import { AppointmentProvider } from "@/components/Appointment";
import { TreatmentModalProvider } from "@/components/TreatmentModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import Home from "@/pages/Home";
import ServicesPage from "@/pages/ServicesPage";
import AboutPage from "@/pages/AboutPage";
import DoctorsPage from "@/pages/DoctorsPage";
import ReviewsPage from "@/pages/ReviewsPage";
import GalleryPage from "@/pages/GalleryPage";
import ContactPage from "@/pages/ContactPage";

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => scrollToTop(), [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <AppointmentProvider>
      <TreatmentModalProvider>
        <ScrollReset />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <MobileActionBar />
      </TreatmentModalProvider>
    </AppointmentProvider>
  );
}
