/* =========================================================
   ERGOAI — UI MODULE
========================================================= */


/* =========================================================
   CAMERA UI
========================================================= */

export function setCameraActive(active) {

    const video =
        document.getElementById("cameraVideo");

    const placeholder =
        document.getElementById("cameraPlaceholder");

    const startButton =
        document.getElementById("startButton");

    const stopButton =
        document.getElementById("stopButton");

    const cameraStatus =
        document.getElementById("cameraStatus");


    if (active) {

        video.style.display =
            "block";

        placeholder.style.display =
            "none";

        startButton.style.display =
            "none";

        stopButton.style.display =
            "block";

        cameraStatus.textContent =
            "Camera active";

    }

    else {

        video.style.display =
            "none";

        placeholder.style.display =
            "block";

        startButton.style.display =
            "block";

        stopButton.style.display =
            "none";

        cameraStatus.textContent =
            "Camera inactive";

    }

}


/* =========================================================
   SESSION UI
========================================================= */

export function setSessionActive(active) {

    const indicator =
        document.getElementById(
            "sessionIndicator"
        );


    if (active) {

        indicator.classList.add(
            "active"
        );

    }

    else {

        indicator.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   SCORE UI
========================================================= */

export function updateScore(
    score,
    status,
    description
) {

    const scoreValue =
        document.getElementById(
            "scoreValue"
        );

    const scoreStatus =
        document.getElementById(
            "scoreStatus"
        );

    const scoreDescription =
        document.getElementById(
            "scoreDescription"
        );


    scoreValue.textContent =
        score;


    scoreStatus.textContent =
        status;


    scoreDescription.textContent =
        description;

}


/* =========================================================
   COACH MESSAGE
========================================================= */

export function updateCoachMessage(
    message
) {

    const element =
        document.getElementById(
            "coachMessage"
        );


    element.textContent =
        message;

}


/* =========================================================
   CAMERA ERROR
========================================================= */

export function showCameraError(
    message
) {

    const cameraStatus =
        document.getElementById(
            "cameraStatus"
        );

    const coachMessage =
        document.getElementById(
            "coachMessage"
        );


    cameraStatus.textContent =
        "Camera unavailable";


    coachMessage.textContent =
        message;

}


/* =========================================================
   TIMER
========================================================= */

export function updateSessionTime(
    milliseconds
) {

    const sessionTime =
        document.getElementById(
            "sessionTime"
        );


    const totalSeconds =
        Math.floor(
            milliseconds / 1000
        );


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


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
   RESET UI
========================================================= */

export function resetAnalysisUI() {

    updateScore(
        "—",
        "Waiting",
        "Start a session to calculate your posture score."
    );


    updateCoachMessage(
        "Start your session and I'll give you real-time ergonomic feedback."
    );


    const metrics = [
        "headState",
        "shoulderState",
        "backState",
        "sittingState"
    ];


    metrics.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                "Waiting";
        }

    });


    const bars = [
        "headBar",
        "shoulderBar",
        "backBar",
        "sittingBar"
    ];


    bars.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.style.width =
                "0%";
        }

    });

}