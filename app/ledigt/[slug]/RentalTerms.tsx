import Link from "next/link";
import { Listing } from "@/lib/types/listing";
import strings from "@/lib/data/strings.json";

interface RentalTermsProps {
  listing: Listing;
}

export default function RentalTerms({ listing }: RentalTermsProps) {
  return (
    <>
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
            {new Date(listing.rental.availableFrom).toLocaleDateString("sv-SE")}
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
    </>
  );
}
