# Design Guidelines: Calculator Website

## Design Approach

**Selected Approach:** Clean, Utility-Focused Design System

**Rationale:** This is a calculator and tools website where efficiency, clarity, and ease of navigation are paramount. The interface should be clean, distraction-free, and focused on helping users quickly find and use the tools they need. Drawing inspiration from utility sites like PureTables.com and calculator.net.

**Key Design Principles:**
1. Clarity over decoration - every element serves a functional purpose
2. Easy navigation and tool discovery
3. Scannable information hierarchy
4. Zero cognitive load for common tasks
5. Consistent experience across all tools

---

## Homepage Design

### Layout Structure

**Hero Section:**
- Clean title: "Calculator Tools" (text-3xl md:text-4xl font-bold)
- Subtitle: "Calculators, tools, generators, resources." (text-lg text-muted-foreground)
- Centered layout with max-w-6xl container
- Minimal padding: py-12 md:py-16

**Tools Grid:**
- Responsive grid layout
  - Mobile: 1 column (grid-cols-1)
  - Tablet: 2 columns (sm:grid-cols-2)
  - Desktop: 3 columns (lg:grid-cols-3)
- Gap between cards: gap-6
- Automatic population from tools registry
- Category organization (Time Calculators, Math Calculators, etc.)

**Tool Cards:**
- Card component with hover-elevate interaction
- Padding: p-6
- Border and subtle shadow
- Icon at top (lucide-react icons)
- Tool name: text-lg font-semibold
- Description: text-sm text-muted-foreground
- Category badge: Badge component with secondary variant
- Clickable entire card (Link wrapping)

### Footer Design

**Structure:**
- Border-top separator
- Padding: py-6 px-4
- Two sections: Site info and Language selector
- Responsive: Stack on mobile, flex-row on desktop

**Language Selector:**
- Dropdown select component
- Label: "Language" (text-sm font-medium)
- Common languages: English, Spanish, French, German, etc.
- Icon: Globe from lucide-react
- Position: Right side on desktop, below on mobile

---

## Individual Tool Pages

### Layout Structure

**Header:**
- Site name/logo linking to homepage
- Breadcrumb navigation (Home > Tool Name)
- Consistent across all tools

**Tool Content:**
- Follows tool-specific guidelines (see below)
- Max-width containers for readability
- Proper spacing and hierarchy

**Footer:**
- Same footer on all pages (with language selector)
- Consistent experience

### Calculator Tool Design (Playback Speed Calculator)

**Typography:**
- Headings (H1): text-3xl font-bold (calculator title)
- Headings (H2): text-xl font-semibold (section titles)
- Body text: text-base font-normal
- Labels: text-sm font-medium (form labels)
- Numbers/Results: text-2xl font-semibold tabular-nums (calculated outputs)
- Small text: text-xs (helper text, examples)
- Use `tabular-nums` utility for all numerical displays
- Monospace font for time displays (HH:MM:SS format)

**Layout System:**
- Spacing Primitives: 2, 4, 6, and 8 units
- Component spacing: p-4, p-6
- Section spacing: py-8, py-12
- Input fields: p-3
- Gaps: gap-4, gap-6

**Container Strategy:**
- Main container: max-w-4xl mx-auto px-4
- Calculator card: max-w-2xl (centered)
- Content sections: Full width within container

**Component Specifications:**
- Calculator Card: shadow-lg, rounded-xl, p-6 md:p-8, border
- Input Fields: rounded-lg, border, p-3, text-center, tabular-nums
- Results Display: bg-muted, rounded-lg, p-6, large text
- Examples Table: alternating row backgrounds, responsive cards on mobile

**Interaction Design:**
- Real-time calculation (instant updates)
- Smooth transitions (duration-200)
- Clear focus states
- Hover elevations on interactive elements
- Visual validation feedback

**Responsive Behavior:**
- Mobile (< 768px): Single column, stacked layout
- Tablet/Desktop (≥ 768px): Multi-column grids, side-by-side results

---

## Color & Visual System

**Background Hierarchy:**
- Page background: bg-background
- Card backgrounds: bg-card
- Muted sections: bg-muted
- Accent highlights: bg-accent (sparingly)

**Text Hierarchy:**
- Primary text: text-foreground
- Secondary text: text-muted-foreground
- Links: text-primary (with hover states)
- Success indicators: text-green-600 dark:text-green-400
- Error indicators: text-destructive

**Borders & Shadows:**
- Subtle borders: border with border-border
- Card shadows: shadow-lg
- Hover states: hover-elevate utility

---

## Navigation & Routing

**URL Structure:**
- Homepage: `/`
- Individual tools: `/tool-name-slug` (e.g., `/playback-speed-calculator`)

**Breadcrumbs:**
- Show current location
- Clickable home link
- Current page non-clickable

**Tool Discovery:**
- Tools automatically appear on homepage when added to registry
- Category-based organization
- Search functionality (future enhancement)

---

## Accessibility

**Standards:**
- WCAG AA minimum color contrast
- Proper heading hierarchy
- Semantic HTML structure
- Keyboard navigation support
- ARIA labels for screen readers
- Focus indicators on all interactive elements
- Alt text for icons (aria-label)

**Language Support:**
- Language selector in footer
- Store preference in localStorage
- Apply to all text content (future: i18n implementation)

---

## Responsive Strategy

**Breakpoints:**
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: ≥ 1024px (3 columns, full layouts)

**Mobile-First Approach:**
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly targets (min 44x44px)
- Readable text sizes (min 16px base)

---

## Performance & Optimization

**Images:**
- Minimal image usage (utility-focused)
- Icons from lucide-react (tree-shakeable)
- No hero images unless specific tool requires

**Animations:**
- Minimal, purposeful animations
- Smooth transitions: duration-150 to duration-200
- No decorative animations
- Respect prefers-reduced-motion

**Code Organization:**
- Shared components for reusability
- Tools registry for automatic homepage population
- Lazy loading for tool pages (future enhancement)

---

## Tools Registry System

**Structure:**
- Central `toolsRegistry.ts` file
- Each tool has: id, name, description, category, path, icon
- Categories: Time Calculators, Math Calculators, Text Tools, etc.
- Automatic homepage card generation
- Easy to add new tools

**Example Tool Entry:**
```typescript
{
  id: 'playback-speed',
  name: 'Playback Speed Calculator',
  description: 'Calculate video/podcast duration at different playback speeds',
  category: 'Time Calculators',
  path: '/playback-speed-calculator',
  icon: Clock
}
```
