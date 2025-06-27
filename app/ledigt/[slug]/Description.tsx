import styles from "./page.module.css";
import strings from "@/lib/data/strings.json";

interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  return (
    <section>
      <h2>{strings.listing.description}</h2>
      <div className={styles.descriptionText}>{description}</div>
    </section>
  );
}
