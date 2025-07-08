
import Header from "@/components/Header";
import SimpleHero from "@/components/SimpleHero";
import SimpleProcess from "@/components/SimpleProcess";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <SimpleHero />
        <SimpleProcess />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
