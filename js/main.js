const y1s2_assessment_data = "data/y1s2_sa.csv";

function loadFile(filePath) {
  var result = null;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", filePath, false);
  xmlHttp.send();
  if (xmlHttp.status==200) {
    result = xmlHttp.responseText.split("\n");
  }
  return result;
}

const myDate = new Date();
console.log(loadFile(y1s2_assessment_data));
console.log(myDate);