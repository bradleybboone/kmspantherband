# KMS Panther Band Website Development Guide

## Project Overview
This is a Next.js 15.4.4 website for KMS Panther Band, a middle school band program. The site serves students (ages 11-14), parents, and community members with band information, calendars, and member resources.

## Current Context
- **Framework**: Next.js 15.4.4 with TypeScript and App Router
- **Styling**: Tailwind CSS (mobile-first approach)
- **Auth**: NextAuth.js for Google OAuth
- **Deployment**: Netlify (connected to GitHub: bradleybboone/kmspantherband)
- **Development**: WSL Ubuntu with Cursor IDE

## Design System
### Colors (Official School District Colors)
- **Primary**: Deep Blue (RGB 0, 22, 137 / #001689) - Main headers and navigation
- **Secondary**: White (RGB 255, 255, 255 / #FFFFFF) - Text on dark backgrounds
- **Accent**: Black (RGB 0, 0, 0 / #000000) - Text and emphasis
- **Light Gray**: (RGB 164, 169, 173 / #A4A9AD) - Borders and subtle backgrounds
- **Dark Gray**: (RGB 85, 87, 89 / #555759) - Secondary text and muted elements

### Typography
- **Headings**: Inter or similar modern sans-serif
- **Body**: System font stack for performance
- **Sizes**: Mobile-first scaling (base 16px)

## Technical Architecture

### Directory Structure
```
src/
├── app/
│   ├── (auth)/         # Auth-required pages
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/
│   ├── layout/         # Header, Footer, Navigation
│   ├── calendar/       # Google Calendar components
│   └── ui/             # Reusable UI components
├── lib/
│   ├── auth.ts         # NextAuth configuration
│   ├── google.ts       # Google API integrations
│   └── utils.ts        # Utility functions
└── types/              # TypeScript definitions
```

### Key Features Implementation

#### 1. Google Calendar Integration
- Use Google Calendar API v3
- Display events in a responsive grid/list view
- Cache events to reduce API calls
- Show event details in modal/drawer on mobile

#### 2. Authentication (NextAuth.js)
- Google OAuth provider only
- Restrict member pages to authenticated users
- Store user sessions securely
- Handle auth errors gracefully

#### 3. Google Drive Integration
- Access member-only folders
- Display sheet music and documents
- Stream audio files for practice
- Download permissions for logged-in members

#### 4. Mobile-First Navigation
- Hamburger menu for mobile
- Bottom navigation for key pages
- Touch-friendly tap targets (min 44px)
- Smooth transitions and animations

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Functional components with hooks
- Named exports for components
- Tailwind utility classes (avoid custom CSS)

### Component Pattern
```typescript
// components/EventCard.tsx
export function EventCard({ event }: { event: CalendarEvent }) {
  return (
    <div className="rounded-lg shadow-md p-4 bg-white">
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p className="text-gray-600">{formatDate(event.date)}</p>
    </div>
  );
}
```

### API Routes Pattern
```typescript
// app/api/calendar/route.ts
export async function GET() {
  try {
    const events = await fetchGoogleCalendarEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
```

## Testing Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

## Deployment Process
1. Push to GitHub main branch
2. Netlify auto-deploys from main
3. Environment variables set in Netlify dashboard
4. Preview deploys for pull requests

## Environment Variables
```env
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-secret-key
GOOGLE_CLIENT_ID=from-google-console
GOOGLE_CLIENT_SECRET=from-google-console
GOOGLE_CALENDAR_ID=band-calendar-id
```

## Priority Development Order
1. **Phase 1**: Basic layout, navigation, and static pages
2. **Phase 2**: Google Calendar integration and display
3. **Phase 3**: Authentication with NextAuth.js
4. **Phase 4**: Member portal with Google Drive access
5. **Phase 5**: Performance optimization and PWA features

## Common Issues & Solutions
- **Calendar API Limits**: Implement caching with ISR (Incremental Static Regeneration)
- **Mobile Performance**: Use next/image for optimization, lazy load components
- **Auth Persistence**: Configure NextAuth session strategy correctly
- **CORS Issues**: Use API routes as proxy for external APIs

## Accessibility Requirements
- WCAG 2.1 AA compliance
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratio 4.5:1 minimum

## Performance Targets
- Lighthouse score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Mobile-first optimization

## Resources
- [Next.js 15 Docs](https://nextjs.org/docs)
- [NextAuth.js Guide](https://next-auth.js.org/)
- [Google Calendar API](https://developers.google.com/calendar/api/v3/reference)
- [Tailwind CSS](https://tailwindcss.com/docs)