export default function MarketOverview() {
  const markets = [
    { name: 'EUR/USD', price: '1.0847', change: '+0.0013', pct: '+0.12%', up: true, high: '1.0862', low: '1.0821' },
    { name: 'GBP/USD', price: '1.2634', change: '-0.0010', pct: '-0.08%', up: false, high: '1.2658', low: '1.2612' },
    { name: 'USD/JPY', price: '149.82', change: '+0.34', pct: '+0.23%', up: true, high: '150.12', low: '149.45' },
    { name: 'AUD/USD', price: '0.6543', change: '-0.0010', pct: '-0.15%', up: false, high: '0.6562', low: '0.6531' },
    { name: 'USD/CAD', price: '1.3621', change: '+0.0007', pct: '+0.05%', up: true, high: '1.3645', low: '1.3602' },
    { name: 'Gold', price: '2,341.50', change: '+10.50', pct: '+0.45%', up: true, high: '2,348.20', low: '2,328.40' },
  ];

  const indices = [
    { name: 'S&P 500', value: '5,234.18', change: '+0.34%', up: true },
    { name: 'Dow Jones', value: '39,127.45', change: '+0.12%', up: true },
    { name: 'Nasdaq', value: '16,384.23', change: '-0.21%', up: false },
    { name: 'DXY', value: '104.82', change: '+0.18%', up: true },
  ];

  return (
    <div className="bg-ff-panel rounded-lg border border-ff-border overflow-hidden">
      <div className="px-4 py-3 border-b border-ff-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-chart-line text-ff-accent text-sm"></i>
          <h3 className="text-white font-semibold text-sm">Market Overview</h3>
        </div>
        <span className="text-xs text-ff-text/60">Live</span>
      </div>

      {/* Indices */}
      <div className="px-4 py-2 border-b border-ff-border bg-ff-darker/30">
        <div className="grid grid-cols-2 gap-2">
          {indices.map((idx, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-xs text-ff-text">{idx.name}</span>
              <span className={`text-xs font-mono ${idx.up ? 'text-ff-green' : 'text-ff-red'}`}>
                {idx.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Forex Pairs */}
      <div className="divide-y divide-ff-border/50">
        {markets.map((market, idx) => (
          <div key={idx} className="px-4 py-2.5 hover:bg-ff-darker/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-ff-text-light font-medium">{market.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-white font-mono">{market.price}</div>
                <div className={`text-xs font-mono ${market.up ? 'text-ff-green' : 'text-ff-red'}`}>
                  {market.pct}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-ff-text/60">H: {market.high}</span>
              <span className="text-xs text-ff-text/60">L: {market.low}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-2 border-t border-ff-border bg-ff-darker/30">
        <button className="text-xs text-ff-accent hover:text-blue-400 transition-colors">
          View All Markets →
        </button>
      </div>
    </div>
  );
}
