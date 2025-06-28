import { FeatureList } from '@/lib/utils/get-features'
import { Listing } from '@/lib/types/listing'
import strings from '@/lib/data/strings.json'

interface QuickFactsProps {
  listing: Listing
}

export default function QuickFacts({ listing }: QuickFactsProps) {
  return (
    <article>
      <header>
        <h4>Snabbfakta</h4>
      </header>

      <dl style={{ marginBottom: '1.5rem' }}>
        <dt>{strings.common.rent}</dt>
        <dd
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: 'var(--pico-primary)',
          }}
        >
          {listing.specifications.rentAmount.toLocaleString('sv-SE')}{' '}
          {listing.specifications.currency}/mån
        </dd>

        <dt>{strings.common.size}</dt>
        <dd>{listing.specifications.sizeSqm} m²</dd>

        <dt>{strings.common.rooms}</dt>
        <dd>{listing.specifications.rooms} rum</dd>

        <dt>{strings.common.availableFrom}</dt>
        <dd>{new Date(listing.rental.availableFrom).toLocaleDateString('sv-SE')}</dd>

        <dt>{strings.listing.floor}</dt>
        <dd>
          Våning {listing.specifications.floor} av {listing.specifications.totalFloors}
        </dd>
      </dl>

      <div
        style={{
          padding: '1rem',
          backgroundColor: 'var(--pico-muted-background-color)',
          borderRadius: 'var(--pico-border-radius)',
          fontSize: '0.9rem',
        }}
      >
        <strong>Uthyrningstyp:</strong>{' '}
        {listing.rental.leaseType === 'long_term' ? 'Långtidsuthyrning' : 'Korttidsuthyrning'}
        <br />
        <strong>Möblering:</strong> {listing.rental.furnished ? 'Möblerad' : 'Omöblerad'}
        <br />
        <strong>Min. hyrestid:</strong> {listing.rental.minimumRentalPeriod} månader
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h5 style={{ marginBottom: '0.75rem' }}>Viktiga egenskaper</h5>
        <FeatureList
          features={listing.features}
          amenities={listing.amenities}
          type="both"
          showOnlyPositive={false}
        />
      </div>
    </article>
  )
}
