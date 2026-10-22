import {
  LoaderCircle,
} from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div
      className="
        flex
        min-h-64
        flex-col
        items-center
        justify-center
        gap-3
      "
    >
      <LoaderCircle
        className="
          size-6
          animate-spin
          text-primary
        "
      />

      <p
        className="
          text-sm
          text-muted-foreground
        "
      >
        {message}
      </p>
    </div>
  );
}