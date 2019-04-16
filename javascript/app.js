// Initialize Firebase
var config = {
  apiKey: "AIzaSyARI6VryRz6EEBYTcc14Su3j1j7HESx7kg",
  authDomain: "train-schedule-b5413.firebaseapp.com",
  databaseURL: "https://train-schedule-b5413.firebaseio.com",
  projectId: "train-schedule-b5413",
  storageBucket: "train-schedule-b5413.appspot.com",
  messagingSenderId: "546011224035"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var role = "";
var start = "";
var rate = "";

$(".btn").on("click", function(event) {
  event.preventDefault();
  name = $("#employee-name").val();
  role = $("#role").val();
  start = $("#start-date").val();
  rate = $("#monthly-rate").val();

  database.ref().push({
    name: name,
    role: role,
    start: start,
    rate: rate
  });
});

database.ref().on("child_added", function(snapshot) {
  var newTr = snapshot.val();
  console.log(snapshot.val());
  $("table").append(makeRow(newTr));
});

function makeRow(data) {
  return `
    <tbody>
    <tr>
      <td>${data.name}</td>
      <td>${data.role}</td>
      <td>${data.start}</td>
      <td>${data.monthsWorked}</td>
      <td>${data.rate}</td>
      <td>${data.totalBilled}</td>
    </tr>
  </tbody>
    `;
}
