class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.leader3 = createElement("h2");
    this.leader4 = createElement("h2");
    this.playerMoving = false;
    this.leftKeyActive = false;
    this.blast = false;
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    cycle1 = createSprite(width / 2 - 100, height - 100);
    cycle1.addImage("cycle1", cycle1_img);
    cycle1.scale = 1.07;
    cycle1.debug = true
    cycle1.setCollider("circle",0,0,50);

    cycle1.addImage("blast", blastImg);

    cycle2 = createSprite(width / 2 + 100, height - 100);
    cycle2.addImage("cycle2", cycle2_img);
    cycle2.scale = 1.07;
    cycle1.debug = true
    cycle2.setCollider("circle",0,0,50);

    cycle2.addImage("blast", blastImg);

    cycle3 = createSprite(width / 2 - 250, height - 100);
    cycle3.addImage("cycle3", cycle3_img);
    cycle3.scale = 1.07;
    cycle3.debug = true
    cycle3.setCollider("circle",0,0,50);

    cycle3.addImage("blast", blastImg);

    cycle4 = createSprite(width / 2 + 250, height - 100);
    cycle4.addImage("cycle4", cycle4_img);
    cycle4.scale = 1.07;
    cycle4.debug = true
    cycle4.setCollider("circle",0,0,50);

    cycle4.addImage("blast", blastImg);

    cycles = [cycle1, cycle2, cycle3, cycle4];

    tyres = new Group();
    powerCoins = new Group();

    obstacles = new Group();

    //POINT 2- ADD MORE OBSTACLES IN RANDOM X AND Y POS
    //POINT 3 - REMOVE DEBUG and submit
    var obstaclesPositions = [
      { x: width / 2, y: height - 500, image: obstacle1Image, scale: 0.02 },
      { x: width / 2 + 50, y: height - 1100, image: obstacle2Image , scale:0.3},
      { x: width / 2 + 150, y: height - 1200, image: obstacle1Image , scale:0.02},
      { x: width / 2 - 200, y: height - 1200, image: obstacle2Image , scale:0.3},
      { x: width / 2 - 180, y: height - 1300, image: obstacle1Image, scale: 0.02 },
      { x: width / 2 + 210, y: height - 1300, image: obstacle2Image , scale:0.3},
      { x: width / 2 + 220, y: height - 1400, image: obstacle1Image , scale:0.02},
      { x: width / 2 - 230, y: height - 1500, image: obstacle2Image , scale:0.3},
      { x: width / 2 + 240, y: height - 1600, image: obstacle1Image, scale: 0.02},
      { x: width / 2 - 250, y: height - 1850, image: obstacle2Image , scale:0.3},
      { x: width / 2 - 260, y: height - 1860, image: obstacle1Image, scale: 0.02},
      { x: width / 2 + 270, y: height - 1870, image: obstacle2Image, scale:0.3 },
      { x: width / 2 + 290, y: height - 1880, image: obstacle1Image, scale: 0.02},
      { x: width / 2 - 280, y: height - 1890, image: obstacle2Image, scale: 0.3},
      { x: width / 2 - 190, y: height - 1900, image: obstacle1Image, scale:0.02},
      { x: width / 2 - 200, y: height - 1900, image: obstacle2Image, scale: 0.3},
      { x: width / 2 + 300, y: height - 2000, image: obstacle1Image, scale: 0.02},
      { x: width / 2 + 310, y: height - 2100, image: obstacle2Image, scale: 0.3},
      { x: width / 2 - 320, y: height - 2120, image: obstacle1Image, scale: 0.02},
      { x: width / 2 + 330, y: height - 2130, image: obstacle2Image, scale: 0.3},
      { x: width / 2 - 340, y: height - 2190, image: obstacle1Image, scale: 0.02},
      { x: width / 2 + 350, y: height - 2200, image: obstacle2Image, scale: 0.3},
      { x: width / 2 - 360, y: height - 2290, image: obstacle1Image, scale: 0.02},
      { x: width / 2 + 370, y: height - 2300, image: obstacle2Image, scale: 0.3},
      { x: width / 2 - 210, y: height - 2300, image: obstacle2Image, scale:0.3},
      { x: width / 2 + 380, y: height - 2420, image: obstacle2Image, scale: 0.3},
      { x: width / 2 + 390, y: height - 2510, image: obstacle1Image, scale: 0.02},
      { x: width / 2 - 300, y: height - 2630, image: obstacle1Image, scale: 0.02},
      { x: width / 2 + 410, y: height - 2720, image: obstacle1Image, scale: 0.02},
      { x: width / 2, y: height - 2800, image: obstacle2Image, scale:0.3 },
      { x: width / 2 - 220, y: height - 2900, image: obstacle2Image, scale:0.3},
      { x: width / 2 - 230, y: height - 2900, image: obstacle2Image, scale:0.3},
      { x: width / 2 + 420, y: height - 3300, image: obstacle2Image, scale:0.3 },
      { x: width / 2 - 250, y: height - 3300, image: obstacle1Image, scale: 0.02 },
      { x: width / 2 + 240, y: height - 3310, image: obstacle1Image, scale:0.02},
      { x: width / 2 - 260, y: height - 3410, image: obstacle1Image, scale:0.02},
      { x: width / 2 + 270, y: height - 3450, image: obstacle1Image, scale:0.02},
      { x: width / 2 - 280, y: height - 3500, image: obstacle2Image, scale:0.3 },
      { x: width / 2 + 290, y: height - 3550, image: obstacle2Image, scale:0.3},
      { x: width / 2 - 300, y: height - 3750, image: obstacle2Image, scale:0.3},
      { x: width / 2 + 430, y: height - 3800, image: obstacle1Image , scale:0.02},
      { x: width / 2, y: height - 3810, image: obstacle1Image, scale:0.02 },
      { x: width / 2 - 310, y: height - 3900, image: obstacle1Image, scale:0.02},
      { x: width / 2 + 320, y: height - 4000, image: obstacle2Image, scale:0.3},
      { x: width / 2 - 330, y: height - 4100, image: obstacle2Image, scale:0.3},
      { x: width / 2 + 340, y: height - 4250, image: obstacle1Image, scale:0.02},
      { x: width / 2 - 350, y: height - 4300, image: obstacle1Image, scale:0.02},
      { x: width / 2 + 360, y: height - 4400, image: obstacle1Image, scale: 0.02 },
      { x: width / 2 - 370, y: height - 4350, image: obstacle2Image, scale:0.3},
      { x: width / 2 + 450, y: height - 4340, image: obstacle2Image , scale:0.3},
      { x: width / 2 + 470, y: height - 4200, image: obstacle1Image , scale:0.02},
      { x: width / 2 - 380, y: height - 4140, image: obstacle2Image, scale:0.3},
      { x: width / 2 - 375, y: height - 4350, image: obstacle1Image, scale: 0.02},
    ];

    // Adding fuel sprite in the game
    this.addSprites(tyres, 6, tyreImage, 0.1);

    // Adding coin sprite in the game
    this.addSprites(powerCoins, 25, powerCoinImage, 0.09);

    //Adding obstacles sprite in the game
    this.addSprites(
      obstacles,
      obstaclesPositions.length,
      obstacle1Image,
      0.5,
      obstaclesPositions
    );
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //C41 //SA
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        var sprite = createSprite(x, y);
        spriteImage = positions[i].image;
        sprite.addImage("sprite", spriteImage);
        sprite.scale = positions[i].scale;


      } else {
        x = random(width / 2 + 450, width / 2 - 450);
        y = random(-height * 4.5, height - 400);
        var sprite = createSprite(x, y);
        sprite.addImage("sprite", spriteImage);
        sprite.scale = scale;
      }
    
      
      spriteGroup.add(sprite);
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(10, 30);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);

    this.leader3.class("leadersText");
    this.leader3.position(width / 3 - 50, 180);

    this.leader4.class("leadersText");
    this.leader4.position(width / 3 - 50, 230);
  }

  play() {
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();
    player.getCyclesAtEnd();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      this.showTyreBar();
      this.showLife();
      this.showLeaderboard();

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cycles in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        //save the vaue of player.life from the database(allPlayers) in a temporary variable
        var currentLife = allPlayers[plr].life;

        if(currentLife <= 0 ){
          cycles[index - 1].changeImage("blast");
          cycles[index -1 ].scale = 0.3;
        }

        cycles[index - 1].position.x = x;
        cycles[index - 1].position.y = y;

        if (index === player.index) {
          stroke("white")
          strokeWeight(5)
          noFill();
          ellipse(x + 30, y, 70, 70); //POINT 1
          

          this.handleTyre(index);
          this.handlePowerCoins(index);
          this.handleObstacleCollision(index);
          this.handleCycleACollisionWithCycleB(index);

          if(player.life <= 0){
            this.blast = true;
            this.playerMoving = false;
            player.score = 0;
            player.rank = 0;
            player.update();
          }

          // Changing camera position in y direction
          camera.position.y = cycles[index - 1].position.y;
        }
      }

      if (this.playerMoving) {
        player.positionY += 5;
        player.update();
      }

      // handling keyboard events
      this.handlePlayerControls();

      // Finshing Line
      const finshLine = height * 6 - 100;

      if (player.positionY > finshLine) {
        gameState = 2;
        player.rank += 1;
        player.update();
        this.showRank();
        Player.updateCyclesAtEnd(player.rank);
      }

      drawSprites();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
        cyclesAtEnd: 0
      });
      window.location.reload();
    });
  }

  showLife() {
    push();
    image(lifeImage, width / 2 - 130, height - player.positionY - 350, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 350, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, height - player.positionY - 350, player.life, 20);
    noStroke();
    pop();
  }

  showTyreBar() {
    push();
    image(tyreImage, width / 2 - 130, height - player.positionY - 300, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 300, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 300, player.tyre, 20);
    noStroke();
    pop();
  }

  showLeaderboard() {
    var leader1, leader2, leader3, leader4;
    var players = Object.values(allPlayers);
    
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader3 =
        players[2].rank +
        "&emsp;" +
        players[2].name +
        "&emsp;" +
        players[2].score;

      leader4 =
        players[3].rank +
        "&emsp;" +
        players[3].name +
        "&emsp;" +
        players[3].score;
    

    this.leader1.html(leader1);
    this.leader2.html(leader2);
    this.leader3.html(leader3);
    this.leader4.html(leader4);
  }

  handlePlayerControls() {
    if(!this.blast){
      if (keyIsDown(UP_ARROW)) {
        this.playerMoving = true;
        player.positionY += 10;
        player.update();
      }
  
      if (keyIsDown(LEFT_ARROW) && player.positionX > width / 5 - 50) {
        this.leftKeyActive = true;
        player.positionX -= 5;
        player.update();
      }
  
      if (keyIsDown(RIGHT_ARROW) && player.positionX < width/1.5 + 300) {
        this.leftKeyActive = false;
        player.positionX += 5
        player.update();
      }
    }
    
  }

  handleTyre(index) {
    // Adding fuel
    cycles[index - 1].overlap(tyres, function(collector, collected) {
      player.tyre = 185;
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });

    // Reducing Player car fuel
    if (player.tyre > 0 && this.playerMoving) {
      player.tyre -= 0.3;
    }

    if (player.tyre <= 0) {
      gameState = 2;
      this.gameOver();
    }
  }

  handlePowerCoins(index) {
    cycles[index - 1].overlap(powerCoins, function(collector, collected) {
      player.score += 21;
      player.update();
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });
  }

  handleObstacleCollision(index){
    if(cycles[index - 1].collide(obstacles)){

      if(this.leftKeyActive){
        player.positionX += 100;
      }
      else{
        player.positionX -= 100;
      }

      if(player.life > 0){
        player.life = player.life - 185/4
      }
      player.update();

    }
  }

  handleCycleACollisionWithCycleB(index){
    if(index === 1){
      if(cycles[index - 1].collide(cycles[1]) || cycles[index -1].collide(cycles[2]) || cycles[index -1].collide(cycles[3])) {

        if(this.leftKeyActive){
          player.positionX += 100;
        }
        else{
          player.positionX -= 100;
        }
  
        if(player.life > 0){
          player.life = player.life - 185/4
        }
        player.update();
  
      }
    }

    if(index === 2){
      if(cycles[index - 1].collide(cycles[0])){

        if(this.leftKeyActive){
          player.positionX += 100;
        }
        else{
          player.positionX -= 100;
        }
  
        if(player.life > 0){
          player.life = player.life - 185/4
        }
        player.update();
  
      }
    }
  }

  showRank() {
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${player.rank}${"\n"}Score${"\n"}${player.score} `,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }

  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
}
