import { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'calendar', label: 'Calendar', icon: 'fa-calendar' },
    { id: 'markets', label: 'Markets', icon: 'fa-chart-line' },
    { id: 'news', label: 'News', icon: 'fa-newspaper' },
    { id: 'analysis', label: 'Analysis', icon: 'fa-magnifying-glass-chart' },
    { id: 'trades', label: 'Trade Feed', icon: 'fa-arrow-trend-up' },
  ];

  return (
    <header className="bg-ff-header border-b border-ff-border sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-ff-accent rounded flex items-center justify-center">
                <i className="fa-solid fa-chart-line text-white text-sm"></i>
              </div>
              <span className="text-white font-bold text-lg hidden sm:block">
                Forex<span className="text-ff-accent">Factory</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-link px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === item.id
                    ? 'text-white bg-ff-panel'
                    : 'text-ff-text hover:text-white'
                }`}
              >
                <i className={`fa-solid ${item.icon} text-xs`}></i>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button className="text-ff-text hover:text-white transition-colors">
              <i className="fa-solid fa-bell"></i>
            </button>
            <button className="hidden sm:flex items-center gap-2 bg-ff-accent hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
              <i className="fa-solid fa-user text-xs"></i>
              Sign In
            </button>
            <button
              className="md:hidden text-ff-text"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-ff-border mt-2 pt-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === item.id
                    ? 'text-white bg-ff-panel'
                    : 'text-ff-text hover:text-white'
                }`}
              >
                <i className={`fa-solid ${item.icon} text-xs`}></i>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
