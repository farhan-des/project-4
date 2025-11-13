import { Card } from "@/components/ui/card";
import type { ExampleCalculation } from "@shared/schema";

const EXAMPLES: ExampleCalculation[] = [
  { time: "00:45:30", playbackSpeed: 1.5, calculatedTime: "00:30:20" },
  { time: "00:08:00", playbackSpeed: 1.25, calculatedTime: "00:06:24" },
  { time: "00:15:00", playbackSpeed: 0.75, calculatedTime: "00:20:00" },
  { time: "01:35:00", playbackSpeed: 2.25, calculatedTime: "00:42:13" },
  { time: "07:30:00", playbackSpeed: 1.5, calculatedTime: "05:00:00" },
];

export default function ExamplesTable() {
  return (
    <section className="max-w-4xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Examples</h2>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-semibold">Time</th>
              <th className="text-left p-3 font-semibold">Playback Speed</th>
              <th className="text-left p-3 font-semibold">Calculated Time</th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLES.map((example, index) => (
              <tr 
                key={index} 
                className="border-b last:border-0 hover-elevate"
                data-testid={`row-example-${index}`}
              >
                <td className="p-3 font-mono tabular-nums">{example.time}</td>
                <td className="p-3 tabular-nums">{example.playbackSpeed}x</td>
                <td className="p-3 font-mono tabular-nums font-semibold">{example.calculatedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {EXAMPLES.map((example, index) => (
          <Card key={index} className="p-4" data-testid={`card-example-${index}`}>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Original Time</span>
                <span className="font-mono tabular-nums font-semibold">{example.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Speed</span>
                <span className="tabular-nums">{example.playbackSpeed}x</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium text-muted-foreground">Calculated Time</span>
                <span className="font-mono tabular-nums font-semibold text-primary">{example.calculatedTime}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
