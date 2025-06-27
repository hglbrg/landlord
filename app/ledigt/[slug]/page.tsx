import Link from "next/link";
import ListingDetailClient from "./ListingDetailClient";
import { Listing, Agent } from "@/lib/types/listing";
import styles from "./page.module.css";

// Import data files
import listingsData from "@/lib/data/listings.json";
import agentsData from "@/lib/data/agents.json";
import strings from "@/lib/data/strings.json";

// This would normally use params from Next.js
export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params in Next.js 15
  const { slug } = await params;

  // Find the listing by slug
  const listing = (listingsData as { listings: Listing[] }).listings.find(
    (l) => l.slug === slug,
  );
  const assignedAgent = listing
    ? (agentsData as { agents: Agent[] }).agents.find(
        (agent) => agent.id === listing.assignedAgent,
      )
    : undefined;

  if (!listing) {
    return (
      <div className="container">
        <p>Lägenheten kunde inte hittas.</p>
        <Link href="/ledigt">{strings.navigation.backToAllApartments}</Link>
      </div>
    );
  }

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

      {/* Main Content - Client Component */}
      <ListingDetailClient listing={listing} assignedAgent={assignedAgent} />
    </div>
  );
}
