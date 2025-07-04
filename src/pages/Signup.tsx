
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-bluegray-700 mb-2">
                이름 *
              </label>
              <Input
                type="text"
                placeholder="실명을 입력하세요"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="border-rosegold-200 focus:border-rosegold-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-bluegray-700 mb-2">
                이메일 *
              </label>
              <Input
                type="email"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border-rosegold-200 focus:border-rosegold-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-bluegray-700 mb-2">
                연락처 *
              </label>
              <Input
                type="tel"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="border-rosegold-200 focus:border-rosegold-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-bluegray-700 mb-2">
                비밀번호 *
              </label>
              <Input
                type="password"
                placeholder="8자 이상 입력하세요"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="border-rosegold-200 focus:border-rosegold-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-bluegray-700 mb-2">
                비밀번호 확인 *
              </label>
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="border-rosegold-200 focus:border-rosegold-400"
                required
              />
            </div>
            
            <div className="space-y-4 pt-4 border-t border-rosegold-100">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", !!checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-bluegray-700">
                  <span className="text-rosegold-600 font-medium">[필수]</span> 이용약관에 동의합니다.
                </label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) => handleCheckboxChange("agreePrivacy", !!checked)}
                  className="mt-1"
                />
                <label htmlFor="privacy" className="text-sm text-bluegray-700">
                  <span className="text-rosegold-600 font-medium">[필수]</span> 개인정보처리방침에 동의합니다.
                </label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing"
                  checked={formData.agreeMarketing}
                  onCheckedChange={(checked) => handleCheckboxChange("agreeMarketing", !!checked)}
                  className="mt-1"
                />
                <label htmlFor="marketing" className="text-sm text-bluegray-700">
                  <span className="text-bluegray-500">[선택]</span> 마케팅 정보 수신에 동의합니다.
                </label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-rosegold-500 hover:bg-rosegold-600 text-white py-3"
              disabled={!formData.agreeTerms || !formData.agreePrivacy}
            >
              회원가입하기
            </Button>
          </form>
          
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
