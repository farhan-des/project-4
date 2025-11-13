import { Clock, Calculator } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  icon: LucideIcon;
}

export const tools: Tool[] = [
  {
    id: 'playback-speed',
    name: 'Playback Speed Calculator',
    description: 'Calculate video/podcast duration at different playback speeds and see time saved',
    category: 'Time Calculators',
    path: '/playback-speed-calculator',
    icon: Clock,
  },
  {
    id: 'lcm-calculator',
    name: 'LCM Calculator',
    description: 'Find the Least Common Multiple of two or more numbers using three different methods',
    category: 'Math Calculators',
    path: '/lcm-calculator',
    icon: Calculator,
  },
  // Add more tools here - they will automatically appear on the homepage
];

export const categories = Array.from(new Set(tools.map(tool => tool.category)));

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(tool => tool.category === category);
}

export function getAllTools(): Tool[] {
  return tools;
}
