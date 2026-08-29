import PageHero from "@/components/PageHero";
import ReviewsSection from "@/sections/ReviewsSection";
import CtaBand from "@/sections/CtaBand";

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient feedback"
        title={
          <>
            Rated{" "}
            <span className="font-serif font-medium italic text-azure-500">4.7 / 5</span> on
            Google
          </>
        }
        lead="26 patients have reviewed the clinic on Google. Read their feedback directly on the clinic's Google profile — review text is never edited or invented here."
      />
      <ReviewsSection />
      <CtaBand />
    </>
  );
}
