"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { trips } from "../../data/trips";

const easeOut = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.18, margin: "0px 0px -6% 0px" } as const;

function Reveal({ children, className, delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.68, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function Arrow({ back = false }: { back?: boolean }) {
  return <span aria-hidden="true">{back ? "←" : "↗"}</span>;
}

export default function TripPage() {
  const params = useParams<{ slug: string }>();
  const trip = trips[params.slug];
  const [activeDay, setActiveDay] = useState(0);
  const [menu, setMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const day = trip?.itinerary[activeDay];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!trip) {
    return (
      <main className="trip-not-found">
        <p className="eyebrow">Trail not found</p>
        <h1>This journey is off the map.</h1>
        <Link className="button button--dark" href="/#tours"><Arrow back /> Back to tours</Link>
      </main>
    );
  }

  const formatLabel = trip.title.toLowerCase().includes("self") ? "Self guided" : "Guided";

  return (
    <main className="trip-page">
      <nav className={`nav trip-nav ${scrolled ? "nav--solid" : ""}`} aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Balkan Peaks ADV home">
          <img
            className="brand-logo"
            src={scrolled ? "/logo-bpadv-02.svg" : "/logo-bpadv-01.svg"}
            alt="Balkan Peaks ADV"
          />
        </Link>
        <div className="nav-links">
          <Link href="/#tours">Tours</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/#route">The Trail</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
        <div className="nav-actions">
          <a className="nav-book" href={`mailto:hello@balkanpeaksadv.com?subject=${encodeURIComponent(trip.title)}`}>Check dates <Arrow /></a>
          <button className="menu-btn" onClick={() => setMenu(true)} aria-label="Open menu">☰</button>
        </div>
      </nav>

      <header className="trip-hero">
        <motion.div
          className="trip-hero-image"
          style={{ backgroundImage: `url(${trip.image})` }}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: easeOut }}
        />
        <div className="trip-hero-shade" />
        <motion.div
          className="trip-hero-content"
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: easeOut }}
        >
          <Link className="trip-back" href="/#tours"><Arrow back /> All journeys</Link>
          <p className="eyebrow light">{trip.eyebrow}</p>
          <h1>{trip.title}</h1>
          <p>{trip.subtitle}</p>
        </motion.div>
        <motion.div
          className="trip-hero-index"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span>{trip.days}</span><i /><span>{trip.countries}</span><i /><span>{formatLabel}</span>
        </motion.div>
      </header>

      <section className="trip-stats">
        {[
          ["Duration", trip.days],
          ["Distance", trip.distance],
          ["Level", trip.difficulty],
          ["Group", trip.group],
          ["Stay", trip.stay],
          ["From", trip.price],
        ].map((stat, i) => (
          <Reveal key={stat[0]} delay={i * 0.06} y={16}>
            <span>{stat[0]}</span>
            <b>{stat[1]}</b>
          </Reveal>
        ))}
      </section>

      <section className="trip-intro section-pad">
        <Reveal className="trip-intro-head">
          <p className="eyebrow">The experience</p>
          <h2>More than a route.<br /><em>A way into the mountains.</em></h2>
        </Reveal>
        <Reveal className="trip-intro-copy" delay={0.1}>
          {trip.description.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <div className="trip-season"><span>Best season</span><b>{trip.season}</b></div>
          {trip.note && <p className="trip-note">{trip.note}</p>}
        </Reveal>
      </section>

      {trip.mapUrl && (
        <section className="trip-map section-pad">
          <Reveal className="trip-map-card">
            <div className="trip-map-copy">
              <p className="eyebrow">Trail overview</p>
              <h2>Peaks of the Balkans <em>map.</em></h2>
              <p>See the full crossing across Albania, Kosovo and Montenegro before you lace up—opens in a new tab as a PDF.</p>
            </div>
            <a
              className="button button--dark trip-map-btn"
              href={trip.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the Peaks of the Balkans map <Arrow />
            </a>
          </Reveal>
        </section>
      )}

      <section className="trip-highlights section-pad">
        <Reveal className="trip-highlights-image" y={36}>
          <img
            src={trip.secondaryImage || "/images/hero-peaks.jpeg"}
            alt={trip.secondaryImage ? `${trip.title} landscape` : "Jagged Accursed Mountains from a high ridge"}
          />
        </Reveal>
        <Reveal className="trip-highlights-copy" delay={0.12}>
          <p className="eyebrow light">What stays with you</p>
          <h2>Wild days.<br /><em>Warm welcomes.</em></h2>
          <div>
            {trip.highlights.map((highlight, i) => (
              <motion.p
                key={highlight}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.55, delay: i * 0.08, ease: easeOut }}
              >
                <b>0{i + 1}</b><span>{highlight}</span>
              </motion.p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="trip-itinerary section-pad">
        <Reveal className="trip-itinerary-head">
          <div>
            <p className="eyebrow">Day by day</p>
            <h2>Your journey,<br /><em>unfolded.</em></h2>
          </div>
          <p>Each stage has its own rhythm. Select a day to see the trail, meals and overnight details.</p>
        </Reveal>

        <Reveal className="trip-itinerary-card" delay={0.1} y={36}>
          <div className="trip-days">
            {trip.itinerary.map((item, i) => (
              <button
                key={item.id}
                className={activeDay === i ? "active" : ""}
                onClick={() => setActiveDay(i)}
                onMouseEnter={() => setActiveDay(i)}
              >
                <span>{item.id}</span>
                <strong>{item.title}</strong>
                <small>{item.meta.split("·")[0].trim()}</small>
                <Arrow />
              </button>
            ))}
          </div>
          {day && (
            <motion.div
              className="trip-day-detail"
              key={activeDay}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              <span>DAY {day.id}</span>
              <h3>{day.title}</h3>
              <p>{day.body}</p>
              <b>{day.meta}</b>
              {day.details && (
                <ul className="trip-day-facts">
                  {day.details.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              )}
              <div className="trip-day-contours" aria-hidden><i /><i /><i /></div>
            </motion.div>
          )}
        </Reveal>
      </section>

      <section className="trip-included section-pad">
        <Reveal>
          <p className="eyebrow">Holiday information</p>
          <h2>What’s covered.<br /><em>What’s not.</em></h2>
        </Reveal>
        <div className="trip-holiday-grid">
          <Reveal className="trip-holiday-col" delay={0.05}>
            <h3>Included</h3>
            <ul>
              {trip.included.map((item) => (
                <li key={item}><span>✓</span>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="trip-holiday-col" delay={0.12}>
            <h3>Not included</h3>
            <ul>
              {trip.notIncluded.map((item) => (
                <li key={item}><span>—</span>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {trip.faq && (
        <section className="trip-faq section-pad" id="trip-faq">
          <Reveal>
            <p className="eyebrow">Good to know</p>
            <h2>Questions before<br /><em>you book.</em></h2>
          </Reveal>
          <div className="trip-faq-list">
            {trip.faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.04} y={18}>
                <button
                  className={openFaq === i ? "open" : ""}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <b>{openFaq === i ? "−" : "+"}</b>
                </button>
                {openFaq === i && <p>{item.a}</p>}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {trip.gearRequired && (
        <section className="trip-gear section-pad">
          <Reveal className="trip-gear-head">
            <div>
              <p className="eyebrow">Packing</p>
              <h2>Gear for<br /><em>the trail.</em></h2>
            </div>
            <p>Keep your kit as light as you can. Questions? Call +383 49 601 007.</p>
          </Reveal>
          <div className="trip-gear-grid">
            <Reveal className="trip-holiday-col" delay={0.05}>
              <h3>Required</h3>
              <ul>
                {trip.gearRequired.map((item) => (
                  <li key={item}><span>•</span>{item}</li>
                ))}
              </ul>
            </Reveal>
            {trip.gearOptional && (
              <Reveal className="trip-holiday-col" delay={0.1}>
                <h3>Optional</h3>
                <ul>
                  {trip.gearOptional.map((item) => (
                    <li key={item}><span>•</span>{item}</li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {trip.practical && (
        <section className="trip-practical section-pad">
          <Reveal>
            <p className="eyebrow">Before you go</p>
            <h2>Practical notes<br /><em>for travellers.</em></h2>
          </Reveal>
          <div className="trip-practical-grid">
            {trip.practical.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.05} y={16}>
                <b>{item.label}</b>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Reveal className="trip-final">
        <p className="eyebrow light">Your place on the trail</p>
        <h2>Ready for <em>{trip.title}?</em></h2>
        <p>Tell our team when you would like to travel. Tell us your preferred dates and group size—we usually reply within a few hours.</p>
        <div>
          <a className="button button--lime" href={`mailto:hello@balkanpeaksadv.com?subject=${encodeURIComponent(`Dates for ${trip.title}`)}`}>Check available dates <Arrow /></a>
          <Link className="text-link light" href="/#tours"><Arrow back /> Compare journeys</Link>
        </div>
      </Reveal>

      <footer className="footer">
        <div className="footer-main">
          <div><Link className="brand" href="/" aria-label="Balkan Peaks ADV home"><img className="brand-logo" src="/logo-bpadv-01.svg" alt="Balkan Peaks ADV" /></Link><p>Small-group hiking adventures across the wild heart of the Balkans.</p></div>
          <div><b>EXPLORE</b><Link href="/#tours">Tours</Link><Link href="/#route">Peaks of the Balkans</Link><Link href="/guides">Guides</Link></div>
          <div><b>ABOUT</b><Link href="/#why">Our story</Link><Link href="/guides">Meet the team</Link><Link href="/#faq">Travel FAQs</Link></div>
          <div><b>CONTACT</b><a href="mailto:hello@balkanpeaksadv.com">Email ↗</a><a href="tel:+38349601007">WhatsApp ↗</a><a href="#">Instagram ↗</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Balkan Peaks ADV · Pejë, Kosovo</span><span>Made in the mountains.</span></div>
      </footer>

      {menu && (
        <div className="menu-overlay">
          <button onClick={() => setMenu(false)} aria-label="Close menu">×</button>
          <Link href="/#tours">Tours</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/#route">The Trail</Link>
          <Link href="/#faq">FAQ</Link>
          <Link className="button button--lime" href="/#tours">All journeys <Arrow /></Link>
        </div>
      )}
    </main>
  );
}
