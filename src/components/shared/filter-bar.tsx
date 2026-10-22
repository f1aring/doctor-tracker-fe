import type {
  ReactNode,
} from "react";

interface FilterBarProps {
  children: ReactNode;
}

export function FilterBar({
  children,
}: FilterBarProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-3
        rounded-xl
        border
        bg-card
        p-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {children}
    </div>
  );
}