// Initialize Firebase
var config = {
    apiKey: "AIzaSyC70DVeDvSbQzbUCTC0GjP2snRhdQ1KxTY",
    authDomain: "train-scheduler-2400.firebaseapp.com",
    databaseURL: "https://train-scheduler-2400.firebaseio.com",
    projectId: "train-scheduler-2400",
    storageBucket: "",
    messagingSenderId: "873103438529"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

	// Grab user input
	var trainName = $("#train-name-input").val().trim();
	var trainDest = $("#destination-input").val().trim();
	// var trainStart = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
	var trainStart = $("#train-time-input").val().trim();
	var trainRate = $("#frequency-input").val().trim();

	// Local temporary object as placeholder for data
	var newTrain = {
		name: trainName,
		destination: trainDest,
		start: trainStart,
		frequency: trainRate
	};
	
	// Upload train data to firebase
	database.ref().push(newTrain);

	// #logit
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.start);
	console.log(newTrain.frequency);

	// a lil alert for you, ma user
	alert("Your train is on the way");

	// Clear text boxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#train-time-input").val("");
	$("#frequency-input").val("");
});

// Adding data to firebase, and display user entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainStart = childSnapshot.val().start;
	var trainRate = childSnapshot.val().frequency;

	console.log(trainName);
	console.log(trainDest);
	console.log(trainStart);
	console.log(trainRate);

	// Making the train start time formated
	// var trainStartPretty = moment.unix(trainStart).format("HH:mm");
	var tryThis = trainStartPretty
	// var trainStartPretty = moment(trainStart).add(trainRate, "minutes");
	var abcde = moment(trainStartPretty).format("HH:mm a");
	
	var timeFormat = "HH:mm";
	
	var convertedTime = moment(trainStart, timeFormat);

	// Solve for minutes until next train
	var trainNext = ;
	var trainMinAway = moment(convertedTime).diff(moment(), "minutes");


	// Adding the train's data to the table
	$("#train-table > tbody").append(
		"<tr><td>"
				+ trainName +
			"</td><td>"
				+ trainDest +
			"</td><td>"
				+ trainRate +
			"</td><td>"
				+ abcde +
			"</td><td>"
				+ trainMinAway +
			"</td></tr>");
});
