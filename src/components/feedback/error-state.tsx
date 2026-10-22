import {
  AlertCircle,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this information.",
  onRetry,
}: ErrorStateProps) {
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
          bg-destructive/10
          text-destructive
        "
      >
        <AlertCircle className="size-6" />
      </div>

      <h3 className="font-semibold">
        {title}
      </h3>

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

      {onRetry && (
        <Button
          variant="outline"
          className="mt-4"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}