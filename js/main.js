const csvFile = "https://mattythehacker.github.io/FirstYearCSResources/resources/CS-Module-Marks-Tracker-blank.xlsx";
/**
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
*/
var txtFile = new XMLHttpRequest();
txtFile.open("GET", csvFile, true);
txtFile.onreadystatechange = function() {
  if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
    if (txtFile.status === 200) {  // Makes sure it's found the file.
      allText = txtFile.responseText;
      lines = txtFile.responseText.split("\n"); // Will separate each line into an array
      console.log(allText);
    }
  }
}

/** 
const reader = new FileReader();
reader.onload = function (fileInput) {
    const text = e.target.result;
    const data = csvToArray(text);
    document.write(JSON.stringify(data));
};

reader.readAsText(input);

  */
const myDate = new Date();
console.log(myDate);