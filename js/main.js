const y1s2_assessment_data = "data/y1s2_sa.csv";
const myDate = new Date();

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

function loadFile(filePath) {
  var result = null;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", filePath, false);
  xmlHttp.send();
  if (xmlHttp.status == 200) {
    result = csvToArray(xmlHttp.responseText);
  }
  return result;
}



console.log(loadFile(y1s2_assessment_data));
console.log(myDate);