import Image from "next/image";
import { Agent } from "@/lib/types/listing";
import strings from "@/lib/data/strings.json";

interface AgentInfoProps {
  assignedAgent: Agent;
}

export default function AgentInfo({ assignedAgent }: AgentInfoProps) {
  return (
    <article>
      <header>
        <h4>Din kontakt</h4>
      </header>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Image
          src={assignedAgent.personal.avatar}
          alt={assignedAgent.personal.fullName}
          width={64}
          height={64}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div>
          <h5 style={{ margin: 0, fontSize: "1.1rem" }}>
            {assignedAgent.personal.fullName}
          </h5>
          <p style={{ margin: "0.25rem 0", color: "var(--pico-muted-color)" }}>
            {assignedAgent.personal.title}
          </p>
          {assignedAgent.workDetails.verified && (
            <small
              style={{
                color: "var(--pico-primary)",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              ✓ {strings.common.verified}
            </small>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "1rem",
          backgroundColor: "var(--pico-card-background-color)",
          borderRadius: "var(--pico-border-radius)",
          border: "1px solid var(--pico-muted-border-color)",
          marginBottom: "1rem",
        }}
      >
        <div style={{ marginBottom: "0.75rem" }}>
          <strong>Erfarenhet:</strong> {assignedAgent.personal.yearsExperience}{" "}
          år
        </div>
        <div style={{ marginBottom: "0.75rem" }}>
          <strong>Svarstid:</strong>{" "}
          {strings.common.responseTime.replace(
            "{hours}",
            assignedAgent.workDetails.responseTimeHours.toString(),
          )}
        </div>
        <div style={{ marginBottom: "0.75rem" }}>
          <strong>Språk:</strong> {assignedAgent.personal.languages.join(", ")}
        </div>
        <div>
          <strong>Betyg:</strong> ⭐ {assignedAgent.statistics.averageRating}/5
          ({assignedAgent.statistics.totalReviews} recensioner)
        </div>
      </div>

      <div
        style={{ fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1rem" }}
      >
        {assignedAgent.personal.bio}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <a
          href={`mailto:${assignedAgent.personal.email}`}
          role="button"
          className="contrast"
          style={{ textAlign: "center" }}
        >
          📧 {strings.home.sendEmail}
        </a>
        <a
          href={`tel:${assignedAgent.personal.phone}`}
          role="button"
          className="outline"
          style={{ textAlign: "center" }}
        >
          📞 {strings.home.callMe}
        </a>
      </div>
    </article>
  );
}
