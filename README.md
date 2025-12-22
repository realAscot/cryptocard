# ✏️ Cryptocard

**Sichere Passwörter – ganz ohne Passwortmanager**  

![Logo](./assets/cryptocard_256x256.png)

- [✏️ Cryptocard](#️-cryptocard)
  - [Vorschau](#vorschau)
  - [Versionen](#versionen)
    - [JavaScript-Version](#javascript-version)
    - [Rust-Version](#rust-version)
  - [Installation](#installation)
  - [ToDo](#todo)
    - [JS-Version](#js-version)
  - [Lizenz](#lizenz)

---

Cryptocard ist inspiriert durch das [Video](https://youtu.be/3Hw0yJ6fraI?si=IPV1VTojr4aUvfAW) von [@rolfsnbahn](https://www.youtube.com/@rolfsnbahn) auf YouTube.
Die Grundidee fand ich sehr interessant, allerdings empfand ich das ursprüngliche Vorgehen mit Python als umständlich: Es erforderte eine Python-Laufzeitumgebung und die Konfiguration erfolgte direkt im Quellcode.  

Daher habe ich Cryptocard in JavaScript portiert und alle benötigten Assets in eine einzelne HTML-Datei integriert. Vorteile:  

- Läuft direkt im Browser, keine zusätzliche Software nötig  
- Konfiguration erfolgt benutzerfreundlich ohne Änderungen am Quellcode  
- Kein Export und Import in Tabellenkalkulationen erforderlich  

Optional ist weiterhin ein Export in eine `.svg`-Datei möglich, falls dies benötigt wird.

Damit dieser Version hier weitestgehend mit dem Video kompatibel bleibt, habe ich alle Bezeichner im Quellcode namentlich belassen wie in seinem Video.

Eine weitere Portierung als reines Stand-Alone-CLI-Tool ist geplant und erfolgt in `RUST`

## Vorschau

Eine Vorschau gibt es [hier](https://www.ionivation.com/extern/cryptocard.html).

---

## Versionen

### JavaScript-Version

![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow?logo=javascript&logoColor=black)

Zum eigentlichen Programm geht es [hier](./js/cryptocard.html), ist aber auch rechts unter [`Releases`](https://github.com/realAscot/cryptocard/releases) zum herunterladen verfügbar und funktioniert standalone offline.

---

### Rust-Version

![Rust](https://img.shields.io/badge/Language-Rust-black?logo=rust&logoColor=white)

> in Arbeit ...

---

## Installation

Installation ist nicht nötig, die HTML-Datei enthält alles was zum Betrieb notwendig ist.
Einfach die HTML herunterladen und lokal per Doppelklick im Browser starten.

---

## ToDo

### JS-Version

- [ ] `.cvs` Export implementieren
- [ ] `.cvs` Import implementieren
- [ ] PDF Generierung Clientseitig im Browser

---

## [Lizenz](./LICENSE)
