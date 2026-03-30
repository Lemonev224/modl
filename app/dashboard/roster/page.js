'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

const c = {
  cream: '#F5F0E8',
  gold: '#C9A96E',
  black: '#0e0e0e',
  muted: '#8a7e6e',
  border: '#DDD8CE',
  surface: '#EDE8DF',
}

const s = {
  page: { padding: 'clamp(28px, 4vw, 48px)', maxWidth: 1200 },
  pageTitle: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 'clamp(24px, 3vw, 36px)',
    fontWeight: 400,
    color: c.black,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 14,
    color: c.muted,
    marginBottom: 36,
  },
  card: {
    background: '#fff',
    border: `1px solid ${c.border}`,
    borderRadius: 16,
    padding: '24px 28px',
  },
  label: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: c.muted,
    marginBottom: 8,
    display: 'block',
  },
  input: {
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    padding: '10px 14px',
    border: `1px solid ${c.border}`,
    borderRadius: 8,
    background: c.cream,
    color: c.black,
    outline: 'none',
    width: '100%',
  },
  btn: {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    fontWeight: 500,
    background: c.gold,
    color: c.black,
    border: 'none',
    borderRadius: 8,
    padding: '10px 20px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  ghostBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    background: 'transparent',
    border: `1px solid ${c.border}`,
    color: c.muted,
    borderRadius: 8,
    padding: '7px 14px',
    cursor: 'pointer',
  },
}

const STATUS_OPTIONS = ['Active', 'On hold', 'Inactive']
const PLATFORM_OPTIONS = ['OnlyFans', 'Fansly', 'Both']

const statusStyle = (status) => {
  const map = {
    'Active': { bg: '#eaf5ee', color: '#4a8a5f' },
    'On hold': { bg: '#fdf3e6', color: '#a07828' },
    'Inactive': { bg: '#f2f2f0', color: '#8a7e6e' },
  }
  return map[status] ?? map['Active']
}

function Toast({ message, type, onClear }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onClear, 3000)
    return () => clearTimeout(t)
  }, [message, onClear])
  if (!message) return null
  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
      fontFamily: 'var(--font-body)', fontSize: 13,
      padding: '12px 20px', borderRadius: 10,
      background: type === 'error' ? '#c05050' : c.black,
      color: c.cream, boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
      transition: 'opacity 0.2s',
    }}>
      {message}
    </div>
  )
}

function Avatar({ name, size = 44, highlight = false }) {
  const initials = (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: highlight ? c.gold : c.surface,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: highlight ? `2px solid ${c.gold}` : `1px solid ${c.border}`,
    }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: size * 0.28, fontWeight: 500, color: highlight ? c.black : c.muted }}>
        {initials}
      </span>
    </div>
  )
}

function StatPill({ label, value }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: c.black, margin: 0 }}>{value}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{label}</p>
    </div>
  )
}

const emptyForm = {
  name: '',
  handle: '',
  platform: 'OnlyFans',
  cut: '',
  status: 'Active',
  joined: new Date().toISOString().split('T')[0],
  notes: '',
  monthly_goal: '',
}

export default function RosterPage() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState(null) // creator id
  const [showForm, setShowForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [toast, setToast] = useState({ message: '', type: 'success' })
  const [deleteConfirm, setDeleteConfirm] = useState(null) // creator id to confirm delete



  const showToast = (message, type = 'success') => setToast({ message, type })

  // ── Data fetching ──────────────────────────────────────────────────────────
  const fetchCreators = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('user_id', user.id) 
      .order('created_at', { ascending: false })
    if (error) showToast('Failed to load roster', 'error')
    else setCreators(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchCreators() }, [])

  // ── Derived values ─────────────────────────────────────────────────────────
  const filtered = creators.filter(c => {
    const matchSearch = !search || c.name?.toLowerCase().includes(search.toLowerCase()) || c.handle?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const selectedCreator = creators.find(c => c.id === selected) ?? null

  const activeCount = creators.filter(c => c.status === 'Active').length
  const avgCut = creators.length
    ? Math.round(creators.reduce((a, b) => a + (parseFloat(b.cut) || 0), 0) / creators.length)
    : 0

  // ── Form actions ───────────────────────────────────────────────────────────
  const openAddForm = () => {
    setForm(emptyForm)
    setEditMode(false)
    setShowForm(true)
    setSelected(null)
  }

  const openEditForm = (creator) => {
    setForm({
      name: creator.name ?? '',
      handle: creator.handle ?? '',
      platform: creator.platform ?? 'OnlyFans',
      cut: creator.cut ?? '',
      status: creator.status ?? 'Active',
      joined: creator.joined ?? new Date().toISOString().split('T')[0],
      notes: creator.notes ?? '',
      monthly_goal: creator.monthly_goal ?? '',
    })
    setEditMode(true)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name.trim()) return showToast('Name is required', 'error')
    if (!form.handle.trim()) return showToast('Handle is required', 'error')
    if (!form.cut || isNaN(parseFloat(form.cut))) return showToast('Enter a valid agency cut %', 'error')

    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser() 
    const payload = {
      name: form.name.trim(),
      handle: form.handle.trim().startsWith('@') ? form.handle.trim() : `@${form.handle.trim()}`,
      platform: form.platform,
      cut: parseFloat(form.cut),
      status: form.status,
      joined: form.joined,
      notes: form.notes.trim(),
      monthly_goal: form.monthly_goal ? parseFloat(form.monthly_goal) : null,
      user_id: user.id,
    }

    let error
    if (editMode && selected) {
      ;({ error } = await supabase.from('creators').update(payload).eq('id', selected))
    } else {
      ;({ error } = await supabase.from('creators').insert([payload]))
    }
    setSaving(false)

    if (error) {
      showToast(error.message, 'error')
    } else {
      showToast(editMode ? 'Creator updated ✓' : 'Creator added ✓')
      setShowForm(false)
      setSelected(null)
      fetchCreators()
    }
  }

  const handleDelete = async (id) => {
    const supabase = createClient()
    const { error } = await supabase.from('creators').delete().eq('id', id)
    if (error) showToast(error.message, 'error')
    else {
      showToast('Creator removed')
      setSelected(null)
      setDeleteConfirm(null)
      fetchCreators()
    }
  }

  const handleStatusToggle = async (creator) => {
    const next = creator.status === 'Active' ? 'On hold' : 'Active'
    const supabase = createClient()
    const { error } = await supabase.from('creators').update({ status: next }).eq('id', creator.id)
    if (error) showToast(error.message, 'error')
    else {
      showToast(`${creator.name} marked as ${next}`)
      fetchCreators()
    }
  }

  const f = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={s.page}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <p style={s.pageTitle}>Roster</p>
          <p style={s.pageSubtitle}>Every creator you manage. All in one place.</p>
        </div>
        <button style={s.btn} onClick={showForm ? () => setShowForm(false) : openAddForm}>
          {showForm ? 'Cancel' : '+ Add creator'}
        </button>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total creators', value: creators.length },
          { label: 'Active', value: activeCount },
          { label: 'On hold', value: creators.filter(c => c.status === 'On hold').length },
          { label: 'Avg agency cut', value: `${avgCut}%` },
        ].map((stat, i) => (
          <div key={i} style={{ ...s.card, borderColor: i === 1 ? c.gold : c.border }}>
            <span style={s.label}>{stat.label}</span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, color: i === 1 ? c.gold : c.black, lineHeight: 1 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <div style={{ ...s.card, marginBottom: 24, background: c.surface, borderColor: c.gold }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 20 }}>
            {editMode ? 'Edit creator' : 'New creator'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            <div>
              <label style={s.label}>Full name</label>
              <input style={s.input} placeholder="e.g. Scarlett Rose" value={form.name} onChange={f('name')} />
            </div>
            <div>
              <label style={s.label}>Handle</label>
              <input style={s.input} placeholder="@username" value={form.handle} onChange={f('handle')} />
            </div>
            <div>
              <label style={s.label}>Platform</label>
              <select style={s.input} value={form.platform} onChange={f('platform')}>
                {PLATFORM_OPTIONS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={s.label}>Agency cut (%)</label>
              <input type="number" min="0" max="100" step="1" style={s.input} placeholder="e.g. 30" value={form.cut} onChange={f('cut')} />
            </div>
            <div>
              <label style={s.label}>Status</label>
              <select style={s.input} value={form.status} onChange={f('status')}>
                {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={s.label}>Joined</label>
              <input type="date" style={s.input} value={form.joined} onChange={f('joined')} />
            </div>
            <div>
              <label style={s.label}>Monthly goal ($)</label>
              <input type="number" min="0" style={s.input} placeholder="Optional" value={form.monthly_goal} onChange={f('monthly_goal')} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={s.label}>Notes</label>
              <textarea
                style={{ ...s.input, height: 72, resize: 'none', lineHeight: 1.5 }}
                placeholder="Add any internal notes about this creator..."
                value={form.notes}
                onChange={f('notes')}
              />
            </div>
          </div>

          {/* Live split preview */}
          {form.cut && !isNaN(parseFloat(form.cut)) && (
            <div style={{ marginTop: 16, display: 'flex', gap: 24, padding: '12px 16px', background: '#fff', border: `1px solid ${c.border}`, borderRadius: 10, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, margin: '0 0 2px' }}>Agency receives</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: c.gold, margin: 0 }}>{parseFloat(form.cut).toFixed(0)}%</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, margin: '0 0 2px' }}>Creator receives</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: c.black, margin: 0 }}>{(100 - parseFloat(form.cut)).toFixed(0)}%</p>
              </div>
              {form.monthly_goal && !isNaN(parseFloat(form.monthly_goal)) && (
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, margin: '0 0 2px' }}>Agency at goal</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: c.muted, margin: 0 }}>
                    ${(parseFloat(form.monthly_goal) * parseFloat(form.cut) / 100).toFixed(0)}/mo
                  </p>
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button style={{ ...s.btn, opacity: saving ? 0.6 : 1 }} onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : editMode ? 'Save changes' : 'Add to roster'}
            </button>
            <button style={s.ghostBtn} onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Main content: list + detail panel */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedCreator ? '1fr 360px' : '1fr', gap: 20, alignItems: 'start' }}>

        {/* Creator list */}
        <div style={s.card}>

          {/* Search + filter bar */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: 180, position: 'relative' }}>
              <input
                style={{ ...s.input, paddingLeft: 36 }}
                placeholder="Search creators…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: c.muted, pointerEvents: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M10.5 10.5l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </span>
            </div>
            {['All', ...STATUS_OPTIONS].map(opt => (
              <button key={opt} onClick={() => setStatusFilter(opt)} style={{
                fontFamily: 'var(--font-body)', fontSize: 12, padding: '6px 14px', borderRadius: 20,
                border: `1px solid ${statusFilter === opt ? c.gold : c.border}`,
                background: statusFilter === opt ? c.gold : 'transparent',
                color: statusFilter === opt ? c.black : c.muted, cursor: 'pointer',
              }}>{opt}</button>
            ))}
          </div>

          {/* Table */}
          {loading ? (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.muted, textAlign: 'center', padding: '32px 0' }}>Loading roster…</p>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: c.black, marginBottom: 8 }}>
                {creators.length === 0 ? 'No creators yet' : 'No results'}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.muted }}>
                {creators.length === 0 ? 'Add your first creator to get started.' : 'Try a different search or filter.'}
              </p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Creator', 'Handle', 'Platform', 'Cut', 'Status', 'Joined', ''].map((h, i) => (
                    <th key={i} style={{
                      fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: c.muted, textAlign: 'left',
                      padding: '0 12px 12px 0', fontWeight: 400,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((creator) => {
                  const isSelected = selected === creator.id
                  const st = statusStyle(creator.status)
                  return (
                    <tr
                      key={creator.id}
                      onClick={() => setSelected(isSelected ? null : creator.id)}
                      style={{
                        borderTop: `1px solid ${c.border}`,
                        background: isSelected ? '#fff8ef' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.12s',
                      }}
                    >
                      <td style={{ padding: '13px 12px 13px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar name={creator.name} size={36} highlight={creator.status === 'Active'} />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.black, fontWeight: 500 }}>
                            {creator.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '13px 12px 13px 0' }}>
                        {creator.handle}
                      </td>
                      <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, padding: '13px 12px 13px 0' }}>
                        {creator.platform}
                      </td>
                      <td style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: c.gold, padding: '13px 12px 13px 0' }}>
                        {creator.cut}%
                      </td>
                      <td style={{ padding: '13px 12px 13px 0' }}>
                        <span style={{
                          fontFamily: 'var(--font-body)', fontSize: 11,
                          padding: '3px 10px', borderRadius: 20,
                          background: st.bg, color: st.color,
                        }}>
                          {creator.status}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted, padding: '13px 12px 13px 0', whiteSpace: 'nowrap' }}>
                        {creator.joined
                          ? new Date(creator.joined + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
                          : '—'}
                      </td>
                      <td style={{ padding: '13px 0', textAlign: 'right' }}>
                        <span style={{ color: isSelected ? c.gold : c.border, fontSize: 16 }}>›</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail panel */}
        {selectedCreator && (
          <div style={{ ...s.card, position: 'sticky', top: 24 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={selectedCreator.name} size={48} highlight={selectedCreator.status === 'Active'} />
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: c.black, margin: '0 0 2px' }}>{selectedCreator.name}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, margin: 0 }}>{selectedCreator.handle}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: c.muted, cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: 4 }}>×</button>
            </div>

            {/* Status badge */}
            <div style={{ marginBottom: 20 }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: 12,
                padding: '4px 12px', borderRadius: 20,
                ...statusStyle(selectedCreator.status),
              }}>
                {selectedCreator.status}
              </span>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, padding: '16px 0' }}>
              <StatPill label="Cut" value={`${selectedCreator.cut}%`} />
              <div style={{ width: 1, background: c.border, margin: '0 20px' }} />
              <StatPill label="Platform" value={selectedCreator.platform ?? '—'} />
              {selectedCreator.monthly_goal && (
                <>
                  <div style={{ width: 1, background: c.border, margin: '0 20px' }} />
                  <StatPill label="Goal/mo" value={`$${parseFloat(selectedCreator.monthly_goal).toLocaleString()}`} />
                </>
              )}
            </div>

            {/* Details list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 20 }}>
              {[
                { label: 'Joined', value: selectedCreator.joined ? new Date(selectedCreator.joined + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
                { label: 'Agency cut', value: `${selectedCreator.cut}%` },
                { label: 'Creator payout', value: `${100 - selectedCreator.cut}%` },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${c.border}` }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Notes */}
            {selectedCreator.notes && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ ...s.label, marginBottom: 6 }}>Notes</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, lineHeight: 1.6, padding: '10px 14px', background: c.surface, borderRadius: 8, margin: 0 }}>
                  {selectedCreator.notes}
                </p>
              </div>
            )}

            {/* Monthly goal progress (placeholder — link to earnings data in production) */}
            {selectedCreator.monthly_goal && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted }}>Monthly goal</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted }}>${parseFloat(selectedCreator.monthly_goal).toLocaleString()}</span>
                </div>
                <div style={{ height: 6, borderRadius: 4, background: c.border }}>
                  <div style={{ height: '100%', width: '0%', background: c.gold, borderRadius: 4 }} />
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, marginTop: 4 }}>
                  Link earnings to track progress
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                style={s.btn}
                onClick={() => { openEditForm(selectedCreator) }}
              >
                Edit creator
              </button>
              <button
                style={{ ...s.ghostBtn, width: '100%' }}
                onClick={() => handleStatusToggle(selectedCreator)}
              >
                {selectedCreator.status === 'Active' ? 'Mark as on hold' : 'Mark as active'}
              </button>
              {deleteConfirm === selectedCreator.id ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    style={{ ...s.ghostBtn, flex: 1, color: '#c05050', borderColor: '#c05050' }}
                    onClick={() => handleDelete(selectedCreator.id)}
                  >
                    Confirm remove
                  </button>
                  <button style={{ ...s.ghostBtn, flex: 1 }} onClick={() => setDeleteConfirm(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  style={{ ...s.ghostBtn, width: '100%', color: '#c05050', borderColor: 'transparent' }}
                  onClick={() => setDeleteConfirm(selectedCreator.id)}
                >
                  Remove from roster
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <Toast message={toast.message} type={toast.type} onClear={() => setToast({ message: '', type: 'success' })} />
    </div>
  )
}