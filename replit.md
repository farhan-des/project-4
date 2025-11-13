# Calculator Tools Website

## Overview

This is a hybrid multi-tool calculator website featuring various utility calculators and an integrated blog system. The project combines two technologies:
- **Calculator Tools** (React + TypeScript) - Client-side calculators with automatic tool discovery
- **Blog System** (Laravel + PHP) - Server-side content management with admin panel

Currently includes:
- **Playback Speed Calculator** (Time Calculators category) - Calculate video/podcast duration at different speeds
- **LCM Calculator** (Math Calculators category) - Find Least Common Multiple using three different methods
- **Blog System** - Full-featured blog with admin panel, image uploads, and SEO optimization

The application emphasizes clarity, ease of use, and mobile-friendly responsive design. New calculator tools are automatically added through the centralized tools registry system. The blog system provides a complete content management solution for articles and resources.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing. The application has:
- Homepage (`/`) - displays all available calculators from the tools registry
- Individual tool pages:
  - `/playback-speed-calculator` - Playback Speed Calculator
  - `/lcm-calculator` - LCM Calculator
- 404 fallback for unknown routes

**Tools Registry System**: A centralized registry (`shared/toolsRegistry.ts`) that automatically populates the homepage with available tools. Adding a new tool only requires adding an entry to this registry, and it will automatically appear on the homepage with proper categorization.

**UI Component Library**: Shadcn UI with Radix UI primitives. The design system follows the "new-york" style variant with a neutral base color scheme. Components are built with class-variance-authority for variant management and Tailwind CSS for styling.

**State Management**: React hooks (useState, useEffect) for local component state. No global state management library is used since the application is primarily stateless - calculations are performed on-demand based on user input.

**Type Safety**: TypeScript with strict mode enabled. Shared types and schemas are defined in `shared/schema.ts` using Zod for runtime validation.

**Design System**: Custom Tailwind configuration extending the base theme with specific color variables (HSL-based), border radius values, and utility classes. The design emphasizes tabular numbers for time displays and consistent spacing primitives (2, 4, 6, 8 unit increments).

**Language Support**: Multi-language support with a language selector in the footer. Currently supports 8 languages (English, Spanish, French, German, Portuguese, Italian, Japanese, Chinese) with preference stored in localStorage.

**Layout System**: Reusable Layout component that provides consistent header with site branding, breadcrumb navigation (showing current tool name), and footer across all tool pages. Homepage uses its own custom layout without the header navigation.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Structure**: RESTful API pattern with routes prefixed under `/api`. Currently, the routes file is a template without implemented endpoints, as the calculator performs all calculations client-side.

**Development Setup**: Vite middleware integration for hot module replacement during development. Production builds serve static assets from the `dist/public` directory.

**Storage Interface**: Abstract storage interface defined with in-memory implementation (MemStorage). The interface includes CRUD methods for user management but appears to be template code not actively used by the calculator functionality.

### Calculation Logic

**Client-Side Calculations**: All calculator computations occur in the browser using pure TypeScript functions for optimal performance.

**Playback Speed Calculator** (`client/src/lib/calculations.ts`):
- Converts time to seconds, divides by playback speed, and formats results back to HH:MM:SS format
- Shows time saved/lost indicators
- Input validation: Zod schemas with constraints (hours: 0-999, minutes/seconds: 0-59, playback speed: 0.1-10)

**LCM Calculator** (`client/src/lib/lcmCalculations.ts`):
- Three calculation methods with step-by-step explanations:
  1. **Prime Factorization**: Finds prime factors, identifies highest powers, calculates LCM
  2. **Division Method**: Creates division table with prime divisors until all quotients reach 1
  3. **Lists of Multiples**: Generates multiples lists and identifies the smallest common multiple
- Helper functions for GCD calculation, prime factorization, and exponential notation formatting
- Input validation: Regex-based validation ensuring only positive whole numbers (rejects decimals, letters, negatives)
- Requires minimum of two numbers for calculation

### Blog System Architecture

**Framework**: Laravel 12.37.0 with PHP 8.1+ located in the `blog-system/` directory.

**Authentication**: Laravel Breeze with Blade templates for admin authentication. Admin routes protected with `auth` middleware.

**Database**: PostgreSQL for development environment, MySQL for production deployment on shared hosting (Hostinger). Database schema includes:
- `users` table - Admin users with email/password authentication
- `posts` table - Blog posts with title, slug, featured_image, excerpt, content, published_at, meta_title, meta_description, and status fields

**Routing Structure**:
- Public routes: `/blog` (listing), `/blog/{slug}` (single post)
- Admin routes: `/blog/login`, `/blog/admin/posts` (CRUD operations)
- All routes prefixed with `/blog` for deployment compatibility

**Post Model** (`blog-system/app/Models/Post.php`):
- Auto-generates slugs from post titles
- Auto-sets meta_title to post title if not provided
- Casts `published_at` to datetime for proper date handling
- Defines `published` scope for filtering published posts
- Defines `latest` scope for ordering by most recent
- User relationship (belongsTo) for post ownership

**Controllers**:
- `BlogController` - Handles public blog listing and single post views
- `Admin\PostController` - Full CRUD operations with image upload handling

**Views** (Tailwind CSS with Blade templates):
- `blog/index.blade.php` - Grid layout listing all published posts with pagination
- `blog/show.blade.php` - Single post view with SEO meta tags and Open Graph support
- `admin/posts/index.blade.php` - Admin dashboard listing all posts
- `admin/posts/create.blade.php` - Create new post form
- `admin/posts/edit.blade.php` - Edit existing post form

**Image Upload System**:
- Uses Laravel's public storage disk
- Featured images stored in `storage/app/public/featured_images/`
- Requires `php artisan storage:link` to create symlink for public access
- Automatic deletion of old images when updating posts

**SEO Features**:
- Meta title and description for each post
- Open Graph tags for social media sharing
- Twitter card meta tags
- Proper HTML structure with semantic tags
- Pagination with meta tags

**Integration with React Site**:
- Blog navigation link added to HomePage and Layout components
- BookOpen icon from Lucide React
- Links point to `/blog` for seamless integration
- Consistent Tailwind CSS styling matching calculator design

**Deployment Configuration**:
- Designed for shared hosting (Hostinger)
- Comprehensive deployment guide in `BLOG_DEPLOYMENT_GUIDE.md`
- Laravel app in `blog-backend/` directory
- Public files in `public_html/blog/` directory
- `.htaccess` configuration for proper routing
- File permissions and security recommendations documented

**Admin Credentials** (Development):
- Email: `admin@calculatortools.com`
- Password: `admin123`
- Must be changed after first login in production

## External Dependencies

### UI and Component Libraries
- **Radix UI**: Complete suite of accessible, unstyled UI primitives (@radix-ui/react-*)
- **Shadcn UI**: Pre-built component patterns using Radix primitives
- **Tailwind CSS**: Utility-first CSS framework with PostCSS and Autoprefixer
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional class name utilities
- **Lucide React**: Icon library

### Form and Data Management
- **React Hook Form**: Form state management (@hookform/resolvers)
- **Zod**: Schema validation and type inference
- **TanStack Query**: Data fetching and caching (not actively used for server requests in current implementation)

### Database (Configured but Not Active)
- **Drizzle ORM**: TypeScript ORM configured for PostgreSQL
- **@neondatabase/serverless**: Neon serverless Postgres driver
- **drizzle-kit**: Database migrations and schema management
- The database configuration exists in `drizzle.config.ts` and schema in `shared/schema.ts`, but the application currently uses in-memory storage and doesn't require database connectivity for calculator functionality

### Development Tools
- **Vite**: Build tool and dev server with React plugin
- **@replit/vite-plugin-***: Replit-specific development plugins (cartographer, dev-banner, runtime-error-modal)
- **TypeScript**: Type checking with ESNext module resolution
- **esbuild**: Production build bundling for server code

### Date and Time
- **date-fns**: Date utility library (imported but minimal usage in current calculator implementation)

### Fonts
- **Google Fonts**: Inter font family loaded via CDN for typography