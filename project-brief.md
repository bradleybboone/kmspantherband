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

## Implementation Checklist

### Phase 1: Basic Layout & Navigation
- [ ] Set up Tailwind with school colors
- [ ] Create responsive header/footer components
- [ ] Build mobile hamburger navigation
- [ ] Create static pages (About, Contact, Join)
- [ ] Add school district color scheme

### Phase 2: Google Calendar Integration
- [ ] Set up Google Cloud Project
- [ ] Configure Calendar API credentials
- [ ] Implement calendar data fetching
- [ ] Create event display components
- [ ] Add mobile-friendly calendar views

### Phase 3: Authentication System
- [ ] Configure NextAuth.js with Google OAuth
- [ ] Add login/logout flow
- [ ] Create member dashboard
- [ ] Protect member-only routes
- [ ] Handle auth error states

### Phase 4: Member Portal Features
- [ ] Set up Google Drive API integration
- [ ] Create sheet music library interface
- [ ] Add member announcements section
- [ ] Implement file download functionality
- [ ] Add practice material organization

### Phase 5: Polish & Deployment
- [ ] Optimize images and performance
- [ ] Implement SEO best practices
- [ ] Set up error boundaries
- [ ] Configure Netlify deployment
- [ ] Add analytics tracking

## Content Requirements
The following content will be needed from the band director:

### Essential Content
- **Band Program Description**: Overview of the band program and its goals
- **Director Biography**: Bio and professional headshot
- **Band Photos**: High-quality photos for homepage and gallery
- **Contact Information**: Email, phone, office hours

### Documents & Resources
- **Band Handbook**: PDF version for download
- **Instrument Rental Forms**: Current rental information and forms
- **Practice Schedules**: Regular rehearsal times and locations
- **Calendar Access**: Google Calendar ID for band events

### Technical Assets
- **Google Drive Structure**: Organization of member-only folders
- **Approved Email List**: For parent communications
- **Social Media Links**: Official band social accounts
- **School Logo**: High-resolution logo files

Please help me build this step-by-step, starting with the basic layout and navigation, then adding features progressively. I'm a coding beginner working in React, so clear explanations of the implementation would be helpful.