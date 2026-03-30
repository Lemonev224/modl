'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

// ── IMPORTANT: replace this with your own email ─────────────────────────────
const ADMIN_EMAIL = 'modl_tech@proton.me'

const c = { cream: '#F5F0E8', gold: '#C9A96E', black: '#0e0e0e', muted: '#8a7e6e', border: '#DDD8CE', surface: '#EDE8DF', red: '#c05050', green: '#4a8a5f' }

const s = {
  page: { padding: 'clamp(28px, 4vw, 48px)', maxWidth: 1100 },
  pageTitle: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: c.black, marginBottom: 4 },
  pageSubtitle: { fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: c.muted, marginBottom: 36 },
  card: { background: '#fff', border: `1px solid ${c.border}`, borderRadius: 16, padding: '24px 28px', marginBottom: 24 },
  label: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, marginBottom: 8, display: 'block' },
  input: { fontFamily: 'var(--font-body)', fontSize: 14, padding: '10px 14px', border: `1px solid ${c.border}`, borderRadius: 8, background: c.cream, color: c.black, outline: 'none', width: '100%' },
  btn: { fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, background: c.gold, color: c.black, border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', whiteSpace: 'nowrap' },
  btnRed: { fontFamily: 'var(--font-body)', fontSize: 12, background: 'transparent', color: c.red, border: `1px solid ${c.red}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer' },
  btnGreen: { fontFamily: 'var(--font-body)', fontSize: 12, background: 'transparent', color: c.green, border: `1px solid ${c.green}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer' },
}

function daysSince(dateStr) {
  if (!dateStr) return null
  const sent = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  return Math.floor((now - sent) / (1000 * 60 * 60 * 24))
}

function StatusBadge({ invoice }) {
  if (invoice.paid) {
    return <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, padding: '3px 10px', borderRadius: 20, background: '#eaf5ee', color: c.green }}>Paid</span>
  }
  const days = daysSince(invoice.sent_at)
  if (days === null) return null
  if (days >= 7) return <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, padding: '3px 10px', borderRadius: 20, background: '#fdecea', color: c.red }}>Overdue {days}d</span>
  if (days >= 3) return <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, padding: '3px 10px', borderRadius: 20, background: '#fdf3e6', color: '#a07828' }}>Due soon {days}d</span>
  return <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, padding: '3px 10px', borderRadius: 20, background: '#eaf0f8', color: '#4a6fa8' }}>Sent {days}d ago</span>
}

function Toast({ message, type }) {
  if (!message) return null
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 999, fontFamily: 'var(--font-body)', fontSize: 13, padding: '12px 20px', borderRadius: 10, background: type === 'error' ? c.red : c.black, color: c.cream, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
      {message}
    </div>
  )
}

export default function AdminPage() {
  const router = useRouter()
  const [authorised, setAuthorised] = useState(false)
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'success' })
  const [form, setForm] = useState({ user_email: '', amount: '', sent_at: new Date().toISOString().split('T')[0], notes: '' })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: '', type: 'success' }), 3500)
  }

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.email !== ADMIN_EMAIL) {
        router.replace('/dashboard/analytics')
        return
      }
      setAuthorised(true)
      fetchInvoices(supabase)
    }
    init()
  }, [])

  const fetchInvoices = async (supabaseInstance) => {
    setLoading(true)
    const supabase = supabaseInstance || createClient()
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('sent_at', { ascending: false })
    if (error) showToast('Failed to load invoices', 'error')
    else setInvoices(data || [])
    setLoading(false)
  }

  const handleSend = async () => {
    if (!form.user_email.trim()) return showToast('Email is required', 'error')
    if (!form.amount || isNaN(parseFloat(form.amount))) return showToast('Enter a valid amount', 'error')
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.from('invoices').insert([{
      user_email: form.user_email.trim().toLowerCase(),
      amount: parseFloat(form.amount),
      sent_at: form.sent_at,
      notes: form.notes.trim() || null,
      paid: false,
    }])
    setSaving(false)
    if (error) { showToast(error.message, 'error') }
    else {
      showToast('Invoice logged ✓')
      setForm({ user_email: '', amount: '', sent_at: new Date().toISOString().split('T')[0], notes: '' })
      setShowForm(false)
      fetchInvoices()
    }
  }

  const markPaid = async (id) => {
    const supabase = createClient()
    const { error } = await supabase.from('invoices').update({ paid: true, paid_at: new Date().toISOString().split('T')[0] }).eq('id', id)
    if (error) showToast('Failed to update', 'error')
    else { showToast('Marked as paid ✓'); fetchInvoices() }
  }

  const deleteInvoice = async (id) => {
    const supabase = createClient()
    const { error } = await supabase.from('invoices').delete().eq('id', id)
    if (error) showToast('Failed to delete', 'error')
    else { showToast('Deleted'); fetchInvoices() }
  }

  const formatDate = (d) => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  if (!authorised) return null

  const unpaid = invoices.filter(i => !i.paid)
  const paid = invoices.filter(i => i.paid)
  const overdue = unpaid.filter(i => daysSince(i.sent_at) >= 7)
  const totalOutstanding = unpaid.reduce((a, b) => a + parseFloat(b.amount), 0)

  return (
    <div style={s.page}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <p style={s.pageTitle}>Admin</p>
          <p style={s.pageSubtitle}>Invoice management and account overview.</p>
        </div>
        <button style={s.btn} onClick={() => setShowForm(v => !v)}>
          {showForm ? 'Cancel' : '+ Log invoice'}
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Outstanding', value: `$${totalOutstanding.toFixed(2)}` },
          { label: 'Unpaid invoices', value: unpaid.length },
          { label: 'Overdue (7d+)', value: overdue.length },
          { label: 'Total sent', value: invoices.length },
        ].map((stat, i) => (
          <div key={i} style={{ ...s.card, marginBottom: 0, background: i === 2 && overdue.length > 0 ? '#fdecea' : '#fff' }}>
            <span style={{ ...s.label, color: i === 2 && overdue.length > 0 ? c.red : c.muted }}>{stat.label}</span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 28px)', color: i === 2 && overdue.length > 0 ? c.red : c.black, lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Log invoice form */}
      {showForm && (
        <div style={{ ...s.card, background: c.surface }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: c.black, marginBottom: 16 }}>New invoice</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            <div>
              <label style={s.label}>Client email</label>
              <input style={s.input} type="email" placeholder="client@email.com" value={form.user_email}
                onChange={e => setForm(f => ({ ...f, user_email: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Amount ($)</label>
              <input style={s.input} type="number" min="0" step="0.01" placeholder="99.00" value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Date sent</label>
              <input style={s.input} type="date" value={form.sent_at}
                onChange={e => setForm(f => ({ ...f, sent_at: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Notes (optional)</label>
              <input style={s.input} placeholder="e.g. March 2025" value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
          </div>
          <button style={{ ...s.btn, marginTop: 16, opacity: saving ? 0.6 : 1 }} onClick={handleSend} disabled={saving}>
            {saving ? 'Saving…' : 'Log invoice'}
          </button>
        </div>
      )}

      {/* Unpaid invoices */}
      <div style={s.card}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: c.black, marginBottom: 20 }}>
          Unpaid
          {unpaid.length > 0 && <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, marginLeft: 8 }}>({unpaid.length})</span>}
        </p>

        {loading ? (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.muted, padding: '16px 0', textAlign: 'center' }}>Loading…</p>
        ) : unpaid.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.muted, padding: '16px 0', textAlign: 'center' }}>All invoices paid ✓</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Email', 'Amount', 'Sent', 'Status', 'Notes', ''].map((h, i) => (
                  <th key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, textAlign: 'left', padding: '0 16px 12px 0', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {unpaid.map(inv => (
                <tr key={inv.id} style={{ borderTop: `1px solid ${c.border}` }}>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, padding: '14px 16px 14px 0' }}>{inv.user_email}</td>
                  <td style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: c.black, padding: '14px 16px 14px 0', whiteSpace: 'nowrap' }}>${parseFloat(inv.amount).toFixed(2)}</td>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '14px 16px 14px 0', whiteSpace: 'nowrap' }}>{formatDate(inv.sent_at)}</td>
                  <td style={{ padding: '14px 16px 14px 0' }}><StatusBadge invoice={inv} /></td>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted, padding: '14px 16px 14px 0' }}>{inv.notes || '—'}</td>
                  <td style={{ padding: '14px 0' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={s.btnGreen} onClick={() => markPaid(inv.id)}>Mark paid</button>
                      <button style={s.btnRed} onClick={() => deleteInvoice(inv.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Paid invoices */}
      {paid.length > 0 && (
        <div style={s.card}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: c.black, marginBottom: 20 }}>
            Paid <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, marginLeft: 8 }}>({paid.length})</span>
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Email', 'Amount', 'Sent', 'Paid on', 'Notes'].map((h, i) => (
                  <th key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, textAlign: 'left', padding: '0 16px 12px 0', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paid.map(inv => (
                <tr key={inv.id} style={{ borderTop: `1px solid ${c.border}` }}>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '12px 16px 12px 0' }}>{inv.user_email}</td>
                  <td style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: c.muted, padding: '12px 16px 12px 0' }}>${parseFloat(inv.amount).toFixed(2)}</td>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '12px 16px 12px 0' }}>{formatDate(inv.sent_at)}</td>
                  <td style={{ padding: '12px 16px 12px 0' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, padding: '3px 10px', borderRadius: 20, background: '#eaf5ee', color: c.green }}>
                      {formatDate(inv.paid_at)}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted, padding: '12px 0' }}>{inv.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Toast message={toast.message} type={toast.type} />
    </div>
  )
}