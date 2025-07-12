
import Header from "@/components/Header";
import SimpleHero from "@/components/SimpleHero";
import SimpleProcess from "@/components/SimpleProcess";
import Footer from "@/components/Footer";
import { User, Session } from "@supabase/supabase-js";

interface IndexProps {
  user?: User | null;
  session?: Session | null;
}

const Index = ({ user, session }: IndexProps) => {
  return (
    <div className="min-h-screen">
      <Header user={user} session={session} />
      <main>
        <SimpleHero />
        <SimpleProcess />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
