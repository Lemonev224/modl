'use client'

import { useState } from 'react'

const c = { cream: '#F5F0E8', gold: '#C9A96E', black: '#0e0e0e', muted: '#8a7e6e', border: '#DDD8CE', surface: '#EDE8DF' }

const s = {
  page: { padding: 'clamp(28px, 4vw, 48px)', maxWidth: 1100 },
  pageTitle: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: c.black, marginBottom: 4 },
  pageSubtitle: { fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: c.muted, marginBottom: 36 },
  card: { background: '#fff', border: `1px solid ${c.border}`, borderRadius: 16, padding: '24px 28px' },
}

const growthData = [
  { month: 'Oct', subs: 180 },
  { month: 'Nov', subs: 210 },
  { month: 'Dec', subs: 245 },
  { month: 'Jan', subs: 262 },
  { month: 'Feb', subs: 289 },
  { month: 'Mar', subs: 312 },
]

const postPerformance = [
  { title: 'Exclusive video drop', date: '3 Mar', likes: 142, comments: 38, revenue: '£216' },
  { title: 'BTS photo set', date: '10 Mar', likes: 128, comments: 24, revenue: '£168' },
  { title: 'Weekend special PPV', date: '22 Mar', likes: 96, comments: 19, revenue: '£240' },
  { title: 'Story update', date: '25 Mar', likes: 74, comments: 12, revenue: '£0' },
  { title: 'Fan request content', date: '27 Mar', likes: 111, comments: 31, revenue: '£132' },
]

const postingTimes = [
  { time: '6am–9am', score: 22 },
  { time: '9am–12pm', score: 38 },
  { time: '12pm–3pm', score: 45 },
  { time: '3pm–6pm', score: 62 },
  { time: '6pm–9pm', score: 91 },
  { time: '9pm–12am', score: 78 },
  { time: '12am–3am', score: 34 },
]

const maxGrowth = Math.max(...growthData.map(d => d.subs))
const maxTime = Math.max(...postingTimes.map(d => d.score))

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('6m')

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <p style={s.pageTitle}>Analytics</p>
          <p style={s.pageSubtitle}>The data your agency was hiding from you.</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['1m', '3m', '6m', '1y'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              fontFamily: 'var(--font-body)', fontSize: 12, padding: '6px 14px', borderRadius: 8,
              border: `1px solid ${period === p ? c.gold : c.border}`,
              background: period === p ? c.gold : 'transparent',
              color: period === p ? c.black : c.muted, cursor: 'pointer',
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Key metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total subscribers', value: '312', change: '+8.0%', up: true },
          { label: 'Churn rate', value: '4.2%', change: '-0.8%', up: true },
          { label: 'Avg fan value', value: '£9.10', change: '+£0.40', up: true },
          { label: 'Content posts', value: '24', change: 'this month', neutral: true },
          { label: 'Avg engagement', value: '38%', change: '+4%', up: true },
        ].map((stat, i) => (
          <div key={i} style={s.card}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, display: 'block', marginBottom: 8 }}>{stat.label}</span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, color: c.black, lineHeight: 1, marginBottom: 6 }}>{stat.value}</p>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: stat.neutral ? c.muted : stat.up ? '#4a8a5f' : '#c05050' }}>
              {stat.neutral ? stat.change : (stat.up ? '↑ ' : '↓ ') + stat.change}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>

        {/* Subscriber growth chart */}
        <div style={s.card}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 4 }}>Subscriber growth</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, marginBottom: 24 }}>Last 6 months</p>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 120 }}>
            {growthData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: c.black, fontWeight: 500 }}>{d.subs}</span>
                <div style={{
                  width: '100%',
                  height: `${(d.subs / maxGrowth) * 90}px`,
                  background: i === growthData.length - 1 ? c.gold : '#EDE8DF',
                  borderRadius: '4px 4px 0 0',
                }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted }}>{d.month}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, padding: '14px 0', borderTop: `1px solid ${c.border}` }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, marginBottom: 2 }}>6-month growth</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#4a8a5f' }}>+73%</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, marginBottom: 2 }}>Avg new subs/month</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: c.black }}>22</p>
            </div>
          </div>
        </div>

        {/* Optimal posting times */}
        <div style={s.card}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 4 }}>Best posting times</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, marginBottom: 24 }}>Engagement score by hour</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {postingTimes.map((slot, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, width: 80, flexShrink: 0 }}>{slot.time}</span>
                <div style={{ flex: 1, height: 8, background: c.border, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(slot.score / maxTime) * 100}%`,
                    background: slot.score === maxTime ? c.gold : slot.score >= 70 ? '#a8843e' : '#DDD8CE',
                    borderRadius: 4,
                  }} />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: slot.score === maxTime ? c.gold : c.muted, width: 24, textAlign: 'right', fontWeight: slot.score === maxTime ? 500 : 400 }}>{slot.score}</span>
                {slot.score === maxTime && <span style={{ fontSize: 10, color: c.gold }}>★</span>}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '12px 14px', background: c.surface, borderRadius: 10 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.black }}>
              📍 Peak time: <strong style={{ color: c.gold }}>6pm–9pm</strong> — Post your best content here.
            </p>
          </div>
        </div>
      </div>

      {/* Top performing content */}
      <div style={s.card}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 20 }}>Top performing content</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Post', 'Date', 'Likes', 'Comments', 'Revenue'].map(h => (
                <th key={h} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, textAlign: 'left', padding: '0 0 12px', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {postPerformance.sort((a, b) => b.likes - a.likes).map((row, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${c.border}` }}>
                <td style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.black, padding: '14px 0' }}>{row.title}</td>
                <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '14px 0' }}>{row.date}</td>
                <td style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.black, padding: '14px 0' }}>{row.likes}</td>
                <td style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.black, padding: '14px 0' }}>{row.comments}</td>
                <td style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: row.revenue === '£0' ? c.muted : '#4a8a5f', padding: '14px 0' }}>{row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Churn insight */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 20 }}>
        <div style={{ ...s.card, background: c.black }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: '#F5F0E8', marginBottom: 8 }}>Churn insight</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#8a7e6e', marginBottom: 20, lineHeight: 1.6 }}>
            You&apos;re losing ~13 subscribers per month. At your current avg fan value of £9.10, that&apos;s <span style={{ color: c.gold }}>£118/month</span> slipping away.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#8a7e6e', lineHeight: 1.6 }}>
            Fans that lapse most often: those who <span style={{ color: '#F5F0E8' }}>subscribed in the last 30 days</span>. Consider a welcome sequence.
          </p>
        </div>
        <div style={s.card}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 16 }}>Retention rate</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ position: 'relative', width: 90, height: 90, flexShrink: 0 }}>
              <svg viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="45" cy="45" r="36" fill="none" stroke={c.border} strokeWidth="8" />
                <circle cx="45" cy="45" r="36" fill="none" stroke={c.gold} strokeWidth="8"
                  strokeDasharray={`${0.958 * 2 * Math.PI * 36} ${2 * Math.PI * 36}`}
                  strokeLinecap="round"
                />
              </svg>
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 18, color: c.black }}>95.8%</span>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, marginBottom: 4 }}>Monthly retention</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted, lineHeight: 1.6 }}>Strong. Industry avg is around 85–90%. You&apos;re above that.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}