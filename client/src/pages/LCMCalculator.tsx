import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator } from "lucide-react";
import { calculateLCMWithMethods, parseNumberInput, type LCMResult } from "@/lib/lcmCalculations";

export default function LCMCalculator() {
  const [input, setInput] = useState("12, 18");
  const [result, setResult] = useState<LCMResult | null>(null);
  const [error, setError] = useState<string>("");
  const [activeMethod, setActiveMethod] = useState("prime");

  const handleCalculate = () => {
    try {
      setError("");
      const numbers = parseNumberInput(input);
      const lcmResult = calculateLCMWithMethods(numbers);
      setResult(lcmResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid input");
      setResult(null);
    }
  };

  const exampleCalculations = [
    { numbers: "9, 12", lcm: 36 },
    { numbers: "8, 14", lcm: 56 },
    { numbers: "9, 15", lcm: 45 },
    { numbers: "8, 12", lcm: 24 },
    { numbers: "6, 9", lcm: 18 },
    { numbers: "12, 15", lcm: 60 },
    { numbers: "8, 10", lcm: 40 },
    { numbers: "4, 6", lcm: 12 },
    { numbers: "10, 12", lcm: 60 },
    { numbers: "6, 12", lcm: 12 },
    { numbers: "15, 20", lcm: 60 },
    { numbers: "12, 18", lcm: 36 },
  ];

  return (
    <Layout showBackButton={true} title="LCM Calculator">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold" data-testid="heading-lcm-calculator">
              LCM Calculator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Enter numbers separated by commas to find their Least Common Multiple (LCM) using three different methods
          </p>
        </div>

        {/* Calculator Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Calculate LCM</CardTitle>
            <CardDescription>
              Enter two or more positive numbers separated by commas (e.g., 12, 18, 24)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input */}
            <div className="space-y-2">
              <label htmlFor="numbers-input" className="text-sm font-medium">
                Numbers
              </label>
              <Input
                id="numbers-input"
                type="text"
                placeholder="12, 18, 24"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                data-testid="input-numbers"
                className="text-lg"
              />
            </div>

            {/* Calculate Button */}
            <Button 
              onClick={handleCalculate}
              className="w-full"
              size="lg"
              data-testid="button-calculate"
            >
              Calculate LCM
            </Button>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive" data-testid="text-error">
                  {error}
                </p>
              </div>
            )}

            {/* Result */}
            {result && !error && (
              <div className="p-6 bg-primary/5 border-2 border-primary/20 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Least Common Multiple</p>
                  <p className="text-5xl font-bold text-primary" data-testid="text-lcm-result">
                    {result.lcm}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Methods and Step-by-Step Solutions */}
        {result && !error && (
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Solutions</CardTitle>
              <CardDescription>
                See how the LCM is calculated using three different methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeMethod} onValueChange={setActiveMethod}>
                <TabsList className="grid w-full grid-cols-3" data-testid="tabs-methods">
                  <TabsTrigger value="prime" data-testid="tab-prime-factorization">
                    Prime Factorization
                  </TabsTrigger>
                  <TabsTrigger value="division" data-testid="tab-division">
                    Division Method
                  </TabsTrigger>
                  <TabsTrigger value="multiples" data-testid="tab-multiples">
                    List of Multiples
                  </TabsTrigger>
                </TabsList>

                {/* Prime Factorization Method */}
                <TabsContent value="prime" className="space-y-6 mt-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Finding LCM by Prime Factorization</h3>
                    
                    {/* Step 1: Prime Factorizations */}
                    <div className="space-y-3 mb-6">
                      <p className="font-medium text-sm text-muted-foreground">Step 1: Find prime factors of each number</p>
                      {result.primeFactorization.factorizations.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 bg-muted/50 rounded">
                          <span className="font-semibold min-w-[60px]">{f.number} =</span>
                          <span>{f.factorString}</span>
                        </div>
                      ))}
                    </div>

                    {/* Step 2: Exponential Form */}
                    <div className="space-y-3 mb-6">
                      <p className="font-medium text-sm text-muted-foreground">Step 2: Write in exponential form</p>
                      {result.primeFactorization.factorizations.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 bg-muted/50 rounded">
                          <span className="font-semibold min-w-[60px]">{f.number} =</span>
                          <span dangerouslySetInnerHTML={{ __html: f.exponentialForm }} />
                        </div>
                      ))}
                    </div>

                    {/* Step 3: LCM Calculation */}
                    <div className="space-y-3">
                      <p className="font-medium text-sm text-muted-foreground">
                        Step 3: Multiply highest powers of all prime factors
                      </p>
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded">
                        <div className="space-y-2">
                          <div>
                            <span className="font-semibold">LCM = </span>
                            <span dangerouslySetInnerHTML={{ __html: result.primeFactorization.combinedFactors }} />
                          </div>
                          <div>
                            <span className="font-semibold">LCM = </span>
                            <span>{result.primeFactorization.calculation}</span>
                          </div>
                          <div className="text-xl font-bold text-primary">
                            LCM = {result.primeFactorization.lcm}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Division Method */}
                <TabsContent value="division" className="space-y-6 mt-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Finding LCM by Division Method</h3>
                    
                    {/* Step 1: Division Table */}
                    <div className="mb-6">
                      <p className="font-medium text-sm text-muted-foreground mb-3">
                        Step 1: Divide by prime numbers until all quotients are 1
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse" data-testid="table-division">
                          <tbody>
                            {result.divisionMethod.divisionTable.map((row, idx) => (
                              <tr key={idx} className="border-b">
                                <td className="border-r p-2 font-semibold bg-muted/30 text-center min-w-[60px]">
                                  {row.divisor}
                                </td>
                                {row.quotients.map((q, qIdx) => (
                                  <td key={qIdx} className="border-r p-2 text-center min-w-[60px]">
                                    {q}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Step 2: Multiply Divisors */}
                    <div className="mb-6">
                      <p className="font-medium text-sm text-muted-foreground mb-3">
                        Step 2: Multiply all divisors
                      </p>
                      <div className="p-3 bg-muted/50 rounded">
                        <span className="font-semibold">LCM = </span>
                        <span>{result.divisionMethod.divisorsProduct}</span>
                      </div>
                    </div>

                    {/* Step 3: Result */}
                    <div>
                      <p className="font-medium text-sm text-muted-foreground mb-3">Step 3: Result</p>
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded">
                        <div className="text-xl font-bold text-primary">
                          LCM = {result.divisionMethod.lcm}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* List of Multiples Method */}
                <TabsContent value="multiples" className="space-y-6 mt-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Finding LCM by List of Multiples</h3>
                    
                    {/* Step 1: List Multiples */}
                    <div className="mb-6">
                      <p className="font-medium text-sm text-muted-foreground mb-3">
                        Step 1: List multiples of each number
                      </p>
                      <div className="space-y-3">
                        {result.listMultiples.multiplesLists.map((list, idx) => (
                          <div key={idx} className="p-3 bg-muted/50 rounded">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold min-w-[140px]">
                                Multiples of {list.number}:
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {list.multiples.map((m, mIdx) => (
                                  <span 
                                    key={mIdx}
                                    className={`px-2 py-1 rounded ${
                                      m === result.lcm 
                                        ? 'bg-primary text-primary-foreground font-semibold' 
                                        : 'bg-background'
                                    }`}
                                  >
                                    {m}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Find Common Multiple */}
                    <div className="mb-6">
                      <p className="font-medium text-sm text-muted-foreground mb-3">
                        Step 2: Find the smallest common multiple
                      </p>
                      <div className="p-3 bg-muted/50 rounded">
                        <p>
                          The smallest number that appears in all lists is{" "}
                          <span className="font-semibold text-primary">{result.listMultiples.commonMultiple}</span>
                        </p>
                      </div>
                    </div>

                    {/* Step 3: Result */}
                    <div>
                      <p className="font-medium text-sm text-muted-foreground mb-3">Step 3: Result</p>
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded">
                        <div className="text-xl font-bold text-primary">
                          LCM = {result.listMultiples.lcm}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Examples Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>LCM Examples</CardTitle>
            <CardDescription>
              Common LCM calculations - click to try them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="table-examples">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Numbers</th>
                    <th className="text-left p-3 font-semibold">LCM</th>
                    <th className="text-left p-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleCalculations.map((example, idx) => (
                    <tr key={idx} className="border-b hover-elevate">
                      <td className="p-3">{example.numbers}</td>
                      <td className="p-3 font-semibold">{example.lcm}</td>
                      <td className="p-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setInput(example.numbers);
                            setTimeout(handleCalculate, 100);
                          }}
                          data-testid={`button-example-${idx}`}
                        >
                          Calculate
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What is LCM?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The Least Common Multiple (LCM) is the smallest positive number that is divisible by all given numbers without leaving a remainder.
            </p>
            <div className="p-4 bg-muted/50 rounded">
              <p className="font-medium mb-2">Example:</p>
              <p className="text-sm text-muted-foreground">
                The LCM of 4 and 6 is 12 because 12 is the smallest number that both 4 and 6 divide evenly into.
                (12 ÷ 4 = 3, and 12 ÷ 6 = 2)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
