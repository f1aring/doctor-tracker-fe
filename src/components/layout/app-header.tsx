"use client";

import {
  Search,
  Bell,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  MobileSidebar,
} from "./mobile-sidebar";
import { ThemeToggle } from "./theme-toggle";

export function AppHeader() {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-16
        items-center
        justify-between
        gap-4
        border-b
        bg-background/95
        px-4
        backdrop-blur
        md:px-6
      "
    >
      <div className="flex items-center gap-3">
        <MobileSidebar />

        <div className="hidden md:block">
          <h2 className="text-sm font-medium">
            Administration Portal
          </h2>

          <p className="text-xs text-muted-foreground">
            Manage doctors and patients
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <div
          className="
            relative
            hidden
            w-64
            md:block
          "
        >
          <Search
            className="
              absolute
              left-3
              top-1/2
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            placeholder="Search..."
            className="pl-9"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Open notifications"
        >
          <Bell aria-hidden="true" className="size-5" />

          <span
            className="
              absolute
              right-2
              top-2
              size-2
              rounded-full
              bg-destructive
            "
          />
        </Button>

        <div
          className="
            flex
            size-9
            items-center
            justify-center
            rounded-full
            bg-primary
            text-sm
            font-semibold
            text-primary-foreground
          "
        >
          A
        </div>
      </div>
    </header>
  );
}