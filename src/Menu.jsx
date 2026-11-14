import { useEffect, useState } from "react";
import { menuCategories, menuNotes } from "./menuData.js";
import "./menu.css";
import Botanical from "./Botanical.jsx";

const tabs = [
  { id: "breakfast", label: "Frühstück", categories: ["breakfast"] },
  { id: "savory", label: "Stullen & Eier", categories: ["sourdough", "eggs"] },
  { id: "sweet", label: "Süßes", categories: ["sweet"] },
  {
    id: "coffee",
    label: "Kaffee & Tee",
    categories: ["coffee", "tea", "specials"],
  },
  {
    id: "drinks",
    label: "Drinks",
    categories: ["juices", "bottled", "drinks"],
  },
];

const currency = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

function MenuItem({ item }) {
  return (
    <li className="menu-item">
      <div className="menu-item-heading">
        <h4>{item.name}</h4>
        <span className="menu-item-dots" aria-hidden="true" />
        <span className="menu-item-price">
          {typeof item.price === "number"
            ? currency.format(item.price)
            : item.price}
        </span>
      </div>
      {item.description && (
        <p className="menu-item-description">{item.description}</p>
      )}
      {(item.vegetarian || item.organic || item.note) && (
        <div className="menu-item-details">
          {item.vegetarian && <span className="menu-diet">Vegetarisch</span>}
          {item.organic && <span className="menu-diet">Bio</span>}
          {item.note && <span className="menu-item-note">{item.note}</span>}
        </div>
      )}
    </li>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState("breakfast");
  const selectedTab = tabs.find((tab) => tab.id === activeTab);
  const activeCategories = selectedTab.categories;

  useEffect(() => {
    function selectFromFavorite(event) {
      if (!tabs.some((tab) => tab.id === event.detail)) return;
      setActiveTab(event.detail);
    }

    window.addEventListener("adell-menu-select", selectFromFavorite);
    return () =>
      window.removeEventListener("adell-menu-select", selectFromFavorite);
  }, []);

  const visibleCategories = menuCategories.filter((category) =>
    activeCategories.includes(category.id),
  );

  const resultCount = visibleCategories.reduce(
    (count, category) =>
      count + category.items.length + (category.extras?.length || 0),
    0,
  );

  return (
    <section
      className="menu-section"
      id="speisekarte"
      aria-labelledby="menu-title"
    >
      <Botanical side="right" className="botanical-menu" />
      <div className="menu-wrap">
        <div className="menu-intro">
          <h2 id="menu-title">Die Karte.</h2>
          <p className="menu-subtitle">Früh anfangen. Lange genießen.</p>
          <p>
            Frühstücksplatten bis 12 Uhr.
            <br />
            Sauerteigbrote & Eiergerichte den ganzen Tag.
          </p>
        </div>

        <div className="menu-controls">
          <div
            className="menu-tabs"
            role="group"
            aria-label="Kategorie der Speisekarte"
          >
            {tabs.map(({ id, label }) => (
              <button
                className={`menu-tab${activeTab === id ? " menu-tab-active" : ""}`}
                type="button"
                aria-pressed={activeTab === id}
                aria-controls="menu-results"
                key={id}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <p
          className="menu-sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {`${selectedTab.label}: ${resultCount} Einträge angezeigt`}
        </p>
        <div className="menu-paper" id="menu-results">
          {visibleCategories.map((category) => (
            <div className="menu-category" key={category.id}>
              <div className="menu-category-intro">
                <h3>{category.label}</h3>
                {category.description && <p>{category.description}</p>}
              </div>
              {category.items.length > 0 && (
                <ul className="menu-items">
                  {category.items.map((item, index) => (
                    <MenuItem key={`${item.name}-${index}`} item={item} />
                  ))}
                </ul>
              )}
              {category.extras?.length > 0 && (
                <div className="menu-extras">
                  <span className="menu-extras-title">Noch etwas dazu?</span>
                  <ul>
                    {category.extras.map((extra, index) => (
                      <li key={`${extra.name}-${index}`}>
                        <span>{extra.name}</span>
                        <span>
                          {typeof extra.price === "number"
                            ? currency.format(extra.price)
                            : extra.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div className="menu-bottom">
            <div className="menu-notes">
              {menuNotes.map((note, index) => (
                <p key={index}>{note}</p>
              ))}
            </div>
            <a
              className="menu-download"
              href="/assets/speisekarte.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Die ganze Karte als PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
