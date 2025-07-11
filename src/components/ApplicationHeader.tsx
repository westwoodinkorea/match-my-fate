import { Heart } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface ApplicationHeaderProps {
  isEditMode: boolean;
}

const ApplicationHeader = ({ isEditMode }: ApplicationHeaderProps) => {
  return (
    <CardHeader className="text-center">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="w-10 h-10 rounded-full gradient-rosegold flex items-center justify-center">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <span className="text-3xl font-bold text-gradient">마침</span>
      </div>
      <CardTitle className="text-2xl text-bluegray-800">
        {isEditMode ? "내 정보 수정" : "소개팅 신청서"}
      </CardTitle>
      <p className="text-bluegray-600">
        {isEditMode 
          ? "정보를 수정하고 업데이트하세요" 
          : "정확한 매칭을 위해 상세한 정보를 입력해주세요"
        }
      </p>
    </CardHeader>
  );
};

export default ApplicationHeader;