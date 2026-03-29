'use client'

const c = {
  cream: '#F5F0E8', gold: '#C9A96E', black: '#0e0e0e',
  muted: '#8a7e6e', border: '#DDD8CE', surface: '#EDE8DF',
}

const s = {
  page: { padding: 'clamp(28px, 4vw, 48px)', maxWidth: 1100 },
  pageTitle: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: c.black, marginBottom: 4 },
  pageSubtitle: { fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: c.muted, marginBottom: 36 },
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 },
  card: { background: '#fff', border: `1px solid ${c.border}`, borderRadius: 16, padding: '24px 28px' },
  cardLabel: { fontFamily: 'var(--font-body), sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, marginBottom: 8 },
  cardValue: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 36, fontWeight: 400, color: c.black, lineHeight: 1 },
  cardChange: { fontFamily: 'var(--font-body), sans-serif', fontSize: 12, marginTop: 6 },
  sectionTitle: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 16 },
}

const stats = [
  { label: 'Monthly Revenue', value: '£2,840', change: '+12%', up: true },
  { label: 'Subscribers', value: '312', change: '+8 this week', up: true },
  { label: 'Avg Fan Value', value: '£9.10', change: '+£0.40', up: true },
  { label: 'Churn Rate', value: '4.2%', change: '-0.8%', up: true },
]

const recentActivity = [
  { action: 'New subscriber', detail: 'fan_x99', time: '2 min ago' },
  { action: 'PPV purchased', detail: '£12.00 tip received', time: '14 min ago' },
  { action: 'Post scheduled', detail: 'Tuesday 7pm', time: '1 hr ago' },
  { action: 'Promotion logged', detail: 'Reddit r/onlyfans101', time: '3 hr ago' },
  { action: 'New subscriber', detail: 'fan_blue22', time: '5 hr ago' },
]

const quickActions = [
  { label: 'Log earnings', href: '/dashboard/earnings' },
  { label: 'Schedule a post', href: '/dashboard/schedule' },
  { label: 'Add a promotion', href: '/dashboard/promotions' },
  { label: 'View analytics', href: '/dashboard/analytics' },
]

// Simple bar chart using divs
const weeklyData = [
  { day: 'Mon', value: 320 },
  { day: 'Tue', value: 480 },
  { day: 'Wed', value: 390 },
  { day: 'Thu', value: 610 },
  { day: 'Fri', value: 540 },
  { day: 'Sat', value: 720 },
  { day: 'Sun', value: 490 },
]
const maxVal = Math.max(...weeklyData.map(d => d.value))

export default function DashboardPage() {
  return (
    <div style={s.page}>
      <p style={s.pageTitle}>Good morning</p>
      <p style={s.pageSubtitle}>Here&apos;s how your account is performing.</p>

      {/* Stats */}
      <div style={s.grid4}>
        {stats.map((stat, i) => (
          <div key={i} style={s.card}>
            <p style={s.cardLabel}>{stat.label}</p>
            <p style={s.cardValue}>{stat.value}</p>
            <p style={{ ...s.cardChange, color: stat.up ? '#5a9e6f' : '#c0392b' }}>
              {stat.up ? '↑' : '↓'} {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div style={s.grid2}>
        {/* Weekly revenue chart */}
        <div style={s.card}>
          <p style={s.sectionTitle}>This week</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
            {weeklyData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{
                  width: '100%',
                  height: `${(d.value / maxVal) * 80}px`,
                  background: i === 5 ? c.gold : c.border,
                  borderRadius: 4,
                  transition: 'background 0.2s',
                }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted }}>{d.day}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted, marginTop: 12 }}>
            £{weeklyData.reduce((a, b) => a + b.value, 0).toLocaleString()} total this week
          </p>
        </div>

        {/* Recent activity */}
        <div style={s.card}>
          <p style={s.sectionTitle}>Recent activity</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentActivity.map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '11px 0',
                borderBottom: i < recentActivity.length - 1 ? `1px solid ${c.border}` : 'none',
              }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, margin: 0 }}>{item.action}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted, margin: 0 }}>{item.detail}</p>
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, whiteSpace: 'nowrap', marginLeft: 12 }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ ...s.card, background: c.black }}>
          <p style={{ ...s.sectionTitle, color: '#F5F0E8' }}>Quick actions</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {quickActions.map((a, i) => (
              <a key={i} href={a.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 16px', borderRadius: 10,
                  border: '1px solid #1e1e1e',
                  transition: 'border-color 0.15s, background 0.15s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = c.gold }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#1e1e1e' }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#F5F0E8' }}>{a.label}</span>
                  <span style={{ color: c.gold, fontSize: 14 }}>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Earnings breakdown */}
        <div style={s.card}>
          <p style={s.sectionTitle}>Earnings breakdown</p>
          {[
            { label: 'Subscriptions', value: '£1,620', pct: 57 },
            { label: 'Pay-per-view', value: '£840', pct: 30 },
            { label: 'Tips', value: '£380', pct: 13 },
          ].map((row, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black }}>{row.label}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted }}>{row.value}</span>
              </div>
              <div style={{ height: 4, borderRadius: 4, background: c.border, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${row.pct}%`, background: c.gold, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}