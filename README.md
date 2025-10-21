# Biometric Sound & Breath Study Dashboard

A modern, minimal, brutalist-style data visualization dashboard for analyzing biometric data from sound healing and breathwork sessions.

## Design Philosophy

- **Minimal & Brutalist**: Clean, bold typography with strong borders and shadows
- **Natural Color Palette**: Earth tones inspired by nature (earth, sage, clay, moss, sand, stone)
- **Monospace Typography**: Technical, scientific aesthetic
- **Data-First**: Focus on clear data presentation and insights

## Features

### Data Analysis
- **Holistic Profile**: Radar charts showing pre/post session comparisons across all wellness dimensions
- **Cardiac Response**: Heart rate tracking and reduction analysis
- **Physical Sensations**: Distribution of somatic experiences
- **Experience Quality**: Subjective experience descriptors
- **Metric Improvements**: Detailed breakdowns of emotional, energy, clarity, spiritual, stress, and tension metrics
- **Session Progression**: Trend analysis across multiple sessions
- **Participant Journeys**: Individual tracking for each participant
- **Attendance Matrix**: Session participation tracking

### Privacy
- All participant names are anonymized as "Participant 1", "Participant 2", etc.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Parse CSV data
npm run parse

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
biometric-dashboard/
├── Biometric CSVs/          # Raw CSV data files
├── src/
│   ├── components/ui/       # Reusable UI components (brutalist design)
│   ├── data/               # Processed JSON data
│   ├── lib/                # Utility functions
│   ├── App.jsx             # Main dashboard component
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── scripts/
│   └── parse-csv.js        # CSV parsing script
└── index.html              # HTML entry point
```

## Data Flow

1. **CSV Files** → Located in `Biometric CSVs/` directory
2. **Parse Script** → `scripts/parse-csv.js` processes CSVs
3. **JSON Data** → Normalized data saved to `src/data/processed-data.json`
4. **Dashboard** → React app visualizes the processed data

## Dashboard Sections

### Overview
- Holistic improvement radar chart
- Heart rate trends across sessions
- Top physical sensations
- Experience quality distribution

### Metrics
- Detailed metric improvements (emotional, energy, tension, stress, clarity, spiritual)
- Session-by-session progression
- Pre vs post comparisons

### Participants
- Individual participant selection
- Journey tracking across sessions
- Attendance matrix
- Session completion rates

### Sessions
- Session-specific analysis
- Metric changes per session
- Heart rate scatter plots
- Key statistics

## Color Palette

```
Earth:    #6b4423 (primary accent)
Sage:     #7a8a6f (secondary accent)
Clay:     #b5651d (tertiary accent)
Moss:     #5a6b4a (quaternary accent)
Sand:     #d4a574 (light accent)
Stone:    #78716c (muted)
Charcoal: #292524 (dark)
```

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **csv-parse** - CSV parsing

## Development Notes

- Brutalist design system with strong borders and hard shadows
- Monospace fonts for scientific/technical feel
- Natural earth tone color palette
- Component-based architecture
- Responsive design for mobile/tablet/desktop

## Data Processing

The CSV parser (`scripts/parse-csv.js`):
- Anonymizes participant names
- Normalizes rating scales
- Parses heart rate data
- Extracts sensations and experiences
- Handles missing/null values
- Generates structured JSON output

## Future Enhancements

- Export functionality for reports
- Statistical significance testing
- Correlation analysis
- Device comparison analysis
- Time-series predictions
- PDF report generation

---

Created with ❤️ for biometric research
