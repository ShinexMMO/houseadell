import Botanical from "./Botanical.jsx";
import { cafeInfo } from "./menuData.js";
import "./events.css";

export default function Events() {
  return (
    <section
      className="events-section"
      id="feiern"
      aria-labelledby="events-title"
    >
      <div className="events-layout wrap">
        <div className="events-photo">
          <img
            src="/assets/brunch-buffet.webp"
            alt="Liebevoll angerichtetes Buffet im House Adell mit Käse, Obst und Gemüse"
            width="1086"
            height="1448"
            loading="lazy"
          />
        </div>
        <div className="events-copy">
          <p className="events-service">Veranstaltungen & Catering</p>
          <h2 id="events-title">
            Dein Anlass.
            <br />
            Unser Adell.
          </h2>
          <p className="events-invitation serif">
            Bring deine Lieblingsmenschen mit.
          </p>
          <p className="events-description">
            Ob Geburtstag, Familienfest oder eine schöne Zeit mit deinem Team:
            Das House Adell kannst du für deine Veranstaltung mieten. Auch dein
            Catering planen wir gerne mit dir.
          </p>
          <p className="events-description">
            Ruf uns an und erzähl uns von deiner Idee. Gemeinsam besprechen wir
            deinen Wunschtermin, die Gästezahl und das passende Essen. Wir
            freuen uns auf dich!
          </p>
          <div className="events-contact">
            <a className="events-phone" href={cafeInfo.telephoneHref}>
              {cafeInfo.telephone}
            </a>
            <a
              className="button events-call"
              href={cafeInfo.telephoneHref}
              aria-label={`Veranstaltung oder Catering telefonisch anfragen: ${cafeInfo.telephone}`}
            >
              Anrufen & gemeinsam planen
            </a>
          </div>
          <Botanical side="right" className="botanical-events" />
        </div>
      </div>
    </section>
  );
}
