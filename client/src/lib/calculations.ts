import type { CalculationInput, CalculationResult } from "@shared/schema";

export function calculatePlaybackTime(input: CalculationInput): CalculationResult {
  const totalSeconds = input.hours * 3600 + input.minutes * 60 + input.seconds;
  const calculatedTotalSeconds = totalSeconds / input.playbackSpeed;
  
  const calculatedHours = Math.floor(calculatedTotalSeconds / 3600);
  const calculatedMinutes = Math.floor((calculatedTotalSeconds % 3600) / 60);
  const calculatedSeconds = Math.floor(calculatedTotalSeconds % 60);
  
  const timeSavedSeconds = totalSeconds - calculatedTotalSeconds;
  const timeSavedFormatted = formatTimeSaved(timeSavedSeconds);
  
  return {
    calculatedHours,
    calculatedMinutes,
    calculatedSeconds,
    timeSavedSeconds,
    timeSavedFormatted,
  };
}

function formatTimeSaved(seconds: number): string {
  const absSeconds = Math.abs(seconds);
  const hours = Math.floor(absSeconds / 3600);
  const minutes = Math.floor((absSeconds % 3600) / 60);
  const secs = Math.floor(absSeconds % 60);
  
  const sign = seconds >= 0 ? '+' : '-';
  return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function formatTime(hours: number, minutes: number, seconds: number): string {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
