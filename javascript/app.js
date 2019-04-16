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
var destination = "";
var ftime = "";
var frequency = "";

$(".btn").on("click", function(event) {
  event.preventDefault();
  name = $("#train-name").val();
  destination = $("#destination").val();
  ftime = moment($("#ftime").val().trim(), "HH:mm").subtract(10, "years").format("X");
  frequency = $("#frequency").val();

  database.ref().push({
    name: name,
    destination: destination,
    frequency: frequency,
    ftime: ftime
  });
});

database.ref().on("child_added", function(childSnapshot) {
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var ftime = childSnapshot.val().ftime;

  var timeRemainder = moment().diff(moment.unix(ftime), "minutes") % frequency;
  var minutesAway = frequency - timeRemainder;
  var nextTrainArrival = moment().add(minutesAway, "m").format("hh:mm A");

  //console.log(snapshot.val());
  var newTr = {
    name : name,
    destination : destination,
    frequency : frequency,
    nextTrainArrival : nextTrainArrival,
    minutesAway : minutesAway
  };

  $("table").append(makeRow(newTr));
});

function makeRow(data) {
  return `
    <tbody>
    <tr>
      <td>${data.name}</td>
      <td>${data.destination}</td>
      <td>${data.frequency}</td>
      <td>${data.nextTrainArrival}</td>
      <td>${data.minutesAway}</td>
    </tr>
  </tbody>
    `;
}
