"use client";
import { ChoiceChip, ChoiceChips } from "@/components/super-ai/choice-chips";
export default function ChoiceChipsDemo() {
  return (
    <ChoiceChips defaultValue="4" aria-label="Number of images">
      {["1", "2", "3", "4"].map((n) => (
        <ChoiceChip key={n} value={n}>
          {n}
        </ChoiceChip>
      ))}
    </ChoiceChips>
  );
}
