"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  PatientGrowthInterval,
  PatientGrowthPeriod,
  PatientGrowthStat,
} from "../types/dashboard.types";

const periods: { value: PatientGrowthPeriod; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "6m", label: "Last 6 months" },
  { value: "1y", label: "Last year" },
  { value: "all", label: "All time" },
];

const intervals: { value: PatientGrowthInterval; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const periodValues = periods.map(({ value }) => value);
const intervalValues = intervals.map(({ value }) => value);

export function PatientGrowthChart({
  data,
  period,
  interval,
  onPeriodChange,
  onIntervalChange,
  isUpdating = false,
}: {
  data: PatientGrowthStat[];
  period: PatientGrowthPeriod;
  interval: PatientGrowthInterval;
  onPeriodChange: (period: PatientGrowthPeriod) => void;
  onIntervalChange: (interval: PatientGrowthInterval) => void;
  isUpdating?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Patient Growth</CardTitle>
          {isUpdating && (
            <p className="mt-1 text-xs text-muted-foreground" role="status">
              Updating chart...
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="space-y-1">
            <Label className="text-xs" htmlFor="growth-period">
              Date range
            </Label>
            <Select
              value={period}
              onValueChange={(value) => {
                if (periodValues.includes(value as PatientGrowthPeriod)) {
                  onPeriodChange(value as PatientGrowthPeriod);
                }
              }}
            >
              <SelectTrigger className="w-40" id="growth-period">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs" htmlFor="growth-interval">
              Group by
            </Label>
            <Select
              value={interval}
              onValueChange={(value) => {
                if (
                  intervalValues.includes(value as PatientGrowthInterval)
                ) {
                  onIntervalChange(value as PatientGrowthInterval);
                }
              }}
            >
              <SelectTrigger className="w-32" id="growth-interval">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {intervals.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            No growth data available.
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
