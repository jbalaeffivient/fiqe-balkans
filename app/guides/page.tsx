"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const easeOut = [0.22, 1, 0.36, 1] as const;
const revealViewport = { once: true, amount: 0.2, margin: "0px 0px -6% 0px" } as const;

const guides = [
  {
    name: "Fitim Topalli",
    role: "Lead mountain guide",
    base: "Pejë, Kosovo",
    years: "12 years on the trail",
    languages: "Albanian · English · German",
    bio: "Born in the shadow of the Accursed Mountains, Fitim knows every spring, pass and shepherd hut on the Peaks of the Balkans. Guests remember his calm pace and quiet storytelling.",
    image: "/images/ridge-trail.jpeg",
    initials: "FT",
  },
  {
    name: "Arta Krasniqi",
    role: "Mountain guide",
    base: "Prizren, Kosovo",
    years: "8 years guiding",
    languages: "Albanian · English",
    bio: "Arta specialises in women’s groups and first-time trekkers—patient, sharp-eyed, and always first to spot the wildflowers after a climb.",
    image: "/images/mountain-pastures.jpeg",
    initials: "AK",
  },
  {
    name: "Luka Marković",
    role: "Trail & logistics guide",
    base: "Plav, Montenegro",
    years: "9 years in the field",
    languages: "Montenegrin · English · Italian",
    bio: "Luka handles the border days with ease—permits, transfers, and the perfect lunch stop when legs are tired and spirits need lifting.",
    image: "/images/green-peaks.jpeg",
    initials: "LM",
  },
  {
    name: "Elira Hoxha",
    role: "Village & culture guide",
    base: "Theth, Albania",
    years: "6 years hosting & guiding",
    languages: "Albanian · English · French",
    bio: "Elira opens doors in remote guesthouses and shares the valley’s living history—from kanun stories to the best homemade bread on the trail.",
    image: "/images/theth-church.jpeg",
    initials: "EH",
  },
];

function Arrow({ back = false }: { back?: boolean }) {
  return <span aria-hidden="true">{back ? "←" : "↗"}</span>;
}

function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  style,
  as: Tag = motion.div,
}: {
  children?: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  style?: CSSProperties;
  as?: typeof motion.div | typeof motion.article | typeof motion.section | typeof motion.footer;
}) {
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.65, delay, ease: easeOut }}
    >
      {children}
    </Tag>
  );
}

export default function GuidesPage() {
  const [menu, setMenu] = useState(false);

  return (
    <main className="guides-page">
      <nav className="nav nav--solid" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Balkan Peaks ADV home">
          <img className="brand-logo" src="/logo-bpadv-02.svg" alt="Balkan Peaks ADV" />
        </Link>
        <div className="nav-links">
          <Link href="/#tours">Tours</Link>
          <Link href="/#why">Why Us</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/#route">The Trail</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
        <div className="nav-actions">
          <Link className="nav-book" href="/#tours">Book Now <Arrow /></Link>
          <button className="menu-btn" onClick={() => setMenu(true)} aria-label="Open menu">☰</button>
        </div>
      </nav>

      <section className="guides-hero section-pad">
        <Reveal className="guides-back-wrap" y={16}>
          <Link className="guides-back" href="/#intro">
            <Arrow back /> Back to home
          </Link>
        </Reveal>

        <Reveal className="guides-hero-copy">
          <p className="eyebrow">The people on the trail</p>
          <h1>
            Meet your <em>local guides.</em>
          </h1>
          <p className="guides-lead">
            Certified, deeply local, and happiest above the treeline. These are the faces who will walk beside you—sharing routes, stories, and the quiet magic of the Balkans.
          </p>
        </Reveal>
      </section>

      <section className="guides-grid-wrap section-pad">
        <div className="guides-grid">
          {guides.map((guide, i) => (
            <Reveal as={motion.article} className="guide-card" key={guide.name} delay={i * 0.08} y={36}>
              <div className="guide-photo">
                <img src={guide.image} alt={`${guide.name}, ${guide.role}`} />
                <span className="guide-initials" aria-hidden>{guide.initials}</span>
              </div>
              <div className="guide-body">
                <p className="guide-role">{guide.role}</p>
                <h2>{guide.name}</h2>
                <p className="guide-meta">{guide.base} · {guide.years}</p>
                <p className="guide-bio">{guide.bio}</p>
                <p className="guide-langs">{guide.languages}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal as={motion.section} className="guides-cta section-pad" y={24}>
        <p className="eyebrow">Ready when you are</p>
        <h2>Walk with people who <em>call these mountains home.</em></h2>
        <div className="guides-cta-actions">
          <Link className="button button--dark" href="/#tours">Explore our tours <Arrow /></Link>
          <Link className="text-link dark" href="/">
            <Arrow back /> Return home
          </Link>
        </div>
      </Reveal>

      <Reveal as={motion.footer} className="footer" y={18}>
        <div className="footer-main">
          <div>
            <Link className="brand" href="/" aria-label="Balkan Peaks ADV home">
              <img className="brand-logo" src="/logo-bpadv-01.svg" alt="Balkan Peaks ADV" />
            </Link>
            <p>Small-group hiking adventures across the wild heart of the Balkans.</p>
          </div>
          <div>
            <b>EXPLORE</b>
            <Link href="/#tours">Tours</Link>
            <Link href="/#route">Peaks of the Balkans</Link>
            <Link href="/guides">Guides</Link>
          </div>
          <div>
            <b>ABOUT</b>
            <Link href="/#why">Our story</Link>
            <Link href="/guides">Meet the team</Link>
            <Link href="/#faq">Travel FAQs</Link>
          </div>
          <div>
            <b>FOLLOW THE TRAIL</b>
            <a href="#">Instagram ↗</a>
            <a href="#">WhatsApp ↗</a>
            <a href="mailto:hello@balkanpeaksadv.com">Email ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Balkan Peaks ADV · Pejë, Kosovo</span>
          <span>Made in the mountains.</span>
        </div>
      </Reveal>

      {menu && (
        <div className="menu-overlay">
          <button onClick={() => setMenu(false)} aria-label="Close menu">×</button>
          <Link onClick={() => setMenu(false)} href="/#tours">Tours</Link>
          <Link onClick={() => setMenu(false)} href="/guides">Guides</Link>
          <Link onClick={() => setMenu(false)} href="/#why">Why Us</Link>
          <Link onClick={() => setMenu(false)} href="/#route">The Trail</Link>
          <Link onClick={() => setMenu(false)} href="/#faq">FAQ</Link>
          <Link className="button button--lime" href="/" onClick={() => setMenu(false)}>Back home <Arrow /></Link>
        </div>
      )}
    </main>
  );
}
