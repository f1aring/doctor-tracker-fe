"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  Stethoscope,
} from "lucide-react";

import {
  NAVIGATION_ITEMS,
} from "@/constants/navigation";

import {
  cn,
} from "@/lib/utils";

import {
  Button,
} from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open navigation"
        render={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
          />
        }
      >
        <Menu aria-hidden="true" className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 p-0"
      >
        <SheetHeader
          className="
            border-b
            px-5
            py-4
          "
        >
          <SheetTitle
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                size-9
                items-center
                justify-center
                rounded-lg
                bg-primary
                text-primary-foreground
              "
            >
              <Stethoscope className="size-5" />
            </div>

            Doctor Tracker
          </SheetTitle>
        </SheetHeader>

        <nav
          className="
            flex
            flex-col
            gap-1
            p-4
          "
        >
          {NAVIGATION_ITEMS.map(
            (item) => {
              const Icon = item.icon;

              const isActive =
                pathname ===
                  item.href ||
                pathname.startsWith(
                  `${item.href}/`
                );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={
                    isActive ? "page" : undefined
                  }
                  onClick={() => setOpen(false)}
                  className={cn(
                    `
                      flex
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-sm
                      font-medium
                    `,
                    isActive
                      ? `
                        bg-accent
                        text-accent-foreground
                      `
                      : `
                        text-muted-foreground
                        hover:bg-accent
                      `
                  )}
                >
                  <Icon className="size-4" />

                  {item.title}
                </Link>
              );
            }
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}