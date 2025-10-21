# 🚀 Quick Start Guide

## Your Dashboard is Ready!

The biometric dashboard is now running at: **http://localhost:5173**

## What You'll See

### 🎨 Design Style
- **Minimal & Brutalist**: Clean lines, bold borders, hard shadows
- **Natural Colors**: Earth tones (browns, greens, clay colors)
- **Monospace Font**: Technical, scientific aesthetic
- **High Contrast**: Easy to read, professional look

### 📊 Main Sections

#### 1. OVERVIEW Tab (Default)
- 4 key metric cards at the top showing top improvements
- Radar chart comparing pre/post wellness dimensions
- Heart rate trend line chart across sessions
- Physical sensations bar chart
- Experience quality bar chart

#### 2. METRICS Tab
- Detailed breakdown cards for each wellness metric:
  - Emotional State
  - Energy
  - Tension (lower is better)
  - Stress (lower is better)
  - Clarity
  - Spiritual Connection
- Multi-line progression chart showing evolution over time

#### 3. PARTICIPANTS Tab
- Left sidebar: List of all 16 participants with attendance badges
- Main area: Individual journey chart (select a participant to view)
- Bottom: Attendance matrix table showing who attended which sessions

#### 4. SESSIONS Tab
- 4 cards (one per session)
- Each shows:
  - Metric changes (bar chart)
  - Heart rate scatter plot
  - Key statistics (participants, gains, reductions)

## 🎯 Key Features

### Data Privacy
✅ All participants anonymized (Participant 1, 2, 3...)
✅ Original CSV files unchanged
✅ Processed data in separate JSON

### Metrics Tracked
- Emotional State
- Physical Energy
- Body Tension
- Stress Level
- Mental Clarity
- Spiritual Connection
- Heart Rate (Pre/Post)
- Physical Sensations
- Experience Quality

### Smart Analytics
- Automatic improvement calculations
- Special handling for inverse metrics (lower stress = good)
- Heart rate reduction tracking
- Session attendance rates
- Top sensations/experiences

## 🎨 Color Meanings

- **Earth Brown** (#6b4423): Primary data, main metrics
- **Sage Green** (#7a8a6f): Secondary data, post-session
- **Clay Orange** (#b5651d): Tertiary data, highlights
- **Moss Green** (#5a6b4a): Quaternary data, alternates
- **Sand Beige** (#d4a574): Light accents
- **Stone Gray** (#78716c): Muted data, pre-session
- **Charcoal** (#292524): Text, borders

## 📱 Responsive Design

The dashboard works on:
- Desktop (optimal)
- Tablet (good)
- Mobile (functional, vertical scrolling)

## 🔄 Updating Data

If you add more CSV files or update existing ones:

```bash
# Re-parse the data
npm run parse

# Dashboard will auto-reload with new data
```

## 💡 Tips for Best Experience

1. **Start with Overview**: Get high-level insights
2. **Explore Metrics**: Deep dive into specific wellness dimensions
3. **Check Participants**: See individual journeys
4. **Review Sessions**: Analyze session-by-session changes

## 🎓 Understanding the Charts

### Radar Chart (Overview)
- Shows 6 wellness dimensions
- Gray = Pre-session average
- Brown = Post-session average
- Larger brown area = more improvement

### Line Charts
- Multiple colored lines = different metrics
- Upward trend = positive change
- Dotted lines = inverse metrics (stress/tension reduction)

### Bar Charts
- Horizontal bars = easier to read labels
- Different colors = different categories
- Length = frequency or value

### Scatter Plot (Sessions)
- Each dot = one participant
- X-axis = pre-session heart rate
- Y-axis = post-session heart rate
- Dots below diagonal line = heart rate decreased (good!)

## 🐛 Troubleshooting

**Dashboard not loading?**
- Check that `npm run dev` is running
- Visit http://localhost:5173
- Check browser console for errors

**Data looks wrong?**
- Run `npm run parse` again
- Check that CSV files are in `Biometric CSVs/` folder
- Verify processed data at `src/data/processed-data.json`

**Charts not showing?**
- Make sure window is wide enough (responsive breakpoints)
- Try refreshing the browser
- Check that data exists for that metric

## 📊 Current Data Summary

- **16 Participants** tracked
- **31 Total Data Points** across all sessions
- **4 Sessions** analyzed
- **6 Wellness Metrics** measured
- **2 Physiological Metrics** (HR, HRV potential)
- **Multiple Sensations & Experiences** categorized

## 🎯 Next Steps

1. **Explore the dashboard** - Click through all tabs
2. **Select participants** - View individual journeys
3. **Analyze patterns** - Look for trends across sessions
4. **Take screenshots** - Document insights for reports
5. **Share insights** - Present data professionally

---

**Server Running**: http://localhost:5173
**Status**: ✅ Ready to use
**Design**: Minimal, Brutalist, Natural Colors
**Data**: Parsed and anonymized

Enjoy your professional biometric dashboard! 🎉
