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
    <div className="min-h-screen relative">
      <div className="relative z-10 container mx-auto px-8 py-12 max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 tracking-tight" style={{ color: '#0f172a', lineHeight: '1.1' }}>
              Biometric
              <br />
              Study 1
            </h1>
            <p className="text-sm md:text-base font-medium mt-4" style={{ color: '#1e293b' }}>
              Measurement Meets Human Transformation
            </p>
          </div>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.6 }}>
              <circle cx="24" cy="24" r="20" stroke="#0f172a" strokeWidth="1.5" fill="none" />
              <path d="M 12 24 L 36 24 M 24 12 L 24 36" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.6 }}>
              <circle cx="16" cy="24" r="4" fill="#0f172a" />
              <circle cx="24" cy="24" r="4" fill="#0f172a" />
              <circle cx="32" cy="24" r="4" fill="#0f172a" />
              <path d="M 16 24 Q 20 16 24 24 Q 28 32 32 24" stroke="#0f172a" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="glass-panel px-6 py-3 text-sm" style={{ color: '#0f172a' }}>
              <p className="font-medium">Sound and Breath Study</p>
            </div>
          </div>
        </header>

        <nav
          className="mb-8"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-4 flex-wrap">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center"
                  style={{
                    background: isActive ? '#0f172a' : 'rgba(255, 255, 255, 0.5)',
                    color: isActive ? '#ffffff' : '#0f172a',
                    border: isActive ? 'none' : '1px solid rgba(15, 23, 42, 0.2)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '14px',
                    letterSpacing: '0.02em'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(168, 200, 218, 0.3), 0 0 12px rgba(168, 200, 218, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
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

        <div className="border-t mb-8" style={{ borderColor: 'rgba(15, 23, 42, 0.15)' }}></div>

        <div className="mb-12">
          {renderTabContent()}
        </div>

        <div className="border-t mb-6" style={{ borderColor: 'rgba(15, 23, 42, 0.15)' }}></div>

        <div className="glass-panel p-6 text-sm leading-relaxed" style={{ color: '#0f172a' }}>
          <p className="mb-2">Sessions: 8/26/25, 9/2/25, 9/9/25, 9/16/25 | 8:00–9:30 AM</p>
          <p className="mb-2">Location: The KINN, Venice | Facilitators: Nathalie Bonin, Robert Bahedry, Chao Dou</p>
          <p>Contact: biometricstudy@gmail.com | Instagram: biometric.study</p>
        </div>
      </div>
    </div>
  );
}
