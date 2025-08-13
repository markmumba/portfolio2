import Header from "../components/homepage/Header";
import Hero from "../components/homepage/Hero";
import Projects from "../components/homepage/Projects";
import Essays from "../components/homepage/Essays";
import About from "../components/homepage/About";
import Footer from "../components/homepage/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background newspaper-bg">
      <Header />
      <Hero />
      <Essays />
      <Projects />
      <About />
      <Footer />
    </main>
  );
}
