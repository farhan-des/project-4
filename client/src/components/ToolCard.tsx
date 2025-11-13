import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@shared/toolsRegistry";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;
  
  return (
    <Link href={tool.path}>
      <Card 
        className="p-6 hover-elevate cursor-pointer transition-all h-full flex flex-col"
        data-testid={`card-tool-${tool.id}`}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {tool.category}
          </Badge>
        </div>
        
        <h3 className="text-lg font-semibold mb-2" data-testid={`text-tool-name-${tool.id}`}>
          {tool.name}
        </h3>
        
        <p className="text-sm text-muted-foreground flex-1">
          {tool.description}
        </p>
      </Card>
    </Link>
  );
}
