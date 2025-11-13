import { Card } from "@/components/ui/card";

export default function Instructions() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How to use this calculator?</h2>
        <ol className="space-y-3 list-decimal list-inside text-base">
          <li>Enter the total length of the video in hours, minutes, and seconds.</li>
          <li>Specify the playback speed for which you want to calculate the total time (e.g. 2, 1.75, 1.5, 1.25, or 0.5).</li>
          <li>See the calculated time. Additionally, in the "Time Saved" field, you can also see how much time you can gain or lose while watching the video or listening to the podcast at given speed.</li>
        </ol>
      </section>

      {/* Math Formula */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Math formula</h2>
        
        <div className="bg-muted rounded-md p-4 font-mono text-sm">
          <p className="font-semibold mb-2">Total time in seconds = [(Hours × 3600) + (Minutes × 60) + Seconds] / Playback Speed</p>
        </div>

        <div className="space-y-3 text-base">
          <p className="font-semibold">Example: If I watch one hour long video on 1.5 speed, how much time will it take?</p>
          
          <p>1 hour is equal to 3600 seconds, so:</p>
          
          <div className="space-y-2 pl-4 border-l-2 border-primary/30">
            <p className="font-mono"><span className="font-semibold">Total time in seconds</span> = 3600 / 1.5</p>
            <p className="font-mono"><span className="font-semibold">Total time in seconds</span> = 2400</p>
          </div>
          
          <p>To calculate the total time in minutes, divide it by 60:</p>
          
          <div className="pl-4 border-l-2 border-primary/30">
            <p className="font-mono"><span className="font-semibold">Total time in minutes</span> = 2400 / 60 = 40 minutes</p>
          </div>
          
          <p className="font-semibold text-primary">Answer: Watching 1 hour video at 1.5 speed should take 40 minutes</p>
        </div>
      </section>
    </div>
  );
}
