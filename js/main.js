const csvFile = "../data/y1s2_sa.csv";


/** 
$.ajax({
    url: 'resources/CS-',
    dataType: 'text',
  }).done(successFunction);

*/

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
txtFile.onreadystatechange = function () {
    if (txtFile.readyState === 4 && txtFile.status == 200) {
        allText = txtFile.responseText;
        lines = txtFile.responseText.split("\n");
        console.log(allText);
        console.log(lines);
    }
}
txtFile.open("GET", csvFile);


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
console.log(txtFile);