// app/privacy/page.js
import { Playfair_Display, DM_Sans } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-display' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-body' });

export const metadata = {
  title: 'Privacy Policy | MODL',
  description: 'Privacy Policy for MODL creator management software.',
};

const styles = {
  page: {
    padding: 'clamp(28px, 4vw, 48px)',
    maxWidth: 800,
    margin: '0 auto',
    background: '#F5F0E8',
    fontFamily: 'var(--font-body), sans-serif',
    color: '#0e0e0e',
    lineHeight: 1.6,
  },
  title: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 'clamp(28px, 4vw, 40px)',
    fontWeight: 400,
    marginBottom: '0.5rem',
    color: '#0e0e0e',
  },
  lastUpdated: {
    fontSize: '0.85rem',
    color: '#8a7e6e',
    marginBottom: '2rem',
    borderBottom: '1px solid #DDD8CE',
    paddingBottom: '0.5rem',
  },
  h2: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: '1.5rem',
    fontWeight: 400,
    marginTop: '1.8rem',
    marginBottom: '0.5rem',
    color: '#0e0e0e',
  },
  p: {
    marginBottom: '1rem',
  },
  list: {
    marginLeft: '1.5rem',
    marginBottom: '1rem',
  },
};

export default function PrivacyPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`} style={styles.page}>
      <h1 style={styles.title}>Privacy Policy</h1>
      <div style={styles.lastUpdated}>Last updated: March 30, 2026</div>

      <p style={styles.p}>
        MODL (“Company”, “we”, “our”, “us”) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, dashboard, and related services (the “Service”).
      </p>

      <h2 style={styles.h2}>1. Information We Collect</h2>
      <p style={styles.p}><strong>Personal Data You Provide:</strong></p>
      <ul style={styles.list}>
        <li>Account information: email address, password, display name.</li>
        <li>Profile details: agency name, display name, and any data you voluntarily add (e.g., creator names, fan notes, earnings records, promotion logs).</li>
        <li>Communication: when you contact us via email or through the Service.</li>
      </ul>
      <p style={styles.p}><strong>Automatically Collected Data:</strong></p>
      <ul style={styles.list}>
        <li>Usage data: IP address, browser type, operating system, pages visited, and timestamps (through cookies and similar technologies).</li>
        <li>We use Supabase as our backend; Supabase may collect additional analytics as described in their privacy policy.</li>
      </ul>

      <h2 style={styles.h2}>2. How We Use Your Information</h2>
      <ul style={styles.list}>
        <li>To provide, maintain, and improve the Service.</li>
        <li>To send invoices and payment reminders.</li>
        <li>To respond to your inquiries and support requests.</li>
        <li>To monitor usage and detect, prevent, or address technical issues.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2 style={styles.h2}>3. Legal Basis for Processing (EEA/UK users)</h2>
      <p style={styles.p}>
        We process your personal data on the following bases:
      </p>
      <ul style={styles.list}>
        <li><strong>Performance of a contract:</strong> to provide the Service and manage billing.</li>
        <li><strong>Legitimate interests:</strong> to improve our Service, prevent fraud, and communicate with you.</li>
        <li><strong>Compliance with legal obligations.</strong></li>
      </ul>

      <h2 style={styles.h2}>4. Sharing Your Information</h2>
      <p style={styles.p}>
        We do not sell your personal data. We may share your data with:
      </p>
      <ul style={styles.list}>
        <li><strong>Service providers:</strong> third‑party vendors who help us operate the Service (e.g., Supabase, email services). These parties are contractually obligated to protect your data.</li>
        <li><strong>Legal compliance:</strong> if required by law or to protect our rights.</li>
        <li><strong>Business transfers:</strong> in the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.</li>
      </ul>

      <h2 style={styles.h2}>5. Data Retention</h2>
      <p style={styles.p}>
        We retain your account data for as long as your account is active. If you delete your account via the Settings page, we will delete or anonymise your personal data within 30 days, except where we are required to retain it for legal or tax purposes (e.g., invoice records).
      </p>

      <h2 style={styles.h2}>6. Security</h2>
      <p style={styles.p}>
        We use industry‑standard security measures (encryption in transit and at rest, Supabase security features) to protect your data. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
      </p>

      <h2 style={styles.h2}>7. Your Rights (GDPR, CCPA, etc.)</h2>
      <p style={styles.p}>
        Depending on your location, you may have rights to:
      </p>
      <ul style={styles.list}>
        <li>Access, correct, or delete your personal data.</li>
        <li>Object to or restrict processing.</li>
        <li>Data portability.</li>
        <li>Withdraw consent where we rely on it.</li>
      </ul>
      <p style={styles.p}>
        To exercise these rights, contact us at <a href="mailto:modl_tech@proton.me" style={{ color: '#C9A96E' }}>modl_tech@proton.me</a>. We will respond within a reasonable timeframe.
      </p>

      <h2 style={styles.h2}>8. International Data Transfers</h2>
      <p style={styles.p}>
        Your data may be processed in countries other than your own. We use safeguards (such as Standard Contractual Clauses) to ensure adequate protection.
      </p>

      <h2 style={styles.h2}>9. Children’s Privacy</h2>
      <p style={styles.p}>
        The Service is not intended for individuals under 18. We do not knowingly collect data from children.
      </p>

      <h2 style={styles.h2}>10. Changes to This Policy</h2>
      <p style={styles.p}>
        We may update this Privacy Policy from time to time. We will notify you of material changes by email or through the dashboard.
      </p>

      <h2 style={styles.h2}>11. Contact</h2>
      <p style={styles.p}>
        For privacy‑related questions, please contact <a href="mailto:modl_tech@proton.me" style={{ color: '#C9A96E' }}>modl_tech@proton.me</a>.
      </p>
    </div>
  );
}