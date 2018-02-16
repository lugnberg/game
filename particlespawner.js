class ParticleSpawner extends Entity{

	constructor(x,y,life, amount,col){
		super(x,y);
		this.life = life;
		this.amount =amount;
		this.col = col;

		for(var i = 0; i < this.amount; i++){
			particles.push(new Particle(this.x, this.y, this.life, col));
		}
	}


}