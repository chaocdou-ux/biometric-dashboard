import { useState } from 'react';
import Overview from './components/Overview';
import Sessions from './components/Sessions';
import Metrics from './components/Metrics';
import Participants from './components/Participants';
import DeviceComparison from './components/DeviceComparison';
import Definitions from './components/Definitions';
import data from './data/processed-data.json';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'participants', label: 'Participants' },
  { id: 'devices', label: 'Devices' },
  { id: 'methodology', label: 'Methodology' }
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
        <header className="mb-16 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-6xl md:text-7xl font-bold mb-2 tracking-tight" style={{ color: '#0f172a', lineHeight: '1.1' }}>
              Biometric
              <br />
              Study 1
            </h1>
            <p className="text-base font-medium mt-4" style={{ color: '#1e293b' }}>
              Experimental Laboratory. Next Generation.
            </p>
          </div>
          <div className="flex items-center gap-6">
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

        <div className="border-t" style={{ borderColor: 'rgba(15, 23, 42, 0.15)' }}></div>

        <div className="my-12">
          {renderTabContent()}
        </div>

        <div className="border-t mb-8" style={{ borderColor: 'rgba(15, 23, 42, 0.15)' }}></div>

        <nav
          className="mb-12"
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
                  className="px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300"
                  style={{
                    background: isActive ? '#0f172a' : 'rgba(255, 255, 255, 0.2)',
                    color: isActive ? '#ffffff' : '#0f172a',
                    border: isActive ? 'none' : '1px solid rgba(15, 23, 42, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                  aria-label={tab.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="text-sm" style={{ color: '#1e293b', opacity: 0.7 }}>
          <p>Sessions: 8/26/25, 9/2/25, 9/9/25, 9/16/25 | 8:00–9:30 AM</p>
          <p>Location: The KINN, Venice | Facilitators: Nathalie Bonin, Robert Bahedry, Chao Dou</p>
        </div>
      </div>
    </div>
  );
}
