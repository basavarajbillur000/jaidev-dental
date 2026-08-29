export const clinic = {
  name: "Jaidev Multispeciality Dental Care",
  wordmark: "JAIDEV",
  wordmarkSub: "Multispeciality Dental Care",
  tagline: "Healthy Smiles. Confident You.",
  phoneDisplay: "+91 80987 61238",
  phoneHref: "tel:+918098761238",
  whatsappNumber: "918098761238",
  whatsappText:
    "Hello Jaidev Multispeciality Dental Care, I would like to book an appointment.",
  addressLines: [
    "No. 74, Srinivasa Reddy Building,",
    "Govind Shetty Palya, Konappana Agrahara,",
    "opposite Drug City Medical Shop,",
    "Phase II, Electronic City,",
    "Karnataka 560100, India",
  ],
  addressShort: "Govind Shetty Palya, Electronic City",
  landmark: "Opposite Drug City Medical Shop",
  area: "Electronic City",
  city: "Bengaluru",
  mapsLink: "https://maps.app.goo.gl/NnRzGQsY9iUGKKps5",
  mapsEmbed:
    "https://www.google.com/maps?q=12.8551403,77.6687825&z=16&output=embed",
  rating: "4.7",
  ratingMax: "5",
  reviewCount: 26,
  treatmentCount: 57,
  hours: [
    { day: "Monday", time: "10:00 AM – 9:00 PM" },
    { day: "Tuesday", time: "10:00 AM – 9:00 PM" },
    { day: "Wednesday", time: "10:00 AM – 9:00 PM" },
    { day: "Thursday", time: "10:00 AM – 9:00 PM" },
    { day: "Friday", time: "10:00 AM – 9:00 PM" },
    { day: "Saturday", time: "10:00 AM – 9:00 PM" },
    { day: "Sunday", time: "10:00 AM – 2:00 PM" },
  ],
};

export const waLink = (text: string) =>
  `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const images = {
  hero: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop",
  about:
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1400&auto=format&fit=crop",
  aboutAlt:
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
  editorial:
    "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1400&auto=format&fit=crop",
  doctor:
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop",
  exterior: "/clinic/exterior.jpg",
  logo: "/clinic/logo.jpg",
};

export interface Category {
  id: string;
  short: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: "preventive",
    short: "Preventive",
    name: "Preventive & General Dental Care",
    description:
      "Check-ups, cleaning and everyday dental concerns — the foundation of long-term oral health.",
    icon: "ShieldCheck",
  },
  {
    id: "endodontics",
    short: "Root Canal",
    name: "Root Canal & Endodontics",
    description:
      "Care for the inside of the tooth, from imaging to root canal therapy that saves natural teeth.",
    icon: "Activity",
  },
  {
    id: "implants",
    short: "Implants",
    name: "Dental Implants & Implantology",
    description:
      "Planned, imaging-guided replacement of missing teeth with dental implants.",
    icon: "Anchor",
  },
  {
    id: "orthodontics",
    short: "Orthodontics",
    name: "Orthodontics & Aligners",
    description:
      "Braces, ceramic options, clear aligners and retainers to align teeth and bites.",
    icon: "Smile",
  },
  {
    id: "cosmetic",
    short: "Cosmetic",
    name: "Cosmetic Dentistry",
    description:
      "Whitening, veneers, bonding and smile correction focused on how your smile looks.",
    icon: "Sparkles",
  },
  {
    id: "restorative",
    short: "Restorative",
    name: "Restorative & Prosthodontics",
    description:
      "Fillings, crowns, tooth caps, bridges and dentures that rebuild function.",
    icon: "Layers",
  },
  {
    id: "surgery",
    short: "Oral Surgery",
    name: "Oral Surgery",
    description:
      "Extractions and surgical gum care, planned with clear explanation at every step.",
    icon: "Scissors",
  },
  {
    id: "pediatric",
    short: "Pediatric",
    name: "Pediatric Dentistry",
    description:
      "Gentle, unhurried dental care paced for children and first visits.",
    icon: "Baby",
  },
  {
    id: "diagnostics",
    short: "Diagnostics",
    name: "Dental Diagnostics & Scans",
    description:
      "X-rays, CBCT and intraoral scanning that make treatment planning precise.",
    icon: "Scan",
  },
  {
    id: "advanced",
    short: "Advanced",
    name: "Advanced & Laser Dentistry",
    description:
      "Microscope-assisted and laser-assisted techniques across selected procedures.",
    icon: "Zap",
  },
];

export interface Treatment {
  name: string;
  blurb: string;
  category: string;
}

export const treatments: Treatment[] = [
  // Preventive & General
  { name: "Preventive dental care", blurb: "Routine check-ups and guidance that catch dental problems early.", category: "preventive" },
  { name: "Teeth cleaning", blurb: "Professional cleaning that lifts away plaque, stains and surface deposits.", category: "preventive" },
  { name: "Scaling", blurb: "Careful removal of hardened tartar above and below the gum line.", category: "preventive" },
  { name: "Consultations", blurb: "A one-on-one evaluation of your concern with clear treatment options.", category: "preventive" },
  { name: "Complete Dental Care Under A Single Roof", blurb: "From diagnosis to treatment, every stage of care coordinated in one clinic.", category: "preventive" },
  { name: "Toothache", blurb: "Evaluation and relief for dental pain, with the cause clearly explained.", category: "preventive" },
  { name: "Mouth Ulcer", blurb: "Assessment and care for painful or recurring mouth ulcers.", category: "preventive" },
  // Root Canal & Endodontics
  { name: "Root Canal Treatment", blurb: "Removes infection from inside the tooth to relieve pain and save the natural tooth.", category: "endodontics" },
  { name: "Root Canal", blurb: "The clinic's listing for root canal therapy for infected or damaged teeth.", category: "endodontics" },
  { name: "Endodontics", blurb: "Care focused on the inside of the tooth — the pulp and root canals.", category: "endodontics" },
  { name: "Micro Endodontic Procedures", blurb: "Root treatments performed under magnification for added precision.", category: "endodontics" },
  { name: "3D Micro Endodontic Imaging", blurb: "Three-dimensional imaging that maps root canals before treatment begins.", category: "endodontics" },
  { name: "Dental Clinic for Root Canal Treatment", blurb: "The clinic's dedicated listing for root canal care.", category: "endodontics" },
  // Implants
  { name: "Implantology", blurb: "The field of replacing missing teeth with dental implants.", category: "implants" },
  { name: "Dental Implants", blurb: "A fixed replacement for missing teeth, planned around your bone and bite.", category: "implants" },
  { name: "Dental Implant Surgery", blurb: "The surgical placement of implants, planned with imaging beforehand.", category: "implants" },
  { name: "Dental Clinic for Implants", blurb: "The clinic's dedicated listing for implant-based tooth replacement.", category: "implants" },
  { name: "Dental Imaging for Implants and Orthodontics", blurb: "Targeted scans used to plan implant and orthodontic treatment.", category: "implants" },
  // Orthodontics & Aligners
  { name: "Orthodontics", blurb: "Care that aligns teeth and corrects bites steadily over time.", category: "orthodontics" },
  { name: "Teeth Braces", blurb: "Fixed braces that guide teeth into healthier alignment.", category: "orthodontics" },
  { name: "Dental Braces", blurb: "The clinic's listing for fixed orthodontic braces.", category: "orthodontics" },
  { name: "Ceramic Braces", blurb: "Tooth-coloured brackets for a more discreet fixed-braces option.", category: "orthodontics" },
  { name: "Clear Aligners", blurb: "Removable, near-invisible trays that straighten teeth in planned stages.", category: "orthodontics" },
  { name: "Teeth aligners", blurb: "The clinic's listing for removable aligner therapy.", category: "orthodontics" },
  { name: "Teeth Retainer", blurb: "Custom retainers that hold teeth in position after alignment.", category: "orthodontics" },
  { name: "Dental Clinic for Braces Fitting", blurb: "The clinic's dedicated listing for braces fitting and adjustments.", category: "orthodontics" },
  { name: "Crooked Teeth", blurb: "Evaluation and correction options for crowded or misaligned teeth.", category: "orthodontics" },
  { name: "Gap closing", blurb: "Treatment options that close unwanted spaces between teeth.", category: "orthodontics" },
  // Cosmetic
  { name: "Cosmetic Dentistry", blurb: "Treatments focused on the appearance of your smile.", category: "cosmetic" },
  { name: "cosmetic dental clinic", blurb: "The clinic's listing for its cosmetic dentistry services.", category: "cosmetic" },
  { name: "Smile Correction", blurb: "A planned combination of treatments to improve how your smile looks.", category: "cosmetic" },
  { name: "Veneer Teeth", blurb: "Thin, custom shells that refine the shape and shade of front teeth.", category: "cosmetic" },
  { name: "Dental Clinic for Veneers", blurb: "The clinic's dedicated listing for veneer treatment.", category: "cosmetic" },
  { name: "Teeth Whitening", blurb: "Professional whitening that lifts stains and brightens natural enamel.", category: "cosmetic" },
  { name: "Teeth Bleaching Treatment", blurb: "The clinic's listing for professional teeth bleaching treatment.", category: "cosmetic" },
  { name: "Dental Clinic for Bleaching", blurb: "The clinic's dedicated listing for teeth bleaching.", category: "cosmetic" },
  { name: "Dental Bonding", blurb: "Tooth-coloured resin that repairs chips, worn edges and small gaps.", category: "cosmetic" },
  // Restorative
  { name: "Prosthodontics", blurb: "Restoring and replacing teeth with crowns, bridges and dentures.", category: "restorative" },
  { name: "Tooth Cap", blurb: "A crown that covers and protects a weakened or root-treated tooth.", category: "restorative" },
  { name: "Dentures", blurb: "Custom removable replacements for multiple or all missing teeth.", category: "restorative" },
  { name: "Tooth Filling", blurb: "Tooth-coloured fillings that repair cavities and minor damage.", category: "restorative" },
  { name: "Laser Dental Filling Treatment", blurb: "Cavity treatment using laser-assisted techniques where suitable.", category: "restorative" },
  { name: "Dental Clinic for Crowns and Bridges", blurb: "The clinic's dedicated listing for crowns and bridge work.", category: "restorative" },
  // Oral Surgery
  { name: "Oral Surgery", blurb: "Surgical care for teeth, gums and supporting structures.", category: "surgery" },
  { name: "Tooth Extraction", blurb: "Careful removal of teeth that cannot be saved.", category: "surgery" },
  { name: "Extraction", blurb: "The clinic's listing for tooth removal procedures.", category: "surgery" },
  { name: "Dental Clinic for Gum Surgeries", blurb: "The clinic's dedicated listing for surgical gum care.", category: "surgery" },
  // Pediatric
  { name: "Pediatric Dentistry", blurb: "Gentle dental care paced for children and first visits.", category: "pediatric" },
  { name: "Dental Clinic for Children", blurb: "The clinic's dedicated listing for children's dentistry.", category: "pediatric" },
  // Diagnostics
  { name: "Dental X-Rays", blurb: "Quick radiographs that reveal decay, roots and bone levels.", category: "diagnostics" },
  { name: "CBCT Scans", blurb: "3D cone-beam imaging for detailed treatment planning.", category: "diagnostics" },
  { name: "IntraOral Scans", blurb: "Digital impressions captured with a small handheld scanner.", category: "diagnostics" },
  { name: "Facial And Oral Scans", blurb: "Imaging of facial and oral structures used in treatment planning.", category: "diagnostics" },
  // Advanced
  { name: "Dental Micro Procedures", blurb: "Treatments performed with magnification for fine detail.", category: "advanced" },
  { name: "Micro Dentistry", blurb: "A magnification-led approach to conservative, tooth-saving dentistry.", category: "advanced" },
  { name: "Laser Dentistry", blurb: "Laser-assisted techniques used across selected dental procedures.", category: "advanced" },
  { name: "Facial Aesthetic Treatments", blurb: "Aesthetic treatments for the facial area, as listed by the clinic.", category: "advanced" },
];

export const treatmentsByCategory = (id: string) =>
  treatments.filter((t) => t.category === id);

export interface FeaturedService {
  name: string;
  description: string;
  image: string;
  category: string;
}

export const featuredServices: FeaturedService[] = [
  {
    name: "Dental Implants",
    description: "Fixed, imaging-planned replacement for missing teeth.",
    image: "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?q=80&w=900&auto=format&fit=crop",
    category: "implants",
  },
  {
    name: "Root Canal Treatment",
    description: "Relieve pain and save a natural tooth from infection.",
    image: "https://images.unsplash.com/photo-1777793389944-f7165259a05c?q=80&w=900&auto=format&fit=crop",
    category: "endodontics",
  },
  {
    name: "Clear Aligners",
    description: "Near-invisible, removable teeth straightening.",
    image: "https://images.unsplash.com/photo-1777793636393-a0fec488f3fb?q=80&w=900&auto=format&fit=crop",
    category: "orthodontics",
  },
  {
    name: "Teeth Braces",
    description: "Fixed and ceramic braces for lasting alignment.",
    image: "https://images.unsplash.com/photo-1656514894252-fb336a3ad6a6?q=80&w=900&auto=format&fit=crop",
    category: "orthodontics",
  },
  {
    name: "Cosmetic Dentistry",
    description: "Veneers, bonding and smile correction.",
    image: "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?q=80&w=900&auto=format&fit=crop",
    category: "cosmetic",
  },
  {
    name: "Teeth Whitening",
    description: "Professional whitening for a brighter smile.",
    image: "https://images.unsplash.com/photo-1564420228450-d9a5bc8d6565?q=80&w=900&auto=format&fit=crop",
    category: "cosmetic",
  },
  {
    name: "Dental Crowns & Bridges",
    description: "Protect and rebuild damaged or missing teeth.",
    image: "https://images.unsplash.com/photo-1468493858157-0da44aaf1d13?q=80&w=900&auto=format&fit=crop",
    category: "restorative",
  },
  {
    name: "Pediatric Dentistry",
    description: "Gentle first visits and ongoing care for children.",
    image: "https://images.unsplash.com/photo-1758205307836-0829c799890b?q=80&w=900&auto=format&fit=crop",
    category: "pediatric",
  },
];

export interface GalleryItem {
  src: string;
  title: string;
  category: "Clinic" | "Interior" | "Treatment" | "Doctors" | "Team";
  placeholder?: boolean;
}

export const galleryItems: GalleryItem[] = [
  { src: "/clinic/exterior.jpg", title: "Clinic entrance, Govind Shetty Palya", category: "Clinic" },
  { src: "/clinic/treatment-suite.jpg", title: "Treatment suite with dual dental chairs", category: "Treatment" },
  { src: "/clinic/operatory.jpg", title: "Operatory with microscope and chairside imaging", category: "Treatment" },
  { src: "/clinic/waiting-lounge.jpg", title: "Patient waiting lounge", category: "Interior" },
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop",
    title: "Doctor portrait — replace with clinic photo",
    category: "Doctors",
    placeholder: true,
  },
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    title: "Care in progress — replace with clinic photo",
    category: "Team",
    placeholder: true,
  },
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Doctors", to: "/doctors" },
  { label: "Reviews", to: "/reviews" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];
