# SpinnerBot
A bot on twitch that brings up a spinner and chooses an entry from it by command

# Instructions
- Within Settings.js, specify CHANNEL, USERNAME, and TOKEN. the USERNAME is the account associated with the TOKEN.
It can be the same as the CHANNEL if you don't have a separate bot account to use. You can acquire a token at https://twitchapps.com/tmi/

- Within Settings.js, specify the message text that the bot will put into the chat when the entry is hit. Leaving this blank will produce no message.

- Within Settings.js, specify the command you wish to use to trigger the bot. It does not need to start with ! but this is generally preferred

- Within Settings.js, specify the CONTROLLERS, users other than the streamer account that will be able to trigger the bot (usually moderators).

- If you wish, you can alter the WheelBack.png image to change the background

- You can change each WheelEntry_x image to your own colors, images, words, etc by altering the image. Note that you should attempt to retain the shape and size

- Once you've made your alterations and tested using index.htm, you can use UnityBuild.py to create a version with less files to worry about

- In OBS (or similar streaming software), use the main HTM file as a browser source, then use the command in your chat to test that it's working



For any questions/concerns/suggestions, please contact me at DrewTheBearTwitch@gmail.com