import Backdrop from "@/components/Backdrop";
import Boot from "@/components/Boot";
import Hud from "@/components/Hud";
import Reticle from "@/components/Reticle";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Cases from "@/components/Cases";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Backdrop />
      <Boot />
      <Hud />
      <Reticle />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Process />
        <Cases />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
