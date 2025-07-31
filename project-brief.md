# KMS Panther Band Website Development Brief

## Project Overview
I need help developing a modern, mobile-responsive website for KMS Panther Band (a middle school band program). The site should be professional yet accessible to students, parents, and community members.

## Current Setup
- **Framework**: Next.js 15.4.4 with TypeScript
- **Styling**: Tailwind CSS
- **Development Environment**: Cursor IDE with WSL Ubuntu
- **Repository**: GitHub (`bradleybboone/kmspantherband`)
- **Future Hosting**: Netlify (for easy GitHub integration)
- **Project Location**: `~/projects/kmspantherband/`

## Design Requirements

### Visual Style
- **School Colors**: Official district colors - Deep Blue (#001689), White, Black, Light Gray (#A4A9AD), Dark Gray (#555759)
- **Mobile-First**: Responsive design that works excellently on phones
- **Clean & Modern**: Contemporary web design, not outdated
- **Accessible**: Good contrast, readable fonts, semantic HTML

### Target Audience
- **Students**: Middle school band members (ages 11-14)
- **Parents**: Need quick access to important info and calendars
- **Community**: Supporters attending concerts and events

## Core Features Needed

### 1. Homepage
- Welcome message and band photo
- Upcoming events/concerts preview
- Quick links to important sections
- Contact information for band director

### 2. Google Calendar Integration
- Display band calendar events (rehearsals, concerts, competitions)
- Mobile-friendly calendar view
- Event details and locations

### 3. Member Login Section
- Google OAuth authentication
- Access to restricted Google Drive content
- Member-only announcements
- Practice materials and sheet music

### 4. Essential Pages
- **About**: Band program information, director bio
- **Calendar**: Concert schedule, competition dates
- **Schedule**: Performance and event galleries
- **Instrument Rental**: Performance and event galleries
- **Handbook**: Performance and event galleries
- **Contact**: Band director contact, school information
- **Join**: Information for prospective band members

### 5. Additional Features
- News/announcements section
- Social media links
- Email signup for parents
- Mobile app-like navigation

## Technical Specifications

### Google Integrations Required
- **Google Calendar API**: For displaying band events
- **Google OAuth**: For member authentication  
- **Google Drive API**: For accessing member-only content
- Consider using NextAuth.js for authentication

### Development Preferences
- Use TypeScript for better code quality
- Implement proper error handling
- Follow Next.js best practices (App Router)
- Use Tailwind utility classes for styling
- Responsive design with mobile-first approach

### Performance & SEO
- Fast loading times
- Optimized images
- Good SEO for community visibility
- Proper meta tags and structured data

## Sample Websites for Reference
These band websites show the type of content and functionality needed:
- https://heritageband.weebly.com/
- https://www.dragonbandboosters.com/middle-school-programs
- https://www.sfmsband.org/
- https://sites.google.com/view/wileymsband
- https://sites.google.com/leanderisd.org/leopardband
- https://nullband.com/

## Development Approach
1. Start with basic layout and navigation
2. Implement responsive design with Tailwind
3. Add Google Calendar integration
4. Set up authentication system
5. Create member-only areas
6. Add content management capabilities
7. Optimize for mobile and performance

## Current Status
- Next.js project created and running on localhost:3000
- GitHub repository set up and connected
- Ready to begin customization and feature development

## Questions for Implementation
- What's the best approach for the Google Calendar integration?
- Should we use NextAuth.js or a different auth solution?
- How should we structure the member-only content access?
- What's the recommended way to handle Google Drive integration?
- Should we implement a simple CMS for content updates?

Please help me build this step-by-step, starting with the basic layout and navigation, then adding features progressively. I'm a coding beginner working in React, so clear explanations of the implementation would be helpful.