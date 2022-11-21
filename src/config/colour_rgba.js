export default class ColourRGBA{
	/**
	* @param {number} r
	* @param {number} g
	* @param {number} b
	* @param {number} a
	*/
	constructor(r, g, b, a){
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	get(){
		return "rgba("+this.r+','+this.g+','+this.b+','+this.a+')';
	}
	getA(a){
		return "rgba("+this.r+','+this.g+','+this.b+','+a.toString()+')';
	}

	/**
	* @param {ColourRGBA} rgba 
	*/
	substract(rgba){
		return new ColourRGBA(this.r-rgba.r,
			this.g-rgba.g,this.b-rgba.b,this.a-rgba.a);
	}
	/**
	* @param {ColourRGBA} rgba 
	*/
	add(rgba){
		return new ColourRGBA(this.r+rgba.r,
			this.g+rgba.g,this.b+rgba.b,this.a+rgba.a);
	}
	/**
	* @param {number} x 
	*/
	multiply(x){
		return new ColourRGBA(this.r*x,this.g*x,this.b*x,this.a*x);
	}
	/**
	* @param {number} x 
	*/
	divide(x){
		return this.multiply(1/x);
	}
	/**
	* @param {number} a
	*/
	setA(a){
		return this.a = a;
	}

	/**
	* @param {string} angle 
	* @param {number[]} ratios 
	* @param {ColourRGBA[]} colours 
	*/
	static getGradient(angle, ratios, colours){
		var grad = "linear-gradient("+angle;
		for(let i = 0; i < ratios.length; ++i)
			grad+=","+colours[i].get()+ratios[i].toString()+"%";

		return grad+")";
	}

}
