# Endlose Kaffeeschlieren

Quelle: freigegebener Seedance-2.5-Headerfilm aus Version 3. Es wurden keine weiteren Generierungen oder Credits verwendet.

`render-loop.py` rendert die Makro-Sequenz (10,75–14 Sekunden) mit vierfach verlangsamter, optisch interpolierter Bewegung. Zwei Kopien werden vier Sekunden überblendet; der Ausschnitt von 4–13 Sekunden bildet die neunsekündige, zyklische Schleife. Die finale Datei liegt unter `../../public/assets/latte-swirls-loop.mp4`.

`seam-check.json` vergleicht die mittlere RGB-Bildänderung zwischen letztem und erstem Frame mit den normalen Bildwechseln: Übergang 0,920/255; größte reguläre Änderung 1,466/255. 216 Frames, konstante 24 fps, 9 Sekunden. Der komplette Film wurde dabei dekodiert.

React startet die Schleife nach dem Intro und blendet sie über zwei Sekunden ein. Beide Spuren lassen sich pausieren; nach Fortsetzen bleibt die Schleife aktiv. Systemeinstellung für reduzierte Bewegung verhindert Autoplay. Die frühere Wiederholen-Taste wurde entfernt.
