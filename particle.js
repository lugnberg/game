class Particle extends Entity{

	constructor(x,y, life, col){
		super(x,y);
		this.life = life;
		this.col = col;

		this.xa = random(-3,3);
		this.ya = random(-2,2);
		this.za = random(-2,2);

		this.zz = random(-1,1);
		this.remove = false;
		
		
		this.radius = 3;
	}

	update(){
		this.reduceLife();

		this.za += 0.2;

		if(this.zz < 0){
			this.xa *= 0.5;

			this.zz = 0;
			this.za *= -0.5;
			this.ya *= 0.5;
		}
		this.move(this.xa, this.ya + this.za + this.zz);
		this.show();
		if(this.destroy()){
			this.remove = true;
		}	
	}

	move(xa,ya){
		if(!this.collision){
			this.x += xa;
			this.y += ya;
		}
	}

	destroy(){
		if(this.life < 0){
			return true;
		}
		return false;
	}

	reduceLife(){
		this.life--;
	}

	show(){
		fill(this.col);
		rect(this.x, this.y, this.radius, this.radius);
	}





}