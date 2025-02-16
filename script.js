// Alarm Functionality
const alarmSound = document.getElementById("alarm-sound");
let alarmTimeout;

// Visual indicator for ringing alarm
const alarmIndicator = document.createElement("div");
alarmIndicator.id = "alarm-indicator";
alarmIndicator.style.position = "fixed";
alarmIndicator.style.top = "10px";
alarmIndicator.style.left = "50%";
alarmIndicator.style.transform = "translateX(-50%)";
alarmIndicator.style.backgroundColor = "red";
alarmIndicator.style.color = "white";
alarmIndicator.style.padding = "10px 20px";
alarmIndicator.style.borderRadius = "5px";
alarmIndicator.style.zIndex = "1000";
alarmIndicator.style.display = "none"; // Initially hidden
document.body.appendChild(alarmIndicator);

function setAlarm(alarmNumber) {
  const alarmTimeInput = document.getElementById(`alarm-time-${alarmNumber}`);
  const alarmToneSelect = document.getElementById(`alarm-tone-${alarmNumber}`);
  const stopAlarmButton = document.getElementById(`stop-alarm-${alarmNumber}`);

  const alarmTime = alarmTimeInput.value;
  const alarmTone = alarmToneSelect.value;

  if (!alarmTime) {
    alert("Please set a time for the alarm.");
    return;
  }

  const now = new Date();
  const [hours, minutes] = alarmTime.split(":");
  const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  const timeDifference = alarmDate - now;

  if (timeDifference < 0) {
    alert("Please set a time in the future.");
    return;
  }

  // Clear any existing timeout
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
  }

  alarmTimeout = setTimeout(() => {
    alarmSound.src = alarmTone;
    alarmSound.play();
    stopAlarmButton.disabled = false;

    // Show visual indicator
    alarmIndicator.textContent = `Alarm ${alarmNumber} is ringing!`;
    alarmIndicator.style.display = "block";

    // Optional: Add a flashing effect
    let flashInterval = setInterval(() => {
      alarmIndicator.style.backgroundColor = alarmIndicator.style.backgroundColor === "red" ? "orange" : "red";
    }, 500);

    // Stop flashing and hide indicator when alarm is stopped
    stopAlarmButton.addEventListener("click", () => {
      clearInterval(flashInterval);
      alarmIndicator.style.display = "none";
    });
  }, timeDifference);

  alert(`Alarm ${alarmNumber} set for ${alarmTime}`);
}

// Stop Alarm Functionality
function stopAlarm(alarmNumber) {
  const stopAlarmButton = document.getElementById(`stop-alarm-${alarmNumber}`);
  alarmSound.pause();
  alarmSound.currentTime = 0;
  stopAlarmButton.disabled = true;

  // Hide the visual indicator
  alarmIndicator.style.display = "none";
}

// Upload to Google Drive
function uploadToDrive() {
  window.open("https://drive.google.com/drive/folders/1Dazc1w1VqJTvcSDbFzdzdOFnqEUcAMdQ");
}

// Event Listeners for Alarm Buttons
document.getElementById("set-alarm-1").addEventListener("click", () => setAlarm(1));
document.getElementById("stop-alarm-1").addEventListener("click", () => stopAlarm(1));

document.getElementById("set-alarm-2").addEventListener("click", () => setAlarm(2));
document.getElementById("stop-alarm-2").addEventListener("click", () => stopAlarm(2));

document.getElementById("set-alarm-3").addEventListener("click", () => setAlarm(3));
document.getElementById("stop-alarm-3").addEventListener("click", () => stopAlarm(3));