import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Manifesto from "@/components/Manifesto";
import Bento from "@/components/Bento";
import Chapters from "@/components/Chapters";
import Products from "@/components/Products";
import Brands from "@/components/Brands";
import Stats from "@/components/Stats";
import Journal from "@/components/Journal";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Ticker />
      <Manifesto />
      <Bento />
      <Chapters />
      <Products />
      <Brands />
      <Stats />
      <Journal />
      <Faq />
      <Contact />
      <Footer />
      {/* global film grain */}
      <div aria-hidden className="grain-overlay" />
    </main>
  );
}
