import { Coins } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface CostChipProps extends React.ComponentProps<"span"> {
  amount: number | string;
  unit?: string;
}

function CostChip({ amount, unit = "credits", className, children, ...props }: CostChipProps) {
  return (
    <span
      data-slot="cost-chip"
      className={cn(
        "bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs",
        className,
      )}
      {...props}
    >
      <Coins aria-hidden className="size-3" />
      <span data-slot="cost-chip-amount" dir="ltr">
        {amount} {unit}
      </span>
      {children}
    </span>
  );
}

export { CostChip };
