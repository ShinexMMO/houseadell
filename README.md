# House Adell

Lokale React-Website für das Café House Adell in Rotenburg an der Fulda.

## Starten

```sh
npm install
npm run dev
```

Vorschau: http://localhost:5173

```sh
npm run build
npm run preview
```

## Inhalte bearbeiten

- `src/App.jsx`: Startseite, Cafégeschichte, Galerie, Kontakt.
- `src/Hero.jsx`, `src/heroMedia.js`: Headerfilm, Poster und Wiedergabesteuerung.
- `src/swirlRenderer.js`: kontinuierliche GPU-Bewegung des letzten Filmbilds.
- `src/Botanical.jsx`: dekorative Wasserfarbenblätter als Ausschnitte des Original-Logos.
- `src/menuData.js`: vollständige Karte mit Preisen und Extras, Adresse und Öffnungszeiten.
- `src/styles.css`, `src/menu.css`: Gestaltung und responsive Layouts.
- `src/newspaper.css`: kompakte farbige Fotosektion auf Papier.
- `public/assets/speisekarte.pdf`: Original-Speisekarte.
- `public/assets/`: optimierte Originalbilder und transparentes Original-Logo.
- `public/fonts/`: lokal bereitgestellte Schriften mit OFL-Lizenzen.
- `research.md`: Inhaltsquellen und noch zu bestätigende Betreiberangaben.

Die Seite benötigt keinen Backend-Dienst. Anfragen für Tische erfolgen über einen Telefonlink. Die Speisekarte unterstützt Kategorien, Volltextsuche und PDF-Ansicht. Die Galerie lässt sich per Maus und Tastatur bedienen. Animationen beachten die Systemeinstellung für reduzierte Bewegung.

## Vor einem öffentlichen Start

Öffnungszeiten, Preise und vollständige rechtliche Betreiberangaben vom Café bestätigen lassen. Die lokale Vorschau wurde nicht öffentlich veröffentlicht.

## Gestaltung, Version 2

Neu aufgebaut nach den gewünschten Referenzen [Kerr Street Café](https://www.kerrstreetcafe.com/) und [WELL](https://well-lifestyle.de/): großflächiger Videoeinstieg, zentriertes Original-Logo, dunkles Grün und Creme, schmale versale Headlines, kursive Serif-Akzente und rechteckige Fotostrecken. Die vorherigen vier Gestaltungsdateien liegen in `design-archive/v1`.

Keine generische Icon-Bibliothek. Bedienelemente verwenden Klartext; die vier dekorativen Café-Motive stammen aus Higgsfield. Barlow Condensed, Cormorant Garamond und DM Sans werden lokal ausgeliefert.

## Higgsfield-Assets

- **GPT Image 2.6:** vier eigens generierte SVG-Illustrationen (Kaffeetasse, Croissant, Kuchen und Olivenzweig), kostenlos autorisierter Job `2fd390d6-82d6-481a-9684-89191127bdbf`. Datei: `public/assets/adell-icons.svg`, 6,7 KB. Transparentes 2×2-Sheet, das per CSS ausschnittweise angezeigt wird. XML geprüft: keine Skripte oder externen Verweise.
- **GPT Image 2.6:** neues Header-Startbild nach `Fotos aufbereitet/cafe-moment.png`, Job `ef7493f0-e169-4346-b171-b29bd002c172`. Verziertes Latteglas, Holzuntersetzer und warmes Café-Interieur orientieren sich an der gelieferten Fotoreferenz. Datei: `public/assets/latte-poster.webp`, 1920 × 1086, ca. 92 KB.
- **Seedance 2.5:** neuer 14-Sekunden-Clip, Job `26c97a54-e3d1-43b1-9894-988072955684`. Espresso fließt von oben in die Milch, anschließend kontinuierliche Kamerafahrt bis in die vollflächige Marmorierung. Datei: `public/assets/latte-pour.mp4`, H.264, 1280 × 720, 24 fps, 3,05 MB, stumm, Fast Start. Einmaliges Intro, danach eine fortlaufende Makro-Schleife aus den vorhandenen Kaffeeschlieren. Die Taste erlaubt nur noch Pausieren und Fortsetzen; kein Wiederholen des Intros. Bei reduzierter Bewegung kein automatischer Start. Beide neuen Generierungen nutzen die ausdrücklich autorisierte kostenlose Freischaltung.
- Die übrigen Fotos und das Logo stammen aus den bereitgestellten Markenunterlagen. Frühere zusätzliche Fotogenerierungen waren rate-limitiert; die neue SVG-Generierung war erfolgreich.

## Prüfung

Produktions-Build mit Vite. In Safari geprüft: Desktop-Ansicht, Layout bei 390 Pixel Breite, mobiles Navigationsmenü, Kategorien der Speisekarte, Suche nach Cappuccino mit Preis und Zurücksetzen, Fotogalerie mit Weiter-Taste und Escape. Das mobile Suchfeld nutzt 16 Pixel Schriftgröße, um automatisches Zoomen auf iOS zu vermeiden. Für den Headerfilm zusätzlich geprüft: automatischer Start und Pause sowie Layout und bildfüllende Makroaufnahme bei 390 Pixel Breite. Reduzierte Bewegung wird im React-Code berücksichtigt. Der gesamte MP4-Stream wurde fehlerfrei dekodiert; Fast-Start-Layout und HTTP-Range-Abruf (206) sind bestätigt.

## Headerfilm, Version 3

Der erneute Versuch mit Seedance 2.5 am 14. November 2026 war erfolgreich. Startbild und Film sind eingebunden. Die Originaldateien, exakte Generierungsanfrage und ein Kontaktbogen mit sechs Filmphasen liegen in `design-archive/v3-latte`. Der frühere Studio-Entwurf und der ältere 6-Sekunden-Film werden im Header nicht mehr verwendet.

## Flüssige Schlieren und Original-Marke, Version 5

Die vorherige 9-Sekunden-Videoschleife ist durch eine kontinuierliche WebGL-Animation ersetzt. Nach dem freigegebenen Intro wird dessen tatsächliches letztes Bild als Textur übernommen und sanft bewegt. Der erste Canvas-Frame stimmt mit dem Filmbild überein; es gibt keinen Videosprung, keinen Seek und keinen regelmäßig zurückgesetzten Animationszustand. Das Intro bleibt unverändert. Die frühere Schleifenbearbeitung ist in `design-archive/v4-loop` dokumentiert.

Pause und Fortsetzen behalten die aktuelle Bewegungsphase. Ein verborgener Browser-Tab stoppt die Berechnung. Reduzierte Bewegung verhindert den automatischen Start; ohne WebGL bleibt das letzte Filmbild stehen. Keine zusätzliche Bibliothek, keine weitere KI-Generierung. „Film wiederholen“ bleibt entfernt.

Die Kopfzeile verwendet helles Elfenbein und das unveränderte, farbige Original-Logo. Dessen originale Wasserfarbenzweige wiederholen sich in Einleitung, Cafégeschichte, Speisekarte, Galerie, Besuchsbereich und Footer. Die Cafégeschichte hat einen hellen Salbeihintergrund. Auf kleinen Bildschirmen werden die Blätter dezenter und kleiner.

Safari-Prüfung: etwa 60 Animationsbilder pro Sekunde über mehr als 23 Sekunden, größter gemessener Abstand 30 ms; keine verworfenen Intro-Videoframes. Pause hält Bild und Zeit an, Fortsetzen bewegt dieselbe Phase weiter. Desktop-Abschnitte sowie Kopfzeile, Navigation und Speisekarte bei 390 Pixel Breite visuell geprüft. Das ist eine Messung auf dem lokalen Desktop, keine Leistungsgarantie für jedes Endgerät. Prüfseiten und Gestaltungsnotizen liegen außerhalb des öffentlichen Verzeichnisses in `design-archive/v5-smooth`.

## Fotosektion als Morgenzeitung, Version 6

„Am liebsten hier“ ist jetzt als „Die Adell Morgenpost“ gestaltet: warmer Papierbogen auf Waldgrün, dezente Papierkörnung und Blattkanten, Zeitungskopf, Spaltentrenner, großes Caféfoto und zwei kleinere Bildgeschichten mit French Toast und Fensterplatz. Originale Wasserfarbenblätter rahmen den Papierbogen. Die vorhandenen Fotos bleiben farbig und können weiterhin in der Galerie vergrößert werden.

Auf mobilen Bildschirmen stehen die drei Bildgeschichten untereinander. Cormorant Garamond wurde um den aufrechten Schnitt ergänzt und wird ebenfalls lokal bereitgestellt; die OFL-Lizenz liegt bereits im Schriftverzeichnis. Quelle der normalen Latin-WOFF2-Datei: Google Fonts / fonts.gstatic.com, Cormorant Garamond v21.

In Safari visuell auf Desktop und bei 390 Pixel Breite geprüft. Foto öffnen, Weiterblättern zum nächsten Foto und Schließen per Escape geprüft. Vorherige Gestaltung und Entwurfsnotizen: `design-archive/v6-morning-paper`.

## Klassisches Zeitungspapier, Version 7

Die Morgenpost verwendet jetzt neutrale Grautöne, schwarze Druckschrift, eine sichtbarere Papierkörnung und Schwarzweißfotos mit feinem Druckraster. Georgia sorgt für einen kräftigeren klassischen Zeitungssatz; Abstände und Schriftgrößen wurden kompakter. Die CSS-Behandlung ist auf diese Sektion begrenzt. Originalfotos, Bildvergrößerung und die übrigen Markenfarben bleiben erhalten.

Desktop und mobile Ansicht bei 390 Pixel Breite in Safari visuell geprüft, insbesondere Zeitungskopf, Textumbruch, Kontrast und Bildraster. Sicherung und Gestaltungsnotizen: `design-archive/v7-newsprint`.

## Kompakte farbige Galerie, Version 8

Die Galerie verwendet wieder farbige Originalfotos, warmes Papier, Waldgrün und originale Wasserfarbenblätter. Der komplette Zeitungskopf mit „Die Adell Morgenpost“, Ortszeilen und Begleittexten wurde entfernt. Oben bleibt nur „Am liebsten hier.“. Geringere Abstände, kleinere Überschriften und flachere Bildausschnitte machen die Sektion kompakter. Desktop und 390-Pixel-Ansicht in Safari geprüft. Sicherung und Gestaltungsnotizen: `design-archive/v8-color-compact`.
