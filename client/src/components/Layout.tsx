import { Link } from "wouter";
import { Calculator, ChevronRight, BookOpen } from "lucide-react";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
}

export default function Layout({ children, showBackButton = false, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Site Branding and Breadcrumbs */}
      {showBackButton && (
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Site Logo/Name */}
                <Link href="/">
                  <a className="flex items-center gap-2 hover-elevate px-2 py-1 rounded-md transition-colors" data-testid="link-home">
                    <Calculator className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Calculator Tools</span>
                  </a>
                </Link>
                
                {/* Breadcrumb */}
                {title && (
                  <>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground" data-testid="text-breadcrumb">
                      {title}
                    </span>
                  </>
                )}
              </div>

              {/* Blog Link */}
              <a 
                href="/blog" 
                className="flex items-center gap-2 px-3 py-1.5 hover-elevate rounded-md transition-colors text-foreground"
                data-testid="link-blog"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Blog</span>
              </a>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
