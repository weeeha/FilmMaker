"use client";
import { AddFilterChip, FilterBar, FilterChip, FiltersButton } from "@/components/super-ai/filter-bar";
export default function FilterBarDemo() {
  return (
    <FilterBar>
      <FilterChip active onRemove={() => {}}>
        Genre
      </FilterChip>
      <FilterChip>Instrument</FilterChip>
      <FilterChip>Mood</FilterChip>
      <AddFilterChip>Owner</AddFilterChip>
      <FiltersButton />
    </FilterBar>
  );
}
