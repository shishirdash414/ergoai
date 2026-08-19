/* =========================================================
   ERGOAI — CAMERA MODULE
========================================================= */

let cameraStream = null;


/**
 * Start the user's webcam.
 */
export async function startCamera(videoElement) {

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        throw new Error(
            "Camera access is not supported by this browser."
        );

    }


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


    videoElement.srcObject =
        cameraStream;


    await videoElement.play();


    return cameraStream;
}


/**
 * Stop the webcam.
 */
export function stopCamera() {

    if (!cameraStream) {
        return;
    }


    cameraStream
        .getTracks()
        .forEach(track => track.stop());


    cameraStream = null;
}


export function isCameraActive() {

    return cameraStream !== null;

}