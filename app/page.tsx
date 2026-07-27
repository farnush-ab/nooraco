import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Manifesto from "@/components/Manifesto";
import Bento from "@/components/Bento";
import Chapters from "@/components/Chapters";
import Products from "@/components/Products";
import Brands from "@/components/Brands";
import Craft from "@/components/Craft";
import Stats from "@/components/Stats";
import Journal from "@/components/Journal";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Ticker />
      <Manifesto />
      <Bento />
      <Chapters />
      <Products />
      <Brands />
      <Craft />
      <Stats />
      <Journal />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
