"use client";

import {
  CircleUserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMe } from "@/features/auth/hooks/use-me";

import {
  MobileSidebar,
} from "./mobile-sidebar";
import { ThemeToggle } from "./theme-toggle";

export function AppHeader() {
  const admin = useMe();
  const initials = admin.data?.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

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
        <Popover>
          <PopoverTrigger
            aria-label="View administrator profile"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              />
            }
          >
            {initials || (
              <CircleUserRound
                aria-hidden="true"
                className="size-5"
              />
            )}
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8} className="w-80 p-4">
            <PopoverHeader>
              <PopoverTitle>Administrator profile</PopoverTitle>
              <PopoverDescription>
                Account information from your current session.
              </PopoverDescription>
            </PopoverHeader>

            {admin.isPending ? (
              <p className="py-2 text-sm text-muted-foreground" role="status">
                Loading administrator information...
              </p>
            ) : admin.isError || !admin.data ? (
              <div className="space-y-2 py-2">
                <p className="text-sm text-destructive" role="alert">
                  Unable to load administrator information.
                </p>
                <Button
                  disabled={admin.isFetching}
                  onClick={() => void admin.refetch()}
                  size="sm"
                  variant="outline"
                >
                  {admin.isFetching ? "Retrying..." : "Try again"}
                </Button>
              </div>
            ) : (
              <dl className="space-y-3 py-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Name</dt>
                  <dd className="font-medium">{admin.data.name}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="break-all font-medium">{admin.data.email}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Role</dt>
                  <dd className="font-medium capitalize">
                    {admin.data.role}
                  </dd>
                </div>
              </dl>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}