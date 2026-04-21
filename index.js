// const prompt = require("prompt-sync")({ sigint: true });

import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });


// * Game elements/assets 
const HAT = "^";
const HOLE = "O";
const GRASS = "░";
const PLAYER = "*";

// * UP / DOWN / LEFT / RIGHT / QUIT (DEFAULT) keyboard constants
const UP = "w";
const DOWN = "s";
const LEFT = "a";
const RIGHT = "d";
const QUIT = "q";

// * MSG_UP / MSG_DOWN / MSG_LEFT / MSG_RIGHT / MSG_ QUIT / MSG_INVALID message constants
const FEEDBACK_UP = "You moved up.";
const FEEDBACK_DOWN = "You moved down.";
const FEEDBACK_LEFT = "You moved left.";
const FEEDBACK_RIGHT = "You moved right.";
const FEEDBACK_QUIT = "You quit the game.";
const FEEDBACK_INVALID = "Invalid entry! Please enter w (up), s (down), a (left), d (right) or q (quit) .";

// * WIN / LOSE / OUT / QUIT messages constants
const FEEDBACK_WIN_MSG = "Congratulations, You won!";
const FEEDBACK_LOSE_MSG = "You fell into a hole! Game over.";
const FEEDBACK_OUT_MSG = "You stepped out of the platform! Game over.";
const FEEDBACK_QUIT_GAME_MSG = "You quit the game. Thanks for playing.";

// * MAP ROWS, COLUMNS AND PERCENTAGE
const ROWS = 8;
const COLS = 5;
const PERCENT = 0.2;  // Percentage of holes in the field

class Field {

  
  // * constructor, a built-in method of a class (invoked when an object of a class is instantiated)
  constructor(field = [[]]) {
    this.field = field;
    this.gamePlay = false;
  }

  // * generateField is a static method, returning a 2D array of the fields
  static generateField(rows, cols, percentage) {
    const map = [];
    for (let i = 0; i < rows; i++) {
      map[i] = [];
      for (let j = 0; j < cols; j++) {
        map[i][j] = Math.random() < percentage ? HOLE : GRASS;
      }
    }
    return map;
  }

  // * welcomeMessage is a static method, displays a string
  static welcomeMessage(msg) {
    if (msg === undefined) {
      console.log("\n\n***************************************");
      console.log("Welcome to Find My Hat!\n\nYour goal is to find the hat (^) without falling into any holes (O) or stepping out of the field.\n\nUse w (up), s (down), a (left), d (right) to move.\n\nGood luck!!!!!");
      console.log("***************************************\n\n");
    } else {
      console.log(msg);
    }
  }

  // * setHat positions the hat along a random x and y position within field array
  setHat(){
    const x = Math.floor(Math.random() * (ROWS-1)) + 1;
    const y = Math.floor(Math.random() * (COLS-1)) + 1;
    this.field[x][y] = HAT;
  }

  // * printField displays the updated status of the field position
  printField() {
    this.field.forEach(row => console.log(row.join("")));
  }

  // * updateMove displays the move (key) entered by the user
  updateMove(direction) {
    console.log(direction);
  }

  // !! TODO: updateGame Assessment Challenge
  updateGame() {
    
    // check the following conditions:
    // 1. if the player fell into a HOLE, end the game
    // 2. if the player stepped out of the map, end the game
    // 3. if the player found the HAT, wins the game
    // 4. if the player moved to a GRASS spot, update the player's position and continue with the game
    
    if (this.field[this.playerX][this.playerY] === HOLE) {
      console.log(FEEDBACK_LOSE_MSG);
      this.#end();
    } else if (this.field[this.playerX][this.playerY] === HAT) {
      console.log(FEEDBACK_WIN_MSG);
      this.#end();
    } else if (this.field[this.playerX][this.playerY] === GRASS) {
      this.field[this.playerX][this.playerY] = PLAYER;
    } else {
      console.log(FEEDBACK_OUT_MSG);
      this.#end();
    }


  }

  //  * start() a public method of the class to start the game
  start() {
    this.gamePlay = true;

    // set the players' position to the start of the map
    this.field[0][0] = PLAYER;
    this.playerX = 0;
    this.playerY = 0;
    this.setHat();

    while (this.gamePlay) {

      // print the starting field
      this.printField();
      const move = prompt("Enter (w)up, (s)down, (a)left, (d)right. Press (q) to quit: ");
      let flagInvalid = false;
      let feedback = "";
      
      switch (move.toLowerCase()) {
        case UP:
          feedback = FEEDBACK_UP;
          this.playerX -= 1;
          break;
        case DOWN:
          feedback = FEEDBACK_DOWN;
          this.playerX += 1;
          break;
        case LEFT:
          feedback = FEEDBACK_LEFT;
          this.playerY -= 1;
          break;
        case RIGHT:
          feedback = FEEDBACK_RIGHT;
          this.playerY += 1;
          break;
        case QUIT:
          feedback = FEEDBACK_QUIT;
          this.#end();
          break;
        default:
          feedback = FEEDBACK_INVALID;
          flagInvalid = true;
          break;
      }

      this.updateMove(feedback);

      if (!flagInvalid) {
        this.updateGame(move);

      }

    }

  }

  // * Private method to stop the game. 
  #end() {
    this.gamePlay = false;
  }
}


// * Generate a new field - using Field's static method: generateField
const createField = Field.generateField(ROWS, COLS, PERCENT);


// * Generate aa welcome message
Field.welcomeMessage("\n*************** WELCOME TO FIND YOUR HAT! ***************\n");
// console.log(Field.welcomeMessage()); // Custom welcome message is optional, if not provided, the default welcome message will be displayed


// * Create a new instance of the game
const gameField = new Field(createField);


// * Invoke method start(...) from the instance of game object
gameField.start();





