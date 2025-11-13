import { Calculator, BookOpen } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import Footer from "@/components/Footer";
import { categories, getToolsByCategory } from "@shared/toolsRegistry";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Calculator Tools</span>
            </div>
            <a 
              href="/blog" 
              className="flex items-center gap-2 px-4 py-2 hover-elevate rounded-md transition-colors text-foreground"
              data-testid="link-blog"
            >
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Calculator Tools</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Calculators, tools, generators, resources.
          </p>
        </div>
      </header>

      {/* Tools Grid by Category */}
      <main className="flex-1 px-4 pb-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {categories.map((category) => {
            const categoryTools = getToolsByCategory(category);
            
            return (
              <section key={category} className="space-y-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold" data-testid={`heading-category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    {category}
                  </h2>
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
