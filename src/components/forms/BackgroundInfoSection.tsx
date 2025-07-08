
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BackgroundInfoSectionProps {
  formData: {
    occupation: string;
    company: string;
    education: string;
    school: string;
    height: string;
    mbti: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const BackgroundInfoSection = ({ formData, onInputChange }: BackgroundInfoSectionProps) => {
  return (
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
            onChange={(e) => onInputChange("occupation", e.target.value)}
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
            onChange={(e) => onInputChange("company", e.target.value)}
            className="border-rosegold-200 focus:border-rosegold-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-bluegray-700 mb-2">
            최종 학력 *
          </label>
          <Select onValueChange={(value) => onInputChange("education", value)} required>
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
            onChange={(e) => onInputChange("school", e.target.value)}
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
            onChange={(e) => onInputChange("height", e.target.value)}
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
            onChange={(e) => onInputChange("mbti", e.target.value)}
            className="border-rosegold-200 focus:border-rosegold-400"
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundInfoSection;
