class Projectile extends Entity{

	constructor(x,y,xGoal, yGoal){
		super(x,y);
		this.xGoal = xGoal;
		this.yGoal = yGoal;


		this.speed = 15;
		this.radius = 5;
		this.diameter = this.radius *2;
		//this.range of bullet until it shall be removed
		this.origin = [x, y];
		this.travelled;
		this.destroy = false;
		this.range = 1200;
		//if the bullet this.hit something
		this.hit = false;
		this.dirX;
		this.dirY;
		this.bulletDrop = -0.2;
		this.age = 0;

		this.getDirection();

	}



	getDirection(){
		//normalized direction of bullet
		this.dirX = (this.xGoal - this.x); 
		this.dirY = this.yGoal - this.y;
		var angle = Math.atan(this.dirY/this.dirX);
		if(this.dirX > 0 && this.dirY <0){
			this.dirX = Math.cos(angle);
			this.dirY = Math.sin(angle);
		} else if(this.dirX >0 && this.dirY > 0){
			this.dirX = Math.cos(angle);
			this.dirY = Math.sin(angle);
		}else{
			this.dirX = -Math.cos(angle);
			this.dirY = -Math.sin(angle);
		}
	}

	update(){ //method
		//update position and this.travelled
		this.age++;
		this.x += this.dirX * this.speed;
		this.y += this.dirY * this.speed - this.bulletDrop * this.age;
		this.travelled = Math.sqrt(Math.pow(this.x  - this.origin[0], 2) + Math.pow(this.y - this.origin[1],2));

		//this.destroy if this.travelled distance or this.hit object
		if(this.travelled > this.range || this.hit){
			console.log("destroy bullet");
			this.destroy = true;
		}

	}

	show(){
		noStroke();
		fill(200,0,0);
		ellipse(this.x, this.y, this.diameter, this.diameter)

	}

	projectileBallCollision(balls){
		for(b of balls){
			if(this.circleCollision(b)){
				b.destroy = true;
				this.hit = true;
				this.collision = true;
			}
		}
	}

	
}










