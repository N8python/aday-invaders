class Bullet {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  render(){
    fill(255);
    rect(this.x, this.y, 6, 20);
  }
  move(){
    this.y-=5;
  }
}

class Enemy{
  constructor(x, y, waveNumber){
    this.speed = 0.2;
    this.defaultSpeed = 0.6;
    this.deathFrame = 0;
    this.speed = 0.2*waveNumber;
    this.x = x;
    this.y = y;
  }
  render(){
    if(this.deathFrame==0){
      fill(150, 150);
      rect(this.x, this.y, 25, 25);
    }else{
      fill(255-this.deathFrame*5, 140-this.deathFrame*2, 0);
      ellipse(this.x, this.y, this.deathFrame*5, this.deathFrame*5);
  }
    }
  move(){
    this.y+=this.speed;
  }
  cc() {
    for (let bullet of bullets) {
      if(bullet.x >= this.x && bullet.y>= this.y && bullet.x<=this.x+25
      && bullet.y<=this.y+25){
        return true;
      }
    }
  return false;
  }
}

let bullets = [];
let enemies = [];
let cooldown = 0;
let waveNumber = 1;
let shooting;
let playerX, playerY;
let left, right;
let playerSpeed = 3;
let playerWidth = 45;
let playerRadius = playerWidth/2;
let gameState = "start";
let score = 0;
let level = 0;
function setup(){
  createCanvas(600,600);
  playerX = width/2;
  playerY = height-100;
  let gridWidth = 10;
    for(let i = 0; i < gridWidth; i++){
      for(let j = 0; j < gridWidth; j++){
    enemies.push(new Enemy(i*gridWidth*4 + width/5, j*gridWidth*4, waveNumber));
    }
  }
}
function draw(){
  cooldown--;
  background(0);
  if(gameState == "start" ){
  fill(255);
  textAlign(CENTER);
  textSize(80);
  text("Space Baddies", width/2, height/2);
  textSize(20);
  text("Click to Start", width/2, height/2+100);
  }else if(gameState == "over"){
  fill(255);
  textAlign(CENTER);
  textSize(80);
  text("Game over", width/2, height/2);
  textSize(20);
  text("Your score " + score + ",", width/2, height/2+50);
  text("Your level " + level + ",", width/ 2, height/2+75);
  text("Click to Play Again", width/2, height/2+100);
  }else if (gameState == "play"){
    textAlign(LEFT);
    text("Score: " + score, 20, 20);
    text ("level: " + level, 20, 40);
  for(let enemy of enemies){
    enemy.render();
    enemy.move();
    if(enemy.cc() || enemy.deathFrame > 0){
      enemy.deathFrame += 1;
      if (enemy.deathFrame == 1) score++;
   }
   if(enemy.y > height) gameState = "over";
  }
 if (left && playerX >= playerRadius){
    playerX-=5;
  }
    if (right && playerX < width - playerRadius){
    playerX+=5;
    }
    if (shooting && cooldown < 1){
      bullets.push(new Bullet(playerX, playerY));



      cooldown = 15;
  }
  for(let bullet of bullets){
    bullet.render();
    bullet.move();


  }
  for(let i = 0; i < enemies.length; i++){
    if(enemies[i].deathFrame > 15){
      enemies.splice(i, 1);
   }
}
  if (enemies.length < 1){
    bullets = [];
    waveNumber++;
    level++;
    let gridWidth = 10 + level;
    for(let i = 0; i < gridWidth - level; i++){
      for(let j = 0; j < gridWidth; j++){
    enemies.push(new Enemy(i*(gridWidth-level)*4 + width/5, j*(gridWidth-level)*4-100, waveNumber));

    }
  }

  }
    fill(127, 156, 178);
  ellipse(playerX, playerY, 50, 50);
  }
}

function keyPressed(){
  if(keyCode == 37){
    left = true;
  }
  else if(keyCode == 39){
    right = true;
  }
  else if(keyCode == 32){
    shooting = true;
  }
}
function keyReleased(){
  if(keyCode == 37){
    left = false;
  }
  else if(keyCode == 39){
    right = false;
  }
  else if(keyCode == 32){
    shooting = false;
    }
  }
function mousePressed(){
  if(gameState == "start") {
    gameState = "play";
  }
  if(gameState == "over") {
  enemies = [];
  bullets = [];
  playerX = width/2;
  playerY = height - 100;
  level = 0;
    let gridWidth = 10;
    for(let i = 0; i < gridWidth; i++){
      for(let j = 0; j < gridWidth; j++){
    enemies.push(new Enemy(i*gridWidth*4 + width/5, j*gridWidth*4, waveNumber));
      }
    }
    score = 0;
    gameState = "play";
  }
}
