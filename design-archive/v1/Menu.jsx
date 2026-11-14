import { useEffect, useMemo, useState } from 'react';
import { ArrowDownToLine, Coffee, Cookie, Leaf, Search, Sunrise, Utensils, Wine, X } from 'lucide-react';
import { menuCategories, menuNotes } from './menuData.js';
import './menu.css';

const tabs = [
  { id: 'breakfast', label: 'Frühstück', icon: Sunrise, categories: ['breakfast'] },
  { id: 'savory', label: 'Stullen & Eier', icon: Utensils, categories: ['sourdough', 'eggs'] },
  { id: 'sweet', label: 'Süßes', icon: Cookie, categories: ['sweet'] },
  { id: 'coffee', label: 'Kaffee & Tee', icon: Coffee, categories: ['coffee', 'tea', 'specials'] },
  { id: 'drinks', label: 'Drinks', icon: Wine, categories: ['juices', 'bottled', 'drinks'] },
];

const currency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
const normalize = (text = '') => String(text).toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss');
const matches = (item, query) => normalize(`${item.name} ${item.description || ''} ${item.note || ''}`).includes(query);

function MenuItem({ item }) {
  return (
    <li className="menu-item">
      <div className="menu-item-heading">
        <h4>{item.name}</h4>
        <span className="menu-item-dots" aria-hidden="true" />
        <span className="menu-item-price">{typeof item.price === 'number' ? currency.format(item.price) : item.price}</span>
      </div>
      {item.description && <p className="menu-item-description">{item.description}</p>}
      {(item.vegetarian || item.organic || item.note) && (
        <div className="menu-item-details">
          {item.vegetarian && <span className="menu-diet"><Leaf size={12} aria-hidden="true" /> Vegetarisch</span>}
          {item.organic && <span className="menu-diet">Bio</span>}
          {item.note && <span className="menu-item-note">{item.note}</span>}
        </div>
      )}
    </li>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('breakfast');
  const [search, setSearch] = useState('');
  const query = normalize(search.trim());
  const selectedTab = tabs.find((tab) => tab.id === activeTab);
  const activeCategories = selectedTab.categories;

  useEffect(() => {
    function selectFromFavorite(event) {
      if (!tabs.some((tab) => tab.id === event.detail)) return;
      setActiveTab(event.detail);
      setSearch('');
    }

    window.addEventListener('adell-menu-select', selectFromFavorite);
    return () => window.removeEventListener('adell-menu-select', selectFromFavorite);
  }, []);

  const visibleCategories = useMemo(() => menuCategories.flatMap((category) => {
    if (!query) return activeCategories.includes(category.id) ? [category] : [];
    const items = category.items.filter((item) => matches(item, query));
    const extras = category.extras?.filter((item) => matches(item, query));
    return items.length || extras?.length ? [{ ...category, items, extras }] : [];
  }), [activeCategories, query]);

  const resultCount = visibleCategories.reduce((count, category) => count + category.items.length + (category.extras?.length || 0), 0);

  function chooseTab(id) {
    setActiveTab(id);
    setSearch('');
  }

  return (
    <section className="menu-section" id="speisekarte" aria-labelledby="menu-title">
      <div className="menu-wrap">
        <div className="menu-intro">
          <span className="menu-handwritten">Einmal alles, bitte.</span>
          <h2 id="menu-title">Gute Laune geht<br />durch den Magen.</h2>
          <p>Ein langes Frühstück, deine Kaffeepause oder einfach etwas Süßes zwischendurch. Worauf hast du Lust?</p>
        </div>

        <div className="menu-controls">
          <div className="menu-tabs" role="group" aria-label="Kategorie der Speisekarte">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button className={`menu-tab${activeTab === id && !query ? ' menu-tab-active' : ''}`} type="button" aria-pressed={activeTab === id && !query} aria-controls="menu-results" key={id} onClick={() => chooseTab(id)}>
                <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <div className="menu-search">
            <Search size={17} strokeWidth={1.7} aria-hidden="true" />
            <label className="menu-sr-only" htmlFor="menu-search">Gesamte Speisekarte durchsuchen</label>
            <input id="menu-search" type="search" placeholder="Lieblingssache suchen" aria-controls="menu-results" value={search} onChange={(event) => setSearch(event.target.value)} />
            {search && <button type="button" onClick={() => setSearch('')} aria-label="Suche leeren"><X size={16} aria-hidden="true" /></button>}
          </div>
        </div>

        <p className="menu-sr-only" role="status" aria-live="polite" aria-atomic="true">{query ? `${resultCount} Treffer für „${search.trim()}“ in der gesamten Karte` : `${selectedTab.label}: ${resultCount} Einträge angezeigt`}</p>
        <div className="menu-paper" id="menu-results">
          {query && <p className="menu-search-count">{resultCount} Treffer für „{search.trim()}“ in der gesamten Karte</p>}
          {visibleCategories.length ? visibleCategories.map((category) => (
            <div className="menu-category" key={category.id}>
              <div className="menu-category-intro">
                <h3>{category.label}</h3>
                {category.description && <p>{category.description}</p>}
              </div>
              {category.items.length > 0 && <ul className="menu-items">{category.items.map((item, index) => <MenuItem key={`${item.name}-${index}`} item={item} />)}</ul>}
              {category.extras?.length > 0 && <div className="menu-extras"><span className="menu-extras-title">Noch etwas dazu?</span><ul>{category.extras.map((extra, index) => <li key={`${extra.name}-${index}`}><span>{extra.name}</span><span>{typeof extra.price === 'number' ? currency.format(extra.price) : extra.price}</span></li>)}</ul></div>}
            </div>
          )) : <div className="menu-empty"><Search size={30} strokeWidth={1.3} aria-hidden="true" /><h3>Noch nicht das Richtige gefunden?</h3><p>Für „{search.trim()}“ gibt es keinen Eintrag. Versuch es zum Beispiel mit „Cappuccino“, „Avocado“ oder „Toast“.</p><button type="button" onClick={() => setSearch('')}>Zurück zur Karte</button></div>}

          <div className="menu-bottom">
            <div className="menu-notes">{menuNotes.map((note, index) => <p key={index}>{note}</p>)}</div>
            <a className="menu-download" href="/assets/speisekarte.pdf" target="_blank" rel="noreferrer"><ArrowDownToLine size={17} strokeWidth={1.7} aria-hidden="true" />Die ganze Karte als PDF</a>
          </div>
        </div>
      </div>
    </section>
  );
}
