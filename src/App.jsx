import { useEffect, useRef, useState } from "react";
import Menu from "./Menu.jsx";
import Hero from "./Hero.jsx";
import Events from "./Events.jsx";
import Botanical from "./Botanical.jsx";
import { cafeInfo } from "./menuData.js";
import "./newspaper.css";

const asset = (name) => `/assets/${name}`;
const gallery = [
  {
    src: "interieur.webp",
    alt: "Botanische Tapeten, Pflanzen und warme Holzmöbel im House Adell",
    caption: "Unser Wohnzimmer am Marktplatz.",
  },
  {
    src: "french-toast.webp",
    alt: "French Toast mit Früchten im House Adell",
    caption: "Für einen süßen Start.",
  },
  {
    src: "fensterplatz.webp",
    alt: "Ein heller Fensterplatz im Café",
    caption: "Hier lässt sich’s bleiben.",
  },
];

function InstagramIcon() {
  return (
    <svg
      className="instagram-icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Illustration({ name, className = "" }) {
  return (
    <span
      className={`adell-illustration illustration-${name} ${className}`}
      aria-hidden="true"
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <nav
        className="desktop-nav nav-left"
        aria-label="Café, Speisekarte und Einblicke"
      >
        <a href="#unser-cafe">Unser Café</a>
        <a href="#speisekarte">Die Karte</a>
        <a href="#einblicke">Einblicke</a>
      </nav>
      <a href="#start" className="brand" aria-label="House Adell – Startseite">
        <img
          src={asset("logo.webp")}
          alt="House Adell"
          width="1400"
          height="1046"
        />
      </a>
      <nav
        className="desktop-nav nav-right"
        aria-label="Veranstaltungen, Besuch und Instagram"
      >
        <a href="#feiern">Feiern</a>
        <a href="#besuch">Besuch uns</a>
        <a
          className="instagram-link"
          href={cafeInfo.instagram}
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
          title="Instagram"
        >
          <InstagramIcon />
        </a>
      </nav>
      <a className="mobile-menu-link" href="#speisekarte">
        Die Karte
      </a>
      <button
        className="mobile-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Schließen" : "Menü"}
      </button>
      {open && (
        <nav
          className="mobile-nav"
          id="mobile-navigation"
          aria-label="Mobile Navigation"
        >
          {[
            ["Unser Café", "#unser-cafe"],
            ["Die Karte", "#speisekarte"],
            ["Einblicke", "#einblicke"],
            ["Feiern & Catering", "#feiern"],
            ["Besuch uns", "#besuch"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="instagram-link"
            href={cafeInfo.instagram}
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            onClick={() => setOpen(false)}
          >
            <InstagramIcon />
          </a>
        </nav>
      )}
    </header>
  );
}

function Welcome() {
  const picks = [
    {
      title: "Frühstück",
      image: "fruehstueck.webp",
      icon: "croissant",
      filter: "breakfast",
      note: "Für frühe Vögel. Und alle anderen.",
      alt: "Sauerteigbrot mit Ei, Rucola und Käse",
    },
    {
      title: "Kaffee",
      image: "cappuccino.webp",
      icon: "coffee",
      filter: "coffee",
      note: "Regional geröstet. Mit Ruhe genießen.",
      alt: "Cappuccino mit Latte Art auf einem Cafétisch",
    },
    {
      title: "Süßes",
      image: "schokokuchen.webp",
      icon: "cake",
      filter: "sweet",
      note: "Hausgemacht ist immer eine gute Idee.",
      alt: "Ein Stück hausgemachter Schokoladenkuchen",
    },
  ];
  return (
    <>
      <div className="location-band">
        <p>Marktplatz 16 · Rotenburg an der Fulda</p>
        <p>
          Mo & Mi–So, 9–17 Uhr <span>Dienstag ist Ruhetag</span>
        </p>
      </div>
      <section className="welcome wrap" aria-labelledby="welcome-title">
        <Botanical side="right" className="botanical-welcome" />
        <div className="welcome-intro">
          <p className="serif">
            Ein Tisch für Freunde.
            <br />
            Ein Kaffee für dich.
          </p>
          <div>
            <h2 id="welcome-title">Willkommen im House Adell.</h2>
            <p>
              Ein ausgiebiges Frühstück, Kaffee aus regional gerösteten Bohnen
              und hausgemachter Kuchen. Mitten in Rotenburg. Für einen guten
              Start oder eine lange Pause.
            </p>
          </div>
        </div>
        <div className="food-grid" id="genuss">
          {picks.map((item) => (
            <a
              className="food-story"
              href="#speisekarte"
              key={item.title}
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("adell-menu-select", { detail: item.filter }),
                )
              }
            >
              <div className="food-photo">
                <img
                  src={asset(item.image)}
                  alt={item.alt}
                  width="800"
                  height="1000"
                  loading="lazy"
                />
                <span className="photo-action">In die Karte schauen</span>
              </div>
              <div className="food-caption">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.note}</p>
                </div>
                <Illustration name={item.icon} />
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <section className="about" id="unser-cafe" aria-labelledby="about-title">
      <div className="about-copy">
        <p className="section-label">House Adell, seit 2021</p>
        <h2 id="about-title">
          Ein Stück Welt.
          <br />
          Mitten in
          <br />
          Rotenburg.
        </h2>
        <p>
          Nach Stationen in Marbella, London und München hat Sophia Kaur ihren
          Lieblingsort dort eröffnet, wo sie zuhause ist.
        </p>
        <p>
          Internationale Frühstücksideen treffen auf den Rotenburger Marktplatz.
          Dazu viel Hausgemachtes, grüne Ecken und ein Platz, an dem man gern
          noch sitzen bleibt.
        </p>
        <a className="line-link" href="#besuch">
          Lern uns kennen
        </a>
        <Botanical side="right" className="botanical-about" />
      </div>
      <div className="about-photo">
        <img
          src={asset("fensterplatz.webp")}
          alt="Sonniger Sitzplatz mit Pflanzen im House Adell"
          width="1000"
          height="1250"
          loading="lazy"
        />
        <p className="serif">Schön, dass du da bist.</p>
      </div>
    </section>
  );
}

function Gallery() {
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (selected !== null && !dialogRef.current.open)
      dialogRef.current.showModal();
    if (selected === null && dialogRef.current.open) dialogRef.current.close();
  }, [selected]);
  const move = (amount) =>
    setSelected((i) => (i + amount + gallery.length) % gallery.length);
  return (
    <section
      className="gallery-section"
      id="einblicke"
      aria-labelledby="gallery-title"
    >
      <Botanical side="right" className="newspaper-botanical" />
      <div className="newspaper">
        <div className="newspaper-heading">
          <h2 id="gallery-title">Am liebsten hier.</h2>
        </div>
        <div className="newspaper-stories">
          {gallery.map((photo, i) => (
            <article
              className={`newspaper-story${i === 0 ? " newspaper-lead" : ""}`}
              key={photo.src}
            >
              <figure>
                <button
                  type="button"
                  className="newspaper-photo"
                  onClick={() => setSelected(i)}
                  aria-label={`Foto ansehen: ${photo.alt}`}
                >
                  <img
                    src={asset(photo.src)}
                    alt={photo.alt}
                    width="800"
                    height="1000"
                    loading="lazy"
                  />
                  <span className="newspaper-photo-action">
                    Foto vergrößern
                  </span>
                </button>
                <figcaption>
                  {
                    [
                      "Grüne Ecken, warme Hölzer und ein Platz für dich.",
                      "French Toast, frische Früchte, ein guter Morgen.",
                      "Sonnenlicht und ein bisschen Zeit für sich.",
                    ][i]
                  }
                </figcaption>
              </figure>
              <h3>{photo.caption}</h3>
              {i === 0 && (
                <div className="newspaper-copy">
                  <p>
                    Zwischen Pflanzen und botanischen Tapeten wird aus einem
                    schnellen Kaffee gerne eine lange Pause.
                  </p>
                  <p>
                    Mit Freunden am großen Tisch oder ganz für dich am Fenster:
                    Such dir deinen Lieblingsplatz im Adell.
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
        <footer className="newspaper-footer">
          <p>Die schönsten Geschichten entstehen am Kaffeetisch.</p>
          <a
            className="line-link"
            href={cafeInfo.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Mehr Einblicke auf Instagram
          </a>
        </footer>
      </div>
      <dialog
        ref={dialogRef}
        className="photo-dialog"
        aria-label="Fotogalerie"
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") move(-1);
          if (e.key === "ArrowRight") move(1);
        }}
      >
        {selected !== null && (
          <div className="photo-dialog-content">
            <button
              className="dialog-close"
              type="button"
              onClick={() => setSelected(null)}
            >
              Schließen
            </button>
            <img
              src={asset(gallery[selected].src)}
              alt={gallery[selected].alt}
            />
            <div className="gallery-controls">
              <button type="button" onClick={() => move(-1)}>
                Zurück
              </button>
              <span>
                {selected + 1} / {gallery.length}
              </span>
              <button type="button" onClick={() => move(1)}>
                Weiter
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

// Plays once when scrolled into view and rests on the close-up end frame.
// No autoplay with reduced motion; the poster is the first frame.
function VisitVideo() {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.ended) video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <figure className="visit-video">
      <video
        ref={ref}
        src={asset("coffee-moment.mp4")}
        poster={asset("cappuccino-video-startframe.webp")}
        muted
        playsInline
        preload="none"
        width="1280"
        height="720"
        aria-label="Ein Cappuccino mit Latte-Art auf einem Marmortisch im House Adell, vor grüner Rosentapete und rosa Sitzbank."
      />
    </figure>
  );
}

function Visit() {
  return (
    <section className="visit wrap" id="besuch" aria-labelledby="visit-title">
      <Botanical className="botanical-visit" />
      <div className="visit-intro">
        <div className="visit-heading">
          <p className="serif">Der Kaffee ist gleich fertig.</p>
          <h2 id="visit-title">Bis gleich.</h2>
        </div>
        <VisitVideo />
      </div>
      <div className="visit-grid">
        <div>
          <h3>Hier findest du uns</h3>
          <address>
            House Adell
            <br />
            {cafeInfo.street}
            <br />
            {cafeInfo.postalCode} {cafeInfo.city}
          </address>
          <a
            className="line-link"
            href="https://www.google.com/maps/search/?api=1&query=House+Adell+Marktplatz+16+Rotenburg+an+der+Fulda"
            target="_blank"
            rel="noreferrer"
          >
            Route in Google Maps öffnen
          </a>
        </div>
        <div>
          <h3>Unsere Öffnungszeiten</h3>
          <dl>
            {cafeInfo.hours.map((row) => (
              <div key={row.days}>
                <dt>{row.days}</dt>
                <dd>{row.time}</dd>
              </div>
            ))}
          </dl>
          <p className="visit-note">
            An Feiertagen können die Zeiten abweichen.
          </p>
        </div>
        <div className="visit-reservation">
          <h3>Zusammen frühstücken?</h3>
          <p>
            Für einen Tisch ruf uns einfach an.
            <br />
            Wir freuen uns auf euch.
          </p>
          <a href={cafeInfo.telephoneHref} className="phone-link">
            {cafeInfo.telephone}
          </a>
          <a href={cafeInfo.telephoneHref} className="button">
            Tisch telefonisch anfragen
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Botanical side="right" className="botanical-footer" />
      <div className="footer-top wrap">
        <a href="#start" className="footer-brand">
          <img
            src={asset("logo.webp")}
            alt="House Adell – Startseite"
            width="1400"
            height="1046"
          />
        </a>
        <p className="serif">
          Komm auf einen Kaffee.
          <br />
          Bleib für die gute Zeit.
        </p>
        <div className="footer-links">
          <a href="#speisekarte">Die Karte</a>
          <a href="#feiern">Feiern & Catering</a>
          <a href="#besuch">Kontakt</a>
          <a
            className="instagram-link"
            href={cafeInfo.instagram}
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            title="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <p>© {new Date().getFullYear()} House Adell</p>
        <nav className="footer-legal" aria-label="Rechtliches">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </nav>
        <a
          className="made-by"
          href="https://herzly.de"
          target="_blank"
          rel="noopener"
        >
          <span>Made by</span>
          <img
            src={asset("herzly-logo.png")}
            alt="Herzly Marketing"
            width="368"
            height="132"
          />
        </a>
        <a href="#start">Nach oben</a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Zum Inhalt
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Welcome />
        <About />
        <Menu />
        <Gallery />
        <Events />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
