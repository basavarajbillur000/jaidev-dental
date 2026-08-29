const items = [
  "Dental Implants",
  "Root Canal Treatment",
  "Clear Aligners",
  "Teeth Whitening",
  "Cosmetic Dentistry",
  "Pediatric Dentistry",
  "Laser Dentistry",
  "CBCT Scans",
  "Crowns & Bridges",
  "Braces & Retainers",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y border-softline bg-white py-5"
      aria-hidden="true"
      data-testid="treatment-marquee"
    >
      <div className="flex w-max animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
        {row.map((label, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-outline-navy">
              {label}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-azure-600/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
