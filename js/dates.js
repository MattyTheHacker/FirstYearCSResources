function csvToTable(csv, table) {
    var lines = csv.split("\n");
    var headers = lines[0].split(",");
    var table = document.getElementById(table);
    for (var i = 1; i < lines.length; i++) {
        var cells = lines[i].split(",");
        var row = table.insertRow(-1);
        for (var j = 0; j < cells.length; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = cells[j];
        }
    }
}



function loadFile(filePath) {
    var result = null;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filePath, false);
    xmlHttp.send();
    if (xmlHttp.status == 200) {
        result = xmlHttp.responseText;
    }
    return result;
}


function displayDates(year) {
    var data = loadFile("data/key-dates/" + year + ".csv");
    return data;
}



var tables = document.getElementsByTagName("table");
for (var i = 0; i < tables.length; i++) {
    var table = tables[i];
    console.log(table);
    var year = table.id;
    console.log(year);
    if (year) {
        data = displayDates(year);
        console.log(data);
        csvToTable(data, table.id);
    }
}




