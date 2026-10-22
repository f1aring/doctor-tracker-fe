import type {
  LucideIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-sm
                font-medium
                text-muted-foreground
              "
            >
              {title}
            </p>

            <p
              className="
                mt-2
                text-3xl
                font-semibold
                tracking-tight
              "
            >
              {value}
            </p>

            {description && (
              <p
                className="
                  mt-1
                  text-xs
                  text-muted-foreground
                "
              >
                {description}
              </p>
            )}
          </div>

          <div
            className="
              flex
              size-10
              items-center
              justify-center
              rounded-lg
              bg-primary/10
              text-primary
            "
          >
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}