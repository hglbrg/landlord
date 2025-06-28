import Link from 'next/link'
import Image from 'next/image'

// Import data files
import listingsData from '@/lib/data/listings.json'
import agentsData from '@/lib/data/agents.json'
import siteInfoData from '@/lib/data/siteInfo.json'
import strings from '@/lib/data/strings.json'

export default function AboutPage() {
  const primaryAgent = agentsData.agents.find(
    agent => agent.id === siteInfoData.site.primaryAgentId
  )
  const allAvailableListings = listingsData.listings.filter(
    listing => listing.status === 'available'
  )

  if (!primaryAgent) {
    return (
      <div className="container">
        <p>Agent information not found.</p>
      </div>
    )
  }

  return (
    <main className="container">
      <hgroup>
        <h2>Om oss</h2>
        <p>Ett familjeföretag</p>
      </hgroup>
      <article>
        <p>
          Vår resa började för över 20 år sedan när vi, Anna och Erik, bestämde oss för att
          investera i fastigheter i Söderköping. Med en passion för att skapa trivsamma hem har vi
          byggt upp en portfölj av lägenheter som vi är stolta över att hyra ut till våra
          hyresgäster.
        </p>
        <p>
          Våra värdeord är kvalitet, trygghet och omtanke. Vi strävar alltid efter att erbjuda
          högsta standard i våra lägenheter och en personlig service som gör att våra hyresgäster
          känner sig hemma.
        </p>
      </article>
      <section className="grid">
        <div>
          <h3>Vårt huvudkontor</h3>
          <p>Här i vackra Uddevalla hittar ni oss.</p>
        </div>
        <aside>
          <Image
            src="https://images.unsplash.com/photo-1707498439600-2d2c64307971?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fastighetskontoret"
            width={600}
            height={400}
          />
        </aside>
      </section>
      <section>
        <h2>Våra Fastigheter</h2>
        <div className="grid">
          <figure>
            <Image
              src="https://images.unsplash.com/photo-1615914054651-3dd915a55668?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={320}
              height={180}
              style={{ objectFit: 'cover', maxHeight: '180px' }}
            />
            <figcaption>Yarkutsk, Sibirien</figcaption>
          </figure>
          <figure>
            <Image
              src="https://images.unsplash.com/photo-1615914054651-3dd915a55668?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={320}
              height={180}
              style={{ objectFit: 'cover', maxHeight: '180px' }}
            />
            <figcaption>Yarkutsk, Sibirien</figcaption>
          </figure>
          <figure>
            <Image
              src="https://images.unsplash.com/photo-1615914054651-3dd915a55668?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={320}
              height={180}
              style={{ objectFit: 'cover', maxHeight: '180px' }}
            />
            <figcaption>Yarkutsk, Sibirien</figcaption>
          </figure>
          <figure>
            <Image
              src="https://images.unsplash.com/photo-1559325786-30de205d4852?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={320}
              height={180}
              style={{ objectFit: 'cover', maxHeight: '180px' }}
            />
            <figcaption>Lingonsvängen, Västerköping</figcaption>
          </figure>
          <figure>
            <Image
              src="https://images.unsplash.com/photo-1728481215945-2c61aadf5a1f?q=80&w=763&auto=format&fit=cover&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              width={320}
              height={180}
              style={{ objectFit: 'cover', maxHeight: '180px' }}
            />
            <figcaption>
              I Tyrolen hittar vi denna 3-våningspärla med totalt 8 lägenheter
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  )
}
