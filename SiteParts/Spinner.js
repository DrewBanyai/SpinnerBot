class Spinner {
    constructor() {
        this.content = this.generateContent()
        this.theWheel = null
        this.wheelSpinning = false
        this.wheelPower = 0
        this.createWheel()
    }

    generateContent() {
        return document.createElement('div')
    }

    createWheel() {
        if (!SETTINGS) { console.error("No SETTINGS structure accessible. Try again."); return; }
        if (!SETTINGS.hasOwnProperty("WHEEL_SIDES")) { console.error("No WHEEL_SIDES value. Try again."); return; }
        if (!SETTINGS.hasOwnProperty("WHEEL_BACKGROUND")) { console.error("No WHEEL_BACKGROUND value. Try again."); return; }
        if (!SETTINGS.hasOwnProperty("WHEEL_PORTIONS")) { console.error("No WHEEL_PORTIONS value. Try again."); return; }

        // Create new wheel object specifying the parameters at creation time.
        this.theWheel = new Winwheel({
            'numSegments'       : SETTINGS["WHEEL_SIDES"],                 // Specify number of segments.
            'outerRadius'       : 200,               // Set outer radius so wheel fits inside the background.
            'drawText'          : true,              // Code drawn text can be used with segment images.
            'textFontSize'      : 16,
            'textOrientation'   : 'curved',
            'textAlignment'     : 'inner',
            'textMargin'        : 90,
            'textFontFamily'    : 'monospace',
            'textStrokeStyle'   : 'black',
            'textLineWidth'     : 3,
            'textFillStyle'     : 'white',
            'drawMode'          : 'segmentImage',    // Must be segmentImage to draw wheel using one image per segemnt.
            'segments'          :  SETTINGS["WHEEL_PORTIONS"],  // Define segments including image and text.
            'animation' :           // Specify the animation to use.
            {
                'type'     : 'spinToStop',
                'duration' : 5,     // Duration in seconds.
                'spins'    : 8,     // Number of complete spins.
                'callbackFinished' : (segmentID) => { this.alertPrize(segmentID) }
            }
        });

    }

    // -------------------------------------------------------
    // Function to handle the onClick on the power buttons.
    // -------------------------------------------------------
    powerSelected(powerLevel)
    {
        // Ensure that power can't be changed while wheel is spinning.
        if (this.wheelSpinning == false) {
            // Set wheelPower var used when spin button is clicked.
            this.wheelPower = powerLevel
        }
    }

    // -------------------------------------------------------
    // Click handler for spin button.
    // -------------------------------------------------------
    startSpin()
    {
        // Ensure that spinning can't be clicked again while already running.
        if (this.wheelSpinning == false) {
            // Based on the power level selected adjust the number of spins for the wheel, the more times is has
            // to rotate with the duration of the animation the quicker the wheel spins.
            let spinsPerPowerLevel = { 1: 3, 2: 8, 3: 15 }
            this.theWheel.animation.spins = spinsPerPowerLevel[this.wheelPower]

            // Begin the spin animation by calling startAnimation on the wheel object.
            this.theWheel.startAnimation()

            // Set to true so that power can't be changed and spin button re-enabled during
            // the current animation. The user will have to reset before spinning again.
            this.wheelSpinning = true;
        }
    }

    // -------------------------------------------------------
    // Function for reset button.
    // -------------------------------------------------------
    resetWheel()
    {
        this.theWheel.stopAnimation(false)  // Stop the animation, false as param so does not call callback function.
        this.theWheel.rotationAngle = 0     // Re-set the wheel angle to 0 degrees.
        this.theWheel.draw()                // Call draw to render changes to the wheel.

        this.wheelSpinning = false          // Reset to false to power buttons and spin can be clicked again.
    }

    // -------------------------------------------------------
    // Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
    // note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
    // -------------------------------------------------------
    alertPrize(indicatedSegment)
    {
        if (indicatedSegment.message == null || indicatedSegment.message.length == 0) return
        TwitchController.SendChatMessage(channel, indicatedSegment.message)
    }
}