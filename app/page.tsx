"use client";

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";

const photos = {
  hero: "/images/hero-peaks.jpeg",
  potb: "/images/ridge-trail.jpeg",
  gjeravica: "/images/alpine-lake.jpeg",
  kosovo: "/images/green-peaks.jpeg",
  lodge: "/images/mountain-lodge.jpeg",
  hiker: "/images/mountain-pastures.jpeg",
  lake: "/images/alpine-lake.jpeg",
  valley: "/images/green-peaks.jpeg",
  church: "/images/theth-church.jpeg",
  via1: "/images/VIA-DINARICA-1.jpg",
  via2: "/images/VIA-DINARICA-2.jpg",
};

const tours = [
  { slug: "peaks-of-the-balkans", title: "Peaks of the Balkans · 10 Days", meta: "Guided · Moderate +", countries: "Albania · Kosovo · Montenegro", price: "€1,300", image: photos.potb, badge: "Signature journey" },
  { slug: "peaks-of-the-balkans-self-guided", title: "Peaks of the Balkans Self Guided", meta: "12 days · Moderate +", countries: "Albania · Kosovo · Montenegro", price: "€950", image: photos.kosovo, badge: "Independent trek" },
  { slug: "via-dinarica-kosovo", title: "Via Dinarica Kosovo", meta: "5 days · Easy to Moderate", countries: "Kosovo · Gjeravica", price: "€890", image: photos.via1, badge: "Summit week" },
  { slug: "peaks-of-the-balkans-7-days", title: "Peaks of the Balkans · 7 Days", meta: "Guided · Moderate +", countries: "Albania · Kosovo · Montenegro", price: "€1,050", image: photos.gjeravica, badge: "One-week classic" },
];

const stages = [
  ["01", "Shkodër → Theth", "Transfer", "—"],
  ["02", "Theth → Valbonë", "16 km", "1,050 m"],
  ["03", "Valbonë → Çerem", "14 km", "1,150 m"],
  ["04", "Çerem → Dobërdol", "16 km", "1,025 m"],
  ["05", "Dobërdol → Milishevc", "18 km", "950 m"],
  ["06", "Milishevc → Babino Polje", "16 km", "700 m"],
  ["07", "Babino Polje → Plav", "21 km", "600 m"],
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? "↓" : "↗"}</span>;
}

const revealViewport = { once: true, amount: 0.2, margin: "0px 0px -6% 0px" } as const;

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
  as?: typeof motion.div | typeof motion.section | typeof motion.article | typeof motion.blockquote | typeof motion.footer;
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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [booking, setBooking] = useState(false);
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [activeStage, setActiveStage] = useState(2);
  const [openFaq, setOpenFaq] = useState(0);
  const total = useMemo(() => 1300 * guests, [guests]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = booking || menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [booking, menu]);

  const openBooking = () => { setBooking(true); setStep(1); };

  return (
    <main>
      <nav className={`nav ${scrolled ? "nav--solid" : ""}`} aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Balkan Peaks ADV home">
          <img
            className="brand-logo"
            src={scrolled ? "/logo-bpadv-02.svg" : "/logo-bpadv-01.svg"}
            alt="Balkan Peaks ADV"
          />
        </a>
        <div className="nav-links">
          <a href="#tours">Tours</a><a href="#why">Why Us</a><a href="#route">The Trail</a><a href="#stories">Stories</a><a href="#faq">FAQ</a>
        </div>
        <div className="nav-actions">
          <button className="nav-book" onClick={openBooking}>Book Now <Arrow /></button>
          <button className="menu-btn" onClick={() => setMenu(true)} aria-label="Open menu">☰</button>
        </div>
      </nav>

      <header className="hero" id="top">
        <motion.div
          className="hero-image"
          style={{ backgroundImage: `url(${photos.hero})` }}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: easeOut }}
        />
        <div className="hero-shade" />
        <div className="hero-vignette" aria-hidden />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: easeOut }}
        >
          <div className="hero-eyebrow-row">
            <span className="hero-eyebrow-line" />
            <p className="eyebrow light">Guided by locals · Kosovo, Albania & Montenegro</p>
          </div>

          <h1>
            Walk beyond the <em className="hero-em">known.</em>
          </h1>

          <p className="hero-copy">
            Wild mountain trails. Open-hearted villages. One extraordinary journey through Europe’s last secret.
          </p>

          <div className="hero-ctas">
            <button className="button button--lime" onClick={openBooking}>
              Find your adventure <Arrow />
            </button>
            <a className="text-link light" href="#tours">
              Explore all tours <Arrow down />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-index"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: easeOut }}
        >
          <span>01 / Accursed Mountains</span>
          <i />
          <span>Scroll to begin</span>
        </motion.div>
      </header>

      <section className="intro section-pad" id="intro">
        <Reveal>
          <p className="eyebrow">Europe, untamed</p>
          <h2>Some places you visit.<br /><em>This one changes you.</em></h2>
        </Reveal>
        <Reveal className="intro-copy" delay={0.12}>
          <p>Beyond the familiar edges of Europe lies a mountain world of limestone peaks, sapphire lakes and ancient hospitality. We grew up here. Now, we’ll show you the way in.</p>
          <a className="text-link dark" href="/guides">Meet your local guides <Arrow /></a>
        </Reveal>
      </section>

      <section className="tours section-pad" id="tours">
        <Reveal className="section-head">
          <div><p className="eyebrow">Handpicked journeys</p><h2>Choose your wild.</h2></div>
          <p>Small groups. Big landscapes. Every detail handled.</p>
        </Reveal>
        <div className="tour-grid">
          {tours.map((tour, i) => (
            <Reveal as={motion.article} className="tour-card" key={tour.title} delay={i * 0.1} y={36}>
              <div className="tour-image">
                <img src={tour.image} alt={`${tour.title} mountain landscape`} />
                <span className="tour-badge">{tour.badge}</span>
                <button className="heart" aria-label={`Save ${tour.title}`}>♡</button>
              </div>
              <div className="tour-body">
                <p className="tour-meta">{tour.meta}</p>
                <h3>{tour.title}</h3>
                <p className="countries">{tour.countries}</p>
                <div className="tour-foot"><span>from <b>{tour.price}</b></span><a href={`/trips/${tour.slug}`}>View trip <Arrow /></a></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="manifesto" id="why">
        <Reveal className="manifesto-image" style={{ backgroundImage: `url(${photos.valley})` }} y={24} />
        <Reveal className="manifesto-content" delay={0.1}>
          <p className="eyebrow light">Why walk with us</p>
          <h2>Born here.<br />Built for <em>elsewhere.</em></h2>
          <p>We don’t just know the trail. We know the shepherds, the best spring water, the stories behind every pass—and when to stop simply to take it all in.</p>
          <div className="benefits">
            {[
              ["01", "Truly local guides", "Certified, fluent and deeply connected."],
              ["02", "Everything taken care of", "Permits, transfers, stays, meals and luggage."],
              ["03", "Small by design", "Guided groups of 4–7. Self-guided up to 12."],
              ["04", "Tread lightly", "Local stays. Fair pay. Leave no trace."],
            ].map((item, i) => (
              <Reveal key={item[0]} delay={0.06 * i} y={16}>
                <b>{item[0]}</b><span><strong>{item[1]}</strong><small>{item[2]}</small></span>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="route section-pad" id="route">
        <Reveal className="section-head route-head">
          <div><p className="eyebrow">The legendary loop</p><h2>192 kilometres.<br /><em>Three countries.</em></h2></div>
          <p>A border-crossing trek through Kosovo, Albania and Montenegro, moving village to village through the heart of the Accursed Mountains.</p>
        </Reveal>
        <Reveal className="map-card" delay={0.1} y={36}>
          <div className="map-visual">
            <div className="contour contour-a" /><div className="contour contour-b" /><div className="contour contour-c" />
            <svg viewBox="0 0 600 440" role="img" aria-label="Stylized route map of Peaks of the Balkans">
              <path className="route-line" d="M90,330 C120,230 205,300 225,185 S350,85 415,150 S535,250 455,335 S300,385 225,300 S120,235 90,330" />
              {[[90,330],[155,260],[225,185],[330,112],[415,150],[510,250],[455,335]].map((p,i)=><circle key={i} className={activeStage === i ? "active-dot":""} cx={p[0]} cy={p[1]} r={activeStage === i ? 10 : 6} />)}
            </svg>
            <span className="country country-k">KOSOVO</span><span className="country country-a">ALBANIA</span><span className="country country-m">MONTENEGRO</span>
            <div className="map-stat"><b>2,300 m</b><span>highest point</span></div>
          </div>
          <div className="stage-list">
            <p className="eyebrow">Sample itinerary</p>
            {stages.map((stage, i) => (
              <button className={activeStage === i ? "active" : ""} onMouseEnter={() => setActiveStage(i)} onFocus={() => setActiveStage(i)} key={stage[0]}>
                <span>{stage[0]}</span><strong>{stage[1]}</strong><small>{stage[2]} · ↑ {stage[3]}</small><Arrow />
              </button>
            ))}
            <a href="#tours" className="button button--dark">See the full 10-day journey <Arrow /></a>
          </div>
        </Reveal>
      </section>

      <section className="quote-block">
        <Reveal className="quote-image" style={{ backgroundImage: `url(${photos.lodge})` }} y={24} />
        <Reveal as={motion.blockquote} delay={0.12}>
          <span className="stars">★★★★★</span>
          <p>“I came for the mountains. I left talking about the people.”</p>
          <footer><b>Charlotte M.</b><span>United Kingdom · Peaks of the Balkans, 2025</span></footer>
        </Reveal>
      </section>

      <section className="stories section-pad" id="stories">
        <Reveal className="section-head">
          <div><p className="eyebrow">From the trail</p><h2>A glimpse of <em>the wild.</em></h2></div>
          <a className="text-link dark" href="#gallery">Follow @balkanpeaksadv <Arrow /></a>
        </Reveal>
        <div className="story-grid" id="gallery">
          <Reveal className="story tall" delay={0} y={28}>
            <img src={photos.hiker} alt="Sheep and shepherds on a mountain trail" /><span>THE HIGH PASS · DAY 4</span>
          </Reveal>
          <Reveal className="story" delay={0.08} y={28}>
            <img src={photos.lake} alt="Alpine lake beneath Balkan peaks" /><span>GJERAVICA · KOSOVO</span>
          </Reveal>
          <Reveal className="story quote-tile" delay={0.14} y={28}>
            <p>Wild is<br />a feeling.</p><span>BALKAN PEAKS FIELD NOTES № 07</span>
          </Reveal>
          <Reveal className="story wide" delay={0.1} y={28}>
            <img src={photos.church} alt="Stone church in Theth, Albania" /><span>THETH · ALBANIA</span>
          </Reveal>
        </div>
      </section>

      <section className="facts">
        {[
          ["10+", "years guiding"],
          ["3,000+", "happy hikers"],
          ["27", "nationalities hosted"],
          ["4.9", "average rating"],
        ].map((fact, i) => (
          <Reveal key={fact[1]} delay={i * 0.08} y={18}>
            <b>{fact[0]}</b><span>{fact[1]}</span>
          </Reveal>
        ))}
      </section>

      <section className="faq section-pad" id="faq">
        <Reveal>
          <p className="eyebrow">Good to know</p>
          <h2>Your questions,<br /><em>answered.</em></h2>
          <p className="faq-lead">Still curious? Our Kosovo-based team replies personally, usually within a few hours.</p>
          <a className="text-link dark" href="mailto:hello@balkanpeaksadv.com">Ask us anything <Arrow /></a>
        </Reveal>
        <div className="accordion">
          {[
            ["Is Kosovo safe for travellers?", "Yes. Kosovo is welcoming, easy to travel through and visitors consistently mention the warmth of its people. Our team handles every transfer, permit and local detail."],
            ["How fit do I need to be?", "For our signature trek, you should be comfortable hiking 6–8 hours on consecutive days with sustained climbs. We provide a training guide after booking."],
            ["What is included in the trip price?", "For our Peaks of the Balkans trek: English-speaking guide, guesthouse stays, trek meals as listed, border permits, park fees, itinerary transfers and luggage moves (except day 5). Flights and travel insurance are separate."],
            ["Can I travel solo?", "Absolutely. Many guests join solo. Small groups make it easy to connect, and there is no compulsory single supplement for shared rooms."],
            ["When is the best time to hike?", "June through October. July and August bring wildflowers and long days; September offers cooler air, golden light and quieter trails."],
          ].map((item, i) => (
            <Reveal className={`faq-item ${openFaq === i ? "open":""}`} key={item[0]} delay={i * 0.05} y={14}>
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><span>{item[0]}</span><b>{openFaq === i ? "−":"+"}</b></button>
              <div><p>{item[1]}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal as={motion.section} className="final-cta" style={{ backgroundImage: `url(${photos.hero})` }} y={24}>
        <div><p className="eyebrow light">Your next story starts here</p><h2>Ready to walk<br />beyond the known?</h2><button className="button button--lime" onClick={openBooking}>Find your adventure <Arrow /></button></div>
      </Reveal>

      <Reveal as={motion.footer} className="footer" y={18}>
        <div className="footer-main"><div><a className="brand" href="#top" aria-label="Balkan Peaks ADV home"><img className="brand-logo" src="/logo-bpadv-01.svg" alt="Balkan Peaks ADV" /></a><p>Small-group hiking adventures across the wild heart of the Balkans.</p></div><div><b>EXPLORE</b><a href="#tours">Tours</a><a href="#route">Peaks of the Balkans</a><a href="#stories">Journal</a></div><div><b>ABOUT</b><a href="#why">Our story</a><a href="/guides">Guides</a><a href="#faq">Travel FAQs</a></div><div><b>FOLLOW THE TRAIL</b><a href="#">Instagram ↗</a><a href="#">WhatsApp ↗</a><a href="mailto:hello@balkanpeaksadv.com">Email ↗</a></div></div>
        <div className="footer-bottom"><span>© 2026 Balkan Peaks ADV · Pejë, Kosovo</span><span>Made in the mountains.</span></div>
      </Reveal>

      <button className="mobile-book" onClick={openBooking}>Check dates · from €1,300</button>

      {menu && <div className="menu-overlay"><button onClick={() => setMenu(false)} aria-label="Close menu">×</button><a onClick={() => setMenu(false)} href="#tours">Tours</a><a onClick={() => setMenu(false)} href="#why">Why Us</a><a onClick={() => setMenu(false)} href="#route">The Trail</a><a onClick={() => setMenu(false)} href="#stories">Stories</a><a onClick={() => setMenu(false)} href="#faq">FAQ</a><button className="button button--lime" onClick={() => { setMenu(false); openBooking(); }}>Book now <Arrow /></button></div>}

      {booking && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <div className="booking-modal">
          <button className="modal-close" onClick={() => setBooking(false)} aria-label="Close booking">×</button>
          <div className="booking-progress"><span style={{ width: `${step * 25}%` }} /></div>
          <p className="eyebrow">Step {step} of 4</p>
          {step === 1 && <div className="booking-step"><h2 id="booking-title">When would you<br />like to go?</h2><p>Peaks of the Balkans · 10 days</p><div className="date-options">{["Jun 14–23","Jul 05–14","Aug 09–18","Sep 06–15"].map((d,i)=><label key={d}><input type="radio" name="date" defaultChecked={i===1}/><span><b>{d}</b><small>Available</small></span></label>)}</div></div>}
          {step === 2 && <div className="booking-step"><h2>Who’s joining<br />the adventure?</h2><div className="guest-row"><div><b>Guests</b><small>Ages 16 and above · max 7</small></div><div><button onClick={()=>setGuests(Math.max(1,guests-1))}>−</button><b>{guests}</b><button onClick={()=>setGuests(Math.min(7,guests+1))}>+</button></div></div><div className="price-preview"><span>Trip total</span><b>€{total.toLocaleString()}</b><small>No payment due yet</small></div></div>}
          {step === 3 && <div className="booking-step"><h2>Make it<br />yours.</h2><div className="extras">{[["Airport pickup","€45"],["Private room","€290"],["Trekking pole rental","€35"]].map(x=><label key={x[0]}><input type="checkbox"/><span><b>{x[0]}</b><small>Add to this trip</small></span><strong>{x[1]}</strong></label>)}</div></div>}
          {step === 4 && <div className="booking-step"><span className="big-check">✓</span><h2>You’re one step<br />from the trail.</h2><p>Share your details and a local trip planner will hold your places for 48 hours—free, with no obligation.</p><div className="form-row"><input aria-label="First name" placeholder="First name"/><input aria-label="Last name" placeholder="Last name"/></div><input aria-label="Email address" type="email" placeholder="Email address"/></div>}
          <div className="booking-nav"><button onClick={() => step === 1 ? setBooking(false) : setStep(step-1)}>{step === 1 ? "Not now":"Back"}</button><button className="button button--dark" onClick={() => step < 4 ? setStep(step+1) : setBooking(false)}>{step < 4 ? "Continue":"Request my place"} <Arrow /></button></div>
          <div className="secure">🔒 Secure booking · Free cancellation within 14 days</div>
        </div>
      </div>}
    </main>
  );
}
