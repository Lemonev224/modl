// app/terms/page.js
import { Playfair_Display, DM_Sans } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-display' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-body' });

export const metadata = {
  title: 'Terms of Service | MODL',
  description: 'Terms of Service for MODL creator management software.',
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
  strong: {
    color: '#0e0e0e',
  },
};

export default function TermsPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`} style={styles.page}>
      <h1 style={styles.title}>Terms of Service</h1>
      <div style={styles.lastUpdated}>Last updated: March 30, 2026</div>

      <p style={styles.p}>
        Welcome to MODL (“Company”, “we”, “our”, “us”). These Terms of Service (“Terms”) govern your use of our website, dashboard, and related services (collectively, the “Service”). By accessing or using the Service, you agree to be bound by these Terms. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity.
      </p>

      <h2 style={styles.h2}>1. Eligibility</h2>
      <p style={styles.p}>You must be at least 18 years old to use the Service. By using MODL, you represent and warrant that you meet this requirement.</p>

      <h2 style={styles.h2}>2. Account Registration</h2>
      <p style={styles.p}>
        You must create an account to access the Service. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update it as needed.
      </p>

      <h2 style={styles.h2}>3. Subscription and Payment</h2>
      <p style={styles.p}>
        MODL is offered on a <strong>monthly subscription basis</strong> billed by invoice.
      </p>
      <ul style={styles.list}>
        <li><strong>Fees:</strong> The monthly fee is stated on our website and may be updated with 30 days’ notice.</li>
        <li><strong>Invoicing:</strong> We will send an invoice at the beginning of each month for the upcoming month’s service. Payment is due within seven (7) days of the invoice date.</li>
        <li><strong>Late Payment:</strong> If payment is not received by the due date, we may suspend or terminate your account. Overdue invoices are subject to a 7‑day grace period after which account access may be restricted.</li>
        <li><strong>No Refunds:</strong> All fees are non‑refundable, except as required by law.</li>
      </ul>

      <h2 style={styles.h2}>4. Service Description</h2>
      <p style={styles.p}>
        MODL provides a management platform for creator agencies. Features include roster management, earnings tracking, analytics, promotions tracker, content scheduling, and fan CRM. We may introduce or discontinue features at our discretion. Any “coming soon” features are not guaranteed to be delivered by a specific date.
      </p>

      <h2 style={styles.h2}>5. Your Responsibilities</h2>
      <ul style={styles.list}>
        <li><strong>Content:</strong> You are solely responsible for all data you input, including creator information, earnings, and fan notes. You must have the right to use and share such data.</li>
        <li><strong>Compliance:</strong> You agree to comply with all applicable laws, including those relating to data protection and the platforms you manage (e.g., OnlyFans).</li>
        <li><strong>Prohibited Uses:</strong> You may not use the Service to store or transmit illegal content, violate third‑party rights, or interfere with the integrity of the Service.</li>
      </ul>

      <h2 style={styles.h2}>6. Data and Privacy</h2>
      <p style={styles.p}>
        Your use of the Service is also governed by our <a href="/privacy" style={{ color: '#C9A96E' }}>Privacy Policy</a>. By using MODL, you consent to the collection and processing of your personal data as described therein.
      </p>

      <h2 style={styles.h2}>7. Intellectual Property</h2>
      <ul style={styles.list}>
        <li><strong>Our IP:</strong> MODL and its content, features, and functionality are owned by the Company and are protected by copyright, trademark, and other laws. You may not copy, modify, or reverse engineer any part of the Service.</li>
        <li><strong>Your Data:</strong> You retain ownership of all data you submit. By using the Service, you grant us a limited license to host, store, and process that data solely to provide the Service to you.</li>
      </ul>

      <h2 style={styles.h2}>8. Suspension and Termination</h2>
      <p style={styles.p}>
        We may suspend or terminate your account if:
      </p>
      <ul style={styles.list}>
        <li>You fail to pay any undisputed fees when due.</li>
        <li>You breach these Terms.</li>
        <li>We are required to do so by law.</li>
        <li>You request account deletion (through the Settings page).</li>
      </ul>
      <p style={styles.p}>
        Upon termination, we will delete your data as described in our Privacy Policy. You may export your data before termination by contacting support.
      </p>

      <h2 style={styles.h2}>9. Limitation of Liability</h2>
      <p style={styles.p}>
        <strong>TO THE FULLEST EXTENT PERMITTED BY LAW, MODL AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</strong>
      </p>
      <p style={styles.p}>
        OUR TOTAL LIABILITY TO YOU SHALL NOT EXCEED THE AMOUNT YOU PAID US DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
      </p>

      <h2 style={styles.h2}>10. Disclaimer of Warranties</h2>
      <p style={styles.p}>
        THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON‑INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR‑FREE, OR FREE OF HARMFUL COMPONENTS. YOU ASSUME FULL RESPONSIBILITY FOR YOUR USE OF THE SERVICE.
      </p>

      <h2 style={styles.h2}>11. Indemnification</h2>
      <p style={styles.p}>
        You agree to indemnify and hold harmless MODL and its affiliates from any claim, damage, loss, or expense (including reasonable attorneys’ fees) arising out of your use of the Service, your violation of these Terms, or your violation of any rights of a third party.
      </p>

      <h2 style={styles.h2}>12. Governing Law</h2>
      <p style={styles.p}>
        These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of laws principles.
      </p>

      <h2 style={styles.h2}>13. Changes to Terms</h2>
      <p style={styles.p}>
        We may modify these Terms from time to time. If we make material changes, we will notify you by email or through the dashboard. Your continued use of the Service after the effective date constitutes acceptance of the revised Terms.
      </p>

      <h2 style={styles.h2}>14. Contact</h2>
      <p style={styles.p}>
        For questions about these Terms, please contact <a href="mailto:modl_tech@proton.me" style={{ color: '#C9A96E' }}>modl_tech@proton.me</a>.
      </p>
    </div>
  );
}