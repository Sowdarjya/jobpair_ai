import { CheckCircle, AlertTriangle, Wrench } from "lucide-react";

type Section = {
  comment: string;
  score: number;
  whats_good: string[];
  needs_improvement: string[];
  tips_for_improvement: string[];
};

export default function SectionFeedback({ section }: { section: Section }) {
  return (
    <div className="p-4 space-y-4">
      <p className="text-gray-700">{section.comment}</p>

      {section.whats_good.length > 0 && (
        <div>
          <h4 className="font-semibold text-green-600 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            What’s Good
          </h4>
          <ul className="list-disc list-inside text-gray-700">
            {section.whats_good.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {section.needs_improvement.length > 0 && (
        <div>
          <h4 className="font-semibold text-yellow-600 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Needs Improvement
          </h4>
          <ul className="list-disc list-inside text-gray-700">
            {section.needs_improvement.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {section.tips_for_improvement.length > 0 && (
        <div>
          <h4 className="font-semibold text-blue-600 flex items-center">
            <Wrench className="w-5 h-5 mr-2" />
            Tips for Improvement
          </h4>
          <ul className="list-disc list-inside text-gray-700">
            {section.tips_for_improvement.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
