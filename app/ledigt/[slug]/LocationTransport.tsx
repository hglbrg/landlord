'use client'

import { Listing } from '@/lib/types/listing'
import styles from './page.module.css'
import strings from '@/lib/data/strings.json'

interface LocationTransportProps {
  listing: Listing
}

export default function LocationTransport({ listing }: LocationTransportProps) {
  return (
    <section className={styles.contentSection}>
      <h3 className={styles.heading3}>{strings.listing.locationAndTransport}</h3>

      <h4 className={styles.heading4}>{strings.listing.publicTransport}</h4>
      <ul>
        {listing.transport.map((transport, index) => (
          <li key={index}>
            <strong>{transport.stationName}</strong> ({transport.type}) – {transport.walkingMinutes}{' '}
            {strings.listing.walkingMinutes}
            {transport.lines?.length && <span> • Linjer: {transport.lines.join(', ')}</span>}
          </li>
        ))}
      </ul>

      <h4 className={styles.heading4}>{strings.listing.nearby}</h4>
      <ul>
        {listing.nearbyAmenities.map((amenity, index) => (
          <li key={index}>
            <strong>{amenity.name}</strong> – {amenity.walkingMinutes}{' '}
            {strings.listing.walkingMinutes}
            <br />
            <small>{amenity.description}</small>
          </li>
        ))}
      </ul>
    </section>
  )
}
