/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

// Creating the phrase class

class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }

    /**
    * Display phrase on game board
    */

    addPhraseToDisplay(){

        // get the ul element from DOM
        const ul = document.getElementById("phrase").firstElementChild;

        // Set up an empty string to concatenate to 
        let html = "";

        // Set up a variable for the phrase chosen 
        const chosenPhrase = this.phrase;

        for (let letter of chosenPhrase){
            if (letter === " "){
                html += `<li class="space"> </li>`
            } else {
                html += `<li class="hide letter ${letter}">${letter}</li>`
            }
        }

        ul.innerHTML = html;

        return ul;
    }

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */

    checkLetter(letter) {
        return this.phrase.includes(letter);
    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {

        // Get all of the DOM elements that are displaying the letters
        const li_List = document.querySelectorAll("ul li")

        for (let li of li_List){
            if (li.className === `hide letter ${letter}`){
                li.classList.add("show");
                li.classList.remove("hide");
            }
        }
    };
}


