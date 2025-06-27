"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DetailedFeatureList } from "@/lib/utils/get-features";
import { Listing, Agent } from "@/lib/types/listing";
import styles from "./page.module.css";
import strings from "@/lib/data/strings.json";

interface ListingDetailClientProps {
  listing: Listing;
  assignedAgent: Agent | undefined;
}

export default function ListingDetailClient({
  listing,
  assignedAgent,
}: ListingDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Meddelande skickat! Vi återkommer till dig inom kort.");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.mainGrid}>
      {/* Left Column - Images and Details */}
      <div>
        {/* Image Gallery */}
        <section>
          <div style={{ marginBottom: "1rem" }}>
            <Image
              src={
                listing.images[selectedImageIndex]?.url || listing.images[0].url
              }
              alt={
                listing.images[selectedImageIndex]?.alt || listing.images[0].alt
              }
              width={800}
              height={400}
              className={styles.mainImage}
            />
          </div>

          {listing.images.length > 1 && (
            <div className={styles.imageGallery}>
              {listing.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`${styles.thumbnailButton} ${selectedImageIndex === index ? styles.selected : ""}`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={100}
                    height={60}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Description */}
        <section>
          <h2>{strings.listing.description}</h2>
          <div className={styles.descriptionText}>
            {listing.basic.description}
          </div>
        </section>

        {/* Specifications */}
        <section>
          <h3>{strings.listing.specifications}</h3>
          <div className={styles.specsGrid}>
            <article>
              <dl>
                <dt>{strings.common.size}</dt>
                <dd>{listing.specifications.sizeSqm} m²</dd>

                <dt>{strings.common.rooms}</dt>
                <dd>{listing.specifications.rooms}</dd>

                <dt>{strings.common.bedrooms}</dt>
                <dd>{listing.specifications.bedrooms}</dd>

                <dt>Badrum</dt>
                <dd>{listing.specifications.bathrooms}</dd>

                <dt>{strings.listing.floor}</dt>
                <dd>
                  {listing.specifications.floor}{" "}
                  {strings.listing.totalFloors.replace(
                    "{total}",
                    listing.specifications.totalFloors.toString(),
                  )}
                </dd>
              </dl>
            </article>

            <article>
              <h4>Egenskaper & Bekvämligheter</h4>
              <DetailedFeatureList
                features={listing.features}
                amenities={listing.amenities}
              />
            </article>
          </div>
        </section>

        {/* Location & Transport */}
        <section>
          <h3>{strings.listing.locationAndTransport}</h3>

          <h4>{strings.listing.publicTransport}</h4>
          <ul>
            {listing.transport.map((transport, index) => (
              <li key={index}>
                <strong>{transport.stationName}</strong> ({transport.type}) -{" "}
                {transport.walkingMinutes} {strings.listing.walkingMinutes}
                {transport.lines && transport.lines.length > 0 && (
                  <span> • Linjer: {transport.lines.join(", ")}</span>
                )}
              </li>
            ))}
          </ul>

          <h4>{strings.listing.nearby}</h4>
          <ul>
            {listing.nearbyAmenities.map((amenity, index) => (
              <li key={index}>
                <strong>{amenity.name}</strong> - {amenity.walkingMinutes}{" "}
                {strings.listing.walkingMinutes}
                <br />
                <small>{amenity.description}</small>
              </li>
            ))}
          </ul>
        </section>

        {/* Property Info */}
        <section>
          <h3>{strings.listing.propertyInfo}</h3>
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
        </section>
      </div>

      {/* Right Column - Contact & Rental Info */}
      <aside>
        {/* Contact Landlord */}
        {assignedAgent && (
          <article>
            <header>
              <h3>{strings.listing.contactLandlord}</h3>
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
                src={assignedAgent.personal.avatar}
                alt={assignedAgent.personal.fullName}
                width={48}
                height={48}
                className="owner-avatar"
              />
              <div>
                <h4 style={{ margin: 0 }}>{assignedAgent.personal.fullName}</h4>
                {assignedAgent.workDetails.verified && (
                  <small style={{ color: "var(--pico-primary)" }}>
                    ✓ {strings.common.verified}
                  </small>
                )}
                <p className="response-time" style={{ margin: "0.5rem 0 0 0" }}>
                  {strings.common.responseTime.replace(
                    "{hours}",
                    assignedAgent.workDetails.responseTimeHours.toString(),
                  )}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                {strings.listing.name}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                {strings.listing.email}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                {strings.listing.phone}
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                {strings.listing.message}
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={strings.listing.messagePlaceholder}
                  required
                />
              </label>

              <button type="submit">{strings.common.sendMessage}</button>
            </form>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <a
                href={`mailto:${assignedAgent.personal.email}`}
                role="button"
                className="secondary"
              >
                {strings.home.sendEmail}
              </a>
              <a
                href={`tel:${assignedAgent.personal.phone}`}
                role="button"
                className="outline"
              >
                {strings.home.callMe}
              </a>
            </div>
          </article>
        )}

        {/* Rental Terms */}
        <article>
          <header>
            <h4>{strings.listing.rentalTerms}</h4>
          </header>

          <dl>
            <dt>{strings.common.rent}</dt>
            <dd>
              {listing.specifications.rentAmount.toLocaleString("sv-SE")}{" "}
              {listing.specifications.currency}
            </dd>

            <dt>{strings.common.deposit}</dt>
            <dd>
              {listing.rental.depositAmount.toLocaleString("sv-SE")}{" "}
              {listing.specifications.currency}
            </dd>

            <dt>{strings.listing.minimumRentalPeriod}</dt>
            <dd>
              {listing.rental.minimumRentalPeriod} {strings.listing.months}
            </dd>

            <dt>{strings.common.availableFrom}</dt>
            <dd>
              {new Date(listing.rental.availableFrom).toLocaleDateString(
                "sv-SE",
              )}
            </dd>

            <dt>Uthyrningstyp</dt>
            <dd>
              {listing.rental.leaseType === "long_term"
                ? strings.listing.longTermRental
                : strings.listing.shortTermRental}
            </dd>

            <dt>Möblering</dt>
            <dd>
              {listing.rental.furnished
                ? strings.listing.furnished
                : strings.listing.unfurnished}
            </dd>
          </dl>
        </article>

        {/* Back to Listings */}
        <div style={{ textAlign: "center" }}>
          <Link href="/ledigt" role="button" className="outline">
            {strings.navigation.backToAllApartments}
          </Link>
        </div>
      </aside>
    </div>
  );
}
