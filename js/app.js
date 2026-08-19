/* =========================================================
   ERGOAI — APPLICATION CONTROLLER
========================================================= */

import {
    startCamera,
    stopCamera
} from "./camera.js";


import {
    setCameraActive,
    setSessionActive,
    showCameraError,
    updateCoachMessage,
    updateSessionTime,
    resetAnalysisUI
} from "./ui.js";


/* =========================================================
   ELEMENTS
========================================================= */

const startButton =
    document.getElementById(
        "startButton"
    );


const stopButton =
    document.getElementById(
        "stopButton"
    );


const cameraVideo =
    document.getElementById(
        "cameraVideo"
    );


/* =========================================================
   SESSION STATE
========================================================= */

let sessionStartTime = null;

let timerInterval = null;


/* =========================================================
   START SESSION
========================================================= */

async function startSession() {

    try {

        updateCoachMessage(
            "Starting your camera..."
        );


        await startCamera(
            cameraVideo
        );


        setCameraActive(true);

        setSessionActive(true);


        sessionStartTime =
            Date.now();


        timerInterval =
            setInterval(
                updateTimer,
                1000
            );


        updateCoachMessage(
            "Camera connected. Keep your whole upper body visible while we prepare posture detection."
        );

    }

    catch (error) {

        console.error(
            "Camera error:",
            error
        );


        showCameraError(
            "Camera access was not available. Please allow camera permission and try again."
        );

    }

}


/* =========================================================
   STOP SESSION
========================================================= */

function stopSession() {

    stopCamera();


    setCameraActive(false);

    setSessionActive(false);


    clearInterval(
        timerInterval
    );


    timerInterval =
        null;


    sessionStartTime =
        null;


    updateSessionTime(0);


    resetAnalysisUI();

}


/* =========================================================
   TIMER
========================================================= */

function updateTimer() {

    if (!sessionStartTime) {
        return;
    }


    const elapsed =
        Date.now() -
        sessionStartTime;


    updateSessionTime(
        elapsed
    );

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
   CLEANUP
========================================================= */

window.addEventListener(
    "beforeunload",
    stopCamera
);