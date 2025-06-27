import strings from "@/lib/data/strings.json";

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
}

export function getFeatures(features: Features): FeatureItem[] {
  const featureMap: Record<keyof Features, string> = {
    balcony: strings.features.balcony,
    garden: strings.features.garden,
    parking: strings.features.parking,
    elevator: strings.features.elevator,
    storage: strings.features.storage,
    petsAllowed: strings.features.petsAllowed,
    smokingAllowed: "Rökning tillåten", // Not in strings yet
  };

  return Object.entries(features)
    .filter(([_, value]) => value === true)
    .map(([key, value]) => ({
      key,
      label: featureMap[key as keyof Features] || key,
      value,
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

  return Object.entries(amenities)
    .filter(([_, value]) => value === true)
    .map(([key, value]) => ({
      key,
      label: amenityMap[key as keyof Amenities] || key,
      value,
    }));
}

export function getAllFeatures(
  features: Features,
  amenities: Amenities,
): FeatureItem[] {
  return [...getFeatures(features), ...getAmenities(amenities)];
}

// Component to render feature tags
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

  const visibleFeatures = allFeatures.slice(0, maxVisible);
  const hiddenCount = allFeatures.length - maxVisible;

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

// Hook for getting feature counts
export function useFeatureCounts(features: Features, amenities: Amenities) {
  const featureItems = getFeatures(features);
  const amenityItems = getAmenities(amenities);

  return {
    features: featureItems,
    amenities: amenityItems,
    totalCount: featureItems.length + amenityItems.length,
    featureCount: featureItems.length,
    amenityCount: amenityItems.length,
  };
}
