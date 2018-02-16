class Spaceship extends Player{
	

	constructor(x,y, speed, canvasW,canvasH){
		super(x,y,speed,canvasW,canvasH);
		this.radius = 25;
		this.hitbox ={w: this.radius*2, h: this.radius*2};
	}

	animation(){//overriding with new animation as a a spaceship. this is a circular object!!! :)
		translate(this.x,this.y);
		rotate(Math.atan2(mouseY - this.y, mouseX - this.x));
		stroke(0)
		strokeWeight(2);



		//Body
		fill([230,30,30]);
		ellipse(0,0,2*this.radius, 2*this.radius);

		//chargebelt
		fill(this.beltCol);
		ellipse(0,0,15,15);

		//gun
		fill(0);
		rect(30,0,25,7);
		rotate(-Math.atan2(mouseY - this.y, mouseX -this.x));
		translate(-this.x,-this.y);

	}

}