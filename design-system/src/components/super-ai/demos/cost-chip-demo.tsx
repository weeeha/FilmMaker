import { CostChip } from "@/components/super-ai/cost-chip";
export default function CostChipDemo() {
  return (
    <div className="flex gap-2">
      <CostChip amount={17} />
      <CostChip amount={900} unit="credits/min" />
    </div>
  );
}
