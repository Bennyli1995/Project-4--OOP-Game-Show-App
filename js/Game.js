/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor(){
        this.missed = 0;
        this.phrases = [{phrase: "Golden State Warriors"},{phrase: "The Boring Company"},{phrase: "Think and Grow Rich"},{phrase: "NBA Hall of Fame"},{phrase: "Michael Jeffrey Jordan"}];
        this.activePhrase = null;
    }

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */

    getRandomPhrase(){
        const randomNumber = Math.floor(Math.random() * 5);
        return new Phrase(this.phrases[randomNumber].phrase);
    }

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    
    startGame() {

        // Get the DOM overlay element 
        const overlay = document.getElementById("overlay");

        // Hiding the start screen overlay
        overlay.style.display = "none";

        // Select a phrase object from the Game object's array of phrases
        const chosenPhrase = this.getRandomPhrase()

        // Set the active phrase to the phrase selected
        this.activePhrase = chosenPhrase;

        return chosenPhrase.addPhraseToDisplay();

    };

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */

    checkForWin() {

         // Get all of the DOM elements that are displaying the letters
         const li_List = document.querySelectorAll("ul li")

         for (let li of li_List){

            // Ignore the spaces
             if (li.textContent !== " "){
                if (!li.classList.contains("show")){
                    return false;
                }
             }
         }
         
         return true;
    };

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */

    removeLife() {
        
        this.missed ++;

        // Select the first "life" from the DOM
        const lives = document.querySelector(".tries");

        let heart = lives.firstChild;
        
        // Remove the class name so that it cannot get selected again by Queryselector
        lives.classList.remove("tries");

        heart.src = "images/lostHeart.png";

        // Game is over after the 5th incorrect guess
        if (this.missed === 5) {
            this.gameOver(this.checkForWin());
        };
    }

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(button) {

        // Check if the letter is a match
        const checked = this.activePhrase.checkLetter(button.textContent)
        button.disabled = true

        if (checked){
            button.classList.add("chosen")
            this.activePhrase.showMatchedLetter(button.textContent)
            
            if (this.checkForWin()){
                this.gameOver(true);
            }

        } else {
            button.classList.add("wrong")
            this.removeLife()
        }

    };

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */

    gameOver(gameWon) {

        const overlay =  document.getElementById("overlay")
        overlay.style.display = "flex"

        // Target the end of game message DOM element
        let message = document.getElementById('game-over-message')

        if (gameWon){
            overlay.className = "win"
            message.textContent = "You Have Won! Great Job!"
            let audioVictory = new Audio('mixkit-conference-audience-clapping-strongly-476.wav');
            audioVictory.play();

            const resetButton = document.getElementById("btn__reset")

            resetButton.addEventListener("click",(e)=>{
                if (e.target.tagName === "BUTTON"){
                    audioVictory.pause();
                }
            })

        } else {
            overlay.className = "lose"
            message.textContent = "You Have Lost! Better Luck Next Time!"

            let audioVictory = new Audio('mixkit-player-losing-or-failing-2042.wav');
            audioVictory.play();

            const resetButton = document.getElementById("btn__reset")

            resetButton.addEventListener("click",(e)=>{
                if (e.target.tagName === "BUTTON"){
                    audioVictory.pause();
                }
            })
        }

        this.resetGame();
    };

     /**
    * Resets the game by:
    * 1. Remove all `li` elements from the Phrase `ul` element.
    * 2. Enable all of the onscreen keyboard buttons and update each to use the `key` CSS
    * class, and not use the `chosen` or `wrong` CSS classes.
    * 3. Reset all of the heart images (i.e. the player's lives) in the scoreboard at the bottom of
    * the gameboard to display the `liveHeart.png` image.
    */

    resetGame(){

        // Remove all of the li tags
        const phrase = document.getElementById("phrase")
        const ul = phrase.firstElementChild;
        ul.innerHTML = "";

        // Reset all buttons to contain only the "key" class 
        const buttons = document.getElementsByClassName("key")
        
        for (let i = 0; i < buttons.length; i++){
            buttons[i].disabled = false;
            buttons[i].classList.remove("wrong");
            buttons[i].classList.remove("chosen");
        }

        // Reset all lives
        const li_heart = document.getElementById("scoreboard").firstElementChild.children;
        for (let i = 0; i < li_heart.length; i++){
            // Reset the classname to "tries"
            li_heart[i].classList.add("tries");

            let heart =  li_heart[i].firstChild;
            heart.src = "images/liveHeart.png";
        }
    }
}



