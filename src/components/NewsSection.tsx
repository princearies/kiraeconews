export default function NewsSection() {
  const news = [
    {
      time: '10 min ago',
      category: 'Central Banks',
      title: 'Fed Officials Signal Patience on Rate Cuts Amid Sticky Inflation',
      source: 'Reuters',
      important: true,
    },
    {
      time: '25 min ago',
      category: 'Economy',
      title: 'US Jobs Report Expected to Show Solid Gains for March',
      source: 'Bloomberg',
      important: true,
    },
    {
      time: '45 min ago',
      category: 'Currencies',
      title: 'Yen Weakens Past 150 Level as BOJ Policy Divergence Widens',
      source: 'Nikkei',
      important: false,
    },
    {
      time: '1 hr ago',
      category: 'Commodities',
      title: 'Gold Holds Near Record Highs on Geopolitical Tensions',
      source: 'CNBC',
      important: false,
    },
    {
      time: '2 hrs ago',
      category: 'Analysis',
      title: 'EUR/USD Technical Analysis: Key Support at 1.0800 Tested',
      source: 'ForexFactory',
      important: false,
    },
    {
      time: '3 hrs ago',
      category: 'Economy',
      title: 'ECB\'s Lagarde: Inflation Progress Encouraging but Premature to Declare Victory',
      source: 'Financial Times',
      important: true,
    },
  ];

  return (
    <div className="bg-ff-panel rounded-lg border border-ff-border overflow-hidden">
      <div className="px-4 py-3 border-b border-ff-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-newspaper text-ff-accent text-sm"></i>
          <h3 className="text-white font-semibold text-sm">Latest News</h3>
        </div>
        <button className="text-xs text-ff-accent hover:text-blue-400 transition-colors">
          View All
        </button>
      </div>

      <div className="divide-y divide-ff-border/50">
        {news.map((item, idx) => (
          <div key={idx} className="px-4 py-3 hover:bg-ff-darker/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-ff-text/60">{item.time}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-ff-dark text-ff-accent/80">
                {item.category}
              </span>
              {item.important && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-ff-red/20 text-ff-red">
                  Important
                </span>
              )}
            </div>
            <h4 className="text-sm text-ff-text-light leading-snug hover:text-white transition-colors">
              {item.title}
            </h4>
            <span className="text-xs text-ff-text/50 mt-1 block">{item.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
