"use client";
import { FieldRow, UnitInput } from "@/components/super-ai/field-row";
export default function FieldRowDemo() {
  return (
    <div className="w-80 space-y-3">
      <FieldRow label="Volume">{(id) => <UnitInput id={id} unit="%" defaultValue={100} />}</FieldRow>
      <FieldRow label="Speed" hint="Playback rate of the clip.">
        {(id, describedBy) => <UnitInput id={id} aria-describedby={describedBy} unit="x" defaultValue={1} />}
      </FieldRow>
    </div>
  );
}
