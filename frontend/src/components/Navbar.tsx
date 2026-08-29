import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { clinic, navLinks } from "@/data/clinic";
import { useAppointment } from "@/components/Appointment";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useAppointment();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <>
      <header
        data-testid="navbar"
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,padding,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-softline/80 bg-white/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 transition-all duration-500 ${
            scrolled ? "py-2.5" : "py-4 sm:py-5"
          }`}
        >
          <Link to="/" className="flex items-center gap-3" data-testid="nav-logo-link">
            <img
              src={clinic ? "/clinic/logo.jpg" : ""}
              alt="Jaidev Multispeciality Dental Care logo"
              className="h-10 w-10 rounded-xl object-cover shadow-sm"
              loading="eager"
            />
            <span className="leading-tight">
              <span className="block font-display text-lg font-extrabold tracking-tight text-navy-950">
                {clinic.wordmark}
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-azure-600">
                {clinic.wordmarkSub}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative text-sm font-semibold transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-azure-600 after:transition-all after:duration-300 ${
                    isActive
                      ? "text-navy-950 after:w-full"
                      : "text-bodyink/70 after:w-0 hover:text-navy-950 hover:after:w-full"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={clinic.phoneHref}
              data-testid="nav-call-button"
              className="hidden items-center gap-2 text-sm font-bold text-navy-950 transition-colors hover:text-azure-600 xl:flex"
            >
              <Phone className="size-4 text-azure-600" />
              {clinic.phoneDisplay}
            </a>
            <button
              onClick={() => open()}
              data-testid="nav-book-appointment-button"
              className="hidden items-center gap-1.5 rounded-full bg-navy-950 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-azure-600 sm:inline-flex"
            >
              Book Appointment
              <ArrowUpRight className="size-4" />
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              data-testid="nav-mobile-menu-button"
              aria-label="Open menu"
              className="inline-flex size-10 items-center justify-center rounded-full border border-softline bg-white text-navy-950 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-testid="nav-mobile-menu"
            className="fixed inset-0 z-50 flex flex-col bg-navy-950 px-6 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                {clinic.wordmark}
                <span className="block font-mono text-[9px] font-normal uppercase tracking-[0.2em] text-azure-100/70">
                  {clinic.wordmarkSub}
                </span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                data-testid="nav-mobile-close-button"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                    className={({ isActive }) =>
                      `block py-3 font-display text-3xl font-extrabold tracking-tight ${
                        isActive ? "text-azure-500" : "text-white"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 pb-20">
              <button
                onClick={() => { setMenuOpen(false); open(); }}
                data-testid="nav-mobile-book-button"
                className="w-full rounded-full bg-azure-600 py-4 text-sm font-bold text-white"
              >
                Book Appointment
              </button>
              <a
                href={clinic.phoneHref}
                data-testid="nav-mobile-call-button"
                className="w-full rounded-full border border-white/20 py-4 text-center text-sm font-bold text-white"
              >
                Call {clinic.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
