/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

// Get the DOM element for the "Start Game" button
const startGameButton = document.getElementById("btn__reset");

startGameButton.addEventListener("click",()=>{
    game = new Game();
    game.startGame();
    document.body.style.backgroundImage = "url('1567831.jpeg')";
})

const qwerty = document.getElementById("qwerty")

qwerty.addEventListener("click",(e)=>{
    if (e.target.tagName === "BUTTON"){
        game.handleInteraction(e.target) 
    }
})

// EXTRA CREDIT
// Allow users to use their keyboard to play the game

const keys = qwerty.querySelectorAll('.key');


// Create an event listener for any key up action
document.addEventListener("keyup",(e)=>{
    for (let i = 0; i < keys.length; i++){
        // The key needs to match the letter, and the letter cannot be disabled 
        if (e.key.toLowerCase() === keys[i].textContent && !keys[i].disabled){
            game.handleInteraction(keys[i])
        }
    }
})

