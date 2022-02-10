var canvas;
var backgroundImage, cycle1_img, cycle2_img, cycle3_img, cycle4_img,track;
var tyreImage, powerCoinImage, lifeImage;
var obstacle1Image, obstacle2Image;
var database, gameState;
var form, player, playerCount;
var allPlayers, cycle1, cycle2, cycle3,cycle4, tyres, powerCoins, obstacles;
var cycles = [];
var blastImg;

function preload() {
  backgroundImage = loadImage("./assets/Grass.jpeg");
  cycle1_img = loadImage("CycleRacer1.png");
  cycle2_img = loadImage("CycleRacer2.png");
  cycle3_img = loadImage("CycleRacer3.png");
  cycle4_img = loadImage("CycleRacer4.png");
  track = loadImage("Road.png");
  tyreImage = loadImage("./assets/tyre.png");
  powerCoinImage = loadImage("./assets/goldCoin.png");
  obstacle1Image = loadImage("./assets/obstacle1.png");
  obstacle2Image = loadImage("./assets/nail.png");
  lifeImage = loadImage("./assets/life.png");
  blastImg = loadImage("./assets/blast.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 4) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
