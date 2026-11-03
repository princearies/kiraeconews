import { useState } from 'react';

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

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const events: CalendarEvent[] = [
    { time: '2:00am', currency: 'EUR', impact: 'medium', event: 'German CPI (YoY)', forecast: '2.4%', previous: '2.2%', actual: '2.5%' },
    { time: '3:00am', currency: 'EUR', impact: 'low', event: 'Italian Industrial Production (MoM)', forecast: '0.3%', previous: '-0.2%', actual: '' },
    { time: '4:30am', currency: 'GBP', impact: 'high', event: 'Construction PMI', forecast: '53.2', previous: '53.0', actual: '53.8' },
    { time: '5:00am', currency: 'EUR', impact: 'medium', event: 'Spanish Unemployment Change', forecast: '25.0K', previous: '28.9K', actual: '22.3K' },
    { time: '7:00am', currency: 'GBP', impact: 'high', event: 'MPC Member Mann Speaks', forecast: '', previous: '', actual: '' },
    { time: '8:30am', currency: 'USD', impact: 'high', event: 'Non-Farm Payrolls', forecast: '185K', previous: '175K', actual: '' },
    { time: '8:30am', currency: 'USD', impact: 'high', event: 'Unemployment Rate', forecast: '3.8%', previous: '3.8%', actual: '' },
    { time: '8:30am', currency: 'USD', impact: 'high', event: 'Average Hourly Earnings (MoM)', forecast: '0.2%', previous: '0.2%', actual: '' },
    { time: '10:00am', currency: 'USD', impact: 'medium', event: 'ISM Manufacturing PMI', forecast: '49.5', previous: '49.2', actual: '' },
    { time: '10:00am', currency: 'USD', impact: 'low', event: 'Construction Spending (MoM)', forecast: '0.2%', previous: '0.3%', actual: '' },
    { time: '1:00pm', currency: 'USD', impact: 'medium', event: 'Fed Chair Powell Speaks', forecast: '', previous: '', actual: '' },
    { time: '3:30pm', currency: 'USD', impact: 'low', event: 'Crude Oil Inventories', forecast: '-1.2M', previous: '-2.6M', actual: '' },
    { time: '7:30pm', currency: 'AUD', impact: 'high', event: 'RBA Rate Decision', forecast: '4.35%', previous: '4.35%', actual: '' },
    { time: '9:30pm', currency: 'AUD', impact: 'medium', event: 'RBA Monetary Policy Statement', forecast: '', previous: '', actual: '' },
  ];

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
