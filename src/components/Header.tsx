
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  user?: SupabaseUser | null;
  session?: Session | null;
}

const Header = ({ user, session }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          variant: "destructive",
          title: "로그아웃 실패",
          description: error.message,
        });
      } else {
        toast({
          title: "로그아웃 완료",
          description: "성공적으로 로그아웃되었습니다.",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "오류",
        description: "로그아웃 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover-lift">
          <div className="w-8 h-8 rounded-full gradient-warm-glow flex items-center justify-center shadow-soft">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient">마침</span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-bluegray-700" />
          ) : (
            <Menu className="w-6 h-6 text-bluegray-700" />
          )}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/application" className="text-bluegray-700 hover:text-rosegold-600 transition-colors">
            서비스 신청
          </Link>
          <Link to="/matching" className="text-bluegray-700 hover:text-rosegold-600 transition-colors">
            매칭 확인
          </Link>
        </nav>
        
        {/* Desktop buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 text-bluegray-700 hover:text-rosegold-600">
                  <User className="w-4 h-4" />
                  <span>{user.email?.split('@')[0] || '사용자'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/application" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    내 신청서
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/matching" className="flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    매칭 확인
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  로그인
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="premium" size="lg">
                  시작하기
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-rosegold-100">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/application" 
              className="block py-2 text-bluegray-700 hover:text-rosegold-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              서비스 신청
            </Link>
            <Link 
              to="/matching" 
              className="block py-2 text-bluegray-700 hover:text-rosegold-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              매칭 확인
            </Link>
            <div className="flex flex-col space-y-3 pt-4 border-t border-rosegold-100">
              {user ? (
                <>
                  <div className="px-2 py-1 text-sm text-bluegray-600">
                    {user.email?.split('@')[0] || '사용자'}님
                  </div>
                  <Link to="/application" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-bluegray-700 hover:text-rosegold-600 justify-start">
                      <User className="w-4 h-4 mr-2" />
                      내 신청서
                    </Button>
                  </Link>
                  <Link to="/matching" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-bluegray-700 hover:text-rosegold-600 justify-start">
                      <Heart className="w-4 h-4 mr-2" />
                      매칭 확인
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    variant="ghost" 
                    className="w-full text-red-600 hover:text-red-700 justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    로그아웃
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-bluegray-700 hover:text-rosegold-600">
                      로그인
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-rosegold-500 hover:bg-rosegold-600 text-white shadow-elegant">
                      시작하기
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
