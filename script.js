
function updateGreeting() {
  var currentHour = new Date().getHours();
  var greeting;
  if (currentHour < 12) {
    greeting = "...........Good morning!";
    speak(greeting, ".............Welcome DivyCoder Let us start study. What is the plan for today? ")
  } else if (currentHour < 18) {
    greeting = ".....Good afternoon!";
    speak(greeting)
  } else {
    greeting = "......Good evening!";
    speak(greeting)
  }
  speak("DivyCoder !!!")
  // document.getElementById("greeting").innerText = greeting + " DivyCoder !!!";
}

// updateGreeting()

function updateDate() {
  var currentDate = new Date();
  var dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });
  var day = currentDate.getDate();
  var month = currentDate.toLocaleString('default', { month: 'long' });
  var time = currentDate.toLocaleTimeString();
  document.getElementById('date').innerText =
    dayOfWeek + ', ' + day + ' ' + month + ', ' + time.toUpperCase();
}

function updateCountdown() {
  var targetDate = new Date("15 January 2025");
  var currentDate = new Date();

  var timeDiff = Math.abs(targetDate.getTime() - currentDate.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  document.getElementById("countdown").innerText =
    "Day's left: " + diffDays;

  var hoursLeftToday = 23 - currentDate.getHours();
  var minutesLeftToday = 59 - currentDate.getMinutes();
  var secondsLeftToday = 59 - currentDate.getSeconds();
  document.getElementById("hoursLeft").innerText =
    "Hours left : " + hoursLeftToday + "h " + minutesLeftToday + "m " + secondsLeftToday + "s";
}

function updateScheduleForSunday() {
  var currentDate = new Date();
  var dayOfWeek = currentDate.getDay();

  if (dayOfWeek === 0) {
    var tbody = document.querySelector('tbody');
    tbody.innerHTML = '';


    var timeSlots = [
      { time: '12:00 AM - 03:00 PM', objective: 'MATHEMATICS BACKLOG !' },
      { time: '04:00 PM - 06:00 PM', objective: 'PHYSICS BACKLOG !' },
      { time: '07:00 PM - 09:00 PM', objective: 'EXTRA LECTURE IF ANY ! (ELSE CHEMISTRY BACKLOG)' }
    ];

    timeSlots.forEach(function (slot) {
      var row = tbody.insertRow();
      var cellTime = row.insertCell(0);
      var cellObjective = row.insertCell(1);
      cellTime.innerText = slot.time;
      cellObjective.innerText = slot.objective;
    });
  }
}

updateScheduleForSunday();

// --------------------------------------------------------------------
function testPlanner() {
  const dateStrings = ["21/07", "04/08", "14/08", "01/09", "15/09", "29/09", "13/10", "27/10", "10/11", "24/11", "08/12", "22/12", "05/01", "19/01", "16/02", "02/03", "16/03", "23/03", "30/03", "20/04", "04/05", "11/04", "18/05"];

  // Get the current date
  const currentDate = new Date();

  // Loop through the dates and compare with the current date
  for (const dateString of dateStrings) {
    const [day, month] = dateString.split("/");
    const date = new Date(currentDate.getFullYear(), month - 1, day); // Month is 0-indexed

    if (date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate()) {
      // Perform actions based on the matching date
      var tbody = document.querySelector('tbody');
      tbody.innerHTML = '';
      var test = document.getElementById('test');
      test.style.backgroundColor = '#3be33b';
      test.style.fontWeight = 'bold';
      test.style.translate = '-137% 18%';
      document.getElementById('countdown').style.display = 'none';
      document.getElementById('hoursLeft').style.display = 'none';
      document.getElementById('liveClassLink').style.backgroundColor = '#30b8b8';
      document.getElementById('liveClassLink').style.color = 'black';
      test.addEventListener('mouseover', (event) => {
        test.style.backgroundColor = '#fff';
      });

      test.addEventListener('mouseout', (event) => {
        test.style.backgroundColor = '#3be33b';
      });


      var timeSlots = [
        { time: '10:00 AM - 01:00 PM', objective: 'Test Time ! (3 Hours)' },
        { time: '03:00 PM - 06:00 PM', objective: 'Do Incorrect & Skipped Ques of Last Test !' },
        { time: '07:00 PM - 09:00 PM', objective: 'Revise Topics in which marks deducted !' }
      ];

      timeSlots.forEach(function (slot) {
        var row = tbody.insertRow();
        var cellTime = row.insertCell(0);
        var cellObjective = row.insertCell(1);
        cellTime.innerText = slot.time;
        cellObjective.innerText = slot.objective;

      });
    }

  }

  // If no match is found
  if (dateStrings.every(dateString => {
    const [day, month] = dateString.split("/");
    const date = new Date(currentDate.getFullYear(), month - 1, day);
    return date.getMonth() !== currentDate.getMonth() || date.getDate() !== currentDate.getDate();
  })) {
    console.log("No special action for today.");
  }

}

testPlanner();

function speak(text) {
  if ("speechSynthesis" in window) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US"; // Set the language (optional)
    speechSynthesis.speak(msg);
  } else {
    console.error("Text-to-speech is not supported in this browser.");
  }
}

// function highlightCurrentTimeRow() {
//   var currentTime = new Date();
//   var currentMinutesSinceMidnight = currentTime.getHours() * 60 + currentTime.getMinutes();
//   var dayOfWeek = currentTime.getDay();

//   var tableRows = document.querySelectorAll('tbody tr');
//   tableRows.forEach(function (row) {
//     row.style.backgroundColor = '';
//     row.style.fontWeight = 'normal';
//     row.style.color = '#ddd';
//   });

//   var timeRanges;

//   if (dayOfWeek === 0) {

//     timeRanges = [
//       { start: 12 * 60, end: 15 * 60, row: 1 },
//       { start: 16 * 60, end: 18 * 60, row: 2 },
//       { start: 19 * 60, end: 21 * 60, row: 3 }
//     ];

//   } else {

//     timeRanges = [
//       { start: 6 * 60, end: 8 * 60, row: 1 },
//       { start: 9 * 60, end: 11 * 60, row: 2 },
//       { start: 11 * 60 + 30, end: 13 * 60 + 30, row: 3 },
//       { start: 14 * 60, end: 16 * 60 + 30, row: 4 },
//       { start: 16 * 60 + 30, end: 17 * 60 + 15, row: 5 },
//       { start: 17 * 60 + 30, end: 18 * 60 + 30, row: 6 },
//       { start: 18 * 60 + 30, end: 19 * 60, row: 7 },
//       { start: 19 * 60, end: 19 * 60 + 45, row: 8 },
//       { start: 20 * 60, end: 20 * 60 + 30, row: 9 },
//       { start: 20 * 60 + 30, end: 21 * 60, row: 10 },
//       { start: 22 * 60, end: (24 * 60) - 1, row: 11 }
//     ];
//   }
//   for (var i = 0; i < timeRanges.length; i++) {
//     if (currentMinutesSinceMidnight >= timeRanges[i].start && currentMinutesSinceMidnight < timeRanges[i].end) {
//       var targetRow = tableRows[timeRanges[i].row - 1];
//       targetRow.style.backgroundColor = 'rgb(255 247 0)'; // Adjusted index by -1
//       targetRow.style.fontWeight = 'bold';
//       targetRow.style.color = '#000000';
//       targetRow.style.fontSize = '17px';
//       break;
//     }
//   }
// }

setInterval(updateDate, 1000);
setInterval(updateCountdown, 1000);


var popup = document.getElementById('imagePopup');
var overlay = document.querySelector('.popup-overlay');

const closeButton = document.getElementById('closePopup');
closeButton.addEventListener('click', () => {
  popup.style.display = 'none';
  
});

overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    popup.style.display = 'none';
  }
});

// -----------------------------------------------------------------------------------------------------------
