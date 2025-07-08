
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MapPin, Briefcase, Calendar, GraduationCap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Matching = () => {
  const [currentMatch, setCurrentMatch] = useState(0);
  const [decision, setDecision] = useState<string | null>(null);

  // 샘플 매칭 데이터
  const matches = [
    {
      id: 1,
      name: "김**",
      age: 29,
      location: "서울 강남구",
      occupation: "IT 기업 마케터",
      education: "대학교 졸업",
      hobby: "영화감상, 카페투어",
      introduction: "새로운 사람들과의 만남을 좋아하는 긍정적인 성격입니다. 함께 맛있는 음식을 먹고 좋은 영화를 보며 즐거운 시간을 보내고 싶어요!",
      matchScore: 85,
      profileImage: "/placeholder.svg"
    }
  ];

  const currentMatchData = matches[currentMatch];

  const handleDecision = (choice: 'accept' | 'reject') => {
    setDecision(choice);
    if (choice === 'accept') {
      console.log("매칭 수락됨");
    } else {
      console.log("매칭 거절됨");
      // 다음 매칭으로 이동하는 로직 추가 가능
    }
  };

  if (decision === 'accept') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rosegold-50 to-bluegray-50">
        <Header />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <Card className="shadow-elegant">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full gradient-rosegold flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-bluegray-800 mb-4">
                  매칭이 성사되었습니다!
                </h2>
                <p className="text-bluegray-600 mb-8">
                  {currentMatchData.name}님과의 매칭을 위해 결제를 진행해주세요.
                </p>
                <div className="space-y-4">
                  <Link to="/payment">
                    <Button className="w-full bg-rosegold-500 hover:bg-rosegold-600 text-white py-3 text-lg">
                      결제하고 연결하기
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => setDecision(null)}
                    className="w-full border-rosegold-300 text-rosegold-700 hover:bg-rosegold-50"
                  >
                    다시 검토하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (decision === 'reject') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rosegold-50 to-bluegray-50">
        <Header />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <Card className="shadow-elegant">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-bluegray-100 flex items-center justify-center mx-auto mb-6">
                  <X className="w-8 h-8 text-bluegray-600" />
                </div>
                <h2 className="text-2xl font-bold text-bluegray-800 mb-4">
                  매칭을 거절하셨습니다
                </h2>
                <p className="text-bluegray-600 mb-8">
                  새로운 매칭 제안을 기다려주세요. 곧 더 적합한 상대를 찾아드릴게요!
                </p>
                <Button 
                  onClick={() => setDecision(null)}
                  className="bg-rosegold-500 hover:bg-rosegold-600 text-white"
                >
                  다른 매칭 보기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rosegold-50 to-bluegray-50">
      <Header />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-bluegray-800 mb-2">
              매칭 제안
            </h1>
            <p className="text-bluegray-600">
              관리자가 선별한 맞춤 상대를 확인해보세요
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-rosegold-200 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-rosegold-700">
                  {currentMatchData.name.charAt(0)}
                </span>
              </div>
              <CardTitle className="text-xl text-bluegray-800">
                {currentMatchData.name}
              </CardTitle>
              <div className="flex items-center justify-center space-x-2">
                <Badge variant="secondary" className="bg-rosegold-100 text-rosegold-700">
                  <Star className="w-3 h-3 mr-1" />
                  매칭률 {currentMatchData.matchScore}%
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-rosegold-600" />
                  <span className="text-sm text-bluegray-700">{currentMatchData.age}세</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-rosegold-600" />
                  <span className="text-sm text-bluegray-700">{currentMatchData.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-rosegold-600" />
                  <span className="text-sm text-bluegray-700">{currentMatchData.occupation}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-rosegold-600" />
                  <span className="text-sm text-bluegray-700">{currentMatchData.education}</span>
                </div>
              </div>

              {/* 취미 */}
              <div>
                <h3 className="font-semibold text-bluegray-800 mb-2">취미</h3>
                <p className="text-bluegray-600">{currentMatchData.hobby}</p>
              </div>

              {/* 소개 */}
              <div>
                <h3 className="font-semibold text-bluegray-800 mb-2">소개</h3>
                <p className="text-bluegray-600 leading-relaxed">
                  {currentMatchData.introduction}
                </p>
              </div>

              {/* 선택 버튼 */}
              <div className="flex space-x-4 pt-6">
                <Button 
                  variant="outline"
                  onClick={() => handleDecision('reject')}
                  className="flex-1 border-2 border-bluegray-300 text-bluegray-700 hover:bg-bluegray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  거절하기
                </Button>
                <Button 
                  onClick={() => handleDecision('accept')}
                  className="flex-1 bg-rosegold-500 hover:bg-rosegold-600 text-white"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  수락하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Matching;
