import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services"; 
import WhyChooseUs from "@/components/WhyChooseUs"; 
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import { div } from "framer-motion/client";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Location />
      <Footer />
    </div>
  );
}
