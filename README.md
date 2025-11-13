# 🧮 Calculator Tools Website

A modern, responsive multi-tool calculator website featuring various utility calculators with automatic tool discovery. Built with React, TypeScript, and Vite.

## ✨ Features

- 🏠 **Automatic Tool Discovery** - New calculators automatically appear on the homepage
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🌐 **Multi-Language Support** - 8 languages with localStorage persistence
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎨 **Beautiful UI** - Clean design using Shadcn UI components
- 🔢 **Client-Side Calculations** - All calculations happen in the browser

## 🛠️ Current Calculators

### Time Calculators
- **Playback Speed Calculator** - Calculate video/podcast duration at different speeds with time saved indicators

### Math Calculators
- **LCM Calculator** - Find Least Common Multiple using three methods:
  - Prime Factorization
  - Division Method
  - List of Multiples

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the repository**
```bash
git clone https://github.com/yourusername/calculator-tools.git
cd calculator-tools
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5000
```

## 📦 Build for Production

```bash
npm run build
```

This creates optimized files in `dist/public` folder ready for deployment.

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:
- Hostinger web hosting
- GitHub Pages
- Vercel
- Netlify
- Any static hosting service

## 🎯 Adding New Calculators

Adding a new calculator is incredibly simple! Just follow these steps:

### 1. Create Your Calculator Component

Create a new file in `client/src/pages/`:

```tsx
// client/src/pages/YourCalculator.tsx
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function YourCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    // Your calculation logic here
    const calculatedResult = parseFloat(input) * 2;
    setResult(calculatedResult);
  };

  return (
    <Layout showBackButton={true} title="Your Calculator Name">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Your Calculator</h1>
        
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter value"
        />
        
        <Button onClick={handleCalculate}>Calculate</Button>
        
        {result !== null && (
          <div className="mt-4">
            <p>Result: {result}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
```

### 2. Add to Tools Registry

Edit `shared/toolsRegistry.ts`:

```typescript
import { YourIcon } from "lucide-react"; // Choose an icon

export const tools: Tool[] = [
  // ... existing tools
  {
    id: 'your-calculator-id',
    name: 'Your Calculator Name',
    description: 'Brief description of what your calculator does',
    category: 'Your Category', // e.g., 'Math Calculators', 'Finance Calculators'
    path: '/your-calculator',
    icon: YourIcon,
  },
];
```

### 3. Add Route

Edit `client/src/App.tsx`:

```typescript
import YourCalculator from "@/pages/YourCalculator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      {/* ... existing routes */}
      <Route path="/your-calculator" component={YourCalculator} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

### 4. That's It! 🎉

Your calculator will now:
- ✅ Appear automatically on the homepage
- ✅ Be organized by category
- ✅ Have a clickable card with description
- ✅ Work with the navigation system

## 📁 Project Structure

```
calculator-tools/
├── client/                 # Frontend React application
│   ├── public/            # Static files (copied to build)
│   │   └── .htaccess      # Apache configuration for routing
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Layout.tsx      # Page layout wrapper
│   │   │   ├── Footer.tsx      # Footer with language selector
│   │   │   └── ToolCard.tsx    # Calculator card component
│   │   ├── pages/         # Calculator pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── PlaybackSpeedCalculator.tsx
│   │   │   └── LCMCalculator.tsx
│   │   ├── lib/           # Utility functions and calculations
│   │   │   ├── calculations.ts
│   │   │   ├── lcmCalculations.ts
│   │   │   └── i18n.ts         # Language translations
│   │   └── App.tsx        # Main app component with routing
├── shared/                # Shared code between frontend and backend
│   └── toolsRegistry.ts   # Central registry of all tools
├── design_guidelines.md   # Design system documentation
├── DEPLOYMENT.md         # Deployment instructions
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

The project uses a carefully crafted design system:

- **UI Framework**: Shadcn UI with Radix UI primitives
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)
- **Color Scheme**: Neutral with professional accents

See [design_guidelines.md](design_guidelines.md) for detailed design specifications.

## 🌍 Supported Languages

- 🇬🇧 English
- 🇪🇸 Spanish (Español)
- 🇫🇷 French (Français)
- 🇩🇪 German (Deutsch)
- 🇵🇹 Portuguese (Português)
- 🇮🇹 Italian (Italiano)
- 🇯🇵 Japanese (日本語)
- 🇨🇳 Chinese (中文)

Language preference is stored in localStorage and persists across sessions.

## 🧪 Testing

All calculators include comprehensive validation:

- Input validation with clear error messages
- Edge case handling
- Responsive design testing
- Cross-browser compatibility

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript type checking

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Wouter** - Lightweight routing
- **Shadcn UI** - Component library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! To add a new calculator:

1. Fork the repository
2. Create a new calculator following the guide above
3. Test thoroughly
4. Submit a pull request

## 💡 Calculator Ideas

Here are some calculator ideas you could add:

### Math Calculators
- GCD Calculator
- Percentage Calculator
- Fraction Calculator
- Scientific Calculator
- Matrix Calculator

### Finance Calculators
- Loan Calculator
- Mortgage Calculator
- Investment Calculator
- Tip Calculator
- Currency Converter

### Health Calculators
- BMI Calculator
- Calorie Calculator
- Pregnancy Calculator
- Age Calculator

### Time Calculators
- Time Zone Converter
- Date Calculator
- Age Calculator
- Countdown Timer

### Unit Converters
- Temperature Converter
- Length Converter
- Weight Converter
- Volume Converter

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review the deployment guide

## 🙏 Acknowledgments

- Built with love using modern web technologies
- UI components from Shadcn UI
- Icons from Lucide
- Inspired by PureTables.com

---

**Made with ❤️ for calculator enthusiasts**

Happy calculating! 🧮
