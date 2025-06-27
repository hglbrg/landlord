export interface Image {
  url: string
  alt: string
}

export interface Location {
  streetAddress: string
  postalCode: string
  city: string
  area: string
  country: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

export interface Transport {
  stationName: string
  type: string
  walkingMinutes: number
  lines?: string[]
}

export interface NearbyAmenity {
  name: string
  walkingMinutes: number
  description: string
}

export interface Features {
  balcony: boolean
  garden: boolean
  parking: boolean
  elevator: boolean
  storage: boolean
  petsAllowed: boolean
  smokingAllowed: boolean
}

export interface Amenities {
  laundryRoom: boolean
  bikeStorage: boolean
  fiberInternet: boolean
  heatingIncluded: boolean
  waterIncluded: boolean
  electricityIncluded: boolean
  internetIncluded: boolean
}

export interface Listing {
  id: string
  slug: string
  status: string
  featured: boolean
  assignedAgent: string
  basic: {
    title: string
    shortDescription: string
    description: string
  }
  specifications: {
    rooms: number
    bedrooms: number
    bathrooms: number
    sizeSqm: number
    floor: number
    totalFloors: number
    rentAmount: number
    currency: string
  }
  location: Location
  rental: {
    availableFrom: string
    minimumRentalPeriod: number
    depositAmount: number
    leaseType: string
    furnished: boolean
  }
  property: {
    yearBuilt: number
    lastRenovated: number
    bathroomRenovated?: number
    kitchenRenovated?: number
  }
  features: Features
  amenities: Amenities
  images: Image[]
  floorPlanImages: Image[]
  transport: Transport[]
  nearbyAmenities: NearbyAmenity[]
}

export interface Agent {
  id: string
  personal: {
    fullName: string
    firstName: string
    lastName: string
    email: string
    phone: string
    avatar: string
    bio: string
    title: string
    languages: string[]
    yearsExperience: number
  }
  workDetails: {
    verified: boolean
    responseTimeHours: number
    specialties: string[]
    workingHours: {
      monday: { start: string; end: string }
      friday: { start: string; end: string }
      saturday: { start: string; end: string; closed?: boolean }
    }
  }
  coverage: {
    primaryAreas: string[]
  }
  statistics: {
    averageRating: number
    totalReviews: number
    successfulRentals: number
  }
}
