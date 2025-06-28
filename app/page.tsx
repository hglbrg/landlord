import Link from 'next/link'
import Image from 'next/image'
import { FeatureTags } from '@/lib/utils/get-features'

// Import data files
import listingsData from '@/lib/data/listings.json'
import agentsData from '@/lib/data/agents.json'
import siteInfoData from '@/lib/data/siteInfo.json'
import strings from '@/lib/data/strings.json'

export default function HomePage() {
  const primaryAgent = agentsData.agents.find(
    agent => agent.id === siteInfoData.site.primaryAgentId
  )
  const featuredListings = listingsData.listings.filter(listing => listing.featured)
  const allAvailableListings = listingsData.listings.filter(
    listing => listing.status === 'available'
  )

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="grid">
          <div>
            <hgroup>
              <h1>
                {strings.home.heroTitle.replace(
                  '{ownerName}',
                  primaryAgent?.personal.firstName || 'Anna'
                )}
              </h1>
              <p>{strings.home.heroSubtitle}</p>
            </hgroup>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                marginTop: '2rem',
              }}
            >
              <Link href="/ledigt" role="button">
                {strings.home.seeAvailableApartments.replace(
                  '{count}',
                  allAvailableListings.length.toString()
                )}
              </Link>
              <Link href="/about" role="button" className="secondary">
                {strings.home.readMoreAboutMe}
              </Link>
            </div>
          </div>

          {primaryAgent && (
            <div className="owner-profile">
              <Image
                src={primaryAgent.personal.avatar}
                alt={primaryAgent.personal.fullName}
                width={48}
                height={48}
                className="owner-avatar"
              />
              <div>
                <h4 style={{ margin: 0 }}>{primaryAgent.personal.fullName}</h4>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured/Current Apartments */}
      <section>
        <hgroup>
          <h2>{strings.home.currentApartments}</h2>
          <p>{strings.home.currentApartmentsSubtitle}</p>
        </hgroup>

        {allAvailableListings.length > 0 ? (
          <>
            <div className="grid">
              {(featuredListings.length > 0
                ? featuredListings
                : allAvailableListings.slice(0, 2)
              ).map(listing => {
                const assignedAgent = agentsData.agents.find(
                  agent => agent.id === listing.assignedAgent
                )

                return (
                  <article key={listing.id} className="rental-card">
                    <div>
                      <Link href={`/ledigt/${listing.slug}`}>
                        <div
                          style={{
                            position: 'relative',
                            height: '200px',
                            borderRadius: 'var(--pico-border-radius)',
                            overflow: 'hidden',
                            display: 'block',
                          }}
                        >
                          <Image
                            src={listing.images[0]?.url || ''}
                            alt={listing.images[0]?.alt || listing.basic.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                      </Link>
                    </div>

                    <h3>{listing.basic.title}</h3>
                    <p>{listing.basic.shortDescription}</p>

                    <FeatureTags
                      features={listing.features}
                      amenities={listing.amenities}
                      maxVisible={4}
                    />

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '1rem',
                      }}
                    >
                      <span className="rental-price">
                        {listing.specifications.rentAmount.toLocaleString('sv-SE')} kr/
                        {strings.common.monthShort}
                      </span>
                      <Link href={`/ledigt/${listing.slug}`} role="button" className="outline">
                        {strings.common.viewApartment}
                      </Link>
                    </div>

                    {assignedAgent && (
                      <footer>
                        <small>
                          {strings.listings.contactMe}: {assignedAgent.personal.fullName} •
                        </small>
                      </footer>
                    )}
                  </article>
                )
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/ledigt" role="button" className="secondary">
                {strings.home.seeAllApartments.replace(
                  '{count}',
                  allAvailableListings.length.toString()
                )}
              </Link>
            </div>
          </>
        ) : (
          <article>
            <p>{strings.listings.noApartments}</p>
          </article>
        )}
      </section>

      {/* Why Choose Us */}
      <section>
        <h2>{strings.home.whyChooseUs}</h2>

        <div className="grid">
          <article>
            <h4>{strings.home.personalService}</h4>
            <p>{strings.home.personalServiceDesc}</p>
          </article>

          <article>
            <h4>{strings.home.localFocus}</h4>
            <p>{strings.home.localFocusDesc}</p>
          </article>
        </div>
      </section>

      {/* Contact CTA */}
      <section>
        <article
          style={{
            textAlign: 'center',
            background: 'var(--pico-card-sectioning-background-color)',
          }}
        >
          <h3>{strings.home.cantFindWhat}</h3>
          <p>{strings.home.cantFindWhatDesc}</p>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {primaryAgent && (
              <>
                <a href={`mailto:${primaryAgent.personal.email}`} role="button">
                  {strings.home.sendEmail}
                </a>
                <a href={`tel:${primaryAgent.personal.phone}`} role="button" className="secondary">
                  {strings.home.callMe}
                </a>
              </>
            )}
          </div>
        </article>
      </section>
    </div>
  )
}
