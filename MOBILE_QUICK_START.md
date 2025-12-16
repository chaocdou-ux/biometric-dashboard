# Mobile Site - Quick Start Guide

## Access the Mobile Site

1. Start the application (or open the built site)
2. Click the **blue "Mobile Site"** button in the top navigation
3. Explore the mobile-optimized experience

---

## What's Included

### Pages
1. **Home** - Hero section, benefits, how it works, eligibility
2. **The Study** - Research details, methodology, privacy info
3. **About** - Mission, team bios (expandable), values
4. **Participate** - 4-step application form with progress tracking
5. **Contact** - Contact form with subject selection

### Key Features
- **Hamburger menu** navigation (tap icon in top-right)
- **Multi-step form** with real-time validation
- **Database integration** via Supabase (forms actually submit!)
- **Above-fold CTAs** optimized for 375px viewports
- **Accessible design** meeting WCAG AA standards

---

## Try These Features

### Navigation
- Tap the **menu icon (≡)** to open full-screen navigation
- Tap any page to navigate (menu closes automatically)
- Tap **X** to close menu manually

### Participation Form
1. Navigate to **Participate** page
2. Complete the 4-step application:
   - **Step 1:** Check eligibility
   - **Step 2:** Enter name, email, referral source
   - **Step 3:** Select device, location, availability
   - **Step 4:** Add optional comments and submit
3. Watch the progress bar advance
4. See success confirmation with next steps

### Contact Form
1. Navigate to **Contact** page
2. Fill out name, email, subject, message
3. Submit and see confirmation
4. Data is stored in Supabase database!

### Team Bios
1. Navigate to **About** page
2. Tap any team member card to expand full bio
3. Tap again to collapse

---

## Database Integration

### Forms Store Data Automatically

**Participation Applications:**
- Stored in `participation_applications` table
- Status starts as 'pending'
- Includes all form data (device, location, availability, etc.)

**Contact Submissions:**
- Stored in `contact_submissions` table
- Status starts as 'new'
- Includes name, email, subject, message

### Viewing Submissions

**Option 1: Supabase Dashboard**
1. Go to your Supabase project
2. Navigate to Table Editor
3. Select the table to view submissions

**Option 2: SQL Query**
```sql
-- View recent applications
SELECT * FROM participation_applications
ORDER BY created_at DESC LIMIT 10;

-- View contact form submissions
SELECT * FROM contact_submissions
ORDER BY created_at DESC LIMIT 10;
```

---

## Testing on Different Devices

### Chrome DevTools
1. Right-click → Inspect (or F12)
2. Click device toolbar icon (Ctrl+Shift+M / Cmd+Shift+M)
3. Select device:
   - iPhone SE (375px) - Smallest target
   - iPhone 13 Pro (390px)
   - iPad (768px)

### Real Devices
Open the site URL on your phone or tablet to see the real mobile experience.

---

## Content Customization

### Update Team Members
File: `src/components/mobile/MobileAbout.jsx`

```javascript
const teamMembers = [
  {
    name: 'Your Name',
    role: 'Your Role',
    shortBio: 'One-line description',
    fullBio: `Full bio text...`
  },
  // Add more...
];
```

### Change Contact Email
Find and replace globally: `nathalie@nathaliebonin.com` with your email

### Modify Homepage Copy
File: `src/components/mobile/MobileHome.jsx`

Look for section comments like:
```javascript
{/* Hero Section */}
{/* What We Measure */}
{/* How It Works */}
```

---

## Common Issues

### Forms Not Submitting?
- Check `.env` file has correct Supabase credentials
- Verify internet connection
- Check browser console for errors

### Menu Won't Open?
- Check for JavaScript errors in console
- Try refreshing the page
- Verify all components imported correctly

### Styles Look Wrong?
- Run `npm run build` to regenerate CSS
- Clear browser cache
- Check Tailwind classes are correct

---

## Design Specifications

### Hero Section (Above Fold)
- **Headline:** "Where Science Meets Wellness" (36px, bold)
- **Subheading:** One sentence explaining the study (18px)
- **Primary CTA:** "Join the Study" (48px height, full width)
- **Secondary CTA:** "How It Works" (48px height, full width)
- **Spacing:** pt-24 (96px) from top, pb-12 (48px) bottom

### Typography Scale
- H1: 30-36px (text-3xl to text-4xl)
- H2: 24-30px (text-2xl to text-3xl)
- H3: 18-20px (text-lg to text-xl)
- Body: 16-18px (text-base to text-lg)
- Small: 14px (text-sm)

### Color Palette
- **Gray-900:** Primary text and CTAs
- **Gray-700:** Secondary text
- **Gray-600:** Tertiary text
- **White/Gray-50:** Backgrounds
- **Blue-600:** Activity/biometrics
- **Green-600:** Wellness
- **Amber-600:** Music/sound

### Tap Targets
All interactive elements: **48px minimum height**
- Buttons: py-4 (16px padding = 48px+ total)
- Form inputs: py-3 (12px padding = 44px+ with text)
- Navigation items: py-4 (larger tap area)

---

## Build & Deploy

### Development
```bash
npm install        # Install dependencies
npm run dev        # Start dev server
```

### Production
```bash
npm run build      # Build for production
npm run preview    # Preview production build
```

### Environment Variables Required
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## What's Professional About This?

### For Universities
- Evidence-based language
- Clear methodology section
- Privacy and ethics prominently featured
- Research-appropriate tone throughout

### For Sponsors
- Professional visual design
- Trust elements and credibility cues
- Clear participant journey
- Polished, bug-free experience

### For Participants
- Easy to understand
- Clear steps to participate
- Transparent about time commitment
- Accessible to all users

---

## File Structure

```
src/components/mobile/
├── MobileSite.jsx          # Main container
├── MobileNav.jsx           # Navigation menu
├── MobileHome.jsx          # Homepage
├── MobileStudy.jsx         # Study details
├── MobileAbout.jsx         # Team & mission
├── MobileParticipate.jsx   # Application form
└── MobileContact.jsx       # Contact form

src/lib/
├── supabaseClient.js       # Database config
└── designSystem.js         # Colors & utilities
```

---

## Next Steps

1. **Test Everything**
   - Submit participation form
   - Submit contact form
   - Check database for submissions
   - Try all navigation paths

2. **Customize Content**
   - Update team member information
   - Adjust copy to match your study
   - Change contact email addresses

3. **Add Enhancements (Optional)**
   - Email notifications on form submission
   - Admin dashboard to view submissions
   - Analytics tracking
   - Additional pages as needed

4. **Deploy**
   - Build production version
   - Deploy to hosting provider
   - Configure domain
   - Test on real devices

---

## Support

### Documentation
- **MOBILE_IMPLEMENTATION_GUIDE.md** - Complete technical documentation
- **Component source files** - Inline comments explain functionality
- **Supabase docs** - Database queries and management

### Getting Help
- Check browser console for errors
- Review Supabase logs for database issues
- Test in incognito mode to rule out caching

---

## Summary

✅ Mobile-first website ready to use
✅ Forms integrated with Supabase database
✅ Professional design for academic credibility
✅ Fully accessible and optimized
✅ Production-ready code

**Click "Mobile Site" and start exploring!**
