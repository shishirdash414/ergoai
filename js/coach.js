/* =========================================================
   ERGOAI — LIVE COACH
========================================================= */

const startButton =
    document.getElementById("startButton");

const stopButton =
    document.getElementById("stopButton");

const cameraVideo =
    document.getElementById("cameraVideo");

const cameraPlaceholder =
    document.getElementById("cameraPlaceholder");

const cameraStatus =
    document.getElementById("cameraStatus");

const sessionTime =
    document.getElementById("sessionTime");

const sessionIndicator =
    document.getElementById("sessionIndicator");

const scoreValue =
    document.getElementById("scoreValue");

const scoreStatus =
    document.getElementById("scoreStatus");

const scoreDescription =
    document.getElementById("scoreDescription");

const coachMessage =
    document.getElementById("coachMessage");


let cameraStream = null;

let sessionStartTime = null;

let timerInterval = null;


/* =========================================================
   START SESSION
========================================================= */

async function startSession() {

    try {

        cameraStatus.textContent =
            "Requesting camera...";


        cameraStream =
            await navigator.mediaDevices.getUserMedia({

                video: {
                    facingMode: "user",
                    width: {
                        ideal: 1280
                    },
                    height: {
                        ideal: 720
                    }
                },

                audio: false

            });


        cameraVideo.srcObject =
            cameraStream;


        cameraVideo.style.display =
            "block";


        cameraPlaceholder.style.display =
            "none";


        startButton.style.display =
            "none";


        stopButton.style.display =
            "block";


        cameraStatus.textContent =
            "Camera active";


        sessionIndicator.classList.add(
            "active"
        );


        sessionStartTime =
            Date.now();


        timerInterval =
            setInterval(updateTimer, 1000);


        scoreStatus.textContent =
            "Analyzing";


        scoreDescription.textContent =
            "Preparing your posture analysis...";


        coachMessage.textContent =
            "I'm watching your posture. Sit naturally and keep your whole upper body visible.";

    }

    catch (error) {

        console.error(
            "Camera error:",
            error
        );


        cameraStatus.textContent =
            "Camera unavailable";


        coachMessage.textContent =
            "Camera access was not available. Please allow camera permission and try again.";

    }

}


/* =========================================================
   STOP SESSION
========================================================= */

function stopSession() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track => track.stop());

        cameraStream = null;

    }


    cameraVideo.srcObject = null;

    cameraVideo.style.display =
        "none";


    cameraPlaceholder.style.display =
        "block";


    startButton.style.display =
        "block";


    stopButton.style.display =
        "none";


    cameraStatus.textContent =
        "Camera inactive";


    sessionIndicator.classList.remove(
        "active"
    );


    clearInterval(timerInterval);

    timerInterval = null;

    sessionStartTime = null;


    sessionTime.textContent =
        "00:00:00";


    scoreValue.textContent =
        "—";


    scoreStatus.textContent =
        "Waiting";


    scoreDescription.textContent =
        "Start a session to calculate your posture score.";


    coachMessage.textContent =
        "Start your session and I'll give you real-time ergonomic feedback.";

}


/* =========================================================
   SESSION TIMER
========================================================= */

function updateTimer() {

    if (!sessionStartTime) {
        return;
    }


    const elapsed =
        Date.now() - sessionStartTime;


    const totalSeconds =
        Math.floor(elapsed / 1000);


    const hours =
        Math.floor(totalSeconds / 3600);


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    sessionTime.textContent =

        `${String(hours).padStart(2, "0")}:` +

        `${String(minutes).padStart(2, "0")}:` +

        `${String(seconds).padStart(2, "0")}`;

}


/* =========================================================
   EVENTS
========================================================= */

startButton.addEventListener(
    "click",
    startSession
);


stopButton.addEventListener(
    "click",
    stopSession
);


/* =========================================================
   PAGE CLEANUP
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (cameraStream) {

            cameraStream
                .getTracks()
                .forEach(track => track.stop());

        }

    }
);