'use client'

import ImageGallery from './ImageGallery'
import Description from './Description'
import LocationTransport from './LocationTransport'
import PropertyInfo from './PropertyInfo'
import QuickFacts from './QuickFacts'
import AgentInfo from './AgentInfo'
import { Listing, Agent } from '@/lib/types/listing'
import styles from './page.module.css'
import MapComponent from '@/lib/components/Map'
import { useState } from 'react'

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

        {listing.floorPlanImages && listing.floorPlanImages.length > 0 && (
          <section>
            <h3>Planlösning</h3>
            <ImageGallery images={listing.floorPlanImages} title="Planlösning" />
          </section>
        )}

        <div style={{ marginBottom: '2rem' }}>
          <h4>Plats</h4>
          <MapComponent
            latitude={listing.location.coordinates.latitude}
            longitude={listing.location.coordinates.longitude}
            address={`${listing.location.streetAddress}, ${listing.location.city}`}
            showDialog={showMapDialog}
            onDialogToggle={setShowMapDialog}
            height="250px"
            zoom={16}
          />
        </div>

        <LocationTransport listing={listing} />

        <PropertyInfo listing={listing} />
      </div>

      <aside>
        <QuickFacts listing={listing} />
        {assignedAgent && <AgentInfo assignedAgent={assignedAgent} />}
      </aside>
    </div>
  )
}
