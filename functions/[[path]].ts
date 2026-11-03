import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { cors } from 'hono/cors'

type Bindings = {
  KV_DATA: KVNamespace
  ENVIRONMENT: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('/*', cors())

// Logger middleware
app.use('*', async (c, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${c.req.method} ${c.req.path} - ${c.res.status} (${ms}ms)`)
})

// ============================================
// API Routes
// ============================================

// Health check
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'ForexFactory API',
    version: '1.0.0',
    environment: c.env.ENVIRONMENT || 'development'
  })
})

// Market data
app.get('/api/markets', (c) => {
  const markets = getMarketData()
  return c.json({ data: markets, updated: new Date().toISOString() })
})

// Single market
app.get('/api/markets/:pair', (c) => {
  const pair = c.req.param('pair').toUpperCase().replace('-', '/')
  const markets = getMarketData()
  const market = markets.find(m => m.pair.replace('/', '-') === pair || m.pair === pair)
  
  if (!market) {
    return c.json({ error: 'Market pair not found' }, 404)
  }
  return c.json({ data: market, updated: new Date().toISOString() })
})

// Economic calendar
app.get('/api/calendar', (c) => {
  const impact = c.req.query('impact') || 'all'
  const currency = c.req.query('currency') || 'all'
  const date = c.req.query('date') || new Date().toISOString().split('T')[0]

  let events = getCalendarEvents(date)

  if (impact !== 'all') {
    events = events.filter(e => e.impact === impact)
  }
  if (currency !== 'all') {
    events = events.filter(e => e.currency === currency.toUpperCase())
  }

  return c.json({ date, events, count: events.length, timezone: 'EST' })
})

// News
app.get('/api/news', (c) => {
  const page = parseInt(c.req.query('page') || '1')
  const limit = parseInt(c.req.query('limit') || '10')
  const category = c.req.query('category') || 'all'

  let allNews = getNewsData()
  
  if (category !== 'all') {
    allNews = allNews.filter(n => n.category.toLowerCase() === category.toLowerCase())
  }

  const start = (page - 1) * limit
  const paginatedNews = allNews.slice(start, start + limit)

  return c.json({
    data: paginatedNews,
    pagination: { page, limit, total: allNews.length, totalPages: Math.ceil(allNews.length / limit) }
  })
})

// Sentiment
app.get('/api/sentiment', (c) => {
  return c.json({
    data: getSentimentData(),
    updated: new Date().toISOString()
  })
})

// ============================================
// Data Functions
// ============================================

function getMarketData() {
  // In production, fetch from real data source
  const baseMarkets = [
    { pair: 'EUR/USD', price: 1.0847, change: 0.0013, pct: 0.12, high: 1.0862, low: 1.0821, spread: 0.0001 },
    { pair: 'GBP/USD', price: 1.2634, change: -0.0010, pct: -0.08, high: 1.2658, low: 1.2612, spread: 0.0002 },
    { pair: 'USD/JPY', price: 149.82, change: 0.34, pct: 0.23, high: 150.12, low: 149.45, spread: 0.02 },
    { pair: 'AUD/USD', price: 0.6543, change: -0.0010, pct: -0.15, high: 0.6562, low: 0.6531, spread: 0.0001 },
    { pair: 'USD/CAD', price: 1.3621, change: 0.0007, pct: 0.05, high: 1.3645, low: 1.3602, spread: 0.0002 },
    { pair: 'USD/CHF', price: 0.8834, change: -0.0010, pct: -0.11, high: 0.8856, low: 0.8812, spread: 0.0002 },
    { pair: 'NZD/USD', price: 0.6012, change: 0.0005, pct: 0.09, high: 0.6028, low: 0.5995, spread: 0.0002 },
    { pair: 'EUR/GBP', price: 0.8587, change: -0.0003, pct: -0.03, high: 0.8601, low: 0.8572, spread: 0.0002 },
    { pair: 'Gold', price: 2341.50, change: 10.50, pct: 0.45, high: 2348.20, low: 2328.40, spread: 0.30 },
    { pair: 'Silver', price: 27.84, change: 0.09, pct: 0.32, high: 28.02, low: 27.61, spread: 0.05 },
    { pair: 'Oil (WTI)', price: 78.42, change: -0.53, pct: -0.67, high: 79.12, low: 78.05, spread: 0.03 },
    { pair: 'BTC/USD', price: 67234, change: 1402, pct: 2.13, high: 67890, low: 65420, spread: 15 },
  ]

  // Add small random variations to simulate live data
  return baseMarkets.map(m => ({
    ...m,
    price: +(m.price * (1 + (Math.random() - 0.5) * 0.001)).toFixed(m.price > 100 ? 2 : 4),
  }))
}

function getCalendarEvents(date: string) {
  return [
    { time: '02:00', currency: 'EUR', impact: 'medium', event: 'German CPI (YoY)', forecast: '2.4%', previous: '2.2%', actual: '2.5%', date },
    { time: '03:00', currency: 'EUR', impact: 'low', event: 'Italian Industrial Production (MoM)', forecast: '0.3%', previous: '-0.2%', actual: '', date },
    { time: '04:30', currency: 'GBP', impact: 'high', event: 'Construction PMI', forecast: '53.2', previous: '53.0', actual: '53.8', date },
    { time: '05:00', currency: 'EUR', impact: 'medium', event: 'Spanish Unemployment Change', forecast: '25.0K', previous: '28.9K', actual: '22.3K', date },
    { time: '07:00', currency: 'GBP', impact: 'high', event: 'MPC Member Mann Speaks', forecast: '', previous: '', actual: '', date },
    { time: '08:30', currency: 'USD', impact: 'high', event: 'Non-Farm Payrolls', forecast: '185K', previous: '175K', actual: '', date },
    { time: '08:30', currency: 'USD', impact: 'high', event: 'Unemployment Rate', forecast: '3.8%', previous: '3.8%', actual: '', date },
    { time: '08:30', currency: 'USD', impact: 'high', event: 'Average Hourly Earnings (MoM)', forecast: '0.2%', previous: '0.2%', actual: '', date },
    { time: '10:00', currency: 'USD', impact: 'medium', event: 'ISM Manufacturing PMI', forecast: '49.5', previous: '49.2', actual: '', date },
    { time: '10:00', currency: 'USD', impact: 'low', event: 'Construction Spending (MoM)', forecast: '0.2%', previous: '0.3%', actual: '', date },
    { time: '13:00', currency: 'USD', impact: 'medium', event: 'Fed Chair Powell Speaks', forecast: '', previous: '', actual: '', date },
    { time: '15:30', currency: 'USD', impact: 'low', event: 'Crude Oil Inventories', forecast: '-1.2M', previous: '-2.6M', actual: '', date },
    { time: '19:30', currency: 'AUD', impact: 'high', event: 'RBA Rate Decision', forecast: '4.35%', previous: '4.35%', actual: '', date },
    { time: '21:30', currency: 'AUD', impact: 'medium', event: 'RBA Monetary Policy Statement', forecast: '', previous: '', actual: '', date },
  ]
}

function getNewsData() {
  return [
    { id: 1, time: '10 min ago', category: 'Central Banks', title: 'Fed Officials Signal Patience on Rate Cuts Amid Sticky Inflation', source: 'Reuters', important: true, summary: 'Federal Reserve officials indicated they would take a patient approach to cutting interest rates.' },
    { id: 2, time: '25 min ago', category: 'Economy', title: 'US Jobs Report Expected to Show Solid Gains for March', source: 'Bloomberg', important: true, summary: 'Economists forecast non-farm payrolls increased by 185K in March.' },
    { id: 3, time: '45 min ago', category: 'Currencies', title: 'Yen Weakens Past 150 Level as BOJ Policy Divergence Widens', source: 'Nikkei', important: false, summary: 'The Japanese yen fell to its weakest level in decades against the dollar.' },
    { id: 4, time: '1 hr ago', category: 'Commodities', title: 'Gold Holds Near Record Highs on Geopolitical Tensions', source: 'CNBC', important: false, summary: 'Gold prices remain elevated near all-time highs as investors seek safe-haven assets.' },
    { id: 5, time: '2 hrs ago', category: 'Analysis', title: 'EUR/USD Technical Analysis: Key Support at 1.0800 Tested', source: 'ForexFactory', important: false, summary: 'The euro-dollar pair is testing a critical support level.' },
    { id: 6, time: '3 hrs ago', category: 'Economy', title: "ECB's Lagarde: Inflation Progress Encouraging", source: 'Financial Times', important: true, summary: 'ECB President noted progress on inflation but cautioned more data needed.' },
    { id: 7, time: '4 hrs ago', category: 'Currencies', title: 'Canadian Dollar Rises on Strong Employment Data', source: 'Reuters', important: false, summary: 'The Canadian dollar strengthened after better-than-expected job growth.' },
    { id: 8, time: '5 hrs ago', category: 'Commodities', title: 'Oil Prices Drop on Demand Concerns Despite OPEC+ Cuts', source: 'Bloomberg', important: false, summary: 'Crude oil prices fell as demand growth concerns outweighed OPEC+ cuts.' },
  ]
}

function getSentimentData() {
  return {
    'EUR/USD': { bullish: 58, bearish: 42 },
    'GBP/USD': { bullish: 45, bearish: 55 },
    'USD/JPY': { bullish: 65, bearish: 35 },
    'AUD/USD': { bullish: 40, bearish: 60 },
    'USD/CAD': { bullish: 52, bearish: 48 },
    'Gold': { bullish: 72, bearish: 28 },
    'BTC/USD': { bullish: 68, bearish: 32 },
  }
}

// ============================================
// Export for Cloudflare Pages
// ============================================
export const onRequest = handle(app)
