'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const c = { gold: '#C9A96E', black: '#0e0e0e', muted: '#8a7e6e', border: '#DDD8CE' }

export default function InvoiceWarning() {
  const router = useRouter()
  const [invoice, setInvoice] = useState(null)
  const [dismissed, setDismissed] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const check = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUserEmail(user.email)

      // Check if already dismissed today
      const key = `modl_invoice_warning_${new Date().toISOString().split('T')[0]}`
      if (localStorage.getItem(key)) return

      // Look for unpaid invoices 3+ days old for this user
      const { data } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_email', user.email.toLowerCase())
        .eq('paid', false)
        .order('sent_at', { ascending: false })
        .limit(1)

      if (!data || data.length === 0) return

      const inv = data[0]
      const days = Math.floor((new Date() - new Date(inv.sent_at + 'T00:00:00')) / (1000 * 60 * 60 * 24))

      if (days >= 3) setInvoice({ ...inv, days })
    }
    check()
  }, [])

  const dismiss = () => {
    const key = `modl_invoice_warning_${new Date().toISOString().split('T')[0]}`
    localStorage.setItem(key, '1')
    setDismissed(true)
  }

  if (!invoice || dismissed) return null

  const isOverdue = invoice.days >= 7

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, backdropFilter: 'blur(2px)' }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        zIndex: 1001, width: '90%', maxWidth: 440,
        background: '#fff', borderRadius: 20,
        padding: '36px 32px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
      }}>

        {/* Icon */}
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: isOverdue ? '#fdecea' : '#fffbf2',
          border: `1px solid ${isOverdue ? '#f5c0bc' : '#e8d5a3'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, marginBottom: 20,
        }}>
          {isOverdue ? '⚠️' : '💳'}
        </div>

        <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 22, fontWeight: 400, color: c.black, marginBottom: 12, lineHeight: 1.2 }}>
          {isOverdue ? 'Invoice overdue' : 'Invoice sent'}
        </p>

        <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: c.muted, lineHeight: 1.65, marginBottom: 8 }}>
          We sent an invoice of{' '}
          <strong style={{ color: c.black }}>${parseFloat(invoice.amount).toFixed(2)}</strong>{' '}
          to <strong style={{ color: c.black }}>{userEmail}</strong>{' '}
          {invoice.days === 1 ? 'yesterday' : `${invoice.days} days ago`}.
          {invoice.notes && ` (${invoice.notes})`}
        </p>

        {isOverdue ? (
          <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: '#c05050', lineHeight: 1.65, marginBottom: 24 }}>
            Payment is now overdue. Accounts with unpaid invoices after 14 days will be suspended. Please arrange payment as soon as possible.
          </p>
        ) : (
          <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: c.muted, lineHeight: 1.65, marginBottom: 24 }}>
            If you need to update your billing email, you can change it in Settings and we will resend the invoice to your new address.
          </p>
        )}

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={dismiss}
            style={{
              flex: 1, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
              background: c.black, color: '#F5F0E8', border: 'none', borderRadius: 10,
              padding: '12px', cursor: 'pointer',
            }}
          >
            Understood
          </button>
          <button
            onClick={() => { dismiss(); router.push('/dashboard/settings') }}
            style={{
              flex: 1, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
              background: 'transparent', color: c.muted, border: `1px solid ${c.border}`, borderRadius: 10,
              padding: '12px', cursor: 'pointer',
            }}
          >
            Go to Settings
          </button>
        </div>
      </div>
    </>
  )
}