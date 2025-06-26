import { notFound } from "next/navigation";
import listingsData from "@/lib/data/listings.json";

interface ListingPageProps {
  params: {
    "listing-slug": string;
  };
}

export default function ListingPage({ params }: ListingPageProps) {
  const listing = listingsData.listings.find(
    (l) => l.slug === params["listing-slug"],
  );

  if (!listing) {
    notFound();
  }

  const owner = listingsData.siteInfo.owner;

  return (
    <div className="container">
      {/* Hero Section with Images */}
      <section>
        <hgroup>
          <h1>{listing.basic.title}</h1>
          <p>{listing.basic.shortDescription}</p>
        </hgroup>
      </section>

      {/* Image Gallery */}
      <section>
        <div className="grid">
          {listing.images.slice(0, 3).map((image, index) => (
            <figure key={index}>
              <img
                src={image.url}
                alt={image.alt}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid">
        {/* Left Column - Details */}
        <div>
          <article>
            <header>
              <h2>Lägenhetsinfo</h2>
            </header>

            <h3>Specifikationer</h3>
            <dl>
              <dt>Hyra</dt>
              <dd>
                <strong>
                  {listing.specifications.rentAmount.toLocaleString("sv-SE")}{" "}
                  {listing.specifications.currency}/månad
                </strong>
              </dd>

              <dt>Storlek</dt>
              <dd>{listing.specifications.sizeSqm} m²</dd>

              <dt>Antal rum</dt>
              <dd>{listing.specifications.rooms} rum</dd>

              <dt>Sovrum</dt>
              <dd>{listing.specifications.bedrooms} st</dd>

              <dt>Våning</dt>
              <dd>
                {listing.specifications.floor} av{" "}
                {listing.specifications.totalFloors}
              </dd>
            </dl>

            <h3>Egenskaper</h3>
            <ul>
              {listing.features.balcony.has && (
                <li>Balkong ({listing.features.balcony.direction})</li>
              )}
              {listing.features.storage && <li>Förråd</li>}
              {listing.features.parking && <li>Parkering</li>}
              {listing.features.petsAllowed && <li>Djur tillåtet</li>}
              {listing.features.garden && <li>Trädgård</li>}
              {listing.features.elevator && <li>Hiss</li>}
            </ul>

            <h3>Bekvämligheter</h3>
            <ul>
              {listing.amenities.laundryRoom && <li>Tvättstuga</li>}
              {listing.amenities.bikeStorage && <li>Cykelförvaring</li>}
              {listing.amenities.fiberInternet && <li>Fiber internet</li>}
              {listing.amenities.heatingIncluded && <li>Värme ingår</li>}
              {listing.amenities.waterIncluded && <li>Vatten ingår</li>}
              {listing.amenities.electricityIncluded && <li>El ingår</li>}
              {listing.amenities.internetIncluded && <li>Internet ingår</li>}
            </ul>

            <h3>Beskrivning</h3>
            <p>{listing.basic.description}</p>
          </article>

          {/* Transport & Nearby */}
          <article>
            <header>
              <h2>Läge & Transport</h2>
            </header>

            <h3>Kollektivtrafik</h3>
            <dl>
              {listing.transport.map((t, index) => (
                <div key={index}>
                  <dt>
                    {t.stationName} ({t.type})
                  </dt>
                  <dd>
                    {t.walkingMinutes} min promenad • {t.lines.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>

            <h3>Närliggande</h3>
            <dl>
              {listing.nearbyAmenities.map((amenity, index) => (
                <div key={index}>
                  <dt>{amenity.name}</dt>
                  <dd>
                    {amenity.walkingMinutes} min promenad •{" "}
                    {amenity.description}
                  </dd>
                </div>
              ))}
            </dl>

            <address>
              <strong>{listing.location.streetAddress}</strong>
              <br />
              {listing.location.postalCode} {listing.location.city}
            </address>
          </article>
        </div>

        {/* Right Column - Contact & Info */}
        <aside>
          <article>
            <header>
              <h3>Kontakta hyresvärd</h3>
            </header>

            <div className="owner-profile">
              <img
                src={owner.avatar}
                alt={`${owner.firstName} ${owner.lastName}`}
                className="owner-avatar"
                width="60"
                height="60"
              />
              <div>
                <h5>
                  {owner.firstName} {owner.lastName}
                </h5>
                <small className="response-time">
                  Svarar oftast inom {owner.responseTimeHours} timmar
                </small>
                {owner.verified && <small> • ✓ Verifierad</small>}
              </div>
            </div>

            <form>
              <fieldset>
                <label>
                  Namn
                  <input type="text" name="name" required />
                </label>

                <label>
                  E-post
                  <input type="email" name="email" required />
                </label>

                <label>
                  Telefon
                  <input type="tel" name="phone" />
                </label>

                <label>
                  Meddelande
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Hej! Jag är intresserad av lägenheten..."
                  ></textarea>
                </label>
              </fieldset>

              <button type="submit">Skicka meddelande</button>
            </form>
          </article>

          {/* Rental Terms */}
          <article>
            <header>
              <h4>Hyresvillkor</h4>
            </header>

            <dl>
              <dt>Deposit</dt>
              <dd>
                {listing.rental.depositAmount?.toLocaleString("sv-SE")} SEK (
                {listing.rental.depositMonths} månader)
              </dd>

              <dt>Tillgänglig från</dt>
              <dd>
                {new Date(listing.rental.availableFrom).toLocaleDateString(
                  "sv-SE",
                )}
              </dd>

              <dt>Minimiuthyrningstid</dt>
              <dd>{listing.rental.minimumRentalPeriod} månader</dd>

              <dt>Möblerad</dt>
              <dd>{listing.rental.furnished ? "Ja" : "Nej"}</dd>

              <dt>Hyrestyp</dt>
              <dd>
                {listing.rental.leaseType === "long_term"
                  ? "Långtidsuthyrning"
                  : "Korttidsuthyrning"}
              </dd>
            </dl>
          </article>

          {/* Property Info */}
          <article>
            <header>
              <h4>Fastighetsinfo</h4>
            </header>

            <dl>
              <dt>Byggår</dt>
              <dd>{listing.property.yearBuilt}</dd>

              <dt>Senast renoverad</dt>
              <dd>{listing.property.lastRenovated}</dd>

              <dt>Badrum renoverat</dt>
              <dd>{listing.property.bathroomRenovated}</dd>

              <dt>Kök renoverat</dt>
              <dd>{listing.property.kitchenRenovated}</dd>

              <dt>Skick</dt>
              <dd style={{ textTransform: "capitalize" }}>
                {listing.property.condition}
              </dd>
            </dl>
          </article>
        </aside>
      </div>
    </div>
  );
}
