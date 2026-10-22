import type {
  ReactNode,
} from "react";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <main
      className="
        flex-1
        overflow-y-auto
        p-4
        md:p-6
        lg:p-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
        "
      >
        {children}
      </div>
    </main>
  );
}