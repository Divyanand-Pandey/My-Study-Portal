
document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById('objectiveTable').getElementsByTagName('tbody')[0];
    const addRowButton = document.getElementById('addRowButton');
    const saveRowButton = document.getElementById('saveRowButton');
    const modal = document.getElementById('timeEntryModal');
    const span = document.getElementsByClassName("close")[0];
    const objectiveInput = document.getElementById('objective');
    const LOCAL_STORAGE_KEY = 'objectiveTableRows';
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;
    modal.style.display = "none";
    objectiveInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            saveNewRow();
        }
    });
    
    

    function loadSavedRows() {
        const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        const savedTime = localStorage.getItem('savedTime');
        const currentTime = new Date().getTime();

        if (savedData && (currentTime - savedTime) < ONE_DAY_MS) {
            savedData.forEach(row => {
                const newRow = table.insertRow();
                newRow.insertCell(0).innerText = row.time;
                newRow.insertCell(1).innerText = row.objective;
            });
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            localStorage.removeItem('savedTime');
        }
    }

    function addNewRow() {
        setInitialTime();
        modal.style.display = "block";
    }

    function formatTimeWithLeadingZeros(hours, minutes) {
        const formattedHours = ('0' + hours).slice(-2);
        const formattedMinutes = ('0' + minutes).slice(-2);
        return `${formattedHours}:${formattedMinutes}`;
    }
    
    function setInitialTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
    
        // Round minutes up to the nearest 15 minutes
        minutes = Math.ceil(minutes / 15) * 15;
    
        // If minutes are 60, increment the hour and reset minutes to 0
        if (minutes === 60) {
            hours += 1;
            minutes = 0;
        }
    
        // Convert hours to 12-hour format and determine AM/PM
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesStr = ('0' + minutes).slice(-2);
    
        // Set values in the form
        document.getElementById('startHour').value = hours;
        document.getElementById('startMinute').value = minutesStr;
        document.getElementById('startAmPm').value = ampm;
    
        // Set default end time to 15 minutes after the start time
        let endHours = hours;
        let endMinutes = minutes + 15;
    
        if (endMinutes >= 60) {
            endMinutes -= 60;
            endHours += 1;
        }
    
        endHours = endHours % 12;
        endHours = endHours ? endHours : 12;
        const endMinutesStr = ('0' + endMinutes).slice(-2);
    
        document.getElementById('endHour').value = endHours;
        document.getElementById('endMinute').value = endMinutesStr;
        document.getElementById('endAmPm').value = 'PM'; // Always PM
    }
    
    function saveNewRow() {
        const startHour = document.getElementById('startHour').value;
        const startMinute = document.getElementById('startMinute').value;
        const startAmPm = document.getElementById('startAmPm').value;
        const endHour = document.getElementById('endHour').value;
        const endMinute = document.getElementById('endMinute').value;
        const objective = document.getElementById('objective').value;
    
        const startTime = `${('0' + startHour).slice(-2)}:${startMinute} ${startAmPm}`;
        const endTime = `${('0' + endHour).slice(-2)}:${endMinute} PM`;
        const timeRange = `${startTime} - ${endTime}`;
    
        if (objective) {
            const newRow = table.insertRow();
            newRow.insertCell(0).innerText = timeRange;
            newRow.insertCell(1).innerText = objective;
    
            saveRow({ time: timeRange, objective });
    
            // Hide the form after saving
            modal.style.display = "none";
        }
    }
    

    function saveRow(row) {
        const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        savedData.push(row);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedData));
        localStorage.setItem('savedTime', new Date().getTime());
    }

    // When the user clicks the button, open the modal 
    addRowButton.onclick = function() {
        addNewRow();
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    saveRowButton.addEventListener('click', saveNewRow);
    loadSavedRows();
});

// -------------------------------------------------------------------------------------------------------

function highlightCurrentTimeRow() {
    var currentTime = new Date();
    var currentMinutesSinceMidnight = currentTime.getHours() * 60 + currentTime.getMinutes();
    console.log("Current Time:", currentTime);
    console.log("Current Minutes Since Midnight:", currentMinutesSinceMidnight);

    var tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(function (row) {
        row.style.backgroundColor = '';
        row.style.fontWeight = 'normal';
        row.style.color = '#ddd';
        row.style.fontSize = 'initial';
    });

    tableRows.forEach(function (row) {
        var timeRangeCell = row.cells[0];
        var timeRangeText = timeRangeCell.innerText;
        console.log("Time Range Text:", timeRangeText);

        // Assuming time range is in the format "HH:MM AM/PM - HH:MM AM/PM"
        var timeRangeParts = timeRangeText.split(' - ');
        if (timeRangeParts.length === 2) {
            var startTimeText = timeRangeParts[0];
            var endTimeText = timeRangeParts[1];
            console.log("Start Time Text:", startTimeText);
            console.log("End Time Text:", endTimeText);

            var startTime = parseTime(startTimeText);
            var endTime = parseTime(endTimeText);
            console.log("Parsed Start Time:", startTime);
            console.log("Parsed End Time:", endTime);

            var startMinutesSinceMidnight = startTime.hours * 60 + startTime.minutes;
            var endMinutesSinceMidnight = endTime.hours * 60 + endTime.minutes;
            console.log("Start Minutes Since Midnight:", startMinutesSinceMidnight);
            console.log("End Minutes Since Midnight:", endMinutesSinceMidnight);

            if (currentMinutesSinceMidnight >= startMinutesSinceMidnight && currentMinutesSinceMidnight < endMinutesSinceMidnight) {
                row.style.backgroundColor = 'rgb(255 247 0)';
                row.style.fontWeight = 'bold';
                row.style.color = '#000000';
                row.style.fontSize = '17px';
                console.log("Highlighted Row:", row);
            }
        }
    });

    function parseTime(timeText) {
        var timeParts = timeText.match(/(\d+):(\d+)\s*(AM|PM)/);
        if (timeParts) {
            var hours = parseInt(timeParts[1], 10);
            var minutes = parseInt(timeParts[2], 10);
            var ampm = timeParts[3];

            if (ampm === 'PM' && hours < 12) {
                hours += 12;
            } else if (ampm === 'AM' && hours === 12) {
                hours = 0;
            }

            return { hours: hours, minutes: minutes };
        }
        return null;
    }
}


window.onload = highlightCurrentTimeRow;
setInterval(highlightCurrentTimeRow, 1000);

document.addEventListener("DOMContentLoaded", function() {
    const ONE_MINUTE_MS = 60 * 1000;
    requestNotificationPermission();

    function requestNotificationPermission() {
        if (Notification.permission === "default") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("Notification permission granted.");
                } else if (permission === "denied") {
                    alert("Please enable notifications in your browser settings to receive task alerts.");
                }
            });
        } else if (Notification.permission === "denied") {
            alert("Notifications are blocked. Please enable them in your browser settings.");
        }
    }

    function showNotification(title, message) {
        if (Notification.permission === "granted") {
            new Notification(title, { body: message });
            playNotificationSound();
        }
    }

    function playNotificationSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz is the standard A note
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Set volume to 50%

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1); // Play sound for 1 second
    }

    function parseTime(timeText) {
        const [time, modifier] = timeText.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (modifier === 'PM' && hours < 12) {
            hours += 12;
        }
        if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }

        return { hours, minutes };
    }

    function checkObjectives() {
        const currentTime = new Date();
        const currentMinutesSinceMidnight = currentTime.getHours() * 60 + currentTime.getMinutes();
        
        const tableRows = document.querySelectorAll('tbody tr');

        tableRows.forEach(row => {
            const timeRangeCell = row.cells[0].innerText;
            const [startTime, endTime] = timeRangeCell.split(' - ').map(parseTime);
            
            const endMinutesSinceMidnight = endTime.hours * 60 + endTime.minutes;

            if (currentMinutesSinceMidnight < endMinutesSinceMidnight) {
                const minutesLeft = endMinutesSinceMidnight - currentMinutesSinceMidnight;
                showNotification('Task Ending Soon', `Your task "${row.cells[1].innerText}" will end in ${minutesLeft} minutes.`);
            } else if (currentMinutesSinceMidnight === endMinutesSinceMidnight) {
                showNotification('Task Ended', `Your task "${row.cells[1].innerText}" has ended.`);
            }
        });
    }

    setInterval(checkObjectives, ONE_MINUTE_MS); // Check every minute
    checkObjectives(); // Initial check when the page loads
});



