import {
  LayoutDashboard,
  Stethoscope,
  Users,
} from "lucide-react";

import { ROUTES } from "./routes";

export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Doctors",
    href: ROUTES.DOCTORS.ROOT,
    icon: Stethoscope,
  },
  {
    title: "Patients",
    href: ROUTES.PATIENTS.ROOT,
    icon: Users,
  },
] as const;