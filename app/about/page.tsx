import Link from "next/link";
import Image from "next/image";

// Import data files
import listingsData from "@/lib/data/listings.json";
import agentsData from "@/lib/data/agents.json";
import siteInfoData from "@/lib/data/siteInfo.json";
import strings from "@/lib/data/strings.json";

export default function AboutPage() {
  const primaryAgent = agentsData.agents.find(
    (agent) => agent.id === siteInfoData.site.primaryAgentId,
  );
  const allAvailableListings = listingsData.listings.filter(
    (listing) => listing.status === "available",
  );

  if (!primaryAgent) {
    return (
      <div className="container">
        <p>Agent information not found.</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <section>
        <hgroup>
          <h1>{strings.about.title}</h1>
          <p>{strings.about.privateLandlord}</p>
        </hgroup>
      </section>

      {/* Main Profile Section */}
      <section>
        <div className="grid">
          <div>
            <div
              className="owner-profile"
              style={{ padding: "2rem", marginBottom: "2rem" }}
            >
              <Image
                src={primaryAgent.personal.avatar}
                alt={primaryAgent.personal.fullName}
                width={80}
                height={80}
                className="owner-avatar"
                style={{ width: "80px", height: "80px" }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{primaryAgent.personal.fullName}</h3>
                <p
                  style={{
                    margin: "0.5rem 0",
                    color: "var(--pico-muted-color)",
                  }}
                >
                  {primaryAgent.personal.title}
                </p>
                {primaryAgent.workDetails.verified && (
                  <p style={{ margin: 0, color: "var(--pico-primary)" }}>
                    {strings.about.verifiedLandlord}
                  </p>
                )}
              </div>
            </div>

            <h3>{strings.about.aboutMeTitle}</h3>
            <p>{primaryAgent.personal.bio}</p>
            <p>{strings.about.aboutMeContent}</p>

            {/* Languages */}
            {primaryAgent.personal.languages && (
              <div>
                <h5>Språk:</h5>
                <div className="rental-features">
                  {primaryAgent.personal.languages.map((language) => (
                    <span key={language} className="rental-feature">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {/* Contact Info */}
            <article>
              <header>
                <h4>{strings.about.contactMeTitle}</h4>
              </header>

              <dl>
                <dt>{strings.listing.email}</dt>
                <dd>
                  <a href={`mailto:${primaryAgent.personal.email}`}>
                    {primaryAgent.personal.email}
                  </a>
                </dd>

                <dt>{strings.listing.phone}</dt>
                <dd>
                  <a href={`tel:${primaryAgent.personal.phone}`}>
                    {primaryAgent.personal.phone}
                  </a>
                </dd>

                <dt>{strings.about.responseTimeLabel}</dt>
                <dd>
                  {strings.common.responseTime.replace(
                    "{hours}",
                    primaryAgent.workDetails.responseTimeHours.toString(),
                  )}
                </dd>

                <dt>Erfarenhet</dt>
                <dd>
                  {primaryAgent.personal.yearsExperience} år inom
                  fastighetsförvaltning
                </dd>
              </dl>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <a href={`mailto:${primaryAgent.personal.email}`} role="button">
                  {strings.home.sendEmail}
                </a>
                <a
                  href={`tel:${primaryAgent.personal.phone}`}
                  role="button"
                  className="secondary"
                >
                  {strings.home.callMe}
                </a>
              </div>
            </article>

            {/* Working Hours */}
            <article>
              <header>
                <h5>Arbetstider</h5>
              </header>
              <dl>
                <dt>Måndag - Torsdag</dt>
                <dd>
                  {primaryAgent.workDetails.workingHours.monday.start} -{" "}
                  {primaryAgent.workDetails.workingHours.monday.end}
                </dd>

                <dt>Fredag</dt>
                <dd>
                  {primaryAgent.workDetails.workingHours.friday.start} -{" "}
                  {primaryAgent.workDetails.workingHours.friday.end}
                </dd>

                <dt>Lördag</dt>
                <dd>
                  {primaryAgent.workDetails.workingHours.saturday.closed
                    ? "Stängt"
                    : `${primaryAgent.workDetails.workingHours.saturday.start} - ${primaryAgent.workDetails.workingHours.saturday.end}`}
                </dd>

                <dt>Söndag</dt>
                <dd>Stängt</dd>
              </dl>
            </article>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section>
        <h2>{strings.about.whatToExpect}</h2>

        <div className="grid">
          {primaryAgent.workDetails.specialties && (
            <article>
              <h4>Specialiteter</h4>
              <ul>
                {primaryAgent.workDetails.specialties.map((specialty) => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
            </article>
          )}

          <article>
            <h4>Statistik</h4>
            <dl>
              <dt>Genomsnittligt betyg</dt>
              <dd>{primaryAgent.statistics.averageRating}/5 ⭐</dd>

              <dt>Antal recensioner</dt>
              <dd>{primaryAgent.statistics.totalReviews}</dd>

              <dt>Genomförda uthyrningar</dt>
              <dd>{primaryAgent.statistics.successfulRentals}</dd>
            </dl>
          </article>
        </div>
      </section>

      {/* Properties & Areas */}
      <section>
        <h2>{strings.about.myProperties}</h2>
        <p>{strings.about.myPropertiesDesc}</p>

        <h3>{strings.about.areasIWorkIn}</h3>
        <div className="grid">
          {primaryAgent.coverage.primaryAreas.includes("Söderköping") && (
            <article>
              <h4>{strings.about.soderkopingCenter}</h4>
              <p>{strings.about.soderkopingCenterDesc}</p>
            </article>
          )}

          {primaryAgent.coverage.primaryAreas.some((area) =>
            area.includes("Södermalm"),
          ) && (
            <article>
              <h4>{strings.about.sodermalm}</h4>
              <p>{strings.about.sodermalmDesc}</p>
            </article>
          )}
        </div>

        <p>
          <em>{strings.about.allApartmentsDesc}</em>
        </p>
      </section>

      {/* Process */}
      <section>
        <h2>{strings.about.howItWorks}</h2>

        <div className="grid">
          <article>
            <h4>{strings.about.step1}</h4>
            <p>{strings.about.step1Desc}</p>
          </article>

          <article>
            <h4>{strings.about.step2}</h4>
            <p>{strings.about.step2Desc}</p>
          </article>

          <article>
            <h4>{strings.about.step3}</h4>
            <p>{strings.about.step3Desc}</p>
          </article>

          <article>
            <h4>{strings.about.step4}</h4>
            <p>{strings.about.step4Desc}</p>
          </article>
        </div>
      </section>

      {/* Current Apartments */}
      <section>
        <h3>{strings.about.currentApartmentsTitle}</h3>
        <p>
          {strings.about.currentApartmentsDesc.replace(
            "{count}",
            allAvailableListings.length.toString(),
          )}
        </p>

        <div style={{ textAlign: "center" }}>
          <Link href="/ledigt" role="button">
            Se alla {allAvailableListings.length} lägenheter
          </Link>
        </div>
      </section>

      {/* Ready to Find CTA */}
      <section>
        <article
          style={{
            textAlign: "center",
            background: "var(--pico-card-sectioning-background-color)",
          }}
        >
          <h3>{strings.about.readyToFind}</h3>
          <p>{strings.about.readyToFindDesc}</p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href={`mailto:${primaryAgent.personal.email}`} role="button">
              {strings.home.sendEmail}
            </a>
            <Link href="/ledigt" role="button" className="secondary">
              Se lediga lägenheter
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
