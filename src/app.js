/* eslint-disable */
import "bootstrap";
import "./styles.css";

/* 
 * Planned to do some animation of the card spinning in 3D and all but i started the project in Codespaces by mistake
 * and it seems like mixing codespaces with vscode local makes the browser performance drop down so i gave up, im too lazy
 * to commit, push, delete codespaces, clone repo on local and go back to work so i'll take this as finished and move on xd
*/

window.onload= function() {

  const 
    documentRoot= document.querySelector(":root"),
    genButton= document.getElementById("gen-button"),
    counterElement= document.getElementById("gen-counter"),
    formElement= document.getElementById("gen-form"),

    cardNumberElement= document.getElementsByClassName("gen-card-number")[0],
    cardNameElement= document.getElementById("gen-card-name"),

    cardNumbers= "23456789JQK",
    cardNumbersName= ["two","three","four","five","six","seven","eight","nine","jack","queen","king"],
    cardSuitsName= ["clubs","diamonds","hearts","spades"];

  let counterID, counterTime;
  
  function initialize(){
    updateSize();
    generateRandomCard();

    setTimeout(newCardCountdown ,1000);
  }

  function generateRandomCard(){

    // reset the counter and start again
    counterTime= 10;
    counterElement.innerHTML= counterTime;

    if(counterID){
      clearInterval(counterID);
      newCardCountdown();
    }

    // gen random and set
    let 
      number= Math.floor(Math.random()*cardNumbers.length),
      suit= Math.floor(Math.random()*4);

    cardNumberElement.innerHTML= cardNumbers[number];
    documentRoot.style.setProperty("--card-suit", `url("./src/assets/img/card${suit}.png")`);
    cardNameElement.innerHTML= `new card!!! the ${cardNumbersName[number]} of ${cardSuitsName[suit]}`;
  }

  // apply sizes from inputs, only numbers with some common units are accepted
  function updateSize(){
    
    let 
      regex= /^(\d+|\d+.\d+)(px|rem|em|vw|vh)$/i, // not too fancy regex xd anythin with digits, digits with decimals, and ending with the unit
      width= formElement.children[1].value,
      height= formElement.children[3].value;

    if(regex.test(width) && regex.test(height)){

      documentRoot.style.setProperty("--card-width", width);
      documentRoot.style.setProperty("--card-height", height);

      console.log(`changed card size to ${width}*${height}`);
    }
  }

  // is the fiiiinal countdoown tito-tiiitooo, tito ti-to tiiiiii
  function newCardCountdown(){
    counterID= setInterval(()=>{
      counterTime--;
      if(counterTime==0){
       generateRandomCard();
       counterTime= 10;
      }
      counterElement.innerHTML= counterTime;
    }, 1000);
  }

  // events
  genButton.addEventListener('click', (e)=> { generateRandomCard(); } );
  formElement.addEventListener('submit', (e) => { e.preventDefault(); updateSize(); })

  // init
  initialize();
};
