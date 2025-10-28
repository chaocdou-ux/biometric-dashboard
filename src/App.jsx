import { useState } from 'react';
import Overview from './components/Overview';
import Sessions from './components/Sessions';
import Metrics from './components/Metrics';
import Participants from './components/Participants';
import DeviceComparison from './components/DeviceComparison';
import Definitions from './components/Definitions';
import data from './data/processed-data.json';

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block mr-2">
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  },
  {
    id: 'metrics',
    label: 'Metrics',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block mr-2">
      <path d="M2 14V6l4-4 4 6 4-4v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    </svg>
  },
  {
    id: 'sessions',
    label: 'Sessions',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block mr-2">
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  },
  {
    id: 'participants',
    label: 'Participants',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block mr-2">
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M3 13c0-2.5 2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  },
  {
    id: 'devices',
    label: 'Devices',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block mr-2">
      <rect x="4" y="2" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="8" cy="11" r="0.5" fill="currentColor"/>
    </svg>
  },
  {
    id: 'methodology',
    label: 'Methodology',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block mr-2">
      <rect x="3" y="2" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M6 6h4M6 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview data={data} />;
      case 'sessions':
        return <Sessions data={data} />;
      case 'metrics':
        return <Metrics data={data} />;
      case 'participants':
        return <Participants data={data} />;
      case 'devices':
        return <DeviceComparison data={data} />;
      case 'methodology':
        return <Definitions />;
      default:
        return <Overview data={data} />;
    }
  };

  return (
    <div>
      <div>
        <header className="mb-10 sm:mb-12">
          <p className="uppercase tracking-widest mb-4 font-semibold" style={{ fontSize: '14px', color: '#64748b', letterSpacing: '0.1em' }}>August 26 - September 16th, 2025</p>
          <h1 className="font-bold tracking-tight mb-6" style={{ fontSize: '3.5rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.01em' }}>
            Phase 1
          </h1>
        </header>

        <nav
          className="mb-6 sm:mb-8"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-5 md:px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center touch-manipulation min-h-[44px]"
                  style={{
                    background: isActive ? '#0f172a' : 'rgba(255, 255, 255, 0.97)',
                    color: isActive ? '#ffffff' : '#0f172a',
                    border: isActive ? 'none' : '1.5px solid rgba(15, 23, 42, 0.2)',
                    backdropFilter: 'blur(20px)',
                    fontSize: '1rem',
                    letterSpacing: '0.01em',
                    fontWeight: isActive ? '600' : '500'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.88)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 23, 42, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.97)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                  aria-label={tab.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="border-t mb-6 sm:mb-8" style={{ borderColor: 'rgba(15, 23, 42, 0.15)' }}></div>

        <div className="mb-8 sm:mb-12">
          {renderTabContent()}
        </div>

        <div className="border-t mb-6" style={{ borderColor: 'rgba(15, 23, 42, 0.15)' }}></div>

        <div className="leading-relaxed" style={{ color: '#0f172a', fontWeight: '500', fontSize: '16px' }}>
          <p className="mb-2">Study 1: August 26 - September 16th, 2025 | 8:00–9:30 AM | The KINN, Venice</p>
          <p className="mb-2">Facilitators: Nathalie Bonin, Robert Bahedry, Chao Dou</p>
          <p>Contact: biometricstudy@gmail.com | Instagram: @biometric.study</p>
        </div>
      </div>
    </div>
  );
}
