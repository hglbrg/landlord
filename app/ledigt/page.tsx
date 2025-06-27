import Link from "next/link";
import Image from "next/image";
import { FeatureTags } from "@/lib/utils/get-features";
import styles from "./page.module.css";

// Import data files
import listingsData from "@/lib/data/listings.json";
import agentsData from "@/lib/data/agents.json";
import siteInfoData from "@/lib/data/siteInfo.json";
import strings from "@/lib/data/strings.json";

export default function ListingsPage() {
  const primaryAgent = agentsData.agents.find(
    (agent) => agent.id === siteInfoData.site.primaryAgentId,
  );
  const availableListings = listingsData.listings.filter(
    (listing) => listing.status === "available",
  );

  return (
    <div className="container">
      {/* Header */}
      <section>
        <hgroup>
          <h1>{strings.listings.title}</h1>
          <p>{strings.listings.subtitle}</p>
        </hgroup>
      </section>

      {/* Main Content Grid */}
      <div className={`grid ${styles.listingsGrid}`}>
        {/* Listings */}
        <div className={styles.listingsMain}>
          {availableListings.length > 0 ? (
            <>
              {availableListings.map((listing) => {
                return (
                  <article key={listing.id} className="rental-card">
                    <div className={styles.listingCardGrid}>
                      {/* Image */}
                      <div>
                        <Link href={`/ledigt/${listing.slug}`}>
                          <div className={styles.imageContainer}>
                            <Image
                              src={listing.images[0]?.url || ""}
                              alt={
                                listing.images[0]?.alt || listing.basic.title
                              }
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </Link>
                      </div>

                      {/* Content */}
                      <div>
                        <header>
                          <h3 style={{ margin: "0 0 0.5rem 0" }}>
                            <Link
                              href={`/ledigt/${listing.slug}`}
                              style={{ textDecoration: "none" }}
                            >
                              {listing.basic.title}
                            </Link>
                          </h3>
                          <div className={styles.priceAndLocation}>
                            <span className="rental-price">
                              {listing.specifications.rentAmount.toLocaleString(
                                "sv-SE",
                              )}{" "}
                              kr/{strings.common.monthShort}
                            </span>
                            <small style={{ color: "var(--pico-muted-color)" }}>
                              {listing.location.streetAddress},{" "}
                              {listing.location.city}
                            </small>
                          </div>
                        </header>

                        <p style={{ margin: "0 0 1rem 0" }}>
                          {listing.basic.shortDescription}
                        </p>

                        {/* Specs */}
                        <div className={styles.specsContainer}>
                          <span>
                            {listing.specifications.rooms}{" "}
                            {strings.common.rooms}
                          </span>
                          <span>•</span>
                          <span>{listing.specifications.sizeSqm} m²</span>
                          <span>•</span>
                          <span>
                            {strings.listing.floor}{" "}
                            {listing.specifications.floor}
                          </span>
                        </div>

                        {/* Features */}
                        <FeatureTags
                          features={listing.features}
                          amenities={listing.amenities}
                          maxVisible={5}
                        />

                        {/* Availability */}
                        <div className={styles.availabilityContainer}>
                          <small style={{ color: "var(--pico-muted-color)" }}>
                            {strings.common.availableFrom}:{" "}
                            {new Date(
                              listing.rental.availableFrom,
                            ).toLocaleDateString("sv-SE")}
                          </small>
                          <Link
                            href={`/ledigt/${listing.slug}`}
                            role="button"
                            className="outline"
                          >
                            {strings.common.viewApartment}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </>
          ) : (
            <article>
              <p>{strings.listings.noApartments}</p>
            </article>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          {/* About Landlord */}
          {primaryAgent && (
            <article>
              <header>
                <h4>{strings.listings.aboutLandlord}</h4>
              </header>

              <div
                className="owner-profile"
                style={{
                  padding: "1rem",
                  border: "none",
                  background: "transparent",
                }}
              >
                <Image
                  src={primaryAgent.personal.avatar}
                  alt={primaryAgent.personal.fullName}
                  width={48}
                  height={48}
                  className="owner-avatar"
                />
                <div>
                  <h5 style={{ margin: 0 }}>
                    {primaryAgent.personal.fullName}
                  </h5>
                  {primaryAgent.workDetails.verified && (
                    <small style={{ color: "var(--pico-primary)" }}>
                      ✓ {strings.common.verified}
                    </small>
                  )}
                  <p
                    className="response-time"
                    style={{ margin: "0.5rem 0 0 0" }}
                  >
                    {strings.common.responseTime.replace(
                      "{hours}",
                      primaryAgent.workDetails.responseTimeHours.toString(),
                    )}
                  </p>
                </div>
              </div>

              <p style={{ fontSize: "0.9rem", margin: "1rem 0" }}>
                {primaryAgent.personal.bio}
              </p>

              <footer>
                <Link href="/about" role="button" className="outline">
                  Läs mer om mig
                </Link>
              </footer>
            </article>
          )}

          {/* Contact */}
          {primaryAgent && (
            <article>
              <header>
                <h4>{strings.listings.contactMe}</h4>
              </header>

              <dl>
                <dt>{strings.listing.email}</dt>
                <dd>
                  <a href={`mailto:${primaryAgent.personal.email}`}>
                    {primaryAgent.personal.email}
                  </a>
                </dd>

                <dt>{strings.listing.phone}</dt>
                <dd>
                  <a href={`tel:${primaryAgent.personal.phone}`}>
                    {primaryAgent.personal.phone}
                  </a>
                </dd>
              </dl>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <a href={`mailto:${primaryAgent.personal.email}`} role="button">
                  {strings.common.sendMessage}
                </a>
                <a
                  href={`tel:${primaryAgent.personal.phone}`}
                  role="button"
                  className="secondary"
                >
                  Ring mig
                </a>
              </div>
            </article>
          )}

          {/* Transport & Nearby Info */}
          <article>
            <header>
              <h4>{strings.listings.transportAndNearby}</h4>
            </header>

            <p style={{ fontSize: "0.9rem" }}>
              Alla våra lägenheter har utmärkt kollektivtrafikförbindelser och
              ligger nära butiker, restauranger och grönområden.
            </p>

            <details>
              <summary>Områden vi verkar i</summary>
              <ul>
                <li>
                  <strong>Söderköping centrum</strong> - Nära Göta kanal och
                  historiska centrum
                </li>
                <li>
                  <strong>Stockholm Södermalm</strong> - Urbant boende med
                  närhet till city
                </li>
              </ul>
            </details>
          </article>
        </aside>
      </div>
    </div>
  );
}
