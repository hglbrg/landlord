import Link from "next/link";

interface HeaderProps {
  ownerName?: string;
}

export default function Header({ ownerName = "Anna Svensson" }: HeaderProps) {
  return (
    <header className="container-fluid">
      <nav>
        <ul>
          <li>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
              }}
            >
              <img
                src="/icon-192.png"
                alt="Logo"
                width="24"
                height="24"
                style={{ display: "block" }}
              />
              <strong>{ownerName} Fastigheter</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/ledigt">Lediga lägenheter</Link>
          </li>
          <li>
            <Link href="/about">Om mig</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
