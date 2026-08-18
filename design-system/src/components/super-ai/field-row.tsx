"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface FieldRowProps extends Omit<React.ComponentProps<"div">, "children"> {
  label: string;
  hint?: string;
  children: (controlId: string, describedBy?: string) => React.ReactNode;
}

function FieldRow({ label, hint, className, children, ...props }: FieldRowProps) {
  const id = React.useId();
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div data-slot="field-row" className={cn("space-y-1", className)} {...props}>
      <div className="grid grid-cols-[6rem_1fr] items-center gap-3">
        <label htmlFor={id} data-slot="field-row-label" className="text-muted-foreground text-sm">
          {label}
        </label>
        <div data-slot="field-row-control" className="flex items-center gap-2">
          {children(id, hintId)}
        </div>
      </div>
      {hint ? (
        <p id={hintId} data-slot="field-row-hint" className="text-muted-foreground text-xs">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface UnitInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  unit: string;
  onValueChange?: (value: number) => void;
}

function UnitInput({ unit, onValueChange, onChange, className, ...props }: UnitInputProps) {
  return (
    <span
      data-slot="unit-input"
      className={cn(
        "border-input focus-within:ring-ring inline-flex h-8 w-20 items-center rounded-md border bg-transparent focus-within:ring-2",
        className,
      )}
    >
      <input
        type="number"
        inputMode="decimal"
        className="w-full min-w-0 bg-transparent px-2 py-1 text-right text-sm outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        onChange={(e) => {
          const n = e.target.valueAsNumber;
          if (!Number.isNaN(n)) onValueChange?.(n);
          onChange?.(e);
        }}
        {...props}
      />
      {/* TODO: click-to-focus the input from the unit suffix */}
      <span data-slot="unit-input-unit" className="text-muted-foreground pr-2 text-xs">
        {unit}
      </span>
    </span>
  );
}

export { FieldRow, UnitInput };
