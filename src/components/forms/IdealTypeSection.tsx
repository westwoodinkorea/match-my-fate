
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface IdealTypeSectionProps {
  formData: {
    idealAgeMin: string;
    idealAgeMax: string;
    personalityKeywords: string[];
    idealReligion: string;
    preferredConditions: string;
    avoidConditions: string;
    allowedMaritalStatus: string;
    appearanceConditions: string;
    occupationConditions: string;
    idealMbti: string;
  };
  onInputChange: (field: string, value: string) => void;
  onPersonalityKeywordChange: (keyword: string, checked: boolean) => void;
}

const IdealTypeSection = ({ formData, onInputChange, onPersonalityKeywordChange }: IdealTypeSectionProps) => {
  const personalityOptions = [
    "유머러스한", "진지한", "활발한", "차분한", "외향적인", "내향적인",
    "로맨틱한", "현실적인", "감성적인", "이성적인", "적극적인", "소극적인"
  ];

  return (
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
            onChange={(e) => onInputChange("idealAgeMin", e.target.value)}
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
            onChange={(e) => onInputChange("idealAgeMax", e.target.value)}
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
                  onPersonalityKeywordChange(option, checked as boolean)
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
        <Select onValueChange={(value) => onInputChange("idealReligion", value)}>
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
            onChange={(e) => onInputChange("preferredConditions", e.target.value)}
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
            onChange={(e) => onInputChange("avoidConditions", e.target.value)}
            className="border-rosegold-200 focus:border-rosegold-400 min-h-20"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-bluegray-700 mb-2">
          결혼 경험 허용 범위
        </label>
        <Select onValueChange={(value) => onInputChange("allowedMaritalStatus", value)}>
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
            onChange={(e) => onInputChange("appearanceConditions", e.target.value)}
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
            onChange={(e) => onInputChange("occupationConditions", e.target.value)}
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
          onChange={(e) => onInputChange("idealMbti", e.target.value)}
          className="border-rosegold-200 focus:border-rosegold-400"
        />
      </div>
    </div>
  );
};

export default IdealTypeSection;
