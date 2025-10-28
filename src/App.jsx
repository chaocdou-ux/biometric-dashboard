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
    <div className="min-h-screen relative" style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 25%, #faf5f0 50%, #f0f4f8 75%, #faf8f5 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 max-w-7xl">
        <header className="mb-10 sm:mb-12">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-light">2024</p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Phase 1
          </h2>
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
                  className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 flex items-center touch-manipulation min-h-[44px]"
                  style={{
                    background: isActive ? '#0f172a' : 'rgba(255, 255, 255, 0.7)',
                    color: isActive ? '#ffffff' : '#0f172a',
                    border: isActive ? 'none' : '1px solid rgba(15, 23, 42, 0.2)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '0.875rem',
                    letterSpacing: '0.02em'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(168, 200, 218, 0.3), 0 0 12px rgba(168, 200, 218, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
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

        <div className="border-t mb-6 sm:mb-8" style={{ borderColor: 'rgba(15, 23, 42, 0.15)' }}></div>

        <div className="mb-8 sm:mb-12">
          {renderTabContent()}
        </div>

        <div className="border-t mb-6" style={{ borderColor: 'rgba(15, 23, 42, 0.15)' }}></div>

        <div className="text-sm leading-relaxed" style={{ color: '#000000' }}>
          <p className="mb-2">Study 1: 8/26/25, 9/2/25, 9/9/25, 9/16/25 | 8:00–9:30 AM | The KINN, Venice</p>
          <p className="mb-2">Facilitators: Nathalie Bonin, Robert Bahedry, Chao Dou</p>
          <p>Contact: biometricstudy@gmail.com | Instagram: @biometric.study</p>
        </div>
      </div>
    </div>
  );
}
