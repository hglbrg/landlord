import { Listing } from '@/lib/types/listing'
import styles from './page.module.css'
import strings from '@/lib/data/strings.json'

interface PropertyInfoProps {
  listing: Listing
}

export default function PropertyInfo({ listing }: PropertyInfoProps) {
  return (
    <article className={styles.contentSection}>
      <h3 className={styles.heading3}>{strings.listing.propertyInfo}</h3>
      <dl>
        <dt>{strings.listing.yearBuilt}</dt>
        <dd>{listing.property.yearBuilt}</dd>

        <dt>{strings.listing.lastRenovated}</dt>
        <dd>{listing.property.lastRenovated}</dd>

        {listing.property.bathroomRenovated && (
          <>
            <dt>{strings.listing.bathroomRenovated}</dt>
            <dd>{listing.property.bathroomRenovated}</dd>
          </>
        )}

        {listing.property.kitchenRenovated && (
          <>
            <dt>{strings.listing.kitchenRenovated}</dt>
            <dd>{listing.property.kitchenRenovated}</dd>
          </>
        )}
      </dl>
    </article>
  )
}
