export default function MarketTicker() {
  const markets = [
    { pair: 'EUR/USD', price: '1.0847', change: '+0.12%', up: true },
    { pair: 'GBP/USD', price: '1.2634', change: '-0.08%', up: false },
    { pair: 'USD/JPY', price: '149.82', change: '+0.23%', up: true },
    { pair: 'AUD/USD', price: '0.6543', change: '-0.15%', up: false },
    { pair: 'USD/CAD', price: '1.3621', change: '+0.05%', up: true },
    { pair: 'USD/CHF', price: '0.8834', change: '-0.11%', up: false },
    { pair: 'NZD/USD', price: '0.6012', change: '+0.09%', up: true },
    { pair: 'EUR/GBP', price: '0.8587', change: '-0.03%', up: false },
    { pair: 'Gold', price: '2,341.50', change: '+0.45%', up: true },
    { pair: 'Silver', price: '27.84', change: '+0.32%', up: true },
    { pair: 'Oil (WTI)', price: '78.42', change: '-0.67%', up: false },
    { pair: 'BTC/USD', price: '67,234', change: '+2.13%', up: true },
  ];

  return (
    <div className="bg-ff-darker border-b border-ff-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-2">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
          {markets.map((market, idx) => (
            <div key={idx} className="flex items-center gap-2 whitespace-nowrap text-xs">
              <span className="text-ff-text-light font-medium">{market.pair}</span>
              <span className="text-white font-mono">{market.price}</span>
              <span className={`font-mono ${market.up ? 'text-ff-green' : 'text-ff-red'}`}>
                {market.up ? '▲' : '▼'} {market.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
