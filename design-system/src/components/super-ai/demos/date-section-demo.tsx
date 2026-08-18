import { DateSection } from "@/components/super-ai/date-section";
export default function DateSectionDemo() {
  return (
    <div className="w-64 space-y-3">
      <DateSection label="Today">
        <p className="px-2 text-sm">Brand video script</p>
      </DateSection>
      <DateSection label="Yesterday">
        <p className="px-2 text-sm">Logo explorations</p>
      </DateSection>
    </div>
  );
}
