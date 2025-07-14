
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Heart } from "lucide-react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Application from "./pages/Application";
import Matching from "./pages/Matching";
import Payment from "./pages/Payment";
import ContactExchange from "./pages/ContactExchange";
import MatchStatus from "./pages/MatchStatus";
import MatchHistory from "./pages/MatchHistory";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth state 리스너 설정
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        // 세션이 변경될 때마다 localStorage에 저장
        if (session) {
          localStorage.setItem('supabase.auth.session', JSON.stringify(session));
        } else {
          localStorage.removeItem('supabase.auth.session');
        }
        
        setLoading(false);
      }
    );

    // 현재 세션 확인
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Initial session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };
    
    checkSession();

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-rosegold-50 to-bluegray-50">
              {/* 로딩 중에도 헤더 표시 (인증 상태는 null로) */}
              <div className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-rosegold-100">
                <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                  <Link to="/" className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full gradient-rosegold flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gradient">마침</span>
                  </Link>
                  <div className="hidden md:flex items-center space-x-4">
                    <div className="animate-pulse bg-rosegold-200 h-9 w-16 rounded"></div>
                    <div className="animate-pulse bg-rosegold-200 h-9 w-20 rounded"></div>
                  </div>
                </div>
              </div>
              
              <div className="pt-14 flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rosegold-500 mx-auto mb-4"></div>
                  <p className="text-bluegray-600">로딩 중...</p>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index user={user} session={session} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/application" element={<Application user={user} session={session} />} />
            <Route path="/matching" element={<Matching />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/contact-exchange" element={<ContactExchange />} />
            <Route path="/match-status" element={<MatchStatus />} />
            <Route path="/match-history" element={<MatchHistory />} />
            <Route path="/admin" element={<Admin user={user} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
