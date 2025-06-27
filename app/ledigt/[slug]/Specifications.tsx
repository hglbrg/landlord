import { DetailedFeatureList } from "@/lib/utils/get-features";
import { Listing } from "@/lib/types/listing";
import styles from "./page.module.css";
import strings from "@/lib/data/strings.json";

interface SpecificationsProps {
  listing: Listing;
}

export default function Specifications({ listing }: SpecificationsProps) {
  return (
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
  );
}
