const y1s2_assessment_data = "data/y1s2_sa.csv";
const y2s1_assessment_data = "data/y2s1_sa.csv";
const myDate = new Date();

/**
 * 
 * @param {HTMLTableElement} table table to sort
 * @param {number} column index of the column to sort by
 * @param {boolean} asc true if ascending, false if descending
 */
function sortTableByColumn(table, column, asc = true) {
  const dirMod = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));
  const sortedRows = rows.sort((a, b) => {
    const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
    const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
    return aColText > bColText ? (1 * dirMod) : (-1 * dirMod);
  });
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }
  tBody.append(...sortedRows);
  table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}


/**
 * 
 * @param {Date} dateObject 
 * @returns Date/Time String
 */
function formatDate(dateObject) {
  const parts = {
    date: dateObject.getDate().toString().padStart(2, "0"),
    month: (dateObject.getMonth() + 1).toString().padStart(2, "0"),
    year: dateObject.getFullYear(),
    hour: dateObject.getHours().toString().padStart(2, "0"),
    minute: dateObject.getMinutes().toString().padStart(2, "0")
  };
  return `${parts.date}/${parts.month}/${parts.year}\n${parts.hour}:${parts.minute}`;
}

/**
 * 
 * @param {Array} s 
 */
function buildTable(s, divid) {
  var cols = [];
  for (var k in s) {
    for (var c in s[k]) {
      if (cols.indexOf(c) === -1) cols.push(c);
    }
  }
  var html = '<table class="tftable"><thead><tr>' +
    cols.map(function (c) { return '<th>' + c + '</th>' }).join('') + '</tr></thead><tbody>';
  for (var l in s) {
    html += '<tr>' + cols.map(function (c) { return '<td>' + (s[l][c] || '') + '</td>' }).join('') + '</tr>';
  }
  html += '</tbody></table>';

  document.getElementById(divid).innerHTML += html;
}

/**
 * 
 * @param {string} str 
 * @param {string} delimiter 
 * @returns array
 */
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
  arr.forEach(function (element) {
    element['Weight'] = ((Math.round((element['Weight'] * 100).toFixed(2)).toString()) + "%")

    element['Released'] = (new Date(element['Released']));
    element['Due'] = (new Date(element['Due']));

    if (!(new Date(element['Marking Deadline']) == "Invalid Date")) {
      element['Marking Deadline'] = (formatDate(new Date(element['Marking Deadline'])));
    }

    if (element['Released'] == "Invalid Date" || element['Due'] == "Invalid Date") {
      element.Status = "Unknown";
      if (element['Released'] == "Invalid Date") {
        element['Released'] = "Unknown";
      }
      if (element['Due'] == "Invalid Date") {
        element['Due'] = "Unknown";
      }
    } else {
      currentTime = myDate.getTime();
      releaseTime = element['Released'].getTime();
      dueTime = element['Due'].getTime();

      element['Released'] = formatDate(element['Released']);
      element['Due'] = formatDate(element['Due']);

      if (currentTime < releaseTime) {
        element.Status = "Not Released";
      } if (currentTime > releaseTime && currentTime < dueTime) {
        element.Status = "Open";
      } if (currentTime > dueTime) {
        element.Status = "Closed";
      }
    }
  })
  return arr;
}

/**
 * 
 * @param {string} filePath 
 * @returns array
 */
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

y1s2_data = loadFile(y1s2_assessment_data);
buildTable(y1s2_data, "y1s2-table");

y2s1_data = loadFile(y2s1_assessment_data);
buildTable(y2s1_data, "y2s1-table");

document.querySelectorAll("table th").forEach(headerCell => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
    const currentIsAsc = headerCell.classList.contains("th-sort-asc");
    sortTableByColumn(tableElement, headerIndex, !currentIsAsc);
  });
});