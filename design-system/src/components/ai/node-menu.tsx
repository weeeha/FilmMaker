import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import type { ComponentProps } from "react";

export type NodeMenuProps = ComponentProps<"div">;

export const NodeMenu = ({ className, ...props }: NodeMenuProps) => (
  <div
    role="toolbar"
    className={cn(
      "inline-flex items-center gap-0.5 rounded-full border bg-background p-1 text-sm shadow-sm",
      className
    )}
    {...props}
  />
);

const nodeMenuButton =
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium whitespace-nowrap transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-muted [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

export type NodeMenuSelectProps = ComponentProps<typeof DropdownMenu>;

export const NodeMenuSelect = (props: NodeMenuSelectProps) => (
  <DropdownMenu {...props} />
);

export type NodeMenuSelectTriggerProps = ComponentProps<
  typeof DropdownMenuTrigger
> & {
  chevron?: boolean;
};

export const NodeMenuSelectTrigger = ({
  className,
  chevron = false,
  children,
  ...props
}: NodeMenuSelectTriggerProps) => (
  <DropdownMenuTrigger className={cn(nodeMenuButton, className)} {...props}>
    {children}
    {chevron && (
      <ChevronDownIcon aria-hidden className="size-3.5 text-muted-foreground" />
    )}
  </DropdownMenuTrigger>
);

export type NodeMenuSelectContentProps = ComponentProps<
  typeof DropdownMenuContent
> & {
  label?: string;
};

export const NodeMenuSelectContent = ({
  className,
  label,
  children,
  ...props
}: NodeMenuSelectContentProps) => (
  <DropdownMenuContent
    align="start"
    className={cn("min-w-28", className)}
    {...props}
  >
    {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
    {children}
  </DropdownMenuContent>
);

export type NodeMenuSelectGroupProps = ComponentProps<
  typeof DropdownMenuRadioGroup
>;

export const NodeMenuSelectGroup = (props: NodeMenuSelectGroupProps) => (
  <DropdownMenuRadioGroup {...props} />
);

export type NodeMenuSelectItemProps = ComponentProps<
  typeof DropdownMenuRadioItem
>;

export const NodeMenuSelectItem = (props: NodeMenuSelectItemProps) => (
  <DropdownMenuRadioItem {...props} />
);

export type NodeMenuModelSelectProps = ComponentProps<typeof Popover>;

export const NodeMenuModelSelect = (props: NodeMenuModelSelectProps) => (
  <Popover {...props} />
);

export type NodeMenuModelSelectTriggerProps = ComponentProps<
  typeof PopoverTrigger
>;

export const NodeMenuModelSelectTrigger = ({
  className,
  children,
  ...props
}: NodeMenuModelSelectTriggerProps) => (
  <PopoverTrigger
    className={cn(
      nodeMenuButton,
      "bg-secondary px-3 text-secondary-foreground",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDownIcon aria-hidden className="size-3.5 text-muted-foreground" />
  </PopoverTrigger>
);

export type NodeMenuModelSelectContentProps = ComponentProps<
  typeof PopoverContent
> & {
  filter?: ComponentProps<typeof Command>["filter"];
};

const substringFilter = (value: string, search: string) =>
  value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;

export const NodeMenuModelSelectContent = ({
  className,
  children,
  filter = substringFilter,
  ...props
}: NodeMenuModelSelectContentProps) => (
  <PopoverContent
    align="start"
    className={cn("w-80 p-0", className)}
    {...props}
  >
    <Command filter={filter}>{children}</Command>
  </PopoverContent>
);

export type NodeMenuModelSelectInputProps = ComponentProps<typeof CommandInput>;

export const NodeMenuModelSelectInput = (
  props: NodeMenuModelSelectInputProps
) => <CommandInput {...props} />;

export type NodeMenuModelSelectFiltersProps = ComponentProps<"div">;

export const NodeMenuModelSelectFilters = ({
  className,
  ...props
}: NodeMenuModelSelectFiltersProps) => (
  <div
    className={cn("flex flex-wrap gap-1.5 border-b p-2", className)}
    {...props}
  />
);

export type NodeMenuModelSelectFilterProps = ComponentProps<typeof Toggle>;

export const NodeMenuModelSelectFilter = ({
  className,
  ...props
}: NodeMenuModelSelectFilterProps) => (
  <Toggle
    size="sm"
    className={cn(
      "h-auto rounded-full border px-2.5 py-0.5 text-xs font-medium data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground",
      className
    )}
    {...props}
  />
);

export type NodeMenuModelSelectListProps = ComponentProps<typeof CommandList>;

export const NodeMenuModelSelectList = (
  props: NodeMenuModelSelectListProps
) => <CommandList {...props} />;

export type NodeMenuModelSelectEmptyProps = ComponentProps<typeof CommandEmpty>;

export const NodeMenuModelSelectEmpty = (
  props: NodeMenuModelSelectEmptyProps
) => <CommandEmpty {...props} />;

export type NodeMenuModelSelectGroupProps = ComponentProps<typeof CommandGroup>;

export const NodeMenuModelSelectGroup = (
  props: NodeMenuModelSelectGroupProps
) => <CommandGroup {...props} />;

export type NodeMenuModelSelectItemProps = ComponentProps<typeof CommandItem>;

export const NodeMenuModelSelectItem = ({
  className,
  ...props
}: NodeMenuModelSelectItemProps) => (
  <CommandItem
    className={cn("items-start gap-2.5 rounded-lg p-2", className)}
    {...props}
  />
);

export type NodeMenuModelSelectItemIconProps = ComponentProps<"span">;

export const NodeMenuModelSelectItemIcon = ({
  className,
  ...props
}: NodeMenuModelSelectItemIconProps) => (
  <span
    aria-hidden
    className={cn(
      "flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted [&_svg]:size-5",
      className
    )}
    {...props}
  />
);

export type NodeMenuToggleProps = ComponentProps<typeof Toggle>;

export const NodeMenuToggle = ({ className, ...props }: NodeMenuToggleProps) => (
  <Toggle
    className={cn(nodeMenuButton, "h-auto min-w-0 px-2", className)}
    {...props}
  />
);

export type NodeMenuActionProps = ComponentProps<"button">;

export const NodeMenuAction = ({
  className,
  ...props
}: NodeMenuActionProps) => (
  <button
    type="button"
    className={cn(
      nodeMenuButton,
      "px-2 text-muted-foreground hover:text-foreground",
      className
    )}
    {...props}
  />
);

export type NodeMenuSeparatorProps = ComponentProps<"div">;

export const NodeMenuSeparator = ({
  className,
  ...props
}: NodeMenuSeparatorProps) => (
  <div
    role="separator"
    aria-orientation="vertical"
    className={cn("mx-1 h-4 w-px bg-border", className)}
    {...props}
  />
);
