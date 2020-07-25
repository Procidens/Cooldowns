// MAIN VARIABLES
let ms = require('ms')
let { Client, Collection } = require('discord.js')
let client = new Client()


// READY EVENT
client.on("ready", () => {
    console.log("Your message here")
})

// COOLDOWN SET FUNCTION
let cooldownSet = (message, length) => {
    cooldownObject.set(message.author.id, ms(length)) // Adds the user to the cooldown with the desired length
    setTimeout(() => { cooldownObject.delete(message.author.id) }, ms(length)) // Will remove the user from the cooldown once they have served their time
}
/*
Make sure to provide the "message" callback once you call the cooldownSet function, 
You can provide any type of cooldown length such as ...
d,s,m. i.g: d Stands for days, s Stands for seconds and m Stands for minutes.
*/

// MESSAGE EVENT
client.on("message", async message => {
    if (message.author.bot) return; // Keep safe from bot ception 

    const cooldownLength = cooldownObject.get(message.author.id) // Get the desired time for the cooldown length
    if (cooldownObject.has(message.author.id)) return message.channel.send(`You are on a \`${ms(cooldownLength)}\` cooldown.`) // Check if they are on a cooldown and return your code, therefore they cant use the command

    if (message.content == 'Cooldown') {
        cooldownSet(message, '1s') // Calls the cooldown function on line 13
        message.channel.send("Cooldown Here I am!")
    }


})



// LOGIN TO BOT
client.login('token') 
