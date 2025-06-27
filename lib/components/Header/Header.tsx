import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  ownerName: string;
}

export default function Header({ ownerName }: HeaderProps) {
  return (
    <header className="container">
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
              <Image src="/icon-192.png" alt="Logo" width={32} height={32} />
              <strong>{ownerName}</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/">Hem</Link>
          </li>
          <li>
            <Link href="/ledigt">Lediga lägenheter</Link>
          </li>
          <li>
            <Link href="/om-mig">Om mig</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
