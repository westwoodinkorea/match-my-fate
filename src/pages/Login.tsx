
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "로그인 실패",
          description: error.message,
        });
        return;
      }

      toast({
        title: "로그인 성공",
        description: "환영합니다!",
      });
      
      navigate("/application");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "오류",
        description: "로그인 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/application`
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "구글 로그인 실패",
          description: error.message,
        });
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        variant: "destructive",
        title: "오류",
        description: "구글 로그인 중 오류가 발생했습니다.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rosegold-50 to-bluegray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 rounded-full gradient-rosegold flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold text-gradient">마침</span>
          </div>
          <CardTitle className="text-2xl text-bluegray-800">
            다시 만나서 반가워요
          </CardTitle>
          <p className="text-bluegray-600">계정에 로그인하여 매칭을 계속하세요</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-bluegray-700 mb-2">
                이메일
              </label>
              <Input
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-rosegold-200 focus:border-rosegold-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-bluegray-700 mb-2">
                비밀번호
              </label>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-rosegold-200 focus:border-rosegold-400"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-rosegold-500 hover:bg-rosegold-600 text-white py-3"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>
          
          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-rosegold-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-bluegray-500">또는</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full border-rosegold-200 hover:bg-rosegold-50 py-3"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isGoogleLoading ? "구글 로그인 중..." : "구글로 로그인"}
            </Button>
          </div>
          
          <div className="mt-6 text-center space-y-4">
            <Link 
              to="/forgot-password" 
              className="text-rosegold-600 hover:text-rosegold-700 text-sm"
            >
              비밀번호를 잊으셨나요?
            </Link>
            
            <div className="border-t border-rosegold-100 pt-4">
              <p className="text-bluegray-600 text-sm">
                아직 계정이 없으신가요?{" "}
                <Link 
                  to="/signup" 
                  className="text-rosegold-600 hover:text-rosegold-700 font-medium"
                >
                  회원가입하기
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
