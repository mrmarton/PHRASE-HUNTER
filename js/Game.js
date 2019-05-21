/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
 // const phrase = [ 'knowledge is power',
	//       'the journey is the destination',
	//       'in design complexity is toxic',
	//       'code is like humor when you have to explain it it is bad',
	//       'ideas want to be ugly'
	//       ];
 class Game {

  	constructor(){
  
    //used to track the number of missed guesses by the player. 
    //The initial value is 0, since no guesses have been made at the start of the game.
    this.missed = 0;
    //activePhrase: This is the Phrase object that’s currently in play. 
    //The initial value is null. Within the startGame() method, this property will be set to the 
    //Phrase object returned from a call to the getRandomPhrase() method.
    this.activePhrase = null;
    this.used = [];
    //phrase: this is the actual phrase the Phrase object is representing. 
    //This property should be set to the phrase parameter, but converted to all lower case.
    this.phrases = [
	      { phrase: 'knowledge is power'},
	      { phrase: 'the journey is the destination'},
	      { phrase: 'in design complexity is toxic'},
	      { phrase: 'code is like humor when you have to explain it it is bad'},
	      { phrase: 'ideas want to be ugly'},
    		 // { phrase: 'we can not learn without pain'},
		    ]
		  }


//getRandomPhrase(): this method 
//randomly retrieves one of the phrases stored in the phrases array and returns it.
  getRandomPhrase(){
	    let randomNum;
	    let randomPhrase;
	    if(this.used.length === this.phrases.length)
	    {
	      this.used = [];
	    }
	do
	{
	  randomNum = Math.floor(Math.random() * 5);
	  randomPhrase = this.phrases[randomNum].phrase;
	}while(this.used.includes(randomPhrase));
	this.used.push(randomPhrase)
	    return randomPhrase;
  }


// startGame(): hides the start screen overlay, calls the getRandomPhrase() 
// method, and sets the activePhrase property with the chosen phrase. It also adds that phrase to the board by 
// calling the addPhraseToDisplay() method on the active Phrase object.
  startGame(){
	    const overlay = document.getElementById('overlay');
	    overlay.style.display = 'none';

	    let string = this.getRandomPhrase();
	    this.activePhrase = new Phrase(string);

	    this.activePhrase.addPhraseToDisplay();
	    document.addEventListener('keydown', keyListener);
	    
	}

//handleInteraction(): this method controls most of the game logic.
// It checks to see if the button clicked by the player matches a 
//letter in the phrase, and then directs the game based on a correct or incorrect guess.
handleInteraction(button){
		  if(this.activePhrase.checkLetter(button.textContent))
		  {
		    this.activePhrase.showMatchedLetters(button.textContent);
		    button.className = 'chosen';
		    if(this.checkForWin()
		    	)
		    {
		      this.gameOver(true);
		    }
		  }
		  else
		  {
		    if(button.textContent !== "Start Game")
		    {
		    button.className = 'wrong';
		    // button.disabled = true;

		    this.removeLife();
		    button.disabled = true;
		    }

		  }
		}

//this fuction checks for win
  checkForWin() {
		  let over = true
		  let charList = document.querySelectorAll('li')

		  charList.forEach(char =>
		    {
		      if(char.className.includes('hide letter'))
		      {
		        over = false
		      }
		    })
		    return over;
		  }
//this method removes a life from the scoreboard, 
//by replacing one of the liveHeart.png images with a red-explosion-hi.png image
removeLife(){
		  this.missed++;
		  let hearts = document.querySelectorAll('.tries');
		  for(let i = 0; i < this.missed; i++ )
		  { hearts[i].innerHTML = '<img src="images/red-explosion-hi.png" alt="exploding star" height="35" width="30">';
		  }
		  if(this.missed === 5) //basic logic was added to the game
		  {
		  this.gameOver(false);
		  this.missed = 0;
		  }
		}
//game over if all of the hearst were lost  this method checks 
//to see if the player has revealed all of the letters in the active phrase.
gameOver(gameWon) {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'flex';
  const mess = document.querySelectorAll('h2')[1];

  if(gameWon)
  {
    mess.textContent = 'Congratulation You Won :)'
    overlay.className ='win'

  }
  else
  {
    mess.textContent = 'GameOver :(';
    overlay.className ='lose'

  }
this.resetGame(); //this method displays the original start screen overlay, and depending on the outcome of the game, updates the overlay h1 element with a friendly win or loss message, 
//and replaces the overlay’s start CSS class with either the win or lose CSS class.

}


//handleInteraction(): this method controls most of the game logic.
// It checks to see if the button clicked by the player matches a 
//letter in the phrase, and then directs the game based on a correct or incorrect guess.

// resetGame() function to reset game data.
resetGame(){
		  let buttons = document.querySelectorAll('BUTTON');
		  let chars = document.querySelectorAll('li');
		  let hearts = document.querySelectorAll('.tries');

		  const ul = document.querySelector('ul');
		  	buttons.forEach(button =>
		    {
		    button.className = 'key';
		    button.disabled = false;
		    })

		  hearts.forEach(heart => heart.innerHTML = '<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">')
		  this.missed = 0;
		  ul.innerHTML = '';
		  document.removeEventListener('keydown', keyListener);

		  }

}
