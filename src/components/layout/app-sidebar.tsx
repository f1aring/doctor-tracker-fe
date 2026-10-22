"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
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

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden
        w-64
        shrink-0
        border-r
        border-sidebar-border
        bg-sidebar
        lg:flex
        lg:flex-col
      "
    >
      <div
        className="
          flex
          h-16
          items-center
          gap-3
          border-b
          px-6
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

        <div>
          <p className="font-semibold">
            Doctor Tracker
          </p>

          <p className="text-xs text-muted-foreground">
            Admin Portal
          </p>
        </div>
      </div>

      <nav
        className="
          flex
          flex-1
          flex-col
          gap-1
          p-4
        "
      >
        {NAVIGATION_ITEMS.map(
          (item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(
                `${item.href}/`
              );

            return (
              <Link
                key={item.href}
                href={item.href}
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
                    transition-colors
                  `,
                  isActive
                    ? `
                      bg-sidebar-accent
                      text-sidebar-accent-foreground
                    `
                    : `
                      text-sidebar-foreground
                      hover:bg-sidebar-accent
                      hover:text-sidebar-accent-foreground
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

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="
            w-full
            justify-start
            gap-3
            text-muted-foreground
          "
        >
          <LogOut className="size-4" />

          Logout
        </Button>
      </div>
    </aside>
  );
}