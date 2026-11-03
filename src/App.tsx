import { useState } from 'react';
import Header from './components/Header';
import MarketTicker from './components/MarketTicker';
import EconomicCalendar from './components/EconomicCalendar';
import MarketOverview from './components/MarketOverview';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <div className="min-h-screen bg-ff-dark text-ff-text">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <MarketTicker />
      
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Calendar */}
          <div className="lg:col-span-2">
            <EconomicCalendar />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <MarketOverview />
            <NewsSection />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
