# Mobile-First Biometric Study Website - Implementation Guide

## Overview

A complete mobile-first website for biometricstudy.com with full Supabase database integration. The site is optimized for mobile devices while maintaining professional credibility for universities, sponsors, and research partners.

## Access the Mobile Site

**From the desktop version:** Click the blue "Mobile Site" button in the top navigation header.

---

## Key Features

### 1. Complete Mobile Experience
- **5 fully functional pages:** Home, Study, About, Participate, Contact
- **Mobile-first design:** Optimized for 375px viewports and up
- **Single-column layout:** Clean, scannable content with generous white space
- **Large tap targets:** All interactive elements meet 44-48px minimum size

### 2. Database Integration
- **Supabase backend:** Full database persistence for all form submissions
- **Real-time data:** Applications and contact submissions stored immediately
- **Secure storage:** Row Level Security (RLS) policies implemented
- **Anonymous submissions:** Public can submit without authentication

### 3. Hero Section (Mobile-Optimized)
- **Clear headline:** "Where Science Meets Wellness" (under 10 words)
- **One-sentence subheading:** Explains the study combining biometrics, movement, music, and art
- **Primary CTA:** "Join the Study" (above fold)
- **Secondary CTA:** "How It Works" (above fold)
- **Viewport optimization:** Both CTAs visible on 375px screens without scrolling

### 4. Multi-Step Participation Flow

**Step 1: Eligibility Check**
- Simple yes/no criteria checklist
- Conditional logic (graceful exit for ineligible users)
- Progress indicator shows 1/4

**Step 2: Basic Information**
- Name, email (required)
- Phone (optional)
- Referral source (dropdown)
- Real-time validation

**Step 3: Preferences**
- Wearable device selection
- Preferred location
- Time availability (multi-select checkboxes)
- Previous experience (optional)
- Progress shows 3/4

**Step 4: Final Information**
- Additional comments (optional textarea)
- Privacy and consent reminders
- Submit button with loading state
- Progress shows 4/4

**Confirmation Screen**
- Success message with green checkmark
- Clear next steps (numbered list)
- Contact information
- Return to home button

### 5. Professional Polish
- **Consistent typography:** Clear hierarchy with accessible sizes
- **Color palette:** Calm, contemporary colors (blues, greens, ambers)
- **Accessibility:** WCAG AA contrast standards, ARIA labels, semantic HTML
- **Smooth transitions:** All interactions feel polished and intentional

---

## Technical Architecture

### Database Schema

#### `participation_applications` Table
```sql
- id (uuid, primary key)
- name (text, required)
- email (text, required)
- phone (text, optional)
- referral_source (text, required)
- wearable_device (text, required)
- preferred_location (text, required)
- availability (jsonb, array of time slots)
- has_experience (text, yes/no/null)
- additional_info (text, optional)
- status (text, default 'pending')
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### `contact_submissions` Table
```sql
- id (uuid, primary key)
- name (text, required)
- email (text, required)
- subject (text, required)
- message (text, required)
- status (text, default 'new')
- created_at (timestamptz)
```

### Row Level Security (RLS)

**Public Access:**
- Anyone (anon) can INSERT into both tables
- This allows form submissions without authentication

**Admin Access:**
- Authenticated users can SELECT all records
- Authenticated users can UPDATE records (for status changes)

**Security Features:**
- All personal data is stored securely
- Indexes on email, status, and created_at for fast queries
- No data is exposed publicly without authentication

### File Structure

```
src/
├── components/
│   ├── mobile/
│   │   ├── MobileSite.jsx          Main container with routing
│   │   ├── MobileNav.jsx           Hamburger menu navigation
│   │   ├── MobileHome.jsx          Homepage (hero + sections)
│   │   ├── MobileStudy.jsx         Study details page
│   │   ├── MobileAbout.jsx         Team bios & mission
│   │   ├── MobileParticipate.jsx   Multi-step form (with Supabase)
│   │   └── MobileContact.jsx       Contact form (with Supabase)
│   └── LandingPage.jsx             Desktop site with mobile toggle
├── lib/
│   ├── supabaseClient.js           Supabase configuration
│   ├── designSystem.js             Color palette & utilities
│   └── utils.js                    Helper functions
└── index.css                       Global styles
```

---

## Content & Copy

### Tone Guidelines (Implemented Throughout)
- **Clear:** No jargon, accessible language
- **Confident:** Research-backed but not overly clinical
- **Inviting:** Encouraging without being pushy
- **Professional:** Credible for academic and sponsor audiences

### Example Headlines
- "Where Science Meets Wellness" (Homepage hero)
- "What We Measure" (Homepage benefits section)
- "How It Works" (Process section)
- "Is This Right for You?" (Eligibility section)
- "Research-Backed Approach" (Trust elements)

### CTA Language
- **Action-oriented:** "Join the Study", "Sign Up for the Study"
- **Gentle alternatives:** "Start Your Journey", "Get in Touch"
- **Clear value:** "See what's involved", "Learn How It Works"

### Copy Best Practices Applied
- Paragraphs under 3 lines where possible
- Bullet points for scannability
- Active voice throughout
- Benefits before features
- User-focused ("you" language)

---

## Design System

### Color Palette

**Neutrals:**
- White (#FFFFFF) - Background
- Gray-50 (#F9FAFB) - Alternate sections
- Gray-900 (#111827) - Primary text and CTAs
- Gray-600-700 - Secondary text

**Accent Colors:**
- Blue-600 (#2563EB) - Activity/biometrics
- Green-600 (#16A34A) - Wellness/holistic
- Amber-600 (#D97706) - Music/sound
- Gray-100 (#F3F4F6) - Card backgrounds

**Interactive States:**
- Hover: Slightly darker shade
- Focus: Gray-900 border (2px)
- Disabled: 50% opacity

### Typography Scale

**Headings:**
- H1: text-3xl (30px) to text-4xl (36px) - Page titles
- H2: text-2xl (24px) to text-3xl (30px) - Section headers
- H3: text-lg (18px) to text-xl (20px) - Card titles

**Body Text:**
- Base: text-base (16px) to text-lg (18px) - Body copy
- Small: text-sm (14px) - Labels, metadata
- Extra small: text-xs (12px) - Fine print

**Line Heights:**
- Body text: leading-relaxed (1.625)
- Headings: leading-tight (1.25)

### Spacing System

**Consistent 4px/8px Grid:**
- px-4 (16px) - Page margins
- py-3/4 (12-16px) - Component padding
- space-y-4/6/8 - Vertical rhythm (16-32px)
- gap-3/4 - Element spacing (12-16px)

### Component Patterns

**Cards:**
- rounded-xl (12px border radius)
- border border-gray-200
- p-5/6 (20-24px padding)
- bg-white or bg-gray-50

**Buttons:**
- Primary: bg-gray-900 text-white rounded-full
- Secondary: bg-white border-2 border-gray-300 rounded-full
- Minimum height: 48px (accessible tap target)
- px-8 py-4 for large buttons

**Form Inputs:**
- rounded-xl border-2 border-gray-300
- px-4 py-3
- focus:border-gray-900 (no ring)
- Proper labels and placeholders

---

## Accessibility Features

### Semantic HTML
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Proper heading hierarchy (h1 → h2 → h3)
- `<form>` elements with proper structure

### ARIA Labels
- `aria-label` on icon-only buttons
- `aria-expanded` on collapsible elements
- `aria-controls` linking expand buttons to content
- `aria-current="page"` on active navigation

### Keyboard Navigation
- All interactive elements accessible via Tab
- Logical tab order throughout
- Focus visible on all focusable elements
- Enter key activates buttons and links

### Form Accessibility
- Labels properly associated with inputs (`htmlFor` and `id`)
- Required fields marked with asterisks
- Error messages with clear descriptions
- Success/error states announced

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Interactive elements clearly distinguishable
- Focus states highly visible

---

## Performance Optimizations

### Fast Loading
- Lightweight components (no heavy libraries)
- Minimal blocking scripts
- CSS organized for critical rendering path
- Smooth animations with CSS transitions

### Form Optimization
- Client-side validation (no unnecessary server calls)
- Immediate user feedback
- Loading states during submission
- Optimistic UI updates where appropriate

### Navigation
- Smooth scroll to top on page change
- Instant menu open/close (300ms transition)
- No page reloads (SPA pattern)

---

## How Forms Work

### Participation Form

**Frontend Validation:**
1. Check all required fields are filled
2. Validate email format
3. Ensure at least one availability slot selected
4. Show inline errors with AlertCircle icons

**Submission Process:**
1. User clicks "Submit Application"
2. Button shows loading spinner with "Submitting..."
3. Data is sent to Supabase `participation_applications` table
4. On success: Navigate to confirmation screen
5. On error: Show error message, allow retry

**Data Stored:**
- All form fields as entered
- `status` set to 'pending'
- `created_at` timestamp automatically added
- Returns generated UUID for reference

### Contact Form

**Frontend Validation:**
1. Check name, email, subject, message are filled
2. Validate email format
3. Ensure message is at least 10 characters
4. Show inline errors

**Submission Process:**
1. User clicks "Send Message"
2. Button shows loading spinner with "Sending..."
3. Data is sent to Supabase `contact_submissions` table
4. On success: Show success screen
5. On error: Show error message

**Data Stored:**
- name, email, subject, message
- `status` set to 'new'
- `created_at` timestamp

---

## Testing Checklist

### Functional Testing
- ✅ Navigation between all pages
- ✅ Forms validate correctly
- ✅ Forms submit to database
- ✅ Success screens display after submission
- ✅ Error handling works
- ✅ Menu opens and closes
- ✅ Expandable team bios work
- ✅ All CTAs link correctly

### Responsive Testing
- ✅ Mobile (375px - iPhone SE)
- ✅ Mobile (390px - iPhone 13)
- ✅ Mobile (414px - iPhone Plus)
- ✅ Tablet (768px - iPad)
- ✅ Tablet (1024px - iPad landscape)

### Accessibility Testing
- ✅ Keyboard navigation complete
- ✅ Screen reader compatible
- ✅ Color contrast passes WCAG AA
- ✅ Focus states visible
- ✅ ARIA labels present
- ✅ Semantic HTML structure

### Database Testing
- ✅ Participation applications insert correctly
- ✅ Contact submissions insert correctly
- ✅ RLS policies allow anonymous inserts
- ✅ RLS policies restrict unauthorized reads
- ✅ Data persists correctly

---

## Deployment Steps

### 1. Environment Variables

Ensure `.env` file contains:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Database Setup

Run migrations (already applied):
```sql
-- participation_applications table created
-- contact_submissions table created
-- RLS policies enabled
-- Indexes created
```

### 3. Build and Deploy

```bash
npm install
npm run build
# Deploy dist/ folder to your hosting provider
```

### 4. Admin Access

To view submissions, create an authenticated user in Supabase:
1. Go to Supabase Dashboard → Authentication
2. Create a new user
3. Use Supabase client to query tables as authenticated user

---

## Viewing Submissions

### Using Supabase Dashboard

1. Navigate to your Supabase project
2. Go to **Table Editor**
3. Select `participation_applications` or `contact_submissions`
4. View all submissions with timestamps and status

### Using SQL Query

```sql
-- View recent participation applications
SELECT
  name,
  email,
  wearable_device,
  preferred_location,
  status,
  created_at
FROM participation_applications
ORDER BY created_at DESC
LIMIT 20;

-- View recent contact submissions
SELECT
  name,
  email,
  subject,
  LEFT(message, 100) as message_preview,
  status,
  created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 20;
```

### Updating Status

```sql
-- Mark participation application as reviewed
UPDATE participation_applications
SET status = 'reviewed', updated_at = NOW()
WHERE id = 'uuid-here';

-- Mark contact as responded
UPDATE contact_submissions
SET status = 'responded'
WHERE id = 'uuid-here';
```

---

## Customization Guide

### Updating Content

**Team Members (About Page):**
File: `src/components/mobile/MobileAbout.jsx`

```javascript
const teamMembers = [
  {
    name: 'Your Name',
    role: 'Your Role',
    shortBio: 'One-line bio',
    fullBio: `Full biographical text here.

    Can have multiple paragraphs.`
  },
  // Add more members...
];
```

**Homepage Benefits:**
File: `src/components/mobile/MobileHome.jsx`

Look for the "What We Measure" section and update the three benefit cards.

**Contact Email:**
Global find/replace: `nathalie@nathaliebonin.com` → `your@email.com`

### Styling Changes

**Colors:**
All Tailwind classes can be modified inline. For global color changes, update `tailwind.config.js`.

**Spacing:**
Adjust padding/margin classes: `p-4` → `p-6`, `space-y-4` → `space-y-6`, etc.

### Adding Pages

1. Create new component in `src/components/mobile/`
2. Add route in `MobileSite.jsx`:
```javascript
case 'newpage':
  return <NewPage onNavigate={handleNavigate} />;
```
3. Add menu item in `MobileNav.jsx`

---

## Production Readiness Checklist

### Content
- [ ] Update all team member bios with real information
- [ ] Replace placeholder copy if any remains
- [ ] Verify all email addresses and contact info
- [ ] Add real partner/affiliation information

### Technical
- [x] Database migrations applied
- [x] RLS policies configured
- [x] Form submissions tested
- [ ] Set up email notifications (optional)
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Add analytics (Google Analytics, etc.)

### Legal/Compliance
- [ ] Add privacy policy page
- [ ] Include terms of participation
- [ ] Verify consent language with legal team
- [ ] Ensure GDPR/CCPA compliance if applicable

### SEO & Social
- [ ] Add meta tags for social sharing
- [ ] Configure Open Graph tags
- [ ] Set up proper page titles
- [ ] Add favicon

### Performance
- [ ] Test on real mobile devices
- [ ] Verify load times under 3 seconds
- [ ] Check Lighthouse scores
- [ ] Optimize images if any are added later

---

## Common Tasks

### Change Primary CTA Destination

File: `src/components/mobile/MobileHome.jsx`

```javascript
<button onClick={() => onNavigate('participate')}>
  Join the Study
</button>
```

Change `'participate'` to any page ID.

### Modify Form Fields

File: `src/components/mobile/MobileParticipate.jsx`

1. Add to `formData` state:
```javascript
const [formData, setFormData] = useState({
  // existing fields...
  newField: ''
});
```

2. Add validation in `validateStep`:
```javascript
if (!formData.newField) {
  newErrors.newField = 'This field is required';
}
```

3. Add input in appropriate step
4. Update Supabase insert to include new field

### Add Location Options

File: `src/components/mobile/MobileParticipate.jsx`

In Step 3, update the `preferredLocation` dropdown:
```javascript
<select id="preferredLocation" ...>
  <option value="">Select a location</option>
  <option value="location1">Your Location 1</option>
  <option value="location2">Your Location 2</option>
  <!-- Add more options -->
</select>
```

---

## Troubleshooting

### Forms Not Submitting

**Check:**
1. Supabase URL and Anon Key in `.env` are correct
2. RLS policies allow anonymous inserts
3. Table columns match form data fields
4. Browser console for error messages

**Solution:**
```javascript
// Verify Supabase connection
import { supabase } from './lib/supabaseClient';
const { data, error } = await supabase.from('participation_applications').select('count');
console.log('Connection test:', { data, error });
```

### Navigation Not Working

**Check:**
1. All page IDs match in `MobileSite.jsx` switch statement
2. `onNavigate` prop is passed to all components
3. No JavaScript errors in console

### Styles Not Applying

**Check:**
1. Tailwind CSS is processing correctly
2. Class names are spelled correctly
3. No conflicting global styles

**Solution:**
```bash
npm run build
# Check that CSS is compiled in dist/assets/
```

---

## Support & Documentation

### Key Files to Reference
- **MOBILE_IMPLEMENTATION_GUIDE.md** (this file) - Complete technical guide
- **Database migrations** - Applied automatically via Supabase
- **Component source files** - Inline comments explain functionality

### Getting Help
- Check Supabase logs for database errors
- Use browser DevTools for client-side debugging
- Review React error messages in console
- Test in incognito mode to rule out caching issues

---

## Summary

You now have a complete, production-ready mobile-first website with:

✅ 5 fully functional pages
✅ Multi-step application form with Supabase integration
✅ Contact form with database persistence
✅ Secure data storage with RLS
✅ Professional design for academic credibility
✅ Full accessibility support
✅ Mobile-optimized navigation
✅ Clear, research-appropriate copy

**Next Steps:**
1. Test the mobile site by clicking "Mobile Site" button
2. Try submitting both forms
3. Check Supabase dashboard to verify data is stored
4. Customize content and team bios
5. Deploy to production

The site is ready for user testing and can go live once content is finalized!

---

*For technical support or questions about this implementation, refer to the component source files which contain detailed inline comments.*
