export default function Footer() {
  return (
    <footer className="bg-ff-darker border-t border-ff-border mt-8">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-ff-accent rounded flex items-center justify-center">
                <i className="fa-solid fa-chart-line text-white text-xs"></i>
              </div>
              <span className="text-white font-bold">
                Forex<span className="text-ff-accent">Factory</span>
              </span>
            </div>
            <p className="text-xs text-ff-text/70 leading-relaxed">
              Global markets for the smart money. Connecting traders to financial markets with real-time data, charts, and the most trusted economic calendar.
            </p>
          </div>

          {/* Markets */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Markets</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Forex</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Indices</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Commodities</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Cryptocurrencies</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Bonds</a></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Tools</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Economic Calendar</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Market Sentiment</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Trade Feed</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Price Alerts</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Pip Calculators</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Forums</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Trading Systems</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Broker Discussions</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#" className="text-xs text-ff-text hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ff-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-ff-text/60">
            © 2024 ForexFactory. All rights reserved. For educational purposes only.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-ff-text/60 hover:text-white transition-colors text-sm">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="text-ff-text/60 hover:text-white transition-colors text-sm">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="text-ff-text/60 hover:text-white transition-colors text-sm">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="#" className="text-ff-text/60 hover:text-white transition-colors text-sm">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-ff-text/60 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-ff-text/60 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-ff-text/60 hover:text-white transition-colors">Disclaimer</a>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-4 p-3 rounded bg-ff-dark/50 border border-ff-border/50">
          <p className="text-xs text-ff-text/50 leading-relaxed">
            <strong className="text-ff-text/70">Risk Disclaimer:</strong> Trading foreign exchange on margin carries a high level of risk and may not be suitable for all investors. 
            The high degree of leverage can work against you as well as for you. Before deciding to trade foreign exchange, you should carefully consider your investment objectives, 
            level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment.
          </p>
        </div>
      </div>
    </footer>
  );
}
