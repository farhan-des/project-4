import { z } from "zod";

export const calculationInputSchema = z.object({
  hours: z.number().min(0).max(999),
  minutes: z.number().min(0).max(59),
  seconds: z.number().min(0).max(59),
  playbackSpeed: z.number().min(0.1).max(10),
});

export type CalculationInput = z.infer<typeof calculationInputSchema>;

export interface CalculationResult {
  calculatedHours: number;
  calculatedMinutes: number;
  calculatedSeconds: number;
  timeSavedSeconds: number;
  timeSavedFormatted: string;
}

export interface ExampleCalculation {
  time: string;
  playbackSpeed: number;
  calculatedTime: string;
}
