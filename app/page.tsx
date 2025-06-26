import Link from "next/link";
import listingsData from "@/lib/data/listings.json";

export default function Home() {
  const availableListings = listingsData.listings.filter(
    (listing) => listing.status === "available",
  );
  const owner = listingsData.siteInfo.owner;

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <hgroup style={{ textAlign: "center" }}>
          <h1>
            Välkommen till {owner.firstName} {owner.lastName} Fastigheter
          </h1>
          <p>
            Privatperson som hyr ut lägenheter i Söderköping med omnejd.
            Personlig service och trygga hyresförhållanden.
          </p>
        </hgroup>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/ledigt" role="button">
            Se lediga lägenheter ({availableListings.length} st)
          </Link>
          <Link
            href="/about"
            role="button"
            className="secondary"
            style={{ marginLeft: "1rem" }}
          >
            Läs mer om mig
          </Link>
        </div>
      </section>

      {/* Featured Listings */}
      {availableListings.length > 0 && (
        <section>
          <hgroup>
            <h2>Aktuella lägenheter</h2>
            <p>
              Upptäck våra lediga lägenheter med allt från charmiga
              stadslägenheter till mysiga hem.
            </p>
          </hgroup>

          <div className="grid">
            {availableListings.slice(0, 2).map((listing) => (
              <article key={listing.id}>
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

                <hgroup>
                  <h3>
                    <Link href={`/${listing.slug}`}>{listing.basic.title}</Link>
                  </h3>
                  <p>{listing.basic.shortDescription}</p>
                </hgroup>

                <dl>
                  <dt>Hyra</dt>
                  <dd className="rental-price">
                    {listing.specifications.rentAmount.toLocaleString("sv-SE")}{" "}
                    {listing.specifications.currency}/mån
                  </dd>

                  <dt>Storlek</dt>
                  <dd>
                    {listing.specifications.sizeSqm} m² •{" "}
                    {listing.specifications.rooms} rum
                  </dd>

                  <dt>Läge</dt>
                  <dd>
                    {listing.location.area}, {listing.location.city}
                  </dd>
                </dl>

                <div className="rental-features">
                  {listing.features.balcony.has && (
                    <span className="rental-feature">Balkong</span>
                  )}
                  {listing.features.petsAllowed && (
                    <span className="rental-feature">Djur OK</span>
                  )}
                  {listing.amenities.laundryRoom && (
                    <span className="rental-feature">Tvättstuga</span>
                  )}
                  {listing.amenities.fiberInternet && (
                    <span className="rental-feature">Fiber</span>
                  )}
                </div>

                <footer>
                  <Link href={`/${listing.slug}`} role="button">
                    Visa lägenhet
                  </Link>
                </footer>
              </article>
            ))}
          </div>

          {availableListings.length > 2 && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link href="/ledigt" role="button" className="outline">
                Se alla {availableListings.length} lägenheter
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Why Choose Us Section */}
      <section>
        <article>
          <header>
            <h2>Varför hyra genom mig?</h2>
          </header>

          <div className="grid">
            <div>
              <h3>Personlig service</h3>
              <p>
                Som privatperson kan jag erbjuda en mer personlig och flexibel
                service än stora hyresbolag. Du får alltid kontakt med mig
                direkt.
              </p>
            </div>
            <div>
              <h3>Snabb kommunikation</h3>
              <p>
                Jag svarar oftast inom {owner.responseTimeHours} timmar på alla
                frågor och förfrågningar. Inga långa väntetider eller krånglig
                byråkrati.
              </p>
            </div>
            <div>
              <h3>Lokalt fokus</h3>
              <p>
                Med djup kunskap om Söderköping och omnejd kan jag hjälpa dig
                hitta det perfekta boendet i vår vackra del av Sverige.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Contact CTA */}
      <section>
        <article style={{ textAlign: "center" }}>
          <header>
            <h2>Hittar du inte vad du söker?</h2>
          </header>

          <p>
            Kontakta mig så hjälper jag dig hitta ditt drömboende. Jag har ofta
            lägenheter som kommer ut på marknaden innan de annonseras.
          </p>

          <div
            className="owner-profile"
            style={{ maxWidth: "400px", margin: "2rem auto" }}
          >
            <img
              src={owner.avatar}
              alt={`${owner.firstName} ${owner.lastName}`}
              className="owner-avatar"
              width="60"
              height="60"
            />
            <div>
              <h4>
                {owner.firstName} {owner.lastName}
              </h4>
              <p className="response-time">
                {owner.verified && "✓ Verifierad • "}
                Svarar inom {owner.responseTimeHours} timmar
              </p>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <a href={`mailto:${owner.email}`} role="button">
              Skicka e-post
            </a>
            <a
              href={`tel:${owner.phone}`}
              role="button"
              className="secondary"
              style={{ marginLeft: "1rem" }}
            >
              Ring mig
            </a>
          </div>
        </article>
      </section>
    </div>
  );
}
