import { legalInfo as L } from "./legalData.js";

const Missing = ({ children }) => (
  <mark className="legal-missing">[bitte ergänzen: {children}]</mark>
);
const value = (v, label) => v ?? <Missing>{label}</Missing>;

const Address = () => (
  <p>
    {L.businessName}
    <br />
    {L.owner}
    {L.legalForm && <> ({L.legalForm})</>}
    <br />
    {L.street}
    <br />
    {L.postalCode} {L.city}
  </p>
);

const Contact = () => (
  <p>
    Telefon: <a href={L.telephoneHref}>{L.telephone}</a>
    <br />
    E-Mail:{" "}
    {L.email ? <a href={`mailto:${L.email}`}>{L.email}</a> : <Missing>E-Mail-Adresse</Missing>}
  </p>
);

function Impressum() {
  return (
    <>
      <h1>Impressum</h1>
      <h2>Angaben gemäß § 5 DDG</h2>
      <Address />
      {!L.legalForm && (
        <p>
          <Missing>Rechtsform, bei GmbH o. Ä. zusätzlich Registergericht und Registernummer</Missing>
        </p>
      )}

      <h2>Kontakt</h2>
      <Contact />

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:{" "}
        {value(L.vatId, "USt-IdNr., falls vorhanden")}
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {L.owner}
        <br />
        {L.street}, {L.postalCode} {L.city}
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website enthält Links zu externen Websites Dritter, etwa Instagram und Google
        Maps. Auf deren Inhalte haben wir keinen Einfluss. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von
        Rechtsverletzungen entfernen wir derartige Links umgehend.
      </p>
    </>
  );
}

function Datenschutz() {
  return (
    <>
      <h1>Datenschutz</h1>
      <p className="legal-lead">
        Kurz gesagt: Diese Website setzt keine Cookies, verwendet keine Analyse- oder
        Marketing-Tools und lädt keine Inhalte von Drittanbietern. Schriften, Bilder und
        Videos werden direkt von unserem Server ausgeliefert.
      </p>

      <h2>1. Verantwortliche Stelle</h2>
      <Address />
      <Contact />

      <h2>2. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA,
        gehostet. Beim Aufruf der Seiten verarbeitet Vercel technisch notwendige Daten, die
        Ihr Browser automatisch übermittelt: IP-Adresse, Datum und Uhrzeit des Abrufs,
        aufgerufene Seite, Referrer-URL, Browsertyp und Betriebssystem. Diese Daten sind
        erforderlich, um die Website sicher und stabil auszuliefern, und werden nicht mit
        anderen Datenquellen zusammengeführt.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in
        der sicheren und fehlerfreien Bereitstellung der Website. Mit Vercel besteht ein
        Vertrag zur Auftragsverarbeitung. Eine Übermittlung in die USA ist möglich; Vercel
        ist nach dem EU-US Data Privacy Framework zertifiziert, ergänzend gelten die
        EU-Standardvertragsklauseln. Weitere Informationen:{" "}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
          Datenschutzerklärung von Vercel
        </a>
        .
      </p>

      <h2>3. Cookies und lokale Speicherung</h2>
      <p>
        Wir setzen keine Cookies und speichern keine Informationen auf Ihrem Endgerät (auch
        nicht im Local Storage). Deshalb ist kein Cookie-Banner erforderlich.
      </p>

      <h2>4. Kontakt per Telefon oder E-Mail</h2>
      <p>
        Wenn Sie uns anrufen oder schreiben, verarbeiten wir Ihre Angaben (z. B. Name,
        Telefonnummer, Wunschtermin) ausschließlich zur Bearbeitung Ihrer Anfrage, etwa einer
        Tischreservierung oder einer Veranstaltung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
        DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden gelöscht,
        sobald sie nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten
        entgegenstehen.
      </p>

      <h2>5. Links zu Instagram und Google Maps</h2>
      <p>
        Unsere Website enthält einfache Links zu Instagram (Meta Platforms Ireland Ltd.) und
        Google Maps (Google Ireland Ltd.). Es werden keine Inhalte dieser Dienste eingebettet
        und beim bloßen Besuch unserer Website keine Daten an sie übertragen. Erst wenn Sie
        einen Link anklicken, verlassen Sie unsere Website; dann gelten die
        Datenschutzbestimmungen des jeweiligen Anbieters.
      </p>

      <h2>6. Ihre Rechte</h2>
      <p>
        Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16),
        Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit
        (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen
        (Art. 21 DSGVO). Wenden Sie sich dazu einfach an die oben genannte verantwortliche
        Stelle.
      </p>
      <p>
        Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
        beschweren. Für uns zuständig ist der Hessische Beauftragte für Datenschutz und
        Informationsfreiheit, Gustav-Stresemann-Ring 1, 65189 Wiesbaden,{" "}
        <a href="https://datenschutz.hessen.de" target="_blank" rel="noreferrer">
          datenschutz.hessen.de
        </a>
        .
      </p>

      <h2>7. Aktualität</h2>
      <p>Stand: {L.updated}. Wir passen diese Erklärung an, wenn sich die Website ändert.</p>
    </>
  );
}

export default function LegalPage({ page }) {
  return (
    <>
      <header className="legal-header">
        <a href="/" className="legal-brand" aria-label="House Adell – Startseite">
          <img src="/assets/logo.webp" alt="House Adell" width="1400" height="1046" />
        </a>
        <a href="/" className="legal-back">
          Zur Startseite
        </a>
      </header>
      <main className="legal wrap">{page === "datenschutz" ? <Datenschutz /> : <Impressum />}</main>
      <footer className="legal-footer wrap">
        <p>© {new Date().getFullYear()} House Adell</p>
        <nav aria-label="Rechtliches">
          <a href="/impressum" aria-current={page === "impressum" ? "page" : undefined}>
            Impressum
          </a>
          <a href="/datenschutz" aria-current={page === "datenschutz" ? "page" : undefined}>
            Datenschutz
          </a>
        </nav>
      </footer>
    </>
  );
}
