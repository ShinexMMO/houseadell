import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, Heart, Instagram, MapPin, Menu as MenuIcon, Pause, Phone, Play, X } from 'lucide-react';
import Menu from './Menu.jsx';
import { cafeInfo } from './menuData.js';

const asset = (name) => `/assets/${name}`;
const navItems = [['Unser Café', '#unser-cafe'], ['Speisekarte', '#speisekarte'], ['Einblicke', '#einblicke']];
const gallery = [
  { src: 'fensterplatz.webp', alt: 'Gemütlicher Fensterplatz im House Adell mit Pflanzen und Blick nach draußen', caption: 'Dein neuer Lieblingsplatz.' },
  { src: 'french-toast.webp', alt: 'Liebevoll angerichteter French Toast mit Früchten', caption: 'Noch etwas Süßes?' },
  { src: 'interieur.webp', alt: 'Das grüne, mit Blumen und Pflanzen gestaltete Interieur von House Adell', caption: 'Einfach mal bleiben.' },
  { src: 'cafe-moment.webp', alt: 'Ein kleiner Genussmoment im House Adell', caption: 'Die kleinen Dinge.' },
];

function Flower({ className = '', center = false }) {
  return <svg className={`flower ${className}`} viewBox="0 0 100 100" aria-hidden="true"><g fill="currentColor">{Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="50" cy="25" rx="12" ry="23" transform={`rotate(${i * 45} 50 50)`} />)}{center && <circle cx="50" cy="50" r="12" fill="var(--paper)" />}</g></svg>;
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <>
    <div className="announcement"><Flower /> Ein guter Tag beginnt mit einem guten Kaffee. <Flower /></div>
    <header className="site-header">
      <div className="header-inner">
        <a href="#start" className="brand" aria-label="House Adell – zur Startseite" onClick={() => setOpen(false)}><img src={asset('logo.webp')} alt="House Adell" width="1400" height="1046" /></a>
        <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Hauptnavigation" id="main-navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-visit" href="#besuch" onClick={() => setOpen(false)}>Komm vorbei <ArrowUpRight size={17} /></a>
        </nav>
        <a className="header-instagram" href={cafeInfo.instagram} target="_blank" rel="noreferrer" aria-label="House Adell auf Instagram (neuer Tab)"><Instagram size={20} /></a>
        <button className="mobile-toggle" type="button" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <MenuIcon />}</button>
      </div>
    </header>
  </>;
}

function Hero() {
  return <section className="hero" id="start" aria-labelledby="hero-title">
    <div className="watercolor watercolor-sage" aria-hidden="true" />
    <div className="watercolor watercolor-rose" aria-hidden="true" />
    <div className="hero-inner">
      <div className="hero-copy">
        <div className="location-note"><MapPin size={15} /> Zuhause in Rotenburg an der Fulda</div>
        <h1 id="hero-title">Hier bleibst du<br />gern noch einen<br />Kaffee.</h1>
        <p>Ein duftender Cappuccino. Ein spätes Frühstück.<br className="desktop-break" /> Und dieses Gefühl, genau richtig zu sein.<br className="desktop-break" /> Willkommen im House Adell.</p>
        <div className="hero-actions"><a className="button button-forest" href="#speisekarte">Entdecke unsere Karte <ArrowUpRight size={19} /></a><a className="text-link" href="#unser-cafe">Mach’s dir gemütlich <ArrowDown size={16} /></a></div>
        <div className="hero-footnote"><Heart size={16} /> Mit Liebe gemacht. Mit Zeit genossen.</div>
      </div>
      <div className="hero-composition">
        <div className="hero-photo"><img src={asset('cappuccino-video-startframe.webp')} alt="Cappuccino auf einem Marmortisch vor dem grün-floralen Café-Interieur" width="1672" height="941" fetchPriority="high" /></div>
        <div className="hero-stamp"><span>Ein Kaffee.</span><Heart size={27} strokeWidth={1.5} /><span>Ganz viel Gefühl.</span></div>
        <figure className="breakfast-polaroid"><img src={asset('fruehstueck.webp')} alt="Frühstück mit pochierten Eiern auf Sauerteigbrot" width="800" height="1000" /><figcaption>mornings made better ♡</figcaption></figure>
        <Flower className="hero-flower" center />
        <div className="handwritten hero-handwritten">Deine kleine Auszeit.<svg viewBox="0 0 100 65" fill="none" aria-hidden="true"><path d="M5 8c30-13 63 4 58 33-2 9-10 17-16 11-8-10 14-19 43-11m-11-8 12 8-10 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      </div>
    </div>
    <a className="scroll-note" href="#lieblingsdinge"><span>Ein bisschen weiter stöbern</span><ArrowDown size={17} /></a>
  </section>;
}

function Favorites() {
  const items = [
    { image: 'fruehstueck.webp', title: 'Morgens? Gerne länger.', text: 'Von bunten Frühstücksplatten bis zu Sauerteigbrot & Eggs. Für frühe Vögel und späte Genießer.', link: 'Zum Frühstück', filter: 'breakfast', theme: 'sage' },
    { image: 'cappuccino.webp', title: 'Aber erst mal Kaffee.', text: 'Regional geröstete Bohnen, cremiger Milchschaum und dein Lieblingsplatz. Mehr braucht’s manchmal nicht.', link: 'Kaffee entdecken', filter: 'coffee', theme: 'rose' },
    { image: 'schokokuchen.webp', title: 'Ein Stückchen Glück.', text: 'Hausgemachter Kuchen, süßer French Toast und die schönste Frage des Tages: Teilen wir uns noch was?', link: 'Für die Süßen', filter: 'sweet', theme: 'butter' },
  ];
  const jump = (filter) => { window.dispatchEvent(new CustomEvent('adell-menu-select', { detail: filter })); };
  return <section className="favorites section-wrap" id="lieblingsdinge" aria-labelledby="favorites-title">
    <div className="section-heading"><div><span className="handwritten">Kleine Dinge. Großes Glück.</span><h2 id="favorites-title">Worauf hast du Lust?</h2></div><p>Frisch auf dem Tisch.<br />Und direkt ins Herz.</p></div>
    <div className="favorites-grid">{items.map((item) => <article className={`favorite favorite-${item.theme}`} key={item.title}><a href="#speisekarte" className="favorite-photo" onClick={() => jump(item.filter)} tabIndex="-1" aria-hidden="true"><img src={asset(item.image)} alt="" width="800" height="900" loading="lazy" /><span><ArrowUpRight size={23} /></span></a><div className="favorite-copy"><h3>{item.title}</h3><p>{item.text}</p><a className="text-link" href="#speisekarte" onClick={() => jump(item.filter)}>{item.link}<ArrowUpRight size={17} /></a></div></article>)}</div>
  </section>;
}

function About() {
  return <section className="about" id="unser-cafe" aria-labelledby="about-title">
    <div className="about-inner section-wrap">
      <div className="about-photos"><img className="about-main" src={asset('fensterplatz.webp')} alt="Ein sonniger Fensterplatz im House Adell, umgeben von Pflanzen" width="900" height="1100" loading="lazy" /><div className="about-caption handwritten">Ein Platz zum Ankommen.</div><Flower className="about-flower" center /><div className="about-small"><img src={asset('mandarinenkuchen.webp')} alt="Hausgemachter Mandarinenkuchen im House Adell" width="700" height="900" loading="lazy" /></div></div>
      <div className="about-copy"><span className="handwritten">Schön, dass du da bist.</span><h2 id="about-title">Ein kleines Café.<br />Ein großes<br />Zuhausegefühl.</h2><p>Mitten am Rotenburger Marktplatz gibt es einen Ort, an dem der Alltag kurz Pause macht. Wo Kaffee nach einem guten Morgen duftet und aus „nur kurz“ ein ganzer Nachmittag werden darf.</p><p>Seit 2021 bringt Sophia Kaur hier ein Stück Welt nach Hause: internationale Frühstücksideen, viel Hausgemachtes und ein Wohnzimmergefühl, das bleibt.</p><p className="about-signature">Nimm Platz. Wir kümmern uns um den Kaffee.</p><a className="text-link" href="#besuch">Hier findest du uns <ArrowUpRight size={18} /></a></div>
    </div>
  </section>;
}

function CoffeeMoment() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    let active = true;
    fetch('/assets/coffee-moment.mp4', { method: 'HEAD' }).then(r => { if (active && r.ok && r.headers.get('content-type')?.includes('video')) setAvailable(true); }).catch(() => {});
    return () => { active = false; };
  }, []);
  const toggle = async () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else { try { await videoRef.current.play(); } catch { setPlaying(false); } }
  };
  return <section className="coffee-moment" aria-labelledby="moment-title">
    <img className="moment-poster" src={asset('cappuccino-video-startframe.webp')} alt="" width="1672" height="941" loading="lazy" />
    {available && <video ref={videoRef} className="moment-video" src="/assets/coffee-moment.mp4" poster={asset('cappuccino-video-startframe.webp')} muted loop playsInline preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Ruhiger, KI-generierter Kaffeemoment" />}
    <div className="moment-shade" />
    <div className="moment-copy"><span className="handwritten">Die Welt kann kurz warten.</span><h2 id="moment-title">Dein Kaffee.<br />Dein Moment.</h2><a className="button button-paper" href="#besuch">Zeit für eine kleine Pause <ArrowUpRight size={19} /></a></div>
    {available && <button className="video-control" type="button" onClick={toggle} aria-label={playing ? 'Kaffeevideo pausieren' : 'Kaffeevideo abspielen'}>{playing ? <Pause size={17} /> : <Play size={17} />}<span>{playing ? 'Pause' : 'Kaffeemoment abspielen'}</span></button>}
  </section>;
}

function Gallery() {
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (selected !== null && !dialogRef.current.open) dialogRef.current.showModal();
    if (selected === null && dialogRef.current.open) dialogRef.current.close();
  }, [selected]);
  const move = (amount) => setSelected(i => (i + amount + gallery.length) % gallery.length);
  return <section className="gallery-section section-wrap" id="einblicke" aria-labelledby="gallery-title">
    <div className="section-heading"><div><span className="handwritten">Ein Gefühl in Bildern.</span><h2 id="gallery-title">Ein bisschen Adell.</h2></div><a className="text-link instagram-link" href={cafeInfo.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /> @adell.house <ArrowUpRight size={17} /></a></div>
    <div className="gallery-grid">{gallery.map((photo, index) => <button className="gallery-photo" type="button" key={photo.src} onClick={() => setSelected(index)} aria-label={`Foto vergrößern: ${photo.alt}`}><img src={asset(photo.src)} alt={photo.alt} width="800" height="1000" loading="lazy" /><span className="handwritten">{photo.caption}</span><span className="gallery-enlarge"><ArrowUpRight size={20} /></span></button>)}</div>
    <dialog ref={dialogRef} className="photo-dialog" aria-label="Café-Fotogalerie" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={(event) => { if (event.key === 'ArrowLeft') move(-1); if (event.key === 'ArrowRight') move(1); }}>
      {selected !== null && <div className="photo-dialog-inner"><button className="dialog-close icon-button" onClick={() => setSelected(null)} aria-label="Fotogalerie schließen"><X /></button><img src={asset(gallery[selected].src)} alt={gallery[selected].alt} /><div className="photo-dialog-footer"><button className="icon-button" onClick={() => move(-1)} aria-label="Vorheriges Foto"><ChevronLeft /></button><p className="handwritten">{gallery[selected].caption}<span>{selected + 1} / {gallery.length}</span></p><button className="icon-button" onClick={() => move(1)} aria-label="Nächstes Foto"><ChevronRight /></button></div></div>}
    </dialog>
  </section>;
}

function Visit() {
  const [copied, setCopied] = useState(false);
  const copyAddress = async () => {
    try { await navigator.clipboard.writeText(`${cafeInfo.name}, ${cafeInfo.street}, ${cafeInfo.postalCode} ${cafeInfo.city}`); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { window.location.href = 'https://www.google.com/maps/search/?api=1&query=House+Adell+Marktplatz+16+Rotenburg+an+der+Fulda'; }
  };
  return <section className="visit" id="besuch" aria-labelledby="visit-title">
    <div className="visit-inner section-wrap"><div className="visit-copy"><span className="handwritten">Wir halten dir einen Platz im Herzen frei.</span><h2 id="visit-title">Bis gleich<br />im Adell.</h2><p>Mitten in der Altstadt. Ganz nah an der Fulda.<br />Und einen guten Kaffee von deinem Alltag entfernt.</p><a className="button button-forest" href={cafeInfo.telephoneHref}><Phone size={18} /> Tisch telefonisch anfragen <ArrowUpRight size={17} /></a><a className="visit-phone" href={cafeInfo.telephoneHref}>{cafeInfo.telephone}</a></div>
      <div className="visit-info"><div className="visit-block"><MapPin size={22} strokeWidth={1.4} /><div><h3>Hier sind wir zuhause</h3><address>House Adell<br />{cafeInfo.street}<br />{cafeInfo.postalCode} {cafeInfo.city}</address><div className="address-actions"><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=House+Adell+Marktplatz+16+Rotenburg+an+der+Fulda" target="_blank" rel="noreferrer">Route planen <ArrowUpRight size={15} /></a><button className="copy-address" type="button" onClick={copyAddress}>{copied ? <><Check size={14} /> Kopiert</> : 'Adresse kopieren'}</button></div><span className="sr-only" aria-live="polite">{copied ? 'Adresse kopiert' : ''}</span></div></div><div className="visit-block"><Clock3 size={22} strokeWidth={1.4} /><div><h3>Zeit für einen Besuch</h3><dl className="opening-hours">{cafeInfo.hours.map((row) => <div key={row.days}><dt>{row.days}</dt><dd>{row.time}</dd></div>)}</dl><p className="hours-note">{cafeInfo.hoursNote}</p></div></div></div><Flower className="visit-flower" center /></div>
  </section>;
}

function Footer() {
  const dialogRef = useRef(null);
  return <footer className="site-footer"><div className="footer-main section-wrap"><a className="footer-brand" href="#start"><img src={asset('logo.webp')} alt="House Adell – zur Startseite" width="1400" height="1046" /></a><p className="handwritten">Good coffee. Good food. Good company.</p><a className="footer-social icon-button" href={cafeInfo.instagram} target="_blank" rel="noreferrer" aria-label="House Adell auf Instagram (neuer Tab)"><Instagram size={21} /></a></div><div className="footer-bottom section-wrap"><span>© {new Date().getFullYear()} House Adell · Mit Liebe in Rotenburg.</span><div><button type="button" onClick={() => dialogRef.current.showModal()}>Kontakt & Hinweise</button><a href="#start">Zurück nach oben <ArrowUpRight size={14} /></a></div></div><dialog className="info-dialog" ref={dialogRef} aria-labelledby="info-title" onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}><button className="dialog-close icon-button" type="button" onClick={() => dialogRef.current.close()} aria-label="Hinweise schließen"><X /></button><h2 id="info-title">Kontakt & Hinweise</h2><p>House Adell<br />Marktplatz 16<br />36199 Rotenburg an der Fulda</p><p><a href={cafeInfo.telephoneHref}>{cafeInfo.telephone}</a></p><p>Diese lokale Vorschau verwendet die bereitgestellte Speisekarte. Preise und Öffnungszeiten sind vor der Veröffentlichung durch das Café zu bestätigen. Die vollständigen rechtlichen Angaben werden zur Veröffentlichung ergänzt.</p><p>Es werden keine Analyse- oder Marketing-Cookies gesetzt. Links zu Instagram und Google Maps öffnen externe Angebote.</p></dialog></footer>;
}

export default function App() {
  return <><a className="skip-link" href="#main-content">Zum Inhalt springen</a><Header /><main id="main-content"><Hero /><div className="pleasure-strip" aria-hidden="true"><span>Guter Kaffee</span><Flower /><span>Spätes Frühstück</span><Flower /><span>Hausgemachtes Glück</span><Flower /><span>Dein Lieblingsplatz</span><Flower /></div><Favorites /><About /><Menu /><CoffeeMoment /><Gallery /><Visit /></main><Footer /></>;
}
