// One-off: adapt the festival set + calendar for the Sai Baba temple.
// - Replace the 2026 date map with this temple's published calendar (all 30).
// - Remove festivals not on this calendar (Venkateswara/Andal-specific).
// New festivals' content is added separately; their dates are already listed
// here so they appear automatically once their data exists.

import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const file = resolve(root, 'data', 'festivals.json');
const data = JSON.parse(await readFile(file, 'utf8'));

// Full 2026 calendar for this temple (id -> display + sort). Hanuman Jayanthi
// and Shani Trayodasi occur twice; shown as one entry with both dates.
const DATES_2026 = {
  makarasankranti: { display: 'Jan 14', sort: '01-14' },
  vasanthpanchami: { display: 'Jan 23', sort: '01-23' },
  rathasaptami: { display: 'Jan 25', sort: '01-25' },
  thaipoosam: { display: 'Jan 31', sort: '01-31' },
  shivaratri: { display: 'Feb 15', sort: '02-15' },
  holi: { display: 'Mar 3', sort: '03-03' },
  yugadi: { display: 'Mar 19', sort: '03-19' },
  ramanavami: { display: 'Mar 26', sort: '03-26' },
  panguniuthiram: { display: 'Mar 31', sort: '03-31' },
  hanumanjayanthi: { display: 'Apr 1 & May 11', sort: '04-01' },
  tamilnewyearvishu: { display: 'Apr 14', sort: '04-14' },
  akshayatritiya: { display: 'May 15', sort: '05-15' },
  shanitrayodasi: { display: 'Jun 27 & Nov 21', sort: '06-27' },
  gurupurnima: { display: 'Jul 28', sort: '07-28' },
  adikrithika: { display: 'Aug 7', sort: '08-07' },
  saivigrahaprathista: { display: 'Aug 13', sort: '08-13' },
  varalakshmi: { display: 'Aug 21', sort: '08-21' },
  thiruonam: { display: 'Aug 26', sort: '08-26' },
  rakshabandhan: { display: 'Aug 27', sort: '08-27' },
  janmashtami: { display: 'Sep 3', sort: '09-03' },
  ganeshchaturthi: { display: 'Sep 14', sort: '09-14' },
  sharadnavaratri: { display: 'Oct 11', sort: '10-11' },
  saraswatipuja: { display: 'Oct 16', sort: '10-16' },
  dussehra: { display: 'Oct 20', sort: '10-20' },
  diwali: { display: 'Nov 8', sort: '11-08' },
  skandashashti: { display: 'Nov 14', sort: '11-14' },
  karthikapoornima: { display: 'Nov 23', sort: '11-23' },
  subramanyashashti: { display: 'Nov 29', sort: '11-29' },
  vaikunthaekadasi: { display: 'Dec 20', sort: '12-20' },
  dattatreya: { display: 'Dec 23', sort: '12-23' },
};

// Festivals to remove (not on this temple's calendar).
const REMOVE = new Set([
  'godakalyanam',
  'mahalakshmijayanthi',
  'sivalayavarshikotsavam',
  'brahmotsavam',
  'pavithrotsavam',
  'srivarujayanti',
  'ayyappamandala',
]);

const before = data.festivals.length;
data.festivals = data.festivals.filter((f) => !REMOVE.has(f.id));
data.dates = { 2026: DATES_2026 };

await writeFile(file, JSON.stringify(data, null, 2) + '\n', 'utf8');

console.log(`Removed ${before - data.festivals.length} festivals.`);
console.log(`Festivals now in data: ${data.festivals.length}`);
console.log(`Calendar entries (2026): ${Object.keys(DATES_2026).length}`);
const present = new Set(data.festivals.map((f) => f.id));
const missing = Object.keys(DATES_2026).filter((id) => !present.has(id));
console.log(`Calendar festivals still needing content (${missing.length}):`);
console.log('  ' + missing.join(', '));
