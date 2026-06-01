import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import CornerBanner from '../components/CornerBanner';
import Services from '../components/Services';
import Stats from '../components/Stats';
import Process from '../components/Process';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-void text-cream overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <CornerBanner />
        <Services />
        <Stats />
        <Process />
        <WhyUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
