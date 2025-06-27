import strings from "@/lib/data/strings.json";
import { Check, X } from "lucide-react";

interface Features {
  balcony: boolean;
  garden: boolean;
  parking: boolean;
  elevator: boolean;
  storage: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
}

interface Amenities {
  laundryRoom: boolean;
  bikeStorage: boolean;
  fiberInternet: boolean;
  heatingIncluded: boolean;
  waterIncluded: boolean;
  electricityIncluded: boolean;
  internetIncluded: boolean;
}

interface FeatureItem {
  key: string;
  label: string;
  value: boolean;
  status: "yes" | "no";
}

export function getFeatures(features: Features): FeatureItem[] {
  const featureMap: Record<keyof Features, string> = {
    balcony: strings.features.balcony,
    garden: strings.features.garden,
    parking: strings.features.parking,
    elevator: strings.features.elevator,
    storage: strings.features.storage,
    petsAllowed: "Djur",
    smokingAllowed: "Rökning",
  };

  return Object.entries(features).map(([key, value]) => ({
    key,
    label: featureMap[key as keyof Features] || key,
    value,
    status: value ? "yes" : ("no" as const),
  }));
}

export function getAmenities(amenities: Amenities): FeatureItem[] {
  const amenityMap: Record<keyof Amenities, string> = {
    laundryRoom: strings.features.laundryRoom,
    bikeStorage: strings.features.bikeStorage,
    fiberInternet: strings.features.fiberInternet,
    heatingIncluded: strings.features.heatingIncluded,
    waterIncluded: strings.features.waterIncluded,
    electricityIncluded: strings.features.electricityIncluded,
    internetIncluded: strings.features.internetIncluded,
  };

  return Object.entries(amenities).map(([key, value]) => ({
    key,
    label: amenityMap[key as keyof Amenities] || key,
    value,
    status: value ? "yes" : ("no" as const),
  }));
}

export function getAllFeatures(
  features: Features,
  amenities: Amenities,
): FeatureItem[] {
  return [...getFeatures(features), ...getAmenities(amenities)];
}

// Component to render feature list with yes/no indicators
interface FeatureListProps {
  features?: Features;
  amenities?: Amenities;
  showOnlyPositive?: boolean;
  className?: string;
  type?: "features" | "amenities" | "both";
}

export function FeatureList({
  features,
  amenities,
  showOnlyPositive = true, // Default to only show positive features
  className = "",
  type = "both",
}: FeatureListProps) {
  let itemsToShow: FeatureItem[] = [];

  if (type === "features" && features) {
    itemsToShow = getFeatures(features);
  } else if (type === "amenities" && amenities) {
    itemsToShow = getAmenities(amenities);
  } else if (type === "both" && features && amenities) {
    itemsToShow = getAllFeatures(features, amenities);
  }

  const filteredFeatures = showOnlyPositive
    ? itemsToShow.filter((f) => f.value === true)
    : itemsToShow;

  if (filteredFeatures.length === 0) {
    return (
      <p style={{ color: "var(--pico-muted-color)", fontStyle: "italic" }}>
        Inga tillgängliga egenskaper
      </p>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "0.5rem",
      }}
    >
      {filteredFeatures.map((feature) => (
        <div
          key={feature.key}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem",
            backgroundColor:
              feature.status === "yes"
                ? "var(--pico-primary-background)"
                : "var(--pico-del-background)",
            borderRadius: "var(--pico-border-radius)",
            border: `1px solid ${feature.status === "yes" ? "var(--pico-primary)" : "var(--pico-del-color)"}`,
          }}
        >
          {feature.status === "yes" ? (
            <Check
              size={16}
              style={{ color: "var(--pico-primary)", flexShrink: 0 }}
            />
          ) : (
            <X
              size={16}
              style={{ color: "var(--pico-del-color)", flexShrink: 0 }}
            />
          )}
          <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
            {feature.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// Component to render feature tags (for compact display - only positive features)
interface FeatureTagsProps {
  features: Features;
  amenities?: Amenities;
  maxVisible?: number;
  className?: string;
}

export function FeatureTags({
  features,
  amenities,
  maxVisible = 5,
  className = "rental-features",
}: FeatureTagsProps) {
  const allFeatures = amenities
    ? getAllFeatures(features, amenities)
    : getFeatures(features);

  // Only show positive features in tag format
  const positiveFeatures = allFeatures.filter((f) => f.value === true);
  const visibleFeatures = positiveFeatures.slice(0, maxVisible);
  const hiddenCount = positiveFeatures.length - maxVisible;

  return (
    <div className={className}>
      {visibleFeatures.map((feature) => (
        <span key={feature.key} className="rental-feature">
          {feature.label}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span className="rental-feature" style={{ opacity: 0.7 }}>
          +{hiddenCount} till
        </span>
      )}
    </div>
  );
}

// Component for detailed feature display (shows all features)
export function DetailedFeatureList({
  features,
  amenities,
  className = "",
}: {
  features: Features;
  amenities: Amenities;
  className?: string;
}) {
  const allFeatures = getAllFeatures(features, amenities);

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
      }}
    >
      {allFeatures.map((feature) => (
        <div
          key={feature.key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem",
            backgroundColor: "var(--pico-card-background-color)",
            borderRadius: "var(--pico-border-radius)",
            border: "1px solid var(--pico-muted-border-color)",
          }}
        >
          <span style={{ fontWeight: "500" }}>{feature.label}</span>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            {feature.status === "yes" ? (
              <>
                <Check size={16} style={{ color: "var(--pico-primary)" }} />
                <span
                  style={{
                    color: "var(--pico-primary)",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  Ja
                </span>
              </>
            ) : (
              <>
                <X size={16} style={{ color: "var(--pico-muted-color)" }} />
                <span
                  style={{
                    color: "var(--pico-muted-color)",
                    fontSize: "0.9rem",
                  }}
                >
                  Nej
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
