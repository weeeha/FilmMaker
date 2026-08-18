"use client";

import { Plus, SlidersHorizontal, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function FilterBar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="filter-bar" className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
  );
}

interface FilterChipProps extends React.ComponentProps<"button"> {
  active?: boolean;
  onRemove?: () => void;
}

function FilterChip({ active = false, onRemove, className, children, ...props }: FilterChipProps) {
  const label = typeof children === "string" ? children : "";
  return (
    <span
      data-slot="filter-chip"
      data-state={active ? "on" : "off"}
      className={cn(
        "inline-flex items-center rounded-full border text-sm transition-colors",
        active && "bg-secondary text-secondary-foreground",
        className,
      )}
    >
      <button
        type="button"
        aria-pressed={active}
        data-slot="filter-chip-toggle"
        className={cn(
          "hover:bg-accent inline-flex items-center gap-1 rounded-full px-3 py-1",
          onRemove && "pr-1",
        )}
        {...props}
      >
        {children}
      </button>
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${label} filter`.replace(/\s+/g, " ").trim()}
          data-slot="filter-chip-remove"
          onClick={onRemove}
          className="hover:text-foreground text-muted-foreground focus-visible:ring-ring mr-1 rounded-full p-0.5 focus-visible:ring-2 focus-visible:outline-none"
        >
          <X aria-hidden className="size-3" />
        </button>
      ) : null}
    </span>
  );
}

function AddFilterChip({ className, children, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-label={`Add ${typeof children === "string" ? children : "filter"}`}
      data-slot="add-filter-chip"
      className={cn(
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-1 rounded-full border border-dashed px-3 py-1 text-sm transition-colors",
        className,
      )}
      {...props}
    >
      <Plus aria-hidden className="size-3" />
      {children}
    </button>
  );
}

function FiltersButton({ className, children, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="filters-button"
      className={cn(
        "hover:bg-accent inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-sm transition-colors",
        className,
      )}
      {...props}
    >
      <SlidersHorizontal aria-hidden className="size-3.5" />
      {children ?? "Filters"}
    </button>
  );
}

export { AddFilterChip, FilterBar, FilterChip, FiltersButton };
