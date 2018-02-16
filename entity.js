class Entity{

	constructor(x, y, xSpeed,ySpeed, canvasW, canvasH){
		this.x = x;
		this.y = y;
		this.velocity ={x: xSpeed, y: ySpeed};
		this.canvasH = canvasH;
		this.canvasW = canvasW;

		this.collision;
		
		 
		this.hitbox; //used for box collision

	}

	update(){
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}

	show(){}

	roundNumber(rnum, rlength) { 
    	var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    	return newnumber;
	}

	getDistanceTo(other){
		return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
	}


	//collision types:
 	circleCollision(other){
		return this.getDistanceTo(other) < this.radius + other.radius;
	}	

	boxCircleCollision(other){
		
		
		if(other.x - other.radius < this.x + this.hitbox.w/2  && other.x + other.radius > this.x - this.hitbox.w/2 
			&& other.y + other.radius  > this.y - this.hitbox.h/2 && other.y - other.radius < this.y + this.hitbox.h/2){
			return true;		
		}
		
		return false;
			
			
	}





	//elastic collision
 	handleElasticCollision(other){
		var xVelDiff = this.velocity.x - other.velocity.x;
		var yVelDiff = this.velocity.x - other.velocity.y;
		var xDist = other.x - this.x; //notera att de är tvärt om från ovan
		var yDist = other.y - this.y;

	

		if(xDist * xVelDiff + yDist * yVelDiff >= 0){ //prevent overlapping 
			var angle = -Math.atan2(other.y - this.y, other.x - this.x); //grabs the angle between objects
			
			//store mass properties
			var m1 = this.mass;
			var m2 = other.mass;
		
        	var u1 = this.rotate(this.velocity, angle);
        	var u2 = this.rotate(other.velocity, angle);	
        	


			// Velocity after 1d collision equation
       		var v1 = { x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2), y: u1.y };
      		var v2 = { x: (u2.x * (m1 - m2) + 2 * m1 * u1.x)/ (m1 + m2) , y: u2.y };//since we rotate for 1D-collision, y-axis remains the same (not collision)

      		
			
			//new velocity after collision... Rotate back for new velocity...
			var vFinal1 = this.rotate(v1, -angle);
        	var vFinal2 = this.rotate(v2, -angle);

			//Set velocity for this particle
			this.velocity.x = vFinal1.x;
			this.velocity.y = vFinal1.y;

			//set velocity for other particle
			other.velocity.x = vFinal2.x;
			other.velocity.y = vFinal2.y;	
		}
	}

	rotate(vel, angle){	
		var rotateXY = {
        	x: vel.x * Math.cos(angle) - vel.y * Math.sin(angle),
        	y: vel.x * Math.sin(angle) + vel.y * Math.cos(angle)
    	};	
		return rotateXY;
	}
	
}