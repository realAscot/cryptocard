# ✏️ Cryptocard

![Logo](./src/assets/cryptocard_256x256.png)

**Sichere Passwörter – ganz ohne Passwortmanager**  

Cryptocard ist ein browserbasiertes Tool zur deterministischen Passworterzeugung – offline, ohne Passwortmanager und ohne Cloud.  
  
🔐 Deterministische Passworterzeugung  
🌐 Läuft komplett offline im Browser  
📄 Einfache Ausgabe als Tabelle / CSV / Print  

- [✏️ Cryptocard](#️-cryptocard)
  - [Sicherheitshinweis](#sicherheitshinweis)
  - [Funktionsweise](#funktionsweise)
    - [Passwort-Erzeugung](#passwort-erzeugung)
    - [Passwortbuch (optional)](#passwortbuch-optional)
    - [Sicherheitsprinzip](#sicherheitsprinzip)
  - [Vorschau](#vorschau)
  - [Versionen](#versionen)
    - [JavaScript-Version](#javascript-version)
  - [Build und Installation](#build-und-installation)
    - [Build](#build)
    - [Installation (für Anwender)](#installation-für-anwender)
  - [ToDo](#todo)
  - [Changelog](#changelog)
  - [Lizenz](#lizenz)

![Offline](https://img.shields.io/badge/Offline-Yes-green)
![No Tracking](https://img.shields.io/badge/Tracking-No-brightgreen)

---

## Sicherheitshinweis

Cryptocard speichert **keine Passwörter**, **keine Master-Passwörter** und sendet **keine Daten** über das Netzwerk.
Die Generierung erfolgt vollständig lokal im Browser.

⚠️ Die Sicherheit hängt maßgeblich von:  

- der Geheimhaltung der gewählten Parameter  
- der Qualität des verwendeten Drucks  
- der sicheren Aufbewahrung der Karte  

Cryptocard ersetzt kein vollwertiges Passwortmanagement für hochsensible Anwendungen.

---

Cryptocard ist inspiriert durch dieses [Video](https://youtu.be/3Hw0yJ6fraI?si=IPV1VTojr4aUvfAW) von [@rolfsnbahn](https://www.youtube.com/@rolfsnbahn) auf YouTube.

Im Video wird die grundlegende Idee sowie die Verwendung der Cryptocard erläutert.
Das Video und die Idee stammt nicht von mir!

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

---

## Funktionsweise

Cryptocard erstellt eine individuelle Zeichen-Tabelle, die als Grundlage für reproduzierbare Passwörter dient.

- Zu Beginn stehen **vier Eingabefelder** zur Verfügung, in die Zeichen eingegeben werden, aus denen die Tabelle erzeugt wird.
- Die Felder sind bereits mit **sinnvollen Standardwerten** vorbelegt und können optional angepasst werden.
- Mit einem Klick auf **„Neue CryptoCard“** wird die Tabelle generiert.

Die erzeugte Tabelle kann anschließend **ausgedruckt oder digital gespeichert** werden und dient als persönliche Cryptocard.

### Passwort-Erzeugung

Für die spätere Nutzung merkt man sich ein **festes Muster**, ähnlich dem Wischmuster eines Smartphones.

- Ein Passwort entsteht, indem man an einer **Startkoordinate** (z. B. `D4`) beginnt
- und dem gewählten Muster über die Tabelle folgt.
- Die Zeichen entlang dieses Musters ergeben das Passwort.

### Passwortbuch (optional)

Statt Passwörter direkt zu speichern, kann ein **Passwortbuch** verwendet werden, in dem lediglich die jeweilige **Startkoordinate** notiert wird.

Das eigentliche Passwort ergibt sich ausschließlich durch:

- die persönliche Cryptocard **und**
- das geheime Muster

### Sicherheitsprinzip

Selbst wenn jemand sowohl die Tabelle als auch das Passwortbuch in die Hände bekommt, ist ohne Kenntnis des Musters **keine Rekonstruktion der Passwörter möglich**.

---

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

Grundsätzlich sei zu sagen dass ein `build` im klassischen Sinne nicht nötigt ist.
Da ich allerdings [`esbuild`](https://esbuild.github.io/) als Bundler verwende, muss man aus den verschiedenen Scriptdateien, dem getrennten HTML und CSS eine monolithische HTML-Datei erstellen.
Dies macht man mit folgenden schritten falls du eine der Dateien selbst bearbeitet hast.

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

### Installation (für Anwender)

Keine Installation nötig.
Lade die Datei `cryptocard.html` aus dem `dist`-Ordner herunter und öffne sie lokal im Browser.

---

## ToDo

- [ ] `.csv` Import implementieren
- [ ] PDF-Generierung Clientseitig im Browser
- [ ] Version besser für Smartphones überarbeiten

---

## Changelog

- *1.2.2*  
  - [x] Readme ergänzt und überarbeitet.  
- *1.2.1*  
  - [x] Tippfehler im Frontend korrigiert.  
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

MIT
