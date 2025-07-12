
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // 이미 로그인된 사용자는 자동으로 application 페이지로 리다이렉트
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/application');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/application`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        console.error("Google OAuth error:", error);
        toast({
          variant: "destructive",
          title: "구글 회원가입 실패",
          description: error.message,
        });
      }
    } catch (error) {
      console.error("Google signup error:", error);
      toast({
        variant: "destructive",
        title: "오류",
        description: "구글 회원가입 중 오류가 발생했습니다.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rosegold-50 to-bluegray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 rounded-full gradient-rosegold flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold text-gradient">마침</span>
          </div>
          <CardTitle className="text-2xl text-bluegray-800">
            특별한 인연을 시작하세요
          </CardTitle>
          <p className="text-bluegray-600">회원가입 후 본인인증을 완료하시면 매칭을 받을 수 있어요</p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-bluegray-600">
                구글 계정으로 간편하게 가입하세요
              </p>
              
              <Button
                onClick={handleGoogleSignup}
                disabled={isGoogleLoading}
                className="w-full bg-white hover:bg-gray-50 text-bluegray-700 border border-rosegold-200 shadow-elegant flex items-center justify-center space-x-3 py-3"
              >
                {isGoogleLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rosegold-500"></div>
                    <span>구글 계정으로 가입 중...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>구글 계정으로 가입하기</span>
                  </>
                )}
              </Button>
            </div>
            
            <div className="text-center text-sm text-bluegray-500 bg-bluegray-50 p-4 rounded-lg border border-rosegold-100">
              <p className="mb-2 font-medium">서비스 이용 안내</p>
              <p>구글 계정으로 가입하시면 자동으로 이용약관 및 개인정보처리방침에 동의하신 것으로 간주됩니다.</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-bluegray-600 text-sm">
              이미 계정이 있으신가요?{" "}
              <Link 
                to="/login" 
                className="text-rosegold-600 hover:text-rosegold-700 font-medium"
              >
                로그인하기
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
