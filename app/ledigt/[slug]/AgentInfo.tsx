import Image from 'next/image'
import { Agent } from '@/lib/types/listing'
import strings from '@/lib/data/strings.json'
import { Mail, Phone } from 'lucide-react'
import styles from './page.module.css'

interface AgentInfoProps {
  assignedAgent: Agent
}

export default function AgentInfo({ assignedAgent }: AgentInfoProps) {
  return (
    <article>
      <header>
        <h4 className={styles.heading4}>Din kontakt</h4>
      </header>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Image
          src={assignedAgent.personal.avatar}
          alt={assignedAgent.personal.fullName}
          width={64}
          height={64}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <div>
          <h5 className={styles.heading5} style={{ margin: 0 }}>
            {assignedAgent.personal.fullName}
          </h5>
          <p style={{ margin: '0.25rem 0', color: 'var(--pico-muted-color)' }}>
            {assignedAgent.personal.title}
          </p>
        </div>
      </div>

      <div style={{ fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
        {assignedAgent.personal.bio}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <a
          href={`mailto:${assignedAgent.personal.email}`}
          role="button"
          className="contrast"
          style={{ textAlign: 'center' }}
        >
          <Mail /> {strings.home.sendEmail}
        </a>
        <a
          href={`tel:${assignedAgent.personal.phone}`}
          role="button"
          className="outline"
          style={{ textAlign: 'center' }}
        >
          <Phone /> {strings.home.callMe}
        </a>
      </div>
    </article>
  )
}
