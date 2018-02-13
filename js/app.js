//the actual game file

// declaration of data
var screenWidth;
var screenHeight;
var charImg = document.createElement('charImg');
var monster;

// preloads all its content before setup gets to run
function preload() {
  charImg = loadImage('js/char.png');
}

function setup() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  //var appCanvas = createCanvas(screenWidth, (2/3)*screenWidth);
  var appCanvas = createCanvas(screenWidth, screenHeight);
  background('#fce262');
  appCanvas.parent('htmlCanvas');

  //image(img, 0, 0); // PRELOAD_MEDIA
  monster = character(this.width/2, this.height/2, charImg);
}

function draw() {
  //if (mouseIsPressed) {
  //monster.setX(mouseX - (50/2)); // should be img width/2
  //monster.setY(mouseY - (45/2));
  moveCharacter(monster);
  if(mouseIsPressed){
    monster.fire(mouseX, mouseY);
  }
  monster.fbufUpt();
  background('#fce262');
  monster.dispImg();
  ellipse(50, 50, 20, 20);
  for(var i = 0; i < monster.getFireBuf().length; i++){
    if(monster.getFireBuf()[i] != null){
      //drawFire();
      //fill('#333333');
      ellipse(100, 100, 20, 20); // RITAR EJ
      ellipse(monster.getFireBuf()[i].getFireX(), monster.getFireBuf()[i].getFireY(), 20, 20);
    }
  }
  //}
}

function character(xp, yp, imgIcn) {
  var char = {
    name: "name",
    type: "typeOfCharacter",
    goodness: "goodness",
    speed: "speed",
    x: xp,
    y: yp,
    //image: image(charImg, this.x, this.y),
    icon: imgIcn,
    fireBuf: new Array(10),
    bufMaxIdx: 9,
    bufCnt: 0,
    dispImg: function(){
      image(this.icon, this.x, this.y);
    },
    characteristics: function(){
      return this.name + " has " + (this.goodness*100) + "% good intentions.";},
    setX: function(x) {this.x = x;},
    setY: function(y) {this.y = y;},
    getX: function(){return this.x;},
    getY: function(){return this.y;},
    getFireBuf: function(){return this.fireBuf},
    fire: function(mx, my){
        this.fireBuf[this.bufCnt] = fireOb(this.x, this.y, mx, my);
        this.bufCnt++;
        if(this.bufCnt > this.bufMaxIdx){this.bufCnt = 0;}
    },
    fbufUpt: function() {fireBufUpd(this.fireBuf);}
      // add new bullet
      // draw fire
      // update bullets
  };
  //return ellipse(char.x, char.y, 10, 10);
  char.dispImg();
  return char;
}

function moveCharacter(chOb) { // a, s, d, w
  var tempX = chOb.getX();
  var tempY = chOb.getY();

  if(keyIsDown(68) && (screenWidth-(45) >= tempX)) { // should be imgWidth
    chOb.setX(tempX + 3);
  }
  if(keyIsDown(65) && (0 < tempX)) {         // should be imgWidth
    chOb.setX(tempX - 3);
  }
  if(keyIsDown(87) && (0 < tempY)) {         // should be imgWidth
    chOb.setY(tempY - 3);
  }
  if(keyIsDown(83) && ((screenHeight - 50) > tempY)) {        // should be imgWidth
    chOb.setY(tempY + 3);
  }
}

function calcFireAng(ax, ay, bx, by) {
  var dx = ax - bx;
  var dy = ay - by;
  var hyp = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  var angle = Math.atan2(dy, dx);
  return angle;
}

function fireOb(x, y, targetX, targetY){
  var fireOb = {
    fireX: x,
    fireY: y,
    fireAng: calcFireAng(this.fireX, this.fireY, targetX, targetY),
    alive: true,
    temp: 10,
    getFireX: function(){return this.fireX;},
    getFireY: function(){return this.fireY;},
    update: function(){
      this.fireX += (3*Math.cos(this.fireAng));
      this.fireY += (3*Math.sin(this.fireAng));
      //check collison with other objects or outside canvas
      // update alive
      // if false -> activate terminiate itself funct.
      this.temp--;
      if(this.temp<0){this.terminate(this);}
    },
    terminate: function(fiOb){
      this.alive = false;
      fiOb = null;
    }
  };
}

function fireBufUpd(buf){
  var size = buf.length;
  for(var i = 0; i < size; i++){
    if(buf[i] != null){
      buf[i].update();
    }
  }
  return false;
}










// ***********************************
