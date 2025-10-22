import { useState } from 'react';
import { Activity, Calendar, TrendingUp, Users, Watch, BookOpen } from 'lucide-react';
import AbstractBackground from './components/AbstractBackground';
import Overview from './components/Overview';
import Sessions from './components/Sessions';
import Metrics from './components/Metrics';
import Participants from './components/Participants';
import DeviceComparison from './components/DeviceComparison';
import Definitions from './components/Definitions';
import data from './data/processed-data.json';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'sessions', label: 'Sessions', icon: Calendar },
  { id: 'metrics', label: 'Metrics', icon: TrendingUp },
  { id: 'participants', label: 'Participants', icon: Users },
  { id: 'devices', label: 'Devices', icon: Watch },
  { id: 'methodology', label: 'Methodology', icon: BookOpen }
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
    <div className="min-h-screen pb-32 relative">
      <AbstractBackground />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12 text-center relative">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))', color: '#3B82F6', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            Feasibility Study
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent">
            Biometric Study 1
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-medium" style={{ color: '#3B82F6' }}>
            Sound and Breath Study
          </p>
          <div className="glass-panel inline-block px-8 py-4 text-sm" style={{ color: '#333430' }}>
            <p className="font-medium mb-1">Sessions: 8/26/25, 9/2/25, 9/9/25, 9/16/25 | 8:00–9:30 AM</p>
            <p className="opacity-75">Location: The KINN, Venice | Facilitators: Nathalie Bonin, Robert Bahedry, Chao Dou</p>
          </div>
        </header>

        <div className="mb-8">
          {renderTabContent()}
        </div>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 glass-panel mx-4 mb-4 rounded-2xl"
        style={{ maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="grid grid-cols-6 gap-2 p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-tab ${isActive ? 'active' : ''}`}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={20} strokeWidth={2} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
