
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, CreditCard, Check, Shield } from "lucide-react";
import Header from "@/components/Header";

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // 실제 결제 로직은 여기에 구현
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rosegold-50 to-bluegray-50">
        <Header />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <Card className="shadow-elegant">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-bluegray-800 mb-4">
                  결제가 완료되었습니다!
                </h2>
                <p className="text-bluegray-600 mb-6">
                  매칭이 성사되었습니다. 곧 상대방의 연락처를 전달해드릴 예정입니다.
                </p>
                <div className="bg-rosegold-50 border border-rosegold-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-rosegold-800 mb-2">다음 단계</h3>
                  <ul className="text-sm text-rosegold-700 space-y-1">
                    <li>• 24시간 내 상대방 연락처 전달</li>
                    <li>• 첫 만남 장소 및 시간 조율 지원</li>
                    <li>• 만남 후 피드백 수집</li>
                  </ul>
                </div>
                <Button className="bg-rosegold-500 hover:bg-rosegold-600 text-white">
                  홈으로 돌아가기
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
              매칭 결제
            </h1>
            <p className="text-bluegray-600">
              매칭 서비스 이용을 위한 결제를 진행해주세요
            </p>
          </div>

          <div className="space-y-6">
            {/* 매칭 정보 */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg text-bluegray-800">매칭 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-rosegold-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full gradient-rosegold flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-bluegray-800">김** 님과의 매칭</h3>
                      <p className="text-sm text-bluegray-600">프리미엄 매칭 서비스</p>
                    </div>
                  </div>
                  <Badge className="bg-rosegold-100 text-rosegold-700">
                    매칭률 85%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* 결제 정보 */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg text-bluegray-800">결제 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-bluegray-700">매칭 서비스</span>
                  <span className="font-semibold text-bluegray-800">₩50,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-rosegold-100">
                  <span className="font-semibold text-bluegray-800">총 결제금액</span>
                  <span className="text-xl font-bold text-rosegold-600">₩50,000</span>
                </div>
              </CardContent>
            </Card>

            {/* 보안 안내 */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    안전한 결제 시스템으로 보호됩니다
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* 결제 버튼 */}
            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-rosegold-500 hover:bg-rosegold-600 text-white py-4 text-lg"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>결제 처리중...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>₩50,000 결제하기</span>
                </div>
              )}
            </Button>

            <p className="text-xs text-bluegray-500 text-center">
              결제 시 서비스 이용약관 및 개인정보처리방침에 동의한 것으로 간주됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
