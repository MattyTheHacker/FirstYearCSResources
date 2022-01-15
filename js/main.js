const csvFile = ("data/y1s2_sa.csv");
const reader = new FileReader();

reader.onload = function (e) {
    const data = csvToArray(csvFile);
    console.log(data);
  };

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
    return arr;
  }

const myDate = new Date();
console.log(myDate);