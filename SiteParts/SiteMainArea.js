class SiteMainArea {
    constructor() {
        this.elements = { spinner: null, spinnerTimeout1: null, spinnerTimeout2: null };
        this.content = this.generateContent();
    }

    generateContent() {
        //  Create the main container and the centered box
        let container = document.createElement('div')
        container.id = "SiteMainArea";

        this.elements.spinner = new Spinner();
        container.appendChild(this.elements.spinner.content);

        //  Set up a response in the Twitch chat message receiver
        TwitchController.AddTwitchMessageCallback("PRIVMSG", (message) => {
            let messageLower = message.message.toLowerCase();

            //  If the message is the spin command, and it was sent by the streamer or a specified controller, trigger the spin
            const controllers = SETTINGS.CONTROLLERS.map(e => { return e.toLowerCase() })
            let spinUser = (controllers.includes(message.username) || (message.username === SETTINGS.TWITCH_DATA.CHANNEL.toLowerCase()));
            if (spinUser && (messageLower == SETTINGS["SPIN_COMMAND"].toLowerCase())) this.triggerSpin()
        });

        return container;
    }

    triggerSpin() {
        if (this.elements.spinner) {
            this.elements.spinner.resetWheel()

            let wheel_bg = document.getElementById("wheel_bg")
            wheel_bg.style.backgroundImage = "url(" + SETTINGS["WHEEL_BACKGROUND"] + ")"
            wheel_bg.style.display = ""

            clearTimeout(this.elements.spinnerTimeout1)
            clearTimeout(this.elements.spinnerTimeout2)

            this.elements.spinnerTimeout1 = setTimeout(() => {
                this.elements.spinner.powerSelected(3)
                this.elements.spinner.startSpin()
            }, 2500)

            this.elements.spinnerTimeout2 = setTimeout(() => {
                wheel_bg.style.display = "none"
            }, 10000)
        }

    }
}