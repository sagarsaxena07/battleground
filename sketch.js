var bg, backGroundImg
var canvas
var player
var tank
var bullet, playerBulletImg, tankBulletImg
var playerBulletGroup, tankBulletGroup
var mineImg
var mineGroup
var message
var gameState = 0
var score = 0
var hitCount = 0 
function preload() {
  backGroundImg = loadImage("background.png")
  playerImg = loadImage("player.png")
  playerBulletImg = loadImage("playerbullet1.png")
  tankImg = loadImage("tank.png")
  tankBulletImg = loadImage("tankbullet.png")
  mineImg = loadImage("mine.png")
}

function setup() {
  canvas = createCanvas(windowWidth - 100, windowHeight)
  bg = createSprite(width / 2, height / 2, width, height)
  bg.addImage("bg", backGroundImg)
  bg.scale = 5.3
  bg.x = bg.width / 2
  player = createSprite(200, height - 240)
  player.addImage(playerImg)
 // player.debug = true
  player.setCollider("rectangle", 0 , 0 , player.width/2 , player.height - 50)
  tank = createSprite(width - 200, height - 100)
  tank.addImage(tankImg)
  tank.setCollider("rectangle", 0 , 0 , tank.width - 150 , tank.height)
  //tank.debug = true
  invisibleGround = createSprite(200, 760, 400, 10);
  invisibleGround.visible = false

  playerBulletGroup = new Group()
  tankBulletGroup = new Group()
  mineGroup = new Group()
}

function draw() {
  background("white")
  if (gameState === 0) {
    textSize(20)
    fill("white")
    
    if (keyDown("space")) {
      gameState = 1
    }
  } else if (gameState === 1) {
    if(playerBulletGroup.isTouching(tank)){
      hitCount = hitCount + 1
      playerBulletGroup.destroyEach()
    
    }
    if (playerBulletGroup.isTouching(tankBulletGroup)){
      playerBulletGroup.destroyEach()
      tankBulletGroup.destroyEach()
    }
    if (hitCount === 10){
      message = "You Win"
      gameState = 2
    }
    if (tankBulletGroup.isTouching(player) || mineGroup.isTouching(player) ){
      message = "You Lost"
      gameState = 2
    }
    if (bg.x < 0) {
      bg.x = bg.width / 2
    }
    if (keyDown("space") && player.y > 100) {
      player.velocityY = -20;
    }
    player.velocityY = player.velocityY + 0.8
    player.collide(invisibleGround);
    if (keyDown(RIGHT_ARROW)) {
      spawnPlayerBullet()
    }
    score = 0.01 + score
    spawnTankBullet()
    spawnMines()
  }else if (gameState === 2){
    player.velocityY = 0
    mineGroup.setVelocityXEach(0)
    tankBulletGroup.setVelocityXEach(0)
    playerBulletGroup.setVelocityXEach(0)
    mineGroup.setLifetimeEach(-1)
    tankBulletGroup.setLifetimeEach(-1)
    playerBulletGroup.setLifetimeEach(-1)
  }

  drawSprites()
  textSize (25)
  fill("white")
  text("Score : " + Math.round (score),width - 200 , 80)
  text("Hitcount : " + hitCount,width-200,120) 
  if (gameState === 0){
      text("Press Space To Start", width / 2 - 200, 100)
  }
   if (gameState === 2){
      text(message,width / 2 -100 ,height/2)
  }
} 

function spawnPlayerBullet() {
  if (frameCount % 5 === 0) {
    var bullet = createSprite(player.x + 50, player.y + 20, 10, 10)
    bullet.addImage(playerBulletImg);
    bullet.scale = 0.1;
    bullet.velocityX = 3;
    bullet.lifetime = width
    playerBulletGroup.add(bullet)
    //bullet.debug = true
  }
}

function spawnTankBullet() {
  if (frameCount % 350 === 0) {
    var bullet = createSprite(tank.x - 55, tank.y - 30, 10, 10)
    bullet.addImage(tankBulletImg);
    bullet.scale = 0.4;
    bullet.velocityX = -4;
    bullet.lifetime = width
    tankBulletGroup.add(bullet)
    //bullet.debug = true
    bullet.setCollider("rectangle", 0 , 0, bullet.width,bullet.height/2)

  }

}

function spawnMines() {
  if (frameCount % 100 === 0) {
    var mines = createSprite(1050, 750)
    mines.addImage(mineImg);
    mines.scale = 0.08;
    mines.velocityX = -4;
    mines.lifetime = width
    mineGroup.add(mines)
    player.depth = mines.depth + 1
    tank.depth = mines.depth + 1
   // mines.debug = true
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -4;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}