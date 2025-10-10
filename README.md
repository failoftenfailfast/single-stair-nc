# Single Stair NC - Digital Advocacy Platform

A Next.js-powered advocacy platform featuring an immersive 3D scrollytelling experience to educate users about single-stair housing design and mobilize legislative action in North Carolina.

## 🏗️ Project Overview

This platform serves three primary objectives:
1. **Educate** - Interactive 3D visualization of single-stair vs. double-egress buildings
2. **Mobilize** - Tools for contacting North Carolina legislators
3. **Track** - State-level policy progress monitoring

### Key Features

- **3D Scrollytelling Experience** - Interactive Three.js visualization with scroll-triggered animations
- **Content Management** - Sanity.io headless CMS for dynamic content
- **Policy Tracking** - Real-time legislative progress monitoring
- **Legislator Lookup** - District-based representative finder with contact tools
- **Substack Integration** - Automated article ingestion from RSS feeds
- **Responsive Design** - Mobile-first, accessible interface

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** (App Router) with TypeScript
- **React 18** with Server Components
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### 3D Rendering
- **Three.js** - Core 3D engine
- **React Three Fiber** - React integration
- **React Three Drei** - Utility components
- **GSAP** - Advanced animations
- **Lenis** - Smooth scrolling

### Content Management
- **Sanity.io** - Headless CMS
- **GROQ** - Content queries
- **Portable Text** - Rich content rendering

### Additional Tools
- **Mapbox GL** - Interactive mapping
- **TanStack Query** - Data fetching
- **Zod** - Type validation
- **RSS Parser** - Substack integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Sanity account
- Mapbox account (for maps)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SingleStair
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   - `SANITY_PROJECT_ID` - Your Sanity project ID
   - `SANITY_DATASET` - Usually 'production'
   - `SANITY_API_TOKEN` - API token with read/write permissions
   - `MAPBOX_ACCESS_TOKEN` - Mapbox API token

4. **Initialize Sanity**
   ```bash
   npx sanity init
   ```

5. **Start development servers**
   ```bash
   # Start Next.js development server
   npm run dev

   # Start Sanity Studio (in another terminal)
   npm run studio
   ```

6. **Access the applications**
   - Website: http://localhost:3000
   - Sanity Studio: http://localhost:3000/admin

## 📁 Project Structure

```
SingleStair/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/          # Route groups
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── scrollytelling/    # 3D experience components
│   │   ├── sections/          # Page sections
│   │   ├── ui/                # Reusable UI components
│   │   └── forms/             # Form components
│   ├── lib/                   # Utility libraries
│   │   ├── sanity.ts          # Sanity client & queries
│   │   ├── mapbox.ts          # Mapbox utilities
│   │   └── utils.ts           # General utilities
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   └── styles/                # Additional stylesheets
├── sanity/                    # Sanity CMS configuration
│   ├── schemas/               # Content schemas
│   └── lib/                   # Sanity utilities
├── public/                    # Static assets
│   ├── models/                # 3D model files (.glb)
│   ├── textures/              # 3D textures
│   └── images/                # Images and icons
└── docs/                      # Documentation
```

## 🎨 3D Scrollytelling Implementation

### Architecture

The 3D experience is built using a scroll-driven animation system:

1. **ScrollytellingExperience** - Main container component
2. **Scene3D** - Three.js scene management
3. **ScrollytellingContent** - Text content overlay
4. **useScrollytelling** - Custom hook for scroll state management

### Animation System

```typescript
// Example section configuration
{
  title: "Floor Plan Comparison",
  animationTrigger: "cameraMove",
  cameraPosition: { x: 0, y: 15, z: 10 },
  duration: 3,
  models: ["singleStairBuilding", "doubleEgressBuilding"]
}
```

### 3D Asset Pipeline

1. **Modeling** - Create in Blender
2. **Export** - glTF 2.0 format with Draco compression
3. **Optimization** - Texture compression (KTX2/Basis)
4. **Loading** - Progressive loading with LOD system

## 📝 Content Management

### Sanity Schema Overview

- **siteConfig** - Global site settings
- **page** - Static pages
- **scrollytellingSection** - 3D experience content
- **policyTracker** - Legislative progress
- **legislator** - Representative information
- **buildingExample** - Gallery items
- **substackPost** - External article integration

### Content Workflow

1. **Create content** in Sanity Studio
2. **Preview changes** on staging
3. **Publish** to trigger ISR regeneration
4. **Monitor** with analytics

## 🗺️ Legislator Lookup System

### Implementation
- **Address Input** - User enters their address
- **Geocoding** - Convert to coordinates (Mapbox)
- **District Lookup** - Find legislative districts
- **Representative Matching** - Query Sanity for legislators
- **Contact Generation** - Pre-filled email templates

### Data Sources
- Legislative district boundaries (GeoJSON)
- Representative contact information (Sanity CMS)
- Email templates (Sanity CMS)

## 🔄 Substack Integration

Automated RSS feed ingestion:

```typescript
// Nightly cron job (Vercel Edge Function)
export async function GET() {
  const parser = new RSSParser();
  const feed = await parser.parseURL(process.env.SUBSTACK_RSS_URL!);
  
  // Process and store in Sanity
  await Promise.all(
    feed.items.map(item => 
      sanityClient.createOrReplace({
        _id: `substack-${item.guid}`,
        _type: 'substackPost',
        title: item.title,
        excerpt: item.contentSnippet,
        canonicalUrl: item.link,
        publishedAt: item.pubDate,
      })
    )
  );
}
```

## 🚀 Deployment

### Vercel (Team: tejofjord)

1. **Connect GitLab repository** to Vercel under team `tejofjord`
2. **Configure environment variables** (Project → Settings → Environment Variables)
3. **Deploy** - Automatic deployments on push via GitLab CI
4. **Custom domain** - Configure DNS in Vercel

### Environment Variables (Production)
```bash
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_token
MAPBOX_ACCESS_TOKEN=your_mapbox_token
NEXT_PUBLIC_SITE_URL=https://singlestair-nc.org
```

### Performance Optimizations
- **Static Generation** for most pages
- **ISR** for CMS content
- **Image optimization** with Next.js Image
- **Code splitting** with dynamic imports
- **3D asset optimization** with compression

## 🧪 Development Workflow

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run studio       # Start Sanity Studio
npm run studio:build # Build Sanity Studio
npm run studio:deploy # Deploy Sanity Studio
```

### Code Quality
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for formatting
- **Husky** for git hooks (optional)

### Testing Strategy
- **Unit tests** - Jest + React Testing Library
- **E2E tests** - Playwright (recommended)
- **Visual regression** - Percy or Chromatic
- **Performance** - Lighthouse CI

## 📊 Analytics & Monitoring

### Performance Monitoring
- **Core Web Vitals** tracking
- **3D performance** metrics
- **User interaction** analytics
- **Error tracking** (Sentry recommended)

### Privacy-First Analytics
- **Plausible** or **Fathom** (recommended)
- **GDPR compliant** by default
- **No cookies** required

## 🔒 Security & Privacy

### Security Headers
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy

### Privacy Compliance
- **GDPR** compliant analytics
- **No tracking** without consent
- **Data minimization** principles
- **Transparent** privacy policy

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Development Guidelines
- Follow existing code patterns
- Add TypeScript types
- Write tests for new features
- Update documentation
- Ensure accessibility compliance

## 📞 Support

For technical support or questions:
- **Email**: tech@singlestair-nc.org
- **Issues**: GitHub Issues
- **Documentation**: /docs folder

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for better housing policy in North Carolina**


