/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


//Create a new instance of the Game 
//class and add event listeners for the start button and onscreen keyboard buttons:
let game = new Game();
const startingButton = document.getElementById('btn__reset');
//Add a click event listener to the "Start Game" button which creates a 
//new Game object and starts the game by calling the Game() method.
startingButton.addEventListener('click', () =>  game.startGame())

const buttons = document.querySelectorAll('BUTTON');
const message = document.createElement('h2')

//Add click event listeners to each of the onscreen keyboard buttons, 
// so that clicking a button calls the handleInteraction() method on the Game 
// object. Event delegation can also be used in order to avoid having to add an
//  event listener to each individual keyboard button. Clicking the space between 
//  and around the onscreen keyboard buttons should not result in the handleInteraction() 
//  method being called.
overlay.append(message);

buttons.forEach(button => button.addEventListener('click', (e) =>
	{
	  game.handleInteraction(e.target);
	}))

		let keyListener = (e) =>  {
		  let key;

			  buttons.forEach(button =>
			     {
			      if(button.textContent === e.key)
			     {
			        key = button.disable;
			     } 
			    });
	  game.handleInteraction(key);
	}

document.addEventListener('keydown', keyListener);
// document.addEventListener('keydown', function(event){
//     alert(event.keyCode);
// } );

