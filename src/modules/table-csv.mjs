// table-csv.mjs
// ESM-Modul: HTMLTableElement -> CSV-String (+ optionaler Download)

function escapeCsvCell(value, delimiter) {
  let s = value == null ? "" : String(value);
  // CSV: Quotes verdoppeln, und bei Sonderzeichen in Quotes setzen
  const mustQuote = s.includes('"') || s.includes("\n") || s.includes("\r") || s.includes(delimiter);
  if (s.includes('"')) s = s.replace(/"/g, '""');
  return mustQuote ? `"${s}"` : s;
}

/**
 * Liest eine HTML-Tabelle aus und erzeugt daraus CSV.
 * @param {HTMLTableElement} table
 * @param {{ delimiter?: string, newline?: string }} [opts]
 * @returns {string}
 */
export function tableToCsv(table, opts = {}) {
  if (!(table instanceof HTMLTableElement)) {
    throw new TypeError("tableToCsv: 'table' muss ein HTMLTableElement sein.");
  }

  const delimiter = opts.delimiter ?? ",";
  const newline = opts.newline ?? "\n";

  const lines = [];
  const rowEls = table.querySelectorAll("tr");

  for (const tr of rowEls) {
    const cells = tr.querySelectorAll("th,td");
    const row = [];
    for (const cell of cells) {
      // textContent ist für deine CryptoCard-Tabellen passend (keine HTML-Tags)
      row.push(escapeCsvCell(cell.textContent?.trim() ?? "", delimiter));
    }
    lines.push(row.join(delimiter));
  }

  return lines.join(newline);
}

/**
 * Löst einen CSV-Download aus (im Browser).
 * @param {string} csv
 * @param {string} [filename]
 */
export function downloadCsv(csv, filename = "export.csv") {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

/**
 * Convenience: Tabelle direkt exportieren.
 * @param {HTMLTableElement} table
 * @param {string} [filename]
 * @param {{ delimiter?: string, newline?: string }} [opts]
 */
export function exportTableAsCsv(table, filename = "export.csv", opts = {}) {
  const csv = tableToCsv(table, opts);
  downloadCsv(csv, filename);
}
