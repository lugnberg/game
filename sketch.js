var canvasW = 1200;
var canvasH = 720;



let balls;
var player;
var level;
var score;
var spd;


function setup() {
	background(51);
	
	level = 0;
	createCanvas(canvasW, canvasH);
	fullscreen();
	ellipseMode(CENTER);
	rectMode(CENTER);
	spd = 2;	
	
	balls = new Array();
	player = new Spaceship(400,400, 4, canvasW, canvasH);
	particles = new Array();
	balls.push(new Ball(600,300,2,2, canvasW, canvasH,10,25,true));
	balls.push(new Ball(800,300,-2,2,canvasW, canvasH,10,25,true));
	balls.push(new Ball(850,300,2,-2,canvasW, canvasH,10,25,true));
	balls.push(new Ball(900,300,-2,-2,canvasW, canvasH,10,25,true));	
}

function draw() {
	frameRate(60);
	background(51);
	console.log(spd);

	//bouncing balls
	for(b of balls){
		if(balls.length > 20){ b.mutating = false} else {b.mutating = true}; //prevent oversaturating map
		for(other of balls){
			if(b != other && b.circleCollision(other)){
				b.handleElasticCollision(other);
			}
		}

		if(b.getSplitting()){
			b.splitBall();
			balls.push(new Ball(b.x+b.velocity.x, b.y+b.velocity.y,-b.velocity.x,-b.velocity.y,canvasW, canvasH,10,b.radius, true));
		}
		if(b.destroy){
			particles.push(new ParticleSpawner(b.x,b.y,30,150, [130,255,80]));
			balls.splice(balls.indexOf(b),1);
		}

		if(player.circleCollision(b)){
			alert("Game Over!\n\nYour score is: " + score  + "\nAt level: " + level);
			player.score=0;
			setup();
		}

		b.update();
		b.show();
	}

	//player
	player.move();
	player.update();//bullets in player class
	newLevel(); //if all balls are deleted we create a new level
	drawScore();

	for(p of particles){
		p.update();
		if(p.remove){
			particles.splice(particles.indexOf(p),1);
		}
	}

	for(p of player.projectiles){
		p.projectileBallCollision(balls);
		/*if(p.collision){
			particles.push(new ParticleSpawner(p.x,p.y,30,150, [200,0,0]));
		}*/
	}



	
  	console.log("Draw Function");
}




//functions:
function drawScore(){
	score = player.score + player.score*level;
	noStroke();
	textSize(30);
	fill(250,105,105);
	text('Level: ' + level, 1065,30);
	text('Score: ' + score, 10, 30);
}

function newLevel(){
		if(balls.length == 0){
		level++;
		spd = spd + 1/2;
		if(level % 4 == 0){
			spd = 2;
		}
		//for(var i = 0; i<level; i++ )
		for(var i = 0; i <= level / 4; i++){
			balls.push(new Ball(1500, random(0,canvasH),  spd,  spd, canvasW, canvasH,10,25,true));
			balls.push(new Ball(-300, random(0,canvasH),  spd,  spd, canvasW, canvasH,10,25,true));
			balls.push(new Ball(random(0,canvasW), -300, spd,  spd, canvasW, canvasH,10,25,true));
			balls.push(new Ball(random(0,canvasW), 1020,  spd,  spd, canvasW, canvasH,10,25,true));		
		}
	}
}





function mousePressed(){	
	
}

function roundNumber(rnum, rlength) { 
    var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    return newnumber;
}

