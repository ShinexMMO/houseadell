import { useEffect, useRef, useState } from "react";
import Menu from "./Menu.jsx";
import Hero from "./Hero.jsx";
import Botanical from "./Botanical.jsx";
import { cafeInfo } from "./menuData.js";

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
      <nav className="desktop-nav nav-left" aria-label="Café und Speisekarte">
        <a href="#unser-cafe">Unser Café</a>
        <a href="#speisekarte">Die Karte</a>
      </nav>
      <a href="#start" className="brand" aria-label="House Adell – Startseite">
        <img
          src={asset("logo.webp")}
          alt="House Adell"
          width="1400"
          height="1046"
        />
      </a>
      <nav className="desktop-nav nav-right" aria-label="Einblicke und Besuch">
        <a href="#einblicke">Einblicke</a>
        <a href="#besuch">Besuch uns</a>
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
            ["Besuch uns", "#besuch"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
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
      <Botanical className="botanical-gallery" />
      <div className="wrap">
        <div className="gallery-heading">
          <h2 id="gallery-title">
            Am liebsten
            <br />
            hier.
          </h2>
          <div>
            <p className="serif">Ein kleiner Einblick ins Adell.</p>
            <a
              className="line-link"
              href={cafeInfo.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Mehr auf Instagram: @adell.house
            </a>
          </div>
        </div>
        <div className="gallery-grid">
          {gallery.map((photo, i) => (
            <button
              type="button"
              className="gallery-photo"
              key={photo.src}
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
              <span>{photo.caption}</span>
            </button>
          ))}
        </div>
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

function Visit() {
  return (
    <section className="visit wrap" id="besuch" aria-labelledby="visit-title">
      <Botanical className="botanical-visit" />
      <div className="visit-heading">
        <p className="serif">Der Kaffee ist gleich fertig.</p>
        <h2 id="visit-title">Bis gleich.</h2>
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
  const ref = useRef(null);
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
          <a href={cafeInfo.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="#besuch">Kontakt</a>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <p>© {new Date().getFullYear()} House Adell</p>
        <button type="button" onClick={() => ref.current.showModal()}>
          Kontakt & Hinweise
        </button>
        <a href="#start">Nach oben</a>
      </div>
      <dialog
        className="info-dialog"
        ref={ref}
        aria-labelledby="info-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current.close();
        }}
      >
        <button
          className="dialog-close"
          type="button"
          onClick={() => ref.current.close()}
        >
          Schließen
        </button>
        <h2 id="info-title">Kontakt & Hinweise</h2>
        <p>
          House Adell
          <br />
          Marktplatz 16
          <br />
          36199 Rotenburg an der Fulda
        </p>
        <p>
          <a href={cafeInfo.telephoneHref}>{cafeInfo.telephone}</a>
        </p>
        <p>
          Lokale Designvorschau. Preise, Öffnungszeiten und vollständige
          rechtliche Betreiberangaben werden vor dem öffentlichen Start
          bestätigt.
        </p>
        <p>
          Diese Website verwendet keine Analyse- oder Marketing-Cookies.
          Instagram und Google Maps sind externe Angebote.
        </p>
      </dialog>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);

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
        <Visit />
      </main>
      <Footer />
    </>
  );
}
