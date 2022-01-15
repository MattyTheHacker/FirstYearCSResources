import csv from 'jquery-csv';
var data = $.csv.toObjects("data/y1s2_sa.csv");
const myDate = new Date();


console.log(data);
console.log(myDate);