import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import Overview from './components/Overview';
import Sessions from './components/Sessions';
import Metrics from './components/Metrics';
import Participants from './components/Participants';
import DeviceComparison from './components/DeviceComparison';
import Definitions from './components/Definitions';
import data from './data/processed-data.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Q0EzQUYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNk0wIDZjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNiAyLjY5LTYgNi02bTM2IDMwYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Biometric Study 1: Sound and Breath Study
              </h1>
              <div className="text-sm text-slate-600 space-y-1">
                <p className="font-medium">Sessions: 8/26/25, 9/2/25, 9/9/25, 9/16/25 | 8:00–9:30 AM</p>
                <p>Location: The KINN, Venice</p>
                <p>Contributors: Nathalie Bonin, Robert Bahedry, Chao Dou</p>
              </div>
            </div>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm border border-slate-200 p-1 rounded-lg shadow-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all text-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="sessions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all text-sm"
            >
              Sessions
            </TabsTrigger>
            <TabsTrigger
              value="metrics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all text-sm"
            >
              Metrics
            </TabsTrigger>
            <TabsTrigger
              value="participants"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all text-sm"
            >
              Participants
            </TabsTrigger>
            <TabsTrigger
              value="devices"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all text-sm"
            >
              Devices
            </TabsTrigger>
            <TabsTrigger
              value="definitions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all text-sm"
            >
              Definitions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Overview data={data} />
          </TabsContent>

          <TabsContent value="sessions" className="mt-6">
            <Sessions data={data} />
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            <Metrics data={data} />
          </TabsContent>

          <TabsContent value="participants" className="mt-6">
            <Participants data={data} />
          </TabsContent>

          <TabsContent value="devices" className="mt-6">
            <DeviceComparison data={data} />
          </TabsContent>

          <TabsContent value="definitions" className="mt-6">
            <Definitions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
