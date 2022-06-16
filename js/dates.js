const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatShortDate(dateObject) {
    const parts = {
        date: dateObject.getDate().toString().padStart(2, "0"),
        month: (dateObject.getMonth() + 1).toString().padStart(2, "0"),
        year: dateObject.getFullYear(),
    };
    return `${parts.date}/${parts.month}/${parts.year}`;
}

function formatTextDate(dateObject) {
    const parts = {
        day: weekday[dateObject.getDay()],
        date: dateObject.getDate().toString(),
        month: monthNames[dateObject.getMonth()],
        year: dateObject.getFullYear(),
    };
    return `${parts.day} ${parts.date} ${parts.month} ${parts.year}`;
}

function csvToTable(csv, table) {
    var lines = csv.split("\n");
    var headers = lines[0].split(",");
    var table = document.getElementById(table);
    var header = table.createTHead();
    var hrow = header.insertRow(0);
    for (var i = 0; i < headers.length; i++) {
        var hrcell = hrow.insertCell(-1);
        hrcell.innerHTML = '<strong>' + headers[i] + '</strong>';
    }
    hrow.insertCell(-1).innerHTML = '<strong>Date DD/MM/YYYY</strong>';
    hrow.insertCell(-1).innerHTML = '<strong>Day</strong>';
    var body = table.createTBody();
    console.log(lines);
    for (var i = 1; i < lines.length; i++) {
        lines[i] = lines[i] + "," + formatShortDate(new Date(lines[i].split(",")[1])) + "," + formatTextDate(new Date(lines[i].split(",")[1]));
    }
    for (var i = 1; i < lines.length; i++) {
        var cells = lines[i].split(",");
        var row = body.insertRow(-1);
        for (var j = 0; j < cells.length; j++) {
            if (j != 1) {
            var cell = row.insertCell(-1);
            cell.innerHTML = cells[j];
            }
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
    var year = table.id;
    if (year) {
        data = displayDates(year);
        csvToTable(data, year);
    }
}




