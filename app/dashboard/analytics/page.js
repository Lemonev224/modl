'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

const c = { cream: '#F5F0E8', gold: '#C9A96E', black: '#0e0e0e', muted: '#8a7e6e', border: '#DDD8CE', surface: '#EDE8DF' }

const s = {
  page: { padding: 'clamp(28px, 4vw, 48px)', maxWidth: 1100 },
  pageTitle: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: c.black, marginBottom: 4 },
  pageSubtitle: { fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: c.muted, marginBottom: 36 },
  card: { background: '#fff', border: `1px solid ${c.border}`, borderRadius: 16, padding: '24px 28px' },
}

const PERIODS = ['1m', '3m', '6m', '1y']

function getMonthsBack(n) {
  const months = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(1)
    d.setMonth(d.getMonth() - i)
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('en-GB', { month: 'short' }),
    })
  }
  return months
}

function periodToMonths(p) {
  return p === '1m' ? 1 : p === '3m' ? 3 : p === '6m' ? 6 : 12
}

export default function AnalyticsPage() {
  const [entries, setEntries] = useState([])
  const [rosterCreators, setRosterCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('6m')

  useEffect(() => {
const fetch = async () => {
  setLoading(true)
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { setLoading(false); return }
  const [{ data: earningsData }, { data: creatorsData }] = await Promise.all([
    supabase.from('earnings').select('*').eq('user_id', user.id).order('date', { ascending: false }),
    supabase.from('creators').select('id, name, handle, status').eq('user_id', user.id).order('name'),
  ])
      setEntries(earningsData || [])
      setRosterCreators(creatorsData || [])
      setLoading(false)
    }
    fetch()
  }, [])

  // ── Filter entries to selected period ──────────────────────────────────────
  const monthCount = periodToMonths(period)
  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - monthCount)
  cutoff.setDate(1)
  const periodEntries = entries.filter(e => new Date(e.date + 'T00:00:00') >= cutoff)

  // ── Key metrics ────────────────────────────────────────────────────────────
  const totalRevenue = periodEntries.reduce((a, b) => a + parseFloat(b.amount), 0)
  const subRevenue   = periodEntries.filter(e => e.type === 'Subscription').reduce((a, b) => a + parseFloat(b.amount), 0)
  const ppvRevenue   = periodEntries.filter(e => e.type === 'PPV').reduce((a, b) => a + parseFloat(b.amount), 0)
  const tipRevenue   = periodEntries.filter(e => e.type === 'Tip').reduce((a, b) => a + parseFloat(b.amount), 0)

  // ── Monthly revenue for chart ──────────────────────────────────────────────
  const months = getMonthsBack(monthCount === 1 ? 1 : monthCount)
  const monthlyRevenue = months.map(({ key, label }) => {
    const total = entries
      .filter(e => e.date?.startsWith(key))
      .reduce((a, b) => a + parseFloat(b.amount), 0)
    return { label, total, key }
  })
  const maxMonthly = Math.max(...monthlyRevenue.map(m => m.total), 1)

  // ── Per-creator breakdown ──────────────────────────────────────────────────
  const creatorBreakdown = Array.from(new Set(periodEntries.map(e => e.creator)))
    .map(name => {
      const rows = periodEntries.filter(e => e.creator === name)
      return {
        name,
        total: rows.reduce((a, b) => a + parseFloat(b.amount), 0),
        subs:  rows.filter(e => e.type === 'Subscription').reduce((a, b) => a + parseFloat(b.amount), 0),
        ppv:   rows.filter(e => e.type === 'PPV').reduce((a, b) => a + parseFloat(b.amount), 0),
        tips:  rows.filter(e => e.type === 'Tip').reduce((a, b) => a + parseFloat(b.amount), 0),
        entries: rows.length,
      }
    })
    .sort((a, b) => b.total - a.total)

  const topEarner = creatorBreakdown[0] ?? null
  const activeCreators = rosterCreators.filter(c => c.status === 'Active').length

  const postingTimes = [
    { time: '6am–9am', score: 22 },
    { time: '9am–12pm', score: 38 },
    { time: '12pm–3pm', score: 45 },
    { time: '3pm–6pm', score: 62 },
    { time: '6pm–9pm', score: 91 },
    { time: '9pm–12am', score: 78 },
    { time: '12am–3am', score: 34 },
  ]
  const maxTime = 91

  if (loading) {
    return (
      <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.muted }}>Loading analytics…</p>
      </div>
    )
  }

  return (
    <div style={s.page}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <p style={s.pageTitle}>Analytics</p>
          <p style={s.pageSubtitle}>Real numbers from your roster.</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              fontFamily: 'var(--font-body)', fontSize: 12, padding: '6px 14px', borderRadius: 8,
              border: `1px solid ${period === p ? c.gold : c.border}`,
              background: period === p ? c.gold : 'transparent',
              color: period === p ? c.black : c.muted, cursor: 'pointer',
            }}>{p}</button>
          ))}
        </div>
      </div>

      {periodEntries.length === 0 ? (
        <div style={{ ...s.card, textAlign: 'center', padding: '48px 28px', marginBottom: 28 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: c.black, marginBottom: 8 }}>No earnings logged yet</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.muted }}>
            Head to <a href="/dashboard/earnings" style={{ color: c.gold }}>Earnings</a> to log your first entry — analytics will populate automatically.
          </p>
        </div>
      ) : (
        <>
          {/* ── Key metrics ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'Total revenue', value: `$${totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
              { label: 'Subscriptions', value: `$${subRevenue.toFixed(2)}` },
              { label: 'Pay-per-view', value: `$${ppvRevenue.toFixed(2)}` },
              { label: 'Tips', value: `$${tipRevenue.toFixed(2)}` },
              { label: 'Creators tracked', value: creatorBreakdown.length },
              { label: 'Active on roster', value: activeCreators },
            ].map((stat, i) => (
              <div key={i} style={s.card}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, display: 'block', marginBottom: 8 }}>{stat.label}</span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 2.5vw, 28px)', fontWeight: 400, color: c.black, lineHeight: 1, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>

            {/* ── Monthly revenue chart ── */}
            <div style={s.card}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 4 }}>Revenue over time</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, marginBottom: 24 }}>
                {period === '1m' ? 'This month' : `Last ${period}`}
              </p>
              {monthCount === 1 ? (
                // Single month — show type breakdown instead of a 1-bar chart
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Subscriptions', value: subRevenue, color: '#4a6fa8' },
                    { label: 'Pay-per-view', value: ppvRevenue, color: c.gold },
                    { label: 'Tips', value: tipRevenue, color: '#4a8a5f' },
                  ].map((row, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black }}>{row.label}</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted }}>${row.value.toFixed(2)}</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 4, background: c.border, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${totalRevenue > 0 ? (row.value / totalRevenue) * 100 : 0}%`, background: row.color, borderRadius: 4 }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
                    {monthlyRevenue.map((m, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                        {m.total > 0 && <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, color: c.muted }}>{m.total >= 1000 ? `$${(m.total/1000).toFixed(1)}k` : `$${Math.round(m.total)}`}</span>}
                        <div style={{
                          width: '100%',
                          height: `${(m.total / maxMonthly) * 100}px`,
                          minHeight: m.total > 0 ? 4 : 0,
                          background: i === monthlyRevenue.length - 1 ? c.gold : '#EDE8DF',
                          borderRadius: '4px 4px 0 0',
                        }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted }}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, padding: '14px 0', borderTop: `1px solid ${c.border}` }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, marginBottom: 2 }}>Period total</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 2vw, 22px)', color: c.black, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>${totalRevenue.toFixed(2)}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, marginBottom: 2 }}>Avg per month</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 2vw, 22px)', color: c.black, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>${(totalRevenue / monthCount).toFixed(2)}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ── Best posting times (industry benchmark) ── */}
            <div style={s.card}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 4 }}>Best posting times</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, marginBottom: 24 }}>Industry engagement benchmark</p>
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
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.black, margin: 0 }}>
                  📍 Peak time: <strong style={{ color: c.gold }}>6pm–9pm</strong> — post your best content here.
                </p>
              </div>
            </div>
          </div>

          {/* ── Per-creator revenue table ── */}
          {creatorBreakdown.length > 0 && (
            <div style={{ ...s.card, marginBottom: 28 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 20 }}>Revenue by creator</p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Creator', 'Subscriptions', 'PPV', 'Tips', 'Total', 'Share'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, textAlign: 'left', padding: '0 16px 12px 0', fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {creatorBreakdown.map((row, i) => (
                    <tr key={i} style={{ borderTop: `1px solid ${c.border}` }}>
                      <td style={{ padding: '14px 16px 14px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: i === 0 ? c.gold : c.surface,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: i === 0 ? c.black : c.muted, fontWeight: 500 }}>
                              {row.name.replace('@', '').slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.black, margin: 0 }}>{row.name}</p>
                            {i === 0 && <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: c.gold, margin: 0 }}>★ Top earner</p>}
                          </div>
                        </div>
                      </td>
                      <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '14px 16px 14px 0' }}>${row.subs.toFixed(2)}</td>
                      <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '14px 16px 14px 0' }}>${row.ppv.toFixed(2)}</td>
                      <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '14px 16px 14px 0' }}>${row.tips.toFixed(2)}</td>
                      <td style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(13px, 1.5vw, 18px)', color: c.black, padding: '14px 16px 14px 0', fontWeight: 400, whiteSpace: 'nowrap' }}>${row.total.toFixed(2)}</td>
                      <td style={{ padding: '14px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 60, height: 4, background: c.border, borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${totalRevenue > 0 ? (row.total / totalRevenue) * 100 : 0}%`, background: c.gold, borderRadius: 4 }} />
                          </div>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted }}>
                            {totalRevenue > 0 ? `${((row.total / totalRevenue) * 100).toFixed(0)}%` : '—'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Top earner spotlight + revenue split ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>

            {topEarner && (
              <div style={{ ...s.card, background: c.black }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7e6e', marginBottom: 8 }}>
                  Top earner — {period}
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#F5F0E8', marginBottom: 4, margin: '0 0 4px' }}>{topEarner.name}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 36px)', color: c.gold, lineHeight: 1, marginBottom: 20, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  ${topEarner.total.toFixed(2)}
                </p>
                {[
                  { label: 'Subs', value: `$${topEarner.subs.toFixed(2)}` },
                  { label: 'PPV', value: `$${topEarner.ppv.toFixed(2)}` },
                  { label: 'Tips', value: `$${topEarner.tips.toFixed(2)}` },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid #1e1e1e' : 'none' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#8a7e6e' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#F5F0E8' }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, padding: '10px 12px', background: '#1a1a1a', borderRadius: 8 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#8a7e6e', margin: 0 }}>
                    {totalRevenue > 0 ? `${((topEarner.total / totalRevenue) * 100).toFixed(0)}% of total agency revenue` : '—'}
                  </p>
                </div>
              </div>
            )}

            <div style={s.card}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 20 }}>Revenue split</p>
              {[
                { label: 'Subscriptions', value: subRevenue, color: '#4a6fa8' },
                { label: 'Pay-per-view', value: ppvRevenue, color: c.gold },
                { label: 'Tips', value: tipRevenue, color: '#4a8a5f' },
              ].map((row, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted }}>
                      ${row.value.toFixed(2)} {totalRevenue > 0 && `(${((row.value / totalRevenue) * 100).toFixed(0)}%)`}
                    </span>
                  </div>
                  <div style={{ height: 4, borderRadius: 4, background: c.border, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${totalRevenue > 0 ? (row.value / totalRevenue) * 100 : 0}%`, background: row.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}