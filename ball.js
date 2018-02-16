class Ball extends Entity {

	constructor(x,y,xSpeed,ySpeed, canvasW,canvasH, mass,radius,grow){
		super(x,y,xSpeed, ySpeed,canvasW,canvasH);
				
		this.mass = mass;
		this.radius = radius;
		this.grow = grow;
		this.col = [130,255,80];
		this.growRad;
		this.growCount = 0;
		this.diam =radius * 2;
		this.splitting = false;
		this.destroy = false;
		this.mutating = true;
		
	}



	update(){
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		
		if(this.grow){
			if(this.growCount == 0){
				this.growRad = this.radius; //saving which size the ball should grow to
			}
			this.radius = 1 + this.growCount;
			this.growCount++;
			if(this.radius >= this.growRad){
				this.grow = false
				this.growCount = 0;
				this.radius = this.growRad;
				this.diam = 2*this.radius; 
			}
		}

		this.diam = this.radius *2; //make sure we are updating this.diameter
			

		

		//Fix for bouncing on canvas edges and getting balls back inside
		if(this.x +this.radius > this.canvasW){ 
			this.velocity.x = -Math.abs(this.velocity.x);
		}else if(this.x - this.radius < 0 ){
			this.velocity.x = Math.abs(this.velocity.x);
		}

		if(this.y + this.radius > this.canvasH){
			this.velocity.y = -Math.abs(this.velocity.y);
		}else if(this.y - this.radius < 0){
			this.velocity.y = Math.abs(this.velocity.y);
		}

		this.splitting = false;
		this.mutate();

		
	}

	show(){
		fill(this.col);
		noStroke();
		ellipseMode(CENTER);
		rectMode(CENTER);	
		ellipse(this.x ,this.y, this.diam, this.diam);
	}

	getX(){
		return this.x;
	}

	getY(){
		return this.y;
	}

	getMass(){
		return this.mass;
	}

	getSplitting(){
		return this.splitting;
	}

	splitBall(){
		this.radius = max(10, this.radius/2);
		this.velocity.x = this.velocity.x * 0.7;
		this.velocity.y = this.velocity.y * 0.7;
		this.grow = true;
	}

	getRadius(){
		return this.radius;
	}

	getSpeed(){
		return [this.velocity.x, this.velocity.y];
	}

	setSpeed(vel){
		this.velocity.x = vel.x;
		this.velocity.y = vel.y;
	}	

	mutate(){

		if(this.mutating){

			var r = random(0,1000);
			r = this.roundNumber(r,0);
			var r2 = random(0,10000);
			r2 = this.roundNumber(r2,0);

			if(r2 < 35 && this.x < this.canvasW && this.x> 0 && this.y < this.canvasH  && this.y >0){
				this.splitting = true;
			}

		
			if(r < 200 && this.x < this.canvasW-51 && this.x> 51 && this.y < this.canvasH - 51 && this.y >51){
				this.radius += 1;
				this.radius = Math.min(this.radius, 50);
				this.velocity.x = this.velocity.x*1.015;
				this.velocity.y = this.velocity.y*1.015;
			}
		}
	}

	





}











