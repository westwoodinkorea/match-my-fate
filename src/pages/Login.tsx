
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log("Login attempt:", { email, password });
    
    // 간단한 로그인 시뮬레이션 (실제로는 백엔드 API 호출)
    setTimeout(() => {
      setIsLoading(false);
      // 로그인 성공 시 프로필 등록 화면으로 이동
      navigate("/application");
    }, 1000);
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
