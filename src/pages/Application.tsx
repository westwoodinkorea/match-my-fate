
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Application = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    location: "",
    occupation: "",
    education: "",
    hobby: "",
    idealAge: "",
    idealLocation: "",
    idealOccupation: "",
    introduction: "",
    meetingPurpose: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
    alert("신청이 완료되었습니다! 관리자가 검토 후 매칭을 제안해드릴 예정입니다.");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rosegold-50 to-bluegray-50">
      <Header />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full gradient-rosegold flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-3xl font-bold text-gradient">마침</span>
              </div>
              <CardTitle className="text-2xl text-bluegray-800">
                소개팅 신청서
              </CardTitle>
              <p className="text-bluegray-600">
                정확한 매칭을 위해 상세한 정보를 입력해주세요
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      나이 *
                    </label>
                    <Input
                      type="number"
                      placeholder="예: 28"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="border-rosegold-200 focus:border-rosegold-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      성별 *
                    </label>
                    <Select onValueChange={(value) => handleInputChange("gender", value)} required>
                      <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                        <SelectValue placeholder="성별을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">남성</SelectItem>
                        <SelectItem value="female">여성</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      거주지역 *
                    </label>
                    <Input
                      placeholder="예: 서울 강남구"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="border-rosegold-200 focus:border-rosegold-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      직업 *
                    </label>
                    <Input
                      placeholder="예: 회사원, 자영업 등"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                      className="border-rosegold-200 focus:border-rosegold-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      학력
                    </label>
                    <Select onValueChange={(value) => handleInputChange("education", value)}>
                      <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                        <SelectValue placeholder="학력을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">고등학교 졸업</SelectItem>
                        <SelectItem value="college">대학교 졸업</SelectItem>
                        <SelectItem value="graduate">대학원 졸업</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      취미
                    </label>
                    <Input
                      placeholder="예: 영화감상, 운동, 독서 등"
                      value={formData.hobby}
                      onChange={(e) => handleInputChange("hobby", e.target.value)}
                      className="border-rosegold-200 focus:border-rosegold-400"
                    />
                  </div>
                </div>

                {/* 이상형 조건 */}
                <div className="border-t border-rosegold-100 pt-6">
                  <h3 className="text-lg font-semibold text-bluegray-800 mb-4">이상형 조건</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        희망 나이대
                      </label>
                      <Input
                        placeholder="예: 25-35세"
                        value={formData.idealAge}
                        onChange={(e) => handleInputChange("idealAge", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        희망 지역
                      </label>
                      <Input
                        placeholder="예: 서울, 경기"
                        value={formData.idealLocation}
                        onChange={(e) => handleInputChange("idealLocation", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        희망 직업
                      </label>
                      <Input
                        placeholder="예: 전문직, 사무직 등"
                        value={formData.idealOccupation}
                        onChange={(e) => handleInputChange("idealOccupation", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 소개 및 만남 목적 */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      자기소개 *
                    </label>
                    <Textarea
                      placeholder="자신을 간단히 소개해주세요 (성격, 가치관 등)"
                      value={formData.introduction}
                      onChange={(e) => handleInputChange("introduction", e.target.value)}
                      className="border-rosegold-200 focus:border-rosegold-400 min-h-24"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      만남의 목적 *
                    </label>
                    <Select onValueChange={(value) => handleInputChange("meetingPurpose", value)} required>
                      <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                        <SelectValue placeholder="만남의 목적을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="serious">진지한 교제</SelectItem>
                        <SelectItem value="marriage">결혼 전제</SelectItem>
                        <SelectItem value="dating">소개팅</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-rosegold-500 hover:bg-rosegold-600 text-white py-3 text-lg"
                >
                  신청서 제출하기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Application;
