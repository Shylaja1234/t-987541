
import { useEffect } from "react";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Products from "@/components/home/Products";
import Pricing from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <section id="about">
            <About />
          </section>
          <section id="services">
            <Services />
          </section>
          <section id="products">
            <Products />
          </section>
          <section id="pricing">
            <Pricing />
          </section>
          <Testimonials />
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
