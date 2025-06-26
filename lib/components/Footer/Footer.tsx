import Link from "next/link";

interface FooterProps {
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
}

export default function Footer({
  ownerName = "Anna Svensson",
  ownerEmail = "anna.svensson@email.com",
  ownerPhone = "+46 70 123 45 67",
}: FooterProps) {
  return (
    <footer
      style={{
        backgroundColor: "var(--pico-primary)",
        color: "var(--pico-primary-inverse)",
      }}
    >
      <div className="container-fluid" data-theme="dark">
        <div className="grid">
          <div>
            <h6>Kontakt</h6>
            <p>
              <strong>{ownerName}</strong>
              <br />
              <small>
                <a
                  href={`mailto:${ownerEmail}`}
                  style={{ color: "var(--pico-primary-inverse)" }}
                >
                  {ownerEmail}
                </a>
                <br />
                <a
                  href={`tel:${ownerPhone}`}
                  style={{ color: "var(--pico-primary-inverse)" }}
                >
                  {ownerPhone}
                </a>
              </small>
            </p>
          </div>
          <div>
            <h6>Navigation</h6>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/" style={{ color: "var(--pico-primary-inverse)" }}>
                  Lediga lägenheter
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  style={{ color: "var(--pico-primary-inverse)" }}
                >
                  Om mig
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6>Information</h6>
            <p>
              <small>
                Privatperson som hyr ut lägenheter
                <br />
                i Söderköping med omnejd.
                <br />
                Svarar oftast inom 2 timmar.
              </small>
            </p>
          </div>
        </div>
        <hr style={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
        <div style={{ textAlign: "center" }}>
          <small>
            © {new Date().getFullYear()} {ownerName}. Alla rättigheter
            förbehållna.
          </small>
        </div>
      </div>
    </footer>
  );
}
