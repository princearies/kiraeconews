import { useState, useEffect } from 'react';

interface CalendarEvent {
  time: string;
  currency: string;
  impact: 'high' | 'medium' | 'low' | 'none';
  event: string;
  forecast: string;
  previous: string;
  actual: string;
}

export default function EconomicCalendar() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState('today');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Fetch data from live API
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          'https://crypto-micro-agent.mykira.workers.dev/api/public/calendar?matawang=USD'
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Map API response to our CalendarEvent interface
        // Adjust mapping based on actual API response structure
        const mappedEvents: CalendarEvent[] = (data.events || data || []).map((item: any) => ({
          time: item.time || item.waktu || '',
          currency: item.currency || item.matawang || 'USD',
          impact: mapImpact(item.impact || item.impak || 'none'),
          event: item.event || item.acara || '',
          forecast: item.forecast || item.ramalan || '',
          previous: item.previous || item.sebelum || '',
          actual: item.actual || item.sebenar || '',
        }));
        
        setEvents(mappedEvents);
      } catch (err) {
        console.error('Failed to fetch calendar data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load calendar data');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchCalendarData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to map impact levels
  const mapImpact = (impact: string): 'high' | 'medium' | 'low' | 'none' => {
    const lowerImpact = impact.toLowerCase();
    if (lowerImpact.includes('high') || lowerImpact === 'tinggi' || lowerImpact === '3') {
      return 'high';
    }
    if (lowerImpact.includes('medium') || lowerImpact === 'sederhana' || lowerImpact === '2') {
      return 'medium';
    }
    if (lowerImpact.includes('low') || lowerImpact === 'rendah' || lowerImpact === '1') {
      return 'low';
    }
    return 'none';
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.currency === filter);

  const currencies = ['EUR', 'GBP', 'USD', 'AUD', 'CAD', 'JPY', 'NZD', 'CHF'];

  const getImpactClass = (impact: string) => {
    switch (impact) {
      case 'high': return 'impact-high';
      case 'medium': return 'impact-medium';
      case 'low': return 'impact-low';
      default: return 'impact-none';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high': return 'High Impact';
      case 'medium': return 'Medium Impact';
      case 'low': return 'Low Impact';
      default: return 'No Impact';
    }
  };

  return (
    <div className="bg-ff-panel rounded-lg border border-ff-border overflow-hidden">
      {/* Calendar Header */}
      <div className="px-4 py-3 border-b border-ff-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-calendar-days text-ff-accent"></i>
          <h2 className="text-white font-semibold text-lg">Economic Calendar</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSelectedDate('yesterday')}
            className={`px-2 py-1 rounded text-xs ${selectedDate === 'yesterday' ? 'bg-ff-accent text-white' : 'text-ff-text hover:text-white'}`}
          >
            Yesterday
          </button>
          <button 
            onClick={() => setSelectedDate('today')}
            className={`px-2 py-1 rounded text-xs ${selectedDate === 'today' ? 'bg-ff-accent text-white' : 'text-ff-text hover:text-white'}`}
          >
            Today
          </button>
          <button 
            onClick={() => setSelectedDate('tomorrow')}
            className={`px-2 py-1 rounded text-xs ${selectedDate === 'tomorrow' ? 'bg-ff-accent text-white' : 'text-ff-text hover:text-white'}`}
          >
            Tomorrow
          </button>
        </div>
      </div>

      {/* Date & Filters */}
      <div className="px-4 py-2 border-b border-ff-border bg-ff-darker/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-sm text-ff-text-light">{dateStr}</span>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-ff-text">Impact:</span>
          <button 
            onClick={() => setFilter('all')}
            className={`px-2 py-0.5 rounded text-xs ${filter === 'all' ? 'bg-ff-accent/20 text-ff-accent border border-ff-accent/50' : 'text-ff-text hover:text-white'}`}
          >
            All
          </button>
          {currencies.slice(0, 5).map(cur => (
            <button
              key={cur}
              onClick={() => setFilter(cur === filter ? 'all' : cur)}
              className={`px-2 py-0.5 rounded text-xs ${filter === cur ? 'bg-ff-accent/20 text-ff-accent border border-ff-accent/50' : 'text-ff-text hover:text-white'}`}
            >
              {cur}
            </button>
          ))}
          <span className="text-xs text-ff-text">...</span>
        </div>
      </div>

      {/* Calendar Table */}
      <div className="overflow-x-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-ff-accent border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-ff-text">Loading calendar data...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center justify-center py-12 px-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <i className="fa-solid fa-triangle-exclamation text-ff-red text-2xl"></i>
              <span className="text-sm text-ff-text">Failed to load calendar data</span>
              <span className="text-xs text-ff-text/60">{error}</span>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 px-3 py-1.5 bg-ff-accent text-white text-xs rounded hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3 text-center">
              <i className="fa-solid fa-calendar-xmark text-ff-text/40 text-2xl"></i>
              <span className="text-sm text-ff-text">No events found</span>
              <span className="text-xs text-ff-text/60">Try selecting a different date or currency</span>
            </div>
          </div>
        )}

        {/* Data Table */}
        {!loading && !error && filteredEvents.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-ff-text border-b border-ff-border bg-ff-darker/30">
                <th className="text-left px-3 py-2 font-medium w-20">Time</th>
                <th className="text-left px-3 py-2 font-medium w-12">Cur</th>
                <th className="text-left px-3 py-2 font-medium w-12">Impact</th>
                <th className="text-left px-3 py-2 font-medium">Event</th>
                <th className="text-right px-3 py-2 font-medium w-20">Actual</th>
                <th className="text-right px-3 py-2 font-medium w-20">Forecast</th>
                <th className="text-right px-3 py-2 font-medium w-20">Previous</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, idx) => (
              <tr key={idx} className="calendar-row border-b border-ff-border/50 transition-colors">
                <td className="px-3 py-2.5 text-ff-text-light font-mono text-xs">{event.time}</td>
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center justify-center w-7 h-5 bg-ff-dark rounded text-xs font-bold text-ff-accent">
                    {event.currency}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${getImpactClass(event.impact)}`}></div>
                    <span className="text-xs text-ff-text hidden lg:inline">{getImpactLabel(event.impact)}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-ff-text-light text-xs">{event.event}</td>
                <td className="px-3 py-2.5 text-right">
                  {event.actual ? (
                    <span className={`font-mono font-bold text-xs ${
                      parseFloat(event.actual) > parseFloat(event.forecast || event.previous) 
                        ? 'text-ff-green' 
                        : parseFloat(event.actual) < parseFloat(event.forecast || event.previous)
                        ? 'text-ff-red'
                        : 'text-white'
                    }`}>
                      {event.actual}
                    </span>
                  ) : (
                    <span className="text-ff-text/50">—</span>
                  )}
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-xs text-ff-text">{event.forecast || '—'}</td>
                <td className="px-3 py-2.5 text-right font-mono text-xs text-ff-text">{event.previous || '—'}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Calendar Footer */}
      <div className="px-4 py-2 border-t border-ff-border bg-ff-darker/30 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm impact-high"></div>
            <span className="text-ff-text">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm impact-medium"></div>
            <span className="text-ff-text">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm impact-low"></div>
            <span className="text-ff-text">Low</span>
          </div>
        </div>
        <span className="text-xs text-ff-text/60">All times in EST</span>
      </div>
    </div>
  );
}
