# House Adell: Inhaltsgrundlage

Recherche und Abgleich am 14. November 2026. Die gelieferten Markenunterlagen heißen House Adell; dies ist auch der öffentlich belegte Name des Cafés in Rotenburg an der Fulda. Der gesprochene Name „Haus Ada“ wird daher als House Adell interpretiert.

## Kontakt und Ort

- House Adell, Café, Marktplatz 16, 36199 Rotenburg a. d. Fulda.
- Telefon: 06623 9156506, international +49 6623 9156506.
- Primärquelle: [Gastronomie der städtischen Tourist-Information](https://rotenburg-erleben.de/gastronomie/). Adresse und Telefon stimmen mit aktuellen Einträgen in Tripadvisor, Restaurant Guru und GastroGuide überein.
- Instagram: [@adell.house](https://www.instagram.com/adell.house/), in [Restaurant Guru](https://de.restaurantguru.com/House-Adell-Rotenburg-an-der-Fulda) verlinkt und anhand der gelieferten lokalen Instagram-Screenshots visuell bestätigt. Direktzugriff auf Instagram war beim Abruf gedrosselt; keine aktuellen Profilangaben daraus ableiten.
- Facebook: [house.adell](https://www.facebook.com/house.adell/), in [GastroGuide](https://www.gastroguide.de/restaurant/274345/cafe-house-adell/rotenburg-an-der-fulda/oeffnungszeiten) verlinkt. Facebook war beim Abruf gesperrt.
- Keine seriös bestätigte café-eigene Website gefunden. Der bei Restaurant Guru angegebene Link `detourkal.pw` ist nicht als offizielle Quelle bestätigt und wird bewusst nicht verwendet.
- Keine verifizierte E-Mail-Adresse und keine vollständigen Impressumsangaben gefunden. Diese vor öffentlicher Veröffentlichung vom Betreiber beziehen; für die lokale Vorschau keine Angaben erfinden.

## Öffnungszeiten

Übereinstimmend öffentlich angegeben: Montag und Mittwoch bis Sonntag 09:00–17:00 Uhr; Dienstag Ruhetag.

- [GastroGuide – Öffnungszeiten](https://www.gastroguide.de/restaurant/274345/cafe-house-adell/rotenburg-an-der-fulda/oeffnungszeiten)
- [Tripadvisor – House Adell](https://www.tripadvisor.de/Restaurant_Review-g909393-d26430484-Reviews-House_Adell-Rotenburg_an_der_Fulda_Hesse.html)
- [Restaurant Guru – House Adell](https://de.restaurantguru.com/House-Adell-Rotenburg-an-der-Fulda)

Aktuelle café-eigene Primärquelle war nicht zugänglich. Öffnungszeiten vor Veröffentlichung mit dem Betreiber bestätigen; Feiertagsabweichungen sind möglich. Keine dynamische „Jetzt geöffnet“-Aussage erforderlich.

## Geschichte und Positionierung

[HNA, Artikel vom 14. Juli 2021: Sophia Kaur hat in Rotenburg das Frühstücks-Café House Adell eröffnet](https://www.hna.de/lokales/rotenburg-bebra/rotenburg-fulda-ort305317/sophia-kaur-hat-in-rotenburg-das-fruehstuecks-cafe-house-adell-eroeffnet-direkt-am-marktplatz-90859215.html) berichtet über die Neueröffnung durch die gebürtige Rotenburgerin Sophia Kaur. Nach Studium in Marbella, gastronomischer Ausbildung und Arbeit in London sowie einer Station in München kehrte sie für ihren Traum vom eigenen Café zurück. Der Artikel beschreibt eine wohnzimmerartige Einrichtung und internationale Frühstücksgerichte sowie viel Hausgemachtes. Daraus zulässige kurze Website-Zusammenfassung: „Seit 2021 bringt Sophia Kaur ein Stück Welt nach Rotenburg. Internationale Frühstücksideen, viel Hausgemachtes und ein Café, in dem man gern noch ein bisschen bleibt.“ Keine Zahlen über aktuelle Teamgröße, keine aktuellen Lieferanten aus dem historischen Artikel übernehmen.

Die [städtische Eventankündigung vom 18. Januar 2024](https://rotenburg-erleben.de/events/fantasie-trifft-genuss-im-house-adell/) bestätigt Sophia Kaur als gebürtige Rotenburgerin und Betreiberin des Cafés. Kein aktuelles Event daraus ableiten.

## Speisekarte

Primärquelle ist ausschließlich die vom Nutzer gelieferte Datei `../Menu 6.pdf`, fünf Seiten. Text mit PyMuPDF extrahiert und alle fünf gerenderten Seiten visuell geprüft. Die Webseite verwendet die strukturierte Abschrift in `src/menuData.js`.

- 59 Speisen/Getränke in zehn Kategorien, plus optionale Extras.
- Die Frühstücksplatten Breakfast Adell! und So Cheesy! sind „täglich bis 12 Uhr“ erhältlich.
- Sauerteigbrote und Eiergerichte stehen unter „ABC – All Day Breakfast Club“.
- Kaffee: regional geröstete Bohnen laut Menü; Hafer-, Kokos- oder Mandelmilch +0,70 €, Sirup +0,50 €.
- Kuchen und Sandwiches laut Karte an der Kuchentheke; keine Preise genannt, daher keine erfinden.
- Die Karte hat vegetarische und Bio-Markierungen, aber keine ausgeführte Allergenliste. Sie verweist ausdrücklich auf eine Musterspeisekarte für Allergene und Zusatzstoffe. Zutaten erlauben keine verlässliche vollständige Allergenkennzeichnung; deshalb sind im Web keine Allergene erfunden.
- Die Schreibweisen „Grana Padona“, „Vitamine Booster“ und „Daydrinking Sparking Rosé“ folgen der gelieferten Karte (auch wenn sprachlich ungewöhnlich). Namen wie „Chef Sofias Empfehlung“ folgen der Karte; die recherchierte Betreiberin wird in Quellen „Sophia Kaur“ geschrieben.
- Ein Aktualisierungsdatum ist in der gelieferten Karte nicht ausgewiesen. Preise und Sortiment vor öffentlichem Start durch den Betreiber bestätigen.

## Datenvertrag

`menuCategories`: Array mit `{ id, label, description, items, extras? }`.

Jedes `items`-Element: `{ name, description, price }`, optional `{ vegetarian: true, organic: true, note }`. `price` ist eine Zahl in Euro. `extras` enthält `{ name, price }`. Kategorie-IDs: `breakfast`, `sweet`, `sourdough`, `eggs`, `coffee`, `tea`, `specials`, `juices`, `bottled`, `drinks`.

Weitere Exporte: `cafeInfo`, `menuNotes` (Array aus vier kurzen Hinweisen), `formatPrice(number)`.
