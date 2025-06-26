import Link from "next/link";
import listingsData from "@/lib/data/listings.json";

export default function LedigaLägenheter() {
  const availableListings = listingsData.listings.filter(
    (listing) => listing.status === "available",
  );

  return (
    <div className="container">
      <section>
        <hgroup>
          <h1>Lediga lägenheter</h1>
          <p>
            Här hittar du alla våra lediga lägenheter i Söderköping med omnejd.
          </p>
        </hgroup>
      </section>

      {availableListings.length === 0 ? (
        <article>
          <p>Inga lediga lägenheter just nu. Kom tillbaka senare!</p>
        </article>
      ) : (
        <div className="grid">
          {availableListings.map((listing) => (
            <article key={listing.id}>
              {/* Header with image only */}
              <header>
                {listing.images.length > 0 && (
                  <img
                    src={
                      listing.images.find((img) => img.isMain)?.url ||
                      listing.images[0].url
                    }
                    alt={
                      listing.images.find((img) => img.isMain)?.alt ||
                      listing.images[0].alt
                    }
                    loading="lazy"
                  />
                )}
              </header>

              {/* Main content starts with hgroup */}
              <hgroup>
                <h3>
                  <Link href={`/${listing.slug}`}>{listing.basic.title}</Link>
                </h3>
                <p>{listing.basic.shortDescription}</p>
              </hgroup>

              {/* Key details */}
              <dl>
                <dt>Hyra</dt>
                <dd className="rental-price">
                  {listing.specifications.rentAmount.toLocaleString("sv-SE")}{" "}
                  {listing.specifications.currency}/mån
                </dd>

                <dt>Storlek</dt>
                <dd>{listing.specifications.sizeSqm} m²</dd>

                <dt>Rum</dt>
                <dd>
                  {listing.specifications.rooms} rum,{" "}
                  {listing.specifications.bedrooms} sovrum
                </dd>

                <dt>Läge</dt>
                <dd>
                  {listing.location.area}, {listing.location.city}
                </dd>
              </dl>

              {/* Features */}
              <div className="rental-features">
                {listing.features.balcony.has && (
                  <span className="rental-feature">Balkong</span>
                )}
                {listing.features.petsAllowed && (
                  <span className="rental-feature">Djur OK</span>
                )}
                {listing.features.parking && (
                  <span className="rental-feature">Parkering</span>
                )}
                {listing.amenities.laundryRoom && (
                  <span className="rental-feature">Tvättstuga</span>
                )}
                {listing.amenities.fiberInternet && (
                  <span className="rental-feature">Fiber</span>
                )}
                {listing.features.elevator && (
                  <span className="rental-feature">Hiss</span>
                )}
              </div>

              {/* Transport info */}
              {listing.transport.length > 0 && (
                <details>
                  <summary>Transport & närhet</summary>
                  <ul>
                    {listing.transport.map((transport, index) => (
                      <li key={index}>
                        <strong>{transport.stationName}</strong> (
                        {transport.type}) - {transport.walkingMinutes} min
                      </li>
                    ))}
                    {listing.nearbyAmenities
                      .slice(0, 2)
                      .map((amenity, index) => (
                        <li key={`amenity-${index}`}>
                          <strong>{amenity.name}</strong> -{" "}
                          {amenity.walkingMinutes} min
                        </li>
                      ))}
                  </ul>
                </details>
              )}

              <footer>
                <p>
                  <small>
                    Tillgänglig från{" "}
                    {new Date(listing.rental.availableFrom).toLocaleDateString(
                      "sv-SE",
                    )}
                    {listing.rental.depositMonths && (
                      <> • Deposit: {listing.rental.depositMonths} månader</>
                    )}
                  </small>
                </p>
                <Link href={`/${listing.slug}`} role="button">
                  Visa lägenhet
                </Link>
              </footer>
            </article>
          ))}
        </div>
      )}

      {/* Owner info section */}
      <section>
        <article>
          <header>
            <h2>Om hyresvärden</h2>
          </header>

          <div className="owner-profile">
            <img
              src={listingsData.siteInfo.owner.avatar}
              alt={`${listingsData.siteInfo.owner.firstName} ${listingsData.siteInfo.owner.lastName}`}
              className="owner-avatar"
              width="60"
              height="60"
            />
            <div>
              <h4>
                {listingsData.siteInfo.owner.firstName}{" "}
                {listingsData.siteInfo.owner.lastName}
              </h4>
              <p>{listingsData.siteInfo.owner.bio}</p>
              <p className="response-time">
                Svarar oftast inom{" "}
                {listingsData.siteInfo.owner.responseTimeHours} timmar
                {listingsData.siteInfo.owner.verified && <> • ✓ Verifierad</>}
              </p>
            </div>
          </div>

          <p>
            <a
              href={`mailto:${listingsData.siteInfo.owner.email}`}
              role="button"
              className="outline"
            >
              Kontakta mig
            </a>
          </p>
        </article>
      </section>
    </div>
  );
}
