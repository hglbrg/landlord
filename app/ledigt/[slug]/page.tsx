"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getFeatures, getAmenities } from "@/lib/utils/get-features";
import styles from "./page.module.css";

// Import data files
import listingsData from "@/lib/data/listings.json";
import agentsData from "@/lib/data/agents.json";
import strings from "@/lib/data/strings.json";

// This would normally use params from Next.js
export default function ListingDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // In a real app, you'd find the listing by slug from params
  // For demo, we'll use the first listing
  const listing = listingsData.listings[0]; // This should be: listingsData.listings.find(l => l.slug === params.slug)
  const assignedAgent = agentsData.agents.find(
    (agent) => agent.id === listing?.assignedAgent,
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  if (!listing) {
    return (
      <div className="container">
        <p>Lägenheten kunde inte hittas.</p>
        <Link href="/ledigt">{strings.navigation.backToAllApartments}</Link>
      </div>
    );
  }

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
    <div className="container">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ul>
          <li>
            <Link href="/">Hem</Link>
          </li>
          <li>
            <Link href="/ledigt">{strings.navigation.availableApartments}</Link>
          </li>
          <li>{listing.basic.title}</li>
        </ul>
      </nav>

      {/* Header */}
      <section>
        <hgroup>
          <h1>{listing.basic.title}</h1>
          <p>
            {listing.location.streetAddress}, {listing.location.city}
          </p>
        </hgroup>

        <div className={styles.priceAndSpecs}>
          <span className="rental-price" style={{ fontSize: "1.5rem" }}>
            {listing.specifications.rentAmount.toLocaleString("sv-SE")} kr/
            {strings.common.monthShort}
          </span>
          <div className="rental-features">
            <span className="rental-feature">
              {listing.specifications.rooms} {strings.common.rooms}
            </span>
            <span className="rental-feature">
              {listing.specifications.sizeSqm} m²
            </span>
            <span className="rental-feature">
              {strings.listing.floor} {listing.specifications.floor}/
              {listing.specifications.totalFloors}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className={styles.mainGrid}>
        {/* Left Column - Images and Details */}
        <div>
          {/* Image Gallery */}
          <section>
            <div style={{ marginBottom: "1rem" }}>
              <Image
                src={
                  listing.images[selectedImageIndex]?.url ||
                  listing.images[0].url
                }
                alt={
                  listing.images[selectedImageIndex]?.alt ||
                  listing.images[0].alt
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
                <h4>{strings.common.features}</h4>
                <div className="rental-features">
                  {getFeatures(listing.features).map((feature) => (
                    <span key={feature.key} className="rental-feature">
                      {feature.label}
                    </span>
                  ))}
                </div>

                <h4>{strings.common.amenities}</h4>
                <div className="rental-features">
                  {getAmenities(listing.amenities).map((amenity) => (
                    <span key={amenity.key} className="rental-feature">
                      {amenity.label}
                    </span>
                  ))}
                </div>
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
                  <h4 style={{ margin: 0 }}>
                    {assignedAgent.personal.fullName}
                  </h4>
                  {assignedAgent.workDetails.verified && (
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
    </div>
  );
}
