const XLSX = require('xlsx');
const {readFileSync, writeFileSync} = require('fs');

const filePath = process.argv[2];
const sheetIndex = process.argv[3] ?? 0;

const res = readFileSync(filePath);

const data = new Uint8Array(res);

const workbook = XLSX.read(data, {type: "array"});

const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[sheetIndex]]);

const keys = [... new Set(json.flatMap((o) => Object.keys(o)))];

const headerString = keys.map(k => `"${k}"`).join(',');
const rowStrings = json.map(row => {
  return keys.map(key => row[key]).map(v => `"${v}"`).join(',');
})

const bodyString = rowStrings.join('\n');

const csvString = headerString + '\n' + bodyString;

const outputPath = filePath + '-as.csv';
writeFileSync(outputPath, csvString, err => {
  if (err) return console.log(err);
});

console.log(`CSV ready in ${outputPath}`);

// console.log("keys", keys)

  // return [{data-source: 'test'}] as any

