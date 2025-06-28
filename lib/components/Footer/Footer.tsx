import Link from 'next/link'
import styles from './Footer.module.css'

interface FooterProps {
  ownerName?: string
  ownerEmail?: string
  ownerPhone?: string
}

export default function Footer({
  ownerName = 'Anna Svensson',
  ownerEmail = 'anna.svensson@email.com',
  ownerPhone = '+46 70 123 45 67',
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h6>Kontakt</h6>
            <div className={styles.contactInfo}>
              <strong>{ownerName}</strong>
              <div className={styles.contactLinks}>
                <a href={`mailto:${ownerEmail}`} className={styles.contactLink}>
                  {ownerEmail}
                </a>
                <a href={`tel:${ownerPhone}`} className={styles.contactLink}>
                  {ownerPhone}
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h6>Navigation</h6>
            <nav className={styles.footerNav}>
              <Link href="/" className={styles.footerLink}>
                Hem
              </Link>
              <Link href="/ledigt" className={styles.footerLink}>
                Lediga lägenheter
              </Link>
              <Link href="/about" className={styles.footerLink}>
                Om mig
              </Link>
            </nav>
          </div>

          <div className={styles.footerSection}>
            <h6>Information</h6>
            <p className={styles.footerText}>
              Privatperson som hyr ut lägenheter i Söderköping med omnejd.
            </p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <small>
            © {new Date().getFullYear()} {ownerName}. Alla rättigheter förbehållna.
          </small>
        </div>
      </div>
    </footer>
  )
}
