"use client";

import Image from "next/image";
import { useState } from "react";
import { Agent } from "@/lib/types/listing";
import strings from "@/lib/data/strings.json";

interface ContactFormProps {
  assignedAgent: Agent;
}

export default function ContactForm({ assignedAgent }: ContactFormProps) {
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
    <article>
      <header>
        <h3>{strings.listing.contactLandlord}</h3>
      </header>

      <div
        className="owner-profile"
        style={{ padding: "1rem", border: "none", background: "transparent" }}
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
  );
}
