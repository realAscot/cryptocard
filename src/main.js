import logo from "./assets/cryptocard_256x256.png";
import favicon from "./favicon.ico";

const imgLogoElement = document.getElementById("logo");
imgLogoElement.src = logo;

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("favicon").href = favicon;

  document
    .getElementById("makeCryptoCard")
    .addEventListener("click", () => makeCryptoCard());

  document
    .getElementById("resetButton")
    .addEventListener("click", () => resetInputForms());

  document
    .getElementById("printButton")
    .addEventListener("click", () => printCryptoCard("cryptocard"));
  
  resetInputForms(a1, a2, a3, a4);
});

/* ======== KONFIGURATION ======== */
const a1Default = "abcdefghijklmnopqrstuvwxyz";
const a2Default = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const a3Default = "1234567890";
const a4Default = "#+*!?=§$%&()";

const maxZEILEN = 15; // Maximale Höhe der Cryptocard
const maxSPALTEN = 26; // Maximale Breite der Cryptocard

let zeilen, spalten;
let a1, a2, a3, a4;

/**
 * Imputfelder mit Standartwerten füllen
 *
 */
function resetInputForms() {
  document.getElementById("a1").value = String(a1Default);
  document.getElementById("a2").value = String(a2Default);
  document.getElementById("a3").value = String(a3Default);
  document.getElementById("a4").value = String(a4Default);
}

/**
 * Holt dynamische Werte aus dem HTML-Dokument
 * 
 */
function getImputForms() {
  a1 = document.getElementById("a1").value;
  a2 = document.getElementById("a2").value;
  a3 = document.getElementById("a3").value;
  a4 = document.getElementById("a4").value;
  zeilen = Number(document.getElementById("zeilen").value);
  spalten = Number(document.getElementById("spalten").value);
  if (zeilen > maxZEILEN) {
    zeilen = maxZEILEN;
    document.getElementById("zeilen").value = maxZEILEN;
  }
  if (spalten > maxSPALTEN) {
    spalten = maxSPALTEN;
    document.getElementById("spalten").value = maxSPALTEN;
  }
}

/**
 * Wählt ein zufälliges Zeichen aus den übergebenen Strings aus (Browser/WebCrypto).
 * @param  {...string} sets - Beliebig viele Strings als Zeichensets
 * @returns {string} - Ein zufälliges Zeichen aus einem der Sets
 */
function zufallszeichen(...sets) {
  const combined = sets.join("");
  if (combined.length === 0) {
    throw new Error("zufallszeichen: Mindestens ein Zeichen muss vorhanden sein.");
  }

  const cryptoObj = globalThis.crypto;
  if (!cryptoObj?.getRandomValues) {
    throw new Error("zufallszeichen: Web Crypto API (crypto.getRandomValues) ist nicht verfügbar.");
  }

  const len = combined.length;

  // Rejection Sampling, um Modulo-Bias zu vermeiden
  const max = 0x100000000; // 2^32
  const limit = max - (max % len);

  const buf = new Uint32Array(1);
  let x;
  do {
    cryptoObj.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);

  return combined[x % len];
}

/**
 * Erstellt eine HTML-Tabelle dynamisch
 * @param {number} rows Anzahl der Zeilen (ohne Legende)
 * @param {number} cols Anzahl der Spalten (ohne Legende)
 * @param {(row: number, col: number) => string} cellFn Funktion zur Befüllung der Zellen
 * @returns {HTMLTableElement} generierte Tabelle
 * 
 */
function makeTableCryptoCard(rows, cols, cellFn) {
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";

  for (let r = 0; r <= rows; r++) {
    const tr = document.createElement("tr");

    for (let c = 0; c <= cols; c++) {
      const cell =
        r === 0 || c === 0
          ? document.createElement("th")
          : document.createElement("td");
      cell.style.border = "1px solid black";
      cell.style.padding = "4px";
      cell.style.textAlign = "center";

      if (r === 0 && c === 0) {
        cell.textContent = ""; // obere linke Ecke leer
      } else if (r === 0) {
        cell.textContent = String.fromCharCode(64 + c); // Spalten-Legende A-Z
      } else if (c === 0) {
        cell.textContent = r; // Zeilen-Legende 1-n
      } else {
        // Zelleninhalt durch übergebene Funktion
        cell.textContent = cellFn(r, c);
      }

      tr.appendChild(cell);
    }

    table.appendChild(tr);
  }

  return table;
}

/**
 * Wird aus dem Formular aufgerufen, liesst die Parameter ein und erstellt die Tabelle
 *
 *
 */
function makeCryptoCard() {
  getImputForms();
  const container = document.getElementById("cryptocard");
  const table = makeTableCryptoCard(zeilen, spalten, () =>
    zufallszeichen(a1, a2, a3, a4)
  );
  container.innerHTML = "";
  table.id = "cryptoCardTable";
  container.appendChild(table);

  /* Schaltfläche "Drucken" aktivieren wenn Tabelle vorhanden */
  if (table) {
    document.getElementById("printButton").disabled = false;
  }
}

/**
 * Öffnet Popup und druckt Tabelle
 *
 */
function printCryptoCard(tableId) {
  const table = document.getElementById(tableId);
  if (!table) {
    console.error(`Tabelle mit ID "${tableId}" nicht gefunden.`);
    return;
  }

  const printWindow = window.open("about:blank", "_blank", "width=800,height=600");
  if (!printWindow) {
    console.error("Popup wurde blockiert (window.open() == null).");
    return;
  }

  const doc = printWindow.document;

  // Standards-Mode erzwingen (DOCTYPE) -> stabileres Drucklayout
  doc.open();
  doc.write(`<!doctype html>
<html><head>
  <meta charset="utf-8">
  <title>CryptoCard</title>
  <style>
    @media print {
      th {
        background: yellow !important;
        color: #000 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  </style>
</head>
<body>
  <div id="table-container"><!-- Platzhalter fuer Tabelle zum Druck --></div>
</body></html>`);
  doc.close();

  // Tabelle einsetzen (klonen, damit Original-DOM unberührt bleibt)
  doc.getElementById("table-container").appendChild(table.cloneNode(true));

  // Print-Button verbinden
  // doc.getElementById("print-btn").addEventListener("click", () => printWindow.print());

  printWindow.print();
  printWindow.focus();
}


