import { useState } from 'react';
import OverviewPhase2 from './OverviewPhase2';
import DaysPhase2 from './DaysPhase2';
import ActivitiesPhase2 from './ActivitiesPhase2';
import MetricsPhase2 from './MetricsPhase2';
import ParticipantsPhase2 from './ParticipantsPhase2';
import DeviceComparisonPhase2 from './DeviceComparisonPhase2';
import Definitions from '../Definitions';
import data from '../../data/processed-data-phase2.json';

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
    id: 'days',
    label: 'Days',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block mr-2">
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  },
  {
    id: 'activities',
    label: 'Activities',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block mr-2">
      <path d="M2 8h5M9 8h5M8 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
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

export default function AppPhase2() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPhase2 data={data} />;
      case 'days':
        return <DaysPhase2 data={data} />;
      case 'activities':
        return <ActivitiesPhase2 data={data} />;
      case 'metrics':
        return <MetricsPhase2 data={data} />;
      case 'participants':
        return <ParticipantsPhase2 data={data} />;
      case 'devices':
        return <DeviceComparisonPhase2 data={data} />;
      case 'methodology':
        return <Definitions />;
      default:
        return <OverviewPhase2 data={data} />;
    }
  };

  return (
    <div>
      <div className="relative mb-12">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-yellow-100/40 via-blue-100/30 to-amber-100/40 rounded-full blur-3xl" />
        <div className="relative">
          <p className="uppercase tracking-widest mb-4 font-semibold" style={{ fontSize: '14px', color: '#64748b', letterSpacing: '0.1em' }}>November 22-23, 2025</p>
          <h2 className="font-bold tracking-tight mb-6" style={{ fontSize: '3.5rem', color: '#0f172a', letterSpacing: '-0.01em' }}>
            Phase 2
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <nav
          className="mb-8"
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

        <div className="border-t mb-8" style={{ borderColor: '#d1d5db' }}></div>

        <div className="mb-12">
          {renderTabContent()}
        </div>

        <div className="border-t pt-12" style={{ borderColor: '#d1d5db' }}>
          <div className="leading-relaxed max-w-3xl" style={{ fontSize: '17px', color: '#475569', lineHeight: '1.7' }}>
            <p className="mb-2">Study 2: November 22-23, 2025 | Los Angeles</p>
            <p className="mb-2">Facilitators: Nathalie Bonin, Robert Bahedry, Dr. Mitchell Abraham</p>
            <p>Contact: biometricstudy@gmail.com | Instagram: @biometric.study</p>
          </div>
        </div>
      </div>
    </div>
  );
}
