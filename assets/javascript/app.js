// Initialize Firebase
  const config = {
    apiKey: "AIzaSyDHGTecMhelo67czMg1uyTeTRFsdrrwmtk",
    authDomain: "trainscheduler-c1119.firebaseapp.com",
    databaseURL: "https://trainscheduler-c1119.firebaseio.com",
    projectId: "trainscheduler-c1119",
    storageBucket: "trainscheduler-c1119.appspot.com",
    messagingSenderId: "374424192686"
  };
  firebase.initializeApp(config);

const dbRef = firebase.database().ref();

// 2. Button for adding Trains
$("#addTrain").click(function(event) {
  
  
  event.preventDefault();

 
  const newTrain = {
    name: $("#tName").val().trim(),
    dest: $("#tDest").val().trim(),
    first: moment($("#tFirst").val().trim(), "HH:mm").format("X"),
    frequency: moment($("#tFreq").val().trim(), "mm").format("X"),
    
  };

 
  dbRef.push(newTrain);

  // Logs everything to console (as an object)
  console.log(newTrain);
  
  // Alert
  alert("Train successfully added");
  resetInputs();
  
});


dbRef.on("child_added", function(childSnapshot, prevChildKey) {


  const newTrain = childSnapshot.val();
  console.log(newTrain);
  


  const firstTimeConverted = moment(first, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);


  const currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


  const diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);


  var tRemainder = diffTime % frequency;
  console.log(tRemainder);


  newTrain.mAway = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + newtrain.mAway);


  newTrain.next = moment().add(train.mAway, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  $("tbody").append(createTrainRow(newTrain));
});

function createTrainRow(train) {
  const trow = $('<tr>');
  trow.append(`<td>${train.name}</td>`)
      .append(`<td>${train.dest}</td>`)
      .append(`<td>${train.freq}</td>`)
      .append(`<td>${train.next}</td>`)
      .append(`<td>${train.mAway}</td>`)
      

  return trow;
}

function resetInputs() {
 
  $("form input:not([submit])").val('');
  $("#tname").focus();
}


