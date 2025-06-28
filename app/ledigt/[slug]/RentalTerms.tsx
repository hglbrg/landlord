import Link from 'next/link'
import { Listing } from '@/lib/types/listing'
import strings from '@/lib/data/strings.json'
import styles from './page.module.css'

interface RentalTermsProps {
  listing: Listing
}

export default function RentalTerms({ listing }: RentalTermsProps) {
  return (
    <section className={styles.contentSection}>
      <h3 className={styles.heading3}>{strings.listing.rentalTerms}</h3>
      <dl>
        <dt>{strings.common.rent}</dt>
        <dd>
          {listing.specifications.rentAmount.toLocaleString('sv-SE')}{' '}
          {listing.specifications.currency}
        </dd>

        <dt>{strings.listing.minimumRentalPeriod}</dt>
        <dd>
          {listing.rental.minimumRentalPeriod} {strings.listing.months}
        </dd>

        <dt>{strings.common.availableFrom}</dt>
        <dd>{new Date(listing.rental.availableFrom).toLocaleDateString('sv-SE')}</dd>

        <dt>Uthyrningstyp</dt>
        <dd>
          {listing.rental.leaseType === 'long_term'
            ? strings.listing.longTermRental
            : strings.listing.shortTermRental}
        </dd>

        <dt>Möblering</dt>
        <dd>
          {listing.rental.furnished ? strings.listing.furnished : strings.listing.unfurnished}
        </dd>
      </dl>
    </section>
  )
}
