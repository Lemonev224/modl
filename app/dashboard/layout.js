'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Playfair_Display, Inter } from 'next/font/google'
import '../globals.css'
import { createClient } from '@/lib/supabase'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-body' })

const nav = [
  { href: '/dashboard', label: 'Overview', icon: <OverviewIcon /> },
  { href: '/dashboard/earnings', label: 'Earnings', icon: <EarningsIcon /> },
  { href: '/dashboard/schedule', label: 'Schedule', icon: <ScheduleIcon /> },
  { href: '/dashboard/fans', label: 'Fan CRM', icon: <FansIcon /> },
  { href: '/dashboard/promotions', label: 'Promotions', icon: <PromoIcon /> },
  { href: '/dashboard/analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
  { href: '/dashboard/settings', label: 'Settings', icon: <SettingsIcon /> },
]

function Icon({ children }) {
  return <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, flexShrink: 0 }}>{children}</span>
}

function OverviewIcon() {
  return <Icon><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg></Icon>
}
function EarningsIcon() {
  return <Icon><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/><path d="M8 4.5v7M6 6.5c0-.8.9-1.5 2-1.5s2 .7 2 1.5S9.1 8 8 8s-2 .7-2 1.5S6.9 11 8 11s2-.7 2-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></Icon>
}
function ScheduleIcon() {
  return <Icon><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3" width="13" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M1.5 6.5h13M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></Icon>
}
function FansIcon() {
  return <Icon><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 13c0-2.5 2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M11 7.5c1.5.3 3 1.3 3 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="11.5" cy="4.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/></svg></Icon>
}
function PromoIcon() {
  return <Icon><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 10.5L13 3l-2.5 11-3-4-5.5.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M7.5 10l2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></Icon>
}
function AnalyticsIcon() {
  return <Icon><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12L5.5 7.5l3 2.5L12 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="4.5" r="1.5" fill="currentColor"/></svg></Icon>
}
function SettingsIcon() {
  return <Icon><svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.1 3.1l.7.7M12.2 12.2l.7.7M12.9 3.1l-.7.7M3.8 12.2l-.7.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg></Icon>
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const initial = user?.email?.[0]?.toUpperCase() ?? '?'
  const emailDisplay = user?.email ?? ''

  return (
    <div className={`${playfair.variable} ${inter.variable}`} style={{ display: 'flex', minHeight: '100vh', background: '#F5F0E8' }}>

      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 64 : 220,
        minHeight: '100vh',
        background: '#0e0e0e',
        display: 'flex',
        flexDirection: 'column',
        padding: collapsed ? '28px 0' : '28px 0',
        transition: 'width 0.22s ease',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        height: '100vh',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: collapsed ? '0 0 28px' : '0 24px 28px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
          {!collapsed && (
            <span style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 20, fontWeight: 500, letterSpacing: '0.2em', color: '#F5F0E8' }}>MODL</span>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a7e6e', padding: 4, display: 'flex', alignItems: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={collapsed ? 'M5 3l6 5-6 5' : 'M11 3L5 8l6 5'} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#1e1e1e', marginBottom: 16 }} />

        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, padding: collapsed ? '0 8px' : '0 12px' }}>
          {nav.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: collapsed ? '10px 0' : '10px 12px',
                  borderRadius: 8,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  background: active ? '#1a1a1a' : 'transparent',
                  color: active ? '#C9A96E' : '#8a7e6e',
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                }}>
                  {item.icon}
                  {!collapsed && (
                    <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 13, fontWeight: active ? 500 : 400, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Bottom — real user + sign out */}
        <div style={{ padding: collapsed ? '16px 8px 0' : '16px 12px 0', borderTop: '1px solid #1e1e1e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '8px 0' : '8px 12px', justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#C9A96E', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: '#0e0e0e', fontWeight: 500 }}>{initial}</span>
            </div>
            {!collapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#F5F0E8', margin: 0, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emailDisplay}</p>
                <button onClick={handleSignOut} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#8a7e6e', background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginTop: 2 }}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, minHeight: '100vh', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  )
}