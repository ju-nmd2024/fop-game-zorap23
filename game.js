/* This is my game called "Spider Glide"
   Zora Pintér
   Individual assignment for Foundations of Programming
   Citations: Some parts of the code were made the help of some classmates,
   since this help was mostly about the logic of coding, I can't pinpoint which were these parts. 
   I also used the p5.js website, and a bit of chat GPT for explanations.
*/

function setup() {
  createCanvas(600, 800);
  background(128, 80, 150);
}

// Spider position and size variables
let spiderX = 300;
let spiderY = 100;
let groundX = 0;
let groundY = 700;
let s = 0.5; // I added a different scaling method then the one in the original spider design, so I can scale the spider proportionally
let velocity = 1;
let acceleration = 0;
let gameState = "menu";

// Starting Screen function
function menuScreen() {
  background(0);

  // Info box
  push();
  translate(50, 170);
  fill(128, 80, 150);
  rect(0, 0, 500, 300, 20);
  pop();

  // Game name
  push();
  fill(255);
  textAlign(CENTER); //source: p5.js website
  textSize(45);
  text("Spider Glide", 300, 240);
  pop();

  // Instruction
  push();
  fill(255);
  textAlign(CENTER);
  textSize(17);
  text(
    "In this game you have to make sure that the spider glides down to the ground safely. You can control the game with the space key. Have fun!",
    88,
    275,
    430
  );
  pop();

  // Start button
  push();
  translate(240, 370);
  noStroke();
  fill(200, 100, 10);
  rect(0, 0, 120, 60, 10);
  textSize(30);
  fill(255);
  text("START", 12, 40);
  pop();
}

// Win Screen function
function winScreen() {
  background(0);

  // Info box
  push();
  translate(50, 250);
  fill(0, 150, 30);
  rect(0, 0, 500, 300, 20);
  pop();

  // Winner text
  push();
  fill(255);
  textAlign(CENTER);
  textSize(45);
  text("OMG! YOU WON! ", 300, 315);
  pop();

  //Congrats! text
  push();
  fill(255);
  textAlign(CENTER);
  textSize(17);
  text(
    "Congrats!!! 🥳 You landed safely with the spider, he gets to live another day! Do you want to try your luck again?",
    88,
    345,
    430
  );
  pop();

  // "Play again" button
  push();
  translate(240, 440);
  noStroke();
  fill(128, 80, 150);
  rect(-20, 0, 196, 60, 10);
  textSize(30);
  fill(255);
  text("PLAY AGAIN", -10, 40);
  pop();
}

// Game Over screen function
function gameOverScreen() {
  background(0);

  // Info box
  push();
  translate(50, 250);
  fill(128, 10, 10);
  rect(0, 0, 500, 300, 20);
  pop();

  // Lost text
  push();
  fill(255);
  textAlign(CENTER);
  textSize(45);
  text("OH NOOO!!!", 300, 315);
  pop();

  // Encouregement text
  push();
  fill(255);
  textAlign(CENTER);
  textSize(17);
  text(
    "Well...poor spider! 😰 You lost this round but feel free to try again. Better luck next time!",
    88,
    345,
    430
  );
  pop();

  // Try again button
  push();
  translate(240, 440);
  noStroke();
  fill(128, 80, 150);
  rect(-30, 0, 176, 60, 10);
  textSize(30);
  fill(255);
  textAlign(CENTER);
  text("TRY AGAIN", 58, 40);
  pop();
}

// Ground function
function ground(groundX, groundY) {
  fill(50, 50, 50);
  rect(groundX, groundY, 600, 100);
  push();
  fill(100, 100, 100);
  ellipse(groundX + 30, groundY + 27, 30, 15);
  ellipse(groundX + 130, groundY + 27, 20, 10);
  ellipse(groundX + 80, groundY + 57, 40, 20);
  ellipse(groundX + 300, groundY + 27, 40, 20);
  ellipse(groundX + 400, groundY + 57, 30, 15);
  ellipse(groundX + 330, groundY + 67, 20, 10);
  ellipse(groundX + 530, groundY + 37, 20, 10);
  ellipse(groundX + 500, groundY + 77, 40, 20);
  ellipse(groundX + 200, groundY + 77, 30, 15);
  pop();
}

// Spider function
function spider(spiderX, spiderY) {
  push();

  strokeWeight(6);

  //back legs
  line(
    spiderX + 70 * s,
    spiderY - 50 * s,
    spiderX + 150 * s,
    spiderY - 100 * s
  );
  line(
    spiderX + 150 * s,
    spiderY - 100 * s,
    spiderX + 210 * s,
    spiderY - 50 * s
  );

  line(
    spiderX - 70 * s,
    spiderY - 50 * s,
    spiderX - 150 * s,
    spiderY - 100 * s
  );
  line(
    spiderX - 150 * s,
    spiderY - 100 * s,
    spiderX - 210 * s,
    spiderY - 50 * s
  );

  //third row legs
  line(spiderX + 70 * s, spiderY - 10 * s, spiderX + 150 * s, spiderY - 30 * s);
  line(
    spiderX + 150 * s,
    spiderY - 30 * s,
    spiderX + 200 * s,
    spiderY + 30 * s
  );

  line(spiderX - 70 * s, spiderY - 10 * s, spiderX - 150 * s, spiderY - 30 * s);
  line(
    spiderX - 150 * s,
    spiderY - 30 * s,
    spiderX - 200 * s,
    spiderY + 30 * s
  );

  //second row legs
  line(spiderX + 70 * s, spiderY, spiderX + 130 * s, spiderY + 40 * s);
  line(
    spiderX + 130 * s,
    spiderY + 40 * s,
    spiderX + 170 * s,
    spiderY + 110 * s
  );

  line(spiderX - 70 * s, spiderY, spiderX - 130 * s, spiderY + 40 * s);
  line(
    spiderX - 130 * s,
    spiderY + 40 * s,
    spiderX - 170 * s,
    spiderY + 110 * s
  );

  //first legs
  line(spiderX + 65 * s, spiderY + 65 * s, spiderX + 90 * s, spiderY + 130 * s);
  line(
    spiderX + 90 * s,
    spiderY + 130 * s,
    spiderX + 60 * s,
    spiderY + 195 * s
  );

  line(spiderX - 65 * s, spiderY + 65 * s, spiderX - 90 * s, spiderY + 130 * s);
  line(
    spiderX - 90 * s,
    spiderY + 130 * s,
    spiderX - 60 * s,
    spiderY + 195 * s
  );

  pop();

  //web string
  strokeWeight(3);
  line(spiderX, spiderY, spiderX, spiderY - 2000 * s);

  strokeWeight(0);

  //Body
  fill(36, 36, 36);
  ellipse(spiderX, spiderY, 200 * s, 180 * s);

  //red spots
  push();
  fill(255, 0, 0);
  ellipse(spiderX, spiderY - 20 * s, 60 * s, 30 * s);
  ellipse(spiderX, spiderY - 55 * s, 30 * s, 15 * s);
  ellipse(spiderX, spiderY + 10 * s, 17 * s, 9 * s);
  pop();

  //Head
  fill(10, 10, 10);
  ellipse(spiderX, spiderY + 70 * s, 110 * s, 100 * s);

  //Right Eye
  fill(255, 255, 255);
  circle(spiderX + 25 * s, spiderY + 70 * s, 40 * s);
  //red eye
  fill(230, 20, 20);
  circle(spiderX + 25 * s, spiderY + 70 * s, 30 * s);
  //Pupil
  fill(0, 0, 0);
  circle(spiderX + 25 * s, spiderY + 70 * s, 25 * s);
  //eye glow
  fill(255, 255, 255);
  circle(spiderX + 27 * s, spiderY + 65 * s, 10 * s);

  //Left Eye
  fill(255, 255, 255);
  circle(spiderX - 25 * s, spiderY + 70 * s, 40 * s);
  //red eye
  fill(230, 20, 20);
  circle(spiderX - 25 * s, spiderY + 70 * s, 30 * s);
  //Pupil
  fill(0, 0, 0);
  circle(spiderX - 25 * s, spiderY + 70 * s, 25 * s);
  //eye glow
  fill(255, 255, 255);
  circle(spiderX - 22 * s, spiderY + 65 * s, 10 * s);

  //Mouth
  fill(50, 50, 50);
  arc(spiderX, spiderY + 95 * s, 50 * s, 40 * s, 0 * s, PI);

  //Teeth
  fill(255, 255, 255);
  triangle(
    spiderX - 18 * s,
    spiderY + 95 * s,
    spiderX - 10 * s,
    spiderY + 95 * s,
    spiderX - 14 * s,
    spiderY + 100 * s
  );
  triangle(
    spiderX + 18 * s,
    spiderY + 95 * s,
    spiderX + 10 * s,
    spiderY + 95 * s,
    spiderX + 14 * s,
    spiderY + 100 * s
  );

  //tounge
  fill(150, 30, 30);
  ellipse(spiderX, spiderY + 110 * s, 30 * s, 10 * s);
}

function draw() {
  // Game states
  if (gameState === "menu") {
    menuScreen();
  } else if (gameState === "playing") {
    background(128, 80, 150);
    ground(groundX, groundY);
    spider(spiderX, spiderY);
  } else if (gameState === "win") {
    winScreen();
  } else if (gameState === "gameOver") {
    gameOverScreen();
  }

  // Menu screen "START" button mechanics
  if (gameState === "menu") {
    if (mouseIsPressed) {
      if (mouseX > 240 && mouseX < 360 && mouseY > 373 && mouseY < 430) {
        gameState = "playing";
      }
    }
  }

  // Win screen "RESTART" button mechanics
  if (gameState === "win") {
    if (mouseIsPressed) {
      if (mouseX > 220 && mouseX < 440 && mouseY > 440 && mouseY < 500) {
        gameState = "menu";
      }
    }
  }

  // Lost sreen "TRY AGAIN" button mechanics
  if (gameState === "gameOver") {
    if (mouseIsPressed) {
      if (mouseX > 210 && mouseX < 385 && mouseY > 440 && mouseY < 500) {
        gameState = "menu";
      }
    }
  }

  //spider gravity and speed
  spiderY += velocity;
  velocity += acceleration;

  // "playing" mechanics
  if (gameState === "playing") {
    acceleration += 0.01; // the calculations for velocity and acceleration were calculated with the help of chat gpt
    if (keyIsDown(32)) {
      velocity = -6;
    }

    if (spiderY > 625) {
      if (velocity > 14) {
        gameState = "gameOver";
        spiderY = 50;
        velocity = 0.1;
        acceleration = 0;
      } else if (velocity < 14) {
        gameState = "win";
        spiderY = 50;
        velocity = 0.1;
        acceleration = 0;
      }
    }
  }
}
