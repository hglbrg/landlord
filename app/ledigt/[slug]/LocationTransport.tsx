"use client";

import { useState } from "react";
import MapComponent from "@/lib/components/Map";
import { Listing } from "@/lib/types/listing";
import strings from "@/lib/data/strings.json";

interface LocationTransportProps {
  listing: Listing;
}

export default function LocationTransport({ listing }: LocationTransportProps) {
  return (
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
  );
}
