// API Client for MyKira Eco News Hono Backend
// Works with both local development and Cloudflare deployment

const API_BASE = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || '/api'

interface ApiResponse<T> {
  data: T
  updated?: string
  error?: string
}

interface MarketData {
  pair: string
  price: number
  change: number
  pct: number
  high: number
  low: number
  spread?: number
}

interface CalendarEvent {
  time: string
  currency: string
  impact: 'high' | 'medium' | 'low'
  event: string
  forecast: string
  previous: string
  actual: string
  date: string
}

interface NewsItem {
  id: number
  time: string
  category: string
  title: string
  source: string
  important: boolean
  summary: string
}

interface SentimentData {
  [pair: string]: {
    bullish: number
    bearish: number
  }
}

// Fetch markets
export async function fetchMarkets(): Promise<ApiResponse<MarketData[]>> {
  try {
    const res = await fetch(`${API_BASE}/markets`)
    if (!res.ok) throw new Error('Failed to fetch markets')
    return await res.json()
  } catch (error) {
    console.error('API Error:', error)
    return { data: [] }
  }
}

// Fetch single market
export async function fetchMarket(pair: string): Promise<ApiResponse<MarketData>> {
  try {
    const res = await fetch(`${API_BASE}/markets/${pair}`)
    if (!res.ok) throw new Error('Market not found')
    return await res.json()
  } catch (error) {
    console.error('API Error:', error)
    return { data: {} as MarketData }
  }
}

// Fetch calendar
export async function fetchCalendar(params?: {
  date?: string
  impact?: string
  currency?: string
}): Promise<ApiResponse<CalendarEvent[]>> {
  try {
    const searchParams = new URLSearchParams()
    if (params?.date) searchParams.set('date', params.date)
    if (params?.impact) searchParams.set('impact', params.impact)
    if (params?.currency) searchParams.set('currency', params.currency)

    const res = await fetch(`${API_BASE}/calendar?${searchParams.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch calendar')
    return await res.json()
  } catch (error) {
    console.error('API Error:', error)
    return { data: [] }
  }
}

// Fetch news
export async function fetchNews(params?: {
  page?: number
  limit?: number
  category?: string
}): Promise<any> {
  try {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.category) searchParams.set('category', params.category)

    const res = await fetch(`${API_BASE}/news?${searchParams.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch news')
    return await res.json()
  } catch (error) {
    console.error('API Error:', error)
    return { data: [], pagination: { page: 1, total: 0 } }
  }
}

// Fetch sentiment
export async function fetchSentiment(): Promise<ApiResponse<SentimentData>> {
  try {
    const res = await fetch(`${API_BASE}/sentiment`)
    if (!res.ok) throw new Error('Failed to fetch sentiment')
    return await res.json()
  } catch (error) {
    console.error('API Error:', error)
    return { data: {} }
  }
}

// Health check
export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`)
    const data = await res.json()
    return data.status === 'ok'
  } catch {
    return false
  }
}
