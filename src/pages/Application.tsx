
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Heart, ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

const Application = () => {
  const [formData, setFormData] = useState({
    // 기본 정보
    name: "",
    gender: "",
    birthDate: undefined as Date | undefined,
    residence: "",
    hometown: "",
    contact: "",
    
    // 배경 정보
    occupation: "",
    company: "",
    education: "",
    school: "",
    height: "",
    mbti: "",
    
    // 생활 습관 및 가치관
    smoking: "",
    drinking: "",
    religion: "",
    maritalStatus: "",
    hobbies: "",
    
    // 이상형 조건
    idealAgeMin: "",
    idealAgeMax: "",
    personalityKeywords: [] as string[],
    idealReligion: "",
    preferredConditions: "",
    avoidConditions: "",
    allowedMaritalStatus: "",
    appearanceConditions: "",
    occupationConditions: "",
    idealMbti: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
    alert("신청이 완료되었습니다! 관리자가 검토 후 매칭을 제안해드릴 예정입니다.");
  };

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePersonalityKeywordChange = (keyword: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      personalityKeywords: checked 
        ? [...prev.personalityKeywords, keyword]
        : prev.personalityKeywords.filter(k => k !== keyword)
    }));
  };

  const personalityOptions = [
    "유머러스한", "진지한", "활발한", "차분한", "외향적인", "내향적인",
    "로맨틱한", "현실적인", "감성적인", "이성적인", "적극적인", "소극적인"
  ];

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
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. 기본 정보 */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-bluegray-800 border-b border-rosegold-200 pb-2">
                    1. 기본 정보
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        이름 *
                      </label>
                      <Input
                        placeholder="이름을 입력하세요"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
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
                        생년월일 *
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal border-rosegold-200 focus:border-rosegold-400",
                              !formData.birthDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.birthDate ? format(formData.birthDate, "PPP") : "생년월일을 선택하세요"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.birthDate}
                            onSelect={(date) => handleInputChange("birthDate", date)}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        거주지 (시/군/구) *
                      </label>
                      <Input
                        placeholder="예: 서울 강남구"
                        value={formData.residence}
                        onChange={(e) => handleInputChange("residence", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        출신 지역 (시)
                      </label>
                      <Input
                        placeholder="예: 부산시"
                        value={formData.hometown}
                        onChange={(e) => handleInputChange("hometown", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        연락처 *
                      </label>
                      <Input
                        placeholder="010-0000-0000"
                        value={formData.contact}
                        onChange={(e) => handleInputChange("contact", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. 배경 정보 */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-bluegray-800 border-b border-rosegold-200 pb-2">
                    2. 배경 정보
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        회사명
                      </label>
                      <Input
                        placeholder="회사명을 입력하세요"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        최종 학력 *
                      </label>
                      <Select onValueChange={(value) => handleInputChange("education", value)} required>
                        <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                          <SelectValue placeholder="학력을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">고등학교 졸업</SelectItem>
                          <SelectItem value="college">대학교 졸업</SelectItem>
                          <SelectItem value="master">석사</SelectItem>
                          <SelectItem value="doctorate">박사</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        출신 학교
                      </label>
                      <Input
                        placeholder="출신 학교를 입력하세요"
                        value={formData.school}
                        onChange={(e) => handleInputChange("school", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        키 (cm) *
                      </label>
                      <Input
                        type="number"
                        placeholder="예: 170"
                        value={formData.height}
                        onChange={(e) => handleInputChange("height", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        MBTI
                      </label>
                      <Input
                        placeholder="예: ENFP"
                        value={formData.mbti}
                        onChange={(e) => handleInputChange("mbti", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. 생활 습관 및 가치관 */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-bluegray-800 border-b border-rosegold-200 pb-2">
                    3. 생활 습관 및 가치관
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        흡연 여부 *
                      </label>
                      <Select onValueChange={(value) => handleInputChange("smoking", value)} required>
                        <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                          <SelectValue placeholder="흡연 여부를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smoker">흡연</SelectItem>
                          <SelectItem value="non-smoker">비흡연</SelectItem>
                          <SelectItem value="occasional">간헐적</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        음주 여부 *
                      </label>
                      <Select onValueChange={(value) => handleInputChange("drinking", value)} required>
                        <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                          <SelectValue placeholder="음주 여부를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="often">자주</SelectItem>
                          <SelectItem value="sometimes">가끔</SelectItem>
                          <SelectItem value="rarely">거의 안 함</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        종교
                      </label>
                      <Select onValueChange={(value) => handleInputChange("religion", value)}>
                        <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                          <SelectValue placeholder="종교를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="christian">기독교</SelectItem>
                          <SelectItem value="catholic">천주교</SelectItem>
                          <SelectItem value="buddhist">불교</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        결혼 경험 *
                      </label>
                      <Select onValueChange={(value) => handleInputChange("maritalStatus", value)} required>
                        <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                          <SelectValue placeholder="결혼 경험을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">미혼</SelectItem>
                          <SelectItem value="divorced-no-children">돌싱-자녀 없음</SelectItem>
                          <SelectItem value="divorced-with-children">돌싱-자녀 있음</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      취미
                    </label>
                    <Textarea
                      placeholder="취미나 관심사를 자유롭게 적어주세요"
                      value={formData.hobbies}
                      onChange={(e) => handleInputChange("hobbies", e.target.value)}
                      className="border-rosegold-200 focus:border-rosegold-400 min-h-20"
                    />
                  </div>
                </div>

                {/* 4. 이상형 조건 설정 */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-bluegray-800 border-b border-rosegold-200 pb-2">
                    4. 이상형 조건 설정
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        희망 나이대 (최소)
                      </label>
                      <Input
                        type="number"
                        placeholder="예: 25"
                        value={formData.idealAgeMin}
                        onChange={(e) => handleInputChange("idealAgeMin", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        희망 나이대 (최대)
                      </label>
                      <Input
                        type="number"
                        placeholder="예: 35"
                        value={formData.idealAgeMax}
                        onChange={(e) => handleInputChange("idealAgeMax", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-4">
                      성격 키워드 (다중 선택 가능)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {personalityOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={option}
                            checked={formData.personalityKeywords.includes(option)}
                            onCheckedChange={(checked) => 
                              handlePersonalityKeywordChange(option, checked as boolean)
                            }
                          />
                          <label htmlFor={option} className="text-sm text-bluegray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      희망 종교
                    </label>
                    <Select onValueChange={(value) => handleInputChange("idealReligion", value)}>
                      <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                        <SelectValue placeholder="희망 종교를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-preference">상관없음</SelectItem>
                        <SelectItem value="christian">기독교</SelectItem>
                        <SelectItem value="catholic">천주교</SelectItem>
                        <SelectItem value="buddhist">불교</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        선호 조건
                      </label>
                      <Textarea
                        placeholder="원하는 조건들을 자유롭게 적어주세요"
                        value={formData.preferredConditions}
                        onChange={(e) => handleInputChange("preferredConditions", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400 min-h-20"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        피하고 싶은 조건
                      </label>
                      <Textarea
                        placeholder="피하고 싶은 조건들을 자유롭게 적어주세요"
                        value={formData.avoidConditions}
                        onChange={(e) => handleInputChange("avoidConditions", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400 min-h-20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      결혼 경험 허용 범위
                    </label>
                    <Select onValueChange={(value) => handleInputChange("allowedMaritalStatus", value)}>
                      <SelectTrigger className="border-rosegold-200 focus:border-rosegold-400">
                        <SelectValue placeholder="허용 가능한 결혼 경험을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-only">미혼만</SelectItem>
                        <SelectItem value="divorced-no-children">자녀 없는 돌싱까지</SelectItem>
                        <SelectItem value="divorced-with-children">자녀 있는 돌싱까지</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        외모 및 키 조건
                      </label>
                      <Textarea
                        placeholder="외모나 키에 대한 선호사항을 적어주세요"
                        value={formData.appearanceConditions}
                        onChange={(e) => handleInputChange("appearanceConditions", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400 min-h-20"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bluegray-700 mb-2">
                        직업/환경 조건
                      </label>
                      <Textarea
                        placeholder="직업이나 환경에 대한 선호사항을 적어주세요"
                        value={formData.occupationConditions}
                        onChange={(e) => handleInputChange("occupationConditions", e.target.value)}
                        className="border-rosegold-200 focus:border-rosegold-400 min-h-20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bluegray-700 mb-2">
                      희망 MBTI
                    </label>
                    <Input
                      placeholder="예: ENFP, INTJ 등"
                      value={formData.idealMbti}
                      onChange={(e) => handleInputChange("idealMbti", e.target.value)}
                      className="border-rosegold-200 focus:border-rosegold-400"
                    />
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
