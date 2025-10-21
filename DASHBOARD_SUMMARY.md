# Biometric Dashboard - Implementation Summary

## 🎨 Design Approach

I've created a **modern, minimal, brutalist dashboard** with a natural earth-tone color palette. The design philosophy emphasizes:

### Visual Design
- **Brutalist aesthetic**: Bold borders, hard shadows (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`)
- **Monospace typography**: Technical, scientific feel throughout
- **Natural color palette**: 
  - Earth (#6b4423) - Primary
  - Sage (#7a8a6f) - Secondary  
  - Clay (#b5651d) - Tertiary
  - Moss (#5a6b4a) - Quaternary
  - Sand (#d4a574) - Light accent
  - Stone (#78716c) - Muted
  - Charcoal (#292524) - Dark
  
### UI Components
All components follow brutalist design principles:
- Cards with thick borders and offset shadows
- Buttons with shadow states that "press in" on click
- Badges with strong borders and contrasting fills
- Tabs with bold borders and clear active states

## 📊 Dashboard Features

### 1. Overview Section
- **Holistic Profile**: Radar chart showing pre/post comparisons across 6 wellness dimensions
- **Cardiac Response**: Line chart tracking heart rate changes across sessions
- **Physical Sensations**: Horizontal bar chart of top reported somatic experiences
- **Experience Quality**: Horizontal bar chart of subjective descriptors

### 2. Metrics Section
- **Metric Improvements**: Detailed cards showing pre/post/change for each wellness dimension
- **Session Progression**: Multi-line chart showing metric evolution over time
- Metrics tracked: Emotional state, Energy, Tension, Stress, Clarity, Spiritual connection

### 3. Participants Section
- **Participant Roster**: Sidebar with all 16 participants
- **Individual Journeys**: Line chart showing metric changes per participant across sessions
- **Attendance Matrix**: Table view showing session completion for each participant
- Attendance tracking with visual indicators (checkmarks/x's)

### 4. Sessions Section
- **Session Analysis**: Detailed breakdown for each of 4 sessions
- **Metric Changes**: Bar charts comparing pre/post for each session
- **Heart Rate Scatter**: Scatter plot showing individual HR responses
- **Summary Statistics**: Key metrics per session (participants, gains, reductions)

## 🎯 Key Insights Visualized

The dashboard highlights:

1. **Top Metric Improvement**: Identifies which wellness dimension improved most
2. **Average Heart Rate Reduction**: Shows parasympathetic activation
3. **Most Common Sensation**: Reports top physical experience (e.g., "tingling")
4. **Completion Rate**: Tracks how many participants completed full series

## 🔒 Privacy & Data Handling

- All participant names anonymized as "Participant 1", "Participant 2", etc.
- Consistent anonymization across all sessions
- Original CSV files remain untouched
- Processed data stored in separate JSON file

## 📁 Data Processing Pipeline

```
1. CSV Files (Raw) 
   → Multiple CSV files with different structures
   
2. Parse Script (scripts/parse-csv.js)
   → Normalizes participant names
   → Converts rating scales to numbers
   → Extracts heart rate data
   → Parses sensation/experience arrays
   → Handles missing/null values
   
3. JSON Data (src/data/processed-data.json)
   → Structured data with baseline + 4 sessions
   → 16 total participants
   → 31 total data points
   
4. React Dashboard
   → Real-time calculations
   → Interactive visualizations
   → Responsive design
```

## 🛠 Technical Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS (brutalist custom design system)
- **Charts**: Recharts (highly customizable)
- **Icons**: Lucide React
- **Data Processing**: Node.js + csv-parse

## 📈 Data Metrics Calculated

### Aggregated Metrics
- Pre/post averages across all sessions
- Improvement percentages (with special handling for inverse metrics like stress/tension)
- Sample sizes for statistical validity

### Session Trends
- Metric progression over 4 sessions
- Participant attendance per session
- Heart rate changes per session

### Participant Metrics
- Individual journey tracking
- Session-by-session changes
- Attendance rate calculations

### Sensation/Experience Frequency
- Count occurrences across all sessions
- Top 6 sensations and experiences
- Distribution analysis

## 🚀 Running the Dashboard

```bash
# Install dependencies
npm install

# Parse CSV data
npm run parse

# Start development server  
npm run dev
# → Opens at http://localhost:5173

# Build for production
npm run build
```

## 🎨 Design Tokens

### Typography
- Font: Monospace system fonts
- Weights: Normal (400), Bold (700)
- Sizes: xs (0.75rem), sm (0.875rem), base (1rem), lg (1.125rem), xl-6xl

### Spacing
- Base unit: 0.25rem (1)
- Component padding: 1.5rem (6)
- Grid gaps: 1.5rem (6)

### Borders
- Standard: 2px solid
- Heavy: 4px solid
- Color: Stone 900 (#1c1917)

### Shadows
- Cards: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
- Header: `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`
- Badges: `shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`

## 💡 Creative Visualizations

1. **Radar Chart**: Shows holistic improvement profile at a glance
2. **Composed Chart**: Combines lines and bars for heart rate analysis
3. **Horizontal Bar Charts**: Better for reading sensation/experience labels
4. **Scatter Plot**: Shows individual variation in heart rate response
5. **Attendance Matrix**: Table-based visualization with clear visual indicators

## 🔮 Future Enhancements

Potential additions:
- Export to PDF functionality
- Statistical significance testing
- Correlation matrix between metrics
- Device-specific analysis
- Time-series predictions
- Custom date range filtering
- Participant notes/annotations
- Comparison mode (side-by-side participants)

## 📝 Notes

- Dashboard is fully responsive (mobile, tablet, desktop)
- All charts use consistent color scheme
- Brutalist design ensures high contrast and accessibility
- Monospace fonts provide scientific/research aesthetic
- Natural colors avoid overwhelming brightness
- Data updates automatically when CSV files are re-parsed

---

**Dashboard Status**: ✅ Ready for use
**Data Parsing**: ✅ Complete (16 participants, 31 data points)
**Server**: ✅ Running at http://localhost:5173
