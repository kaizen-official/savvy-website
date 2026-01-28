import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services";
import SliderSection from "@/components/sections/slider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SliderSection />
    </>
  );
}
