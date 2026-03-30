'use client'

import { useState, useEffect } from 'react'

export default function PaymentNotice() {
  const [dismissed, setDismissed] = useState(true) // start hidden to avoid flash

  useEffect(() => {
    const isDismissed = localStorage.getItem('modl_payment_notice_dismissed')
    if (!isDismissed) setDismissed(false)
  }, [])

  const dismiss = () => {
    localStorage.setItem('modl_payment_notice_dismissed', '1')
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div style={{
      background: '#fffbf2',
      borderBottom: '1px solid #e8d5a3',
      padding: '10px clamp(20px, 4vw, 48px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 14 }}>💳</span>
        <p style={{
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: 13,
          color: '#7a6030',
          margin: 0,
          lineHeight: 1.5,
        }}>
          <strong style={{ fontWeight: 500, color: '#5a4520' }}>Billing is by monthly invoice.</strong>
          {' '}You'll receive an invoice at the start of each month. If payment is not received within 7 days, access to your account will be suspended.
        </p>
      </div>
      <button
        onClick={dismiss}
        style={{
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: 11,
          color: '#a07828',
          background: 'none',
          border: '1px solid #e8d5a3',
          borderRadius: 6,
          padding: '4px 10px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Got it
      </button>
    </div>
  )
}