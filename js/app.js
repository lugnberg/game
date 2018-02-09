//the actual game file

// preloads all its content before setup gets to run
var charImg = document.createElement('charImg');
var monster;
function preload() {
  charImg = loadImage('js/char.png');
}

function setup() {
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  //var appCanvas = createCanvas(screenWidth, (2/3)*screenWidth);
  var appCanvas = createCanvas(screenWidth, screenHeight);
  background('#fce262');
  appCanvas.parent('htmlCanvas');

  //image(img, 0, 0); // PRELOAD_MEDIA
  monster = character(this.width/2, this.height/2, charImg);
}

function draw() {
  /**if (mouseIsPressed) {
  fill(200);
} else {
fill(255);
}
ellipse(mouseX, mouseY, 20, 20);*/
  if (mouseIsPressed) {
    monster.setX(mouseX - (50/2)); // should be img width/2
    monster.setY(mouseY - (45/2));
    background('#fce262');
    monster.dispImg();
  }
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
    dispImg: function(){
      image(this.icon, this.x, this.y);
    },
    characteristics: function(){
      return this.name + " has " + (this.goodness*100) + "% good intentions.";},
      setX: function(x) {this.x = x;},
      setY: function(y) {this.y = y;}
    };
    //return ellipse(char.x, char.y, 10, 10);
    char.dispImg();
    return char;
}
