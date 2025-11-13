import Calculator from "@/components/Calculator";
import Instructions from "@/components/Instructions";
import ExamplesTable from "@/components/ExamplesTable";
import Layout from "@/components/Layout";

export default function PlaybackSpeedCalculator() {
  return (
    <Layout showBackButton title="Playback Speed Calculator">
      <div className="bg-background">
        {/* Header */}
        <header className="py-8 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-2">
            <h1 className="text-3xl font-bold">Playback Speed Calculator</h1>
            <p className="text-base text-muted-foreground">
              Calculate the video or podcast length with the given playback speed.
            </p>
          </div>
        </header>

        {/* Calculator Section */}
        <section className="py-6 px-4">
          <Calculator />
        </section>

        {/* Instructions Section */}
        <section className="py-8 px-4">
          <Instructions />
        </section>

        {/* Examples Section */}
        <section className="py-8 px-4">
          <ExamplesTable />
        </section>
      </div>
    </Layout>
  );
}
