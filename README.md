# ✏️ Cryptocard

**Sichere Passwörter – ganz ohne Passwortmanager**  

![Logo](./src/assets/cryptocard_256x256.png)

- [✏️ Cryptocard](#️-cryptocard)
  - [Vorschau](#vorschau)
  - [Versionen](#versionen)
    - [JavaScript-Version](#javascript-version)
  - [Build und Installation](#build-und-installation)
    - [Build](#build)
    - [Installation](#installation)
  - [ToDo](#todo)
  - [Changelog](#changelog)
  - [Lizenz](#lizenz)

---

Cryptocard ist inspiriert durch das [Video](https://youtu.be/3Hw0yJ6fraI?si=IPV1VTojr4aUvfAW) von [@rolfsnbahn](https://www.youtube.com/@rolfsnbahn) auf YouTube.

Dort im Video wird auch erläutert wie diese Cryptocard zu verwenden ist.

> ***⚠️ Kleiner Tipp:***  
> In der Druckvorschau kann vor dem Druck die Größe der Tabelle nochmals skaliert werden.

Die Grundidee fand ich sehr interessant, allerdings empfand ich das ursprüngliche Vorgehen mit Python als umständlich: Es erforderte eine Python-Laufzeitumgebung und die Konfiguration erfolgte direkt im Quellcode.

Daher habe ich Cryptocard in JavaScript portiert und alle benötigten Assets in eine einzelne HTML-Datei integriert. Vorteile:  

- Läuft direkt im Browser, keine zusätzliche Software nötig  
- Konfiguration erfolgt benutzerfreundlich ohne Änderungen am Quellcode  
- Kein Export und Import in Tabellenkalkulationen erforderlich  

Optional ist weiterhin ein Export in eine `.csv`-Datei möglich, falls dies benötigt wird.

Damit dieser Version hier weitestgehend mit dem Video kompatibel bleibt, habe ich alle Bezeichner im Quellcode namentlich belassen wie in seinem Video.

Eine weitere Portierung als reines Stand-Alone-CLI-Tool ist geplant und erfolgt in `RUST`

## Vorschau

✈️ Eine Vorschau und die aktuelle Version Online gibt es [hier](https://www.ionivation.com/extern/cryptocard.html).

> ![QR-Code](./src/assets/cryptocard_qr.svg)  
> Der QR-Code führt Dich sofort zur Online-Version.

---

## Versionen

### JavaScript-Version

![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow?logo=javascript&logoColor=black)

Zum eigentlichen Programm geht es [hier](./dist/cryptocard.html), ist aber auch rechts unter [`Releases`](https://github.com/realAscot/cryptocard/releases) zum herunterladen verfügbar und funktioniert standalone offline.

---

## Build und Installation

### Build

Ich gehe davon aus, das Du [`node.js`](https://nodejs.org/) installiert hast.
Wechsel in das Projektverzeichnis dieses Projekt und installiere die Dependencies mit:

```bash
npm ci
```

oder

```bash
npm install
```

Anschliessend die HTML Datei bauen mit:

```bash
npm run dev
```

Es wird die Datei `./dist/cryptocard.html` erstellt.
Um Dir diese Schritte zu ersparen, habe ich die aktuelle Datei unter `./dist` belassen.
So lange Du also keine Änderungen durchführen musst, kannst Du diese verwenden.

### Installation

Installation ist nicht nötig, die HTML-Datei unter `./dist`nach dem Build enthält alles was zum Betrieb notwendig ist inklusive Assets.
Einfach die HTML herunterladen und lokal per Doppelklick im Browser starten.

---

## ToDo

- [ ] `.csv` Export implementieren
- [ ] `.csv` Import implementieren
- [ ] PDF Generierung Clientseitig im Browser

---

## Changelog

- *1.2.0*  
  - [x] `.csv`Export integriert  
  - [x] Einige Dateien aus Version 1.1.0 entfernt und Projekt bereinigt.
        Der Ordnung halber, habe ich die Dateien im Repo belassen.
- *1.1.0*  
  - [x] ⚠️ Breaking Changes  
        Komplett auf Modulversion (ESM) mit esbuild umgebaut.  
- *1.0.0*  
  - [x] Erste Version, händisch mit commonJS erstellt.

---

## [Lizenz](./LICENSE)
