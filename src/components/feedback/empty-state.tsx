import type {
  LucideIcon,
} from "lucide-react";

import {
  FileQuestion,
} from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon: Icon = FileQuestion,
  action,
}: EmptyStateProps) {
  return (
    <div
      className="
        flex
        min-h-64
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-dashed
        bg-card
        p-8
        text-center
      "
    >
      <div
        className="
          mb-4
          flex
          size-12
          items-center
          justify-center
          rounded-full
          bg-muted
        "
      >
        <Icon
          className="
            size-6
            text-muted-foreground
          "
        />
      </div>

      <h3 className="font-semibold">
        {title}
      </h3>

      {description && (
        <p
          className="
            mt-1
            max-w-sm
            text-sm
            text-muted-foreground
          "
        >
          {description}
        </p>
      )}

      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}