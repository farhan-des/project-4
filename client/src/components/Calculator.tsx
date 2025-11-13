import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calculatePlaybackTime, formatTime } from "@/lib/calculations";
import { Clock, Zap } from "lucide-react";

const PRESET_SPEEDS = [0.5, 0.75, 1.25, 1.5, 1.75, 2, 2.25];

export default function Calculator() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.5);

  const result = calculatePlaybackTime({ hours, minutes, seconds, playbackSpeed });
  const hasInput = hours > 0 || minutes > 0 || seconds > 0;

  const handleNumberInput = (
    value: string,
    setter: (val: number) => void,
    max: number
  ) => {
    const num = value === "" ? 0 : parseInt(value, 10);
    if (!isNaN(num) && num >= 0 && num <= max) {
      setter(num);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8 border shadow-lg">
      <div className="space-y-6">
        {/* Time Input Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Time</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hours" className="text-sm font-medium">
                Hours
              </Label>
              <Input
                id="hours"
                type="number"
                min="0"
                max="999"
                value={hours || ""}
                onChange={(e) => handleNumberInput(e.target.value, setHours, 999)}
                className="text-center tabular-nums p-3"
                placeholder="0"
                data-testid="input-hours"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="minutes" className="text-sm font-medium">
                Minutes
              </Label>
              <Input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={minutes || ""}
                onChange={(e) => handleNumberInput(e.target.value, setMinutes, 59)}
                className="text-center tabular-nums p-3"
                placeholder="0"
                data-testid="input-minutes"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seconds" className="text-sm font-medium">
                Seconds
              </Label>
              <Input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={seconds || ""}
                onChange={(e) => handleNumberInput(e.target.value, setSeconds, 59)}
                className="text-center tabular-nums p-3"
                placeholder="0"
                data-testid="input-seconds"
              />
            </div>
          </div>
        </div>

        {/* Playback Speed Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Playback Speed</h2>
          </div>
          
          <div className="space-y-3">
            <Input
              id="playback-speed"
              type="number"
              min="0.1"
              max="10"
              step="0.25"
              value={playbackSpeed}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && val >= 0.1 && val <= 10) {
                  setPlaybackSpeed(val);
                }
              }}
              className="max-w-xs tabular-nums p-3"
              data-testid="input-playback-speed"
            />
            
            <div className="flex flex-wrap gap-2">
              {PRESET_SPEEDS.map((speed) => (
                <Button
                  key={speed}
                  variant={playbackSpeed === speed ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setPlaybackSpeed(speed)}
                  className="tabular-nums"
                  data-testid={`button-preset-${speed}`}
                >
                  {speed}x
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {hasInput && (
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Calculated Time
              </Label>
              <div className="bg-muted rounded-lg p-6">
                <div className="text-3xl font-semibold tabular-nums font-mono" data-testid="text-calculated-time">
                  {formatTime(result.calculatedHours, result.calculatedMinutes, result.calculatedSeconds)}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Time Saved
              </Label>
              <div className="bg-muted rounded-lg p-6">
                <div 
                  className={`text-3xl font-semibold tabular-nums font-mono ${
                    result.timeSavedSeconds >= 0 ? 'text-green-600 dark:text-green-400' : 'text-destructive'
                  }`}
                  data-testid="text-time-saved"
                >
                  {result.timeSavedFormatted}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {result.timeSavedSeconds >= 0 
                    ? 'Time saved at this speed' 
                    : 'Additional time needed'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
