import { Hero } from "@/components/sections/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { StoryIntro } from "@/components/sections/StoryIntro";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { QualitySection } from "@/components/sections/QualitySection";
import { ManufacturingFlow } from "@/components/sections/ManufacturingFlow";
import { JourneyPreview } from "@/components/sections/JourneyPreview";
import { DistributionSection } from "@/components/sections/DistributionSection";
import { DualEnquiry } from "@/components/sections/DualEnquiry";
import { ContactPreview } from "@/components/sections/ContactPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <StoryIntro />
      <CategoryGrid />
      <FeaturedProducts />
      <QualitySection />
      <ManufacturingFlow />
      <JourneyPreview />
      <DistributionSection />
      <DualEnquiry />
      <ContactPreview />
    </>
  );
}
