class Player extends Entity {
	



	constructor(x,y, speed, canvasW,canvasH){
		super(x,y,speed,speed,canvasW, canvasH)
		this.projectiles = new Array();
		
		//player size
		this.hitbox = {w: 60, h:104};//remember, we draw from center

		this.kills;
	
		this.beltCol =[0];
		this.spdMultiplier = 3;
		this.shot = false;
		this.shotCD = 10;
		this.rechargedGun =  true;
		this.counterChargeGun =  0;
		this.boost ={
			rested: true,
			boosting: false,
			active: 0,
			resting: 0,
			charge: 50,
			recharge:130
		};
		this.score = 0;
	}	


	move(){
		if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){ //65 == a key, 68 == d, 87 == w, 83 == s
			this.x = this.x - this.velocity.x;
		}
		if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
			this.x = this.x + this.velocity.x;
		}
		if(keyIsDown(UP_ARROW) || keyIsDown(87)){
			this.y = this.y - this.velocity.y;
		}
		if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
			this.y = this.y + this.velocity.y;
		}
	
		if(keyIsDown(32)){
			if(this.rechargedGun){
				
				this.shot = true;
			}
		}

		//Check x-boundaries
		if(this.x > this.canvasW - this.hitbox.w/2){
			this.x = this.canvasW - this.hitbox.w/2;
		}else if(this.x < this.hitbox.w/2){
			this.x = this.hitbox.w/2;
		}

		//Check y-boundaries
		if(this.y > this.canvasH - (this.hitbox.h/2)){
			this.y = this.canvasH - (this.hitbox.h/2) ;
		} else if(this.y < this.hitbox.h/2){
			this.y = this.hitbox.h/2;
		}
	}


	update(){	
		this.score = this.score +1;
		this.animation(this.x, this.y)
		this.updateProjectiles();
		this.boosts();
		

		if(this.shot){
			this.rechargedGun =false;
			this.projectiles.push(new Projectile(this.x, this.y, mouseX, mouseY));
		}

		if(!this.rechargedGun){
			this.shot = false;
			this.counterChargeGun++;
			if(this.counterChargeGun > this.shotCD){
				this.counterChargeGun = 0;
				this.rechargedGun = true;
			}
		}
	}

	getProjectiles(){
		return this.projectiles;
	}

	updateProjectiles(){
		for(var i = 0; i < this.projectiles.length; i++){
			this.projectiles[i].update();
			this.projectiles[i].show();
			if(this.projectiles[i].destroy){
				this.projectiles.splice(i,1);
			}
		}
	}

	animation(){
		stroke(0)
		strokeWeight(2);
		//Body 
		fill(230,30,30);
		rect(0, 0, 20, 80);
		//Belt
		fill(this.beltCol);
		rect(0, 0+25, 20, 10);
		//Head
		fill(230,30,30);
		ellipse(0, 0-30, 60, 60);
		//Eyes
		fill(0);
		stroke(0);
		ellipse(0-15, 0-30, 16, 32);
		ellipse(0+15, 0-30, 16, 32);
		fill(255);
		stroke(255);
		ellipse(0-15, 0-30, 8, 16);
		ellipse(0+15, 0-30, 8, 16);
		//Legs
		stroke(230,30,30);
		line(0-10, 0+40, 0-20, 0+50);
		line(0+10, 0+40, 0+20, 0+50);
		//Arms
		line(0-10, 0+10, 0-20, 0+5);
		line(0+10, 0+10, 0+20, 0+5);		
	}



	boosts(){
		if(keyIsDown(69) && this.boost.rested && !this.boost.boosting){
			this.velocity.x = this.velocity.x * this.spdMultiplier;
			this.velocity.y = this.velocity.y * this.spdMultiplier;
			this.boost.boosting = true;
			this.boost.rested = false;
		} //32 is spacebar

		if(this.boost.boosting){
			this.boost.active += 1;
			this.beltCol = [255,255,0];

			if(this.boost.active  >= this.boost.charge){
				this.boost.active = 0;
				this.boost.boosting = false;
				this.velocity.x = this.velocity.x / this.spdMultiplier;
				this.velocity.y = this.velocity.y / this.spdMultiplier;
			}
		}

		if(!this.boost.rested && !this.boost.boosting){
			this.boost.resting += 1;
			this.beltCol = [255];
		}

		if(this.boost.resting >= this.boost.recharge){
			this.boost.resting = 0;
			this.boost.rested = true;
			this.beltCol = [0];
		}

	}

}



//function Player(x, y, canvasW, canvasH){
//}