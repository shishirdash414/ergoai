/* =========================================================
   ERGOAI — POSTURE ANALYSIS MODULE
========================================================= */


/**
 * Calculate the angle between three points.
 *
 * Example:
 *
 * A
 *  \
 *   B
 *    \
 *     C
 *
 * The angle is measured at B.
 */
export function calculateAngle(
    pointA,
    pointB,
    pointC
) {

    const radians =

        Math.atan2(
            pointC.y - pointB.y,
            pointC.x - pointB.x
        )

        -

        Math.atan2(
            pointA.y - pointB.y,
            pointA.x - pointB.x
        );


    let degrees =
        Math.abs(
            radians * (180 / Math.PI)
        );


    if (degrees > 180) {
        degrees = 360 - degrees;
    }


    return degrees;
}


/**
 * Calculate the midpoint between two landmarks.
 */
export function midpoint(
    pointA,
    pointB
) {

    return {

        x:
            (pointA.x + pointB.x) / 2,

        y:
            (pointA.y + pointB.y) / 2,

        z:
            ((pointA.z || 0) +
             (pointB.z || 0)) / 2

    };

}


/**
 * Calculate distance between two landmarks.
 */
export function distance(
    pointA,
    pointB
) {

    const dx =
        pointA.x - pointB.x;

    const dy =
        pointA.y - pointB.y;

    const dz =
        (pointA.z || 0) -
        (pointB.z || 0);


    return Math.sqrt(
        dx * dx +
        dy * dy +
        dz * dz
    );

}


/**
 * Analyze landmarks.
 *
 * MediaPipe will eventually provide
 * the landmarks array here.
 */
export function analyzePosture(
    landmarks
) {

    if (!landmarks ||
        landmarks.length === 0) {

        return null;

    }


    /*
     * MediaPipe Pose landmark indexes:
     *
     * 0  = nose
     * 11 = left shoulder
     * 12 = right shoulder
     * 23 = left hip
     * 24 = right hip
     */


    const nose =
        landmarks[0];

    const leftShoulder =
        landmarks[11];

    const rightShoulder =
        landmarks[12];

    const leftHip =
        landmarks[23];

    const rightHip =
        landmarks[24];


    if (
        !nose ||
        !leftShoulder ||
        !rightShoulder ||
        !leftHip ||
        !rightHip
    ) {

        return null;

    }


    const shoulderCenter =
        midpoint(
            leftShoulder,
            rightShoulder
        );


    const hipCenter =
        midpoint(
            leftHip,
            rightHip
        );


    return {

        nose,

        leftShoulder,

        rightShoulder,

        leftHip,

        rightHip,

        shoulderCenter,

        hipCenter,

        shoulderWidth:
            distance(
                leftShoulder,
                rightShoulder
            ),

        torsoLength:
            distance(
                shoulderCenter,
                hipCenter
            )

    };

}