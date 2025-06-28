'use client'

import ImageGallery from './ImageGallery'
import Description from './Description'
import LocationTransport from './LocationTransport'
import PropertyInfo from './PropertyInfo'
import QuickFacts from './QuickFacts'
import AgentInfo from './AgentInfo'
import RentalTerms from './RentalTerms'

import { Listing, Agent } from '@/lib/types/listing'
import strings from '@/lib/data/strings.json'
import styles from './page.module.css'
import MapComponent from '@/lib/components/Map'
import { useState } from 'react'
import Link from 'next/link'

interface ListingDetailClientProps {
  listing: Listing
  assignedAgent: Agent | undefined
}

export default function ListingDetailClient({ listing, assignedAgent }: ListingDetailClientProps) {
  const [showMapDialog, setShowMapDialog] = useState(false)

  return (
    <div className={styles.mainGrid}>
      <div>
        <ImageGallery images={listing.images} title={listing.basic.title} />

        <Description description={listing.basic.description} />

        {listing.floorPlanImages?.length > 0 && (
          <section>
            <h3>Planlösning</h3>
            <ImageGallery images={listing.floorPlanImages} title="Planlösning" />
          </section>
        )}

        <section>
          <h3>Plats</h3>
          <MapComponent
            latitude={listing.location.coordinates.latitude}
            longitude={listing.location.coordinates.longitude}
            address={`${listing.location.streetAddress}, ${listing.location.city}`}
            showDialog={showMapDialog}
            onDialogToggle={setShowMapDialog}
            height="250px"
            zoom={16}
          />
        </section>
        <div className="grid">
          <RentalTerms listing={listing} />
          <LocationTransport listing={listing} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/ledigt" role="button" className="outline">
            {strings.navigation.backToAllApartments}
          </Link>
        </div>
      </div>

      <aside>
        <QuickFacts listing={listing} />
        {assignedAgent && <AgentInfo assignedAgent={assignedAgent} />}
        <PropertyInfo listing={listing} />
      </aside>
    </div>
  )
}
