# Background Layout & Session Details Update

## Overview
Set background image to fixed height at top (50vh max 600px), filled remainder with white, and removed glass panel from session details for clean black text on white background.

---

## 1. Background Image - Fixed Height at Top

**File:** `/src/index.css`

### Before: Full-Screen Background
```css
body {
  background-image: url('/Background 1.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  /* ... */
}

body::before {
  /* Gradient overlay only */
  background: radial-gradient(...);
}
```

**Issues:**
- Background stretched across entire viewport
- Could tile or distort on very large screens
- Scrolling showed background throughout page
- Content readability issues

### After: Fixed Top Section
```css
body {
  background-color: #ffffff;  /* � Solid white base */
  /* ... */
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50vh;              /* � 50% viewport height */
  max-height: 600px;         /* � Max 600px */
  pointer-events: none;
  z-index: 0;
  background-image: url('/Background 1.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
```

**Benefits:**
- Background occupies only top portion (50vh or 600px max)
- Fixed position - stays at top during scroll
- Never stretches beyond intended bounds
- No tiling or distortion
- Solid white fills remainder of page

---

## 2. Layout Specifications

### Background Image Area
- **Height:** 50% of viewport height (50vh)
- **Max height:** 600px
- **Position:** Fixed at top
- **Behavior:** Stays in place during scroll
- **Aspect:** Cover (fills width, maintains aspect ratio)
- **Alignment:** Center center

### White Fill Area
- **Color:** #ffffff (solid white)
- **Area:** All space below background image
- **Extends:** To bottom of content/page
- **Purpose:** Clean, readable space for content

### Visual Layout
```
