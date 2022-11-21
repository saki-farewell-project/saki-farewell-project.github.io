import { EntranceEffect } from "../entrance_effect";


export var fadeIn = new EntranceEffect(
	[ {opacity: 0}, { opacity: 1}], 
	{ duration: 1000, fill: 'forwards', easing: 'ease-out'}
);
export var fadeInDelayed = new EntranceEffect(
	[ {opacity: 0}, { opacity: 1}], 
	{ duration: 1000, fill: 'forwards', easing: 'ease-out', delay: 300}
);
export var fadeInLatched = new EntranceEffect(
	[ {opacity: 0}, { opacity: 1}], 
	{ duration: 1000, fill: 'forwards', easing: 'ease-out', delay: 650}
);



export var fadeInRightwards = new EntranceEffect(
	[ { transform: 'translateX(-20%)', opacity: 0}, { transform: 'translateX(0px)', opacity: 1}], 
	{ duration: 600, fill: 'forwards'}
);
export var fadeInRightwardsDelayed = new EntranceEffect(
	[ { transform: 'translateX(-20%)', opacity: 0}, { transform: 'translateX(0px)', opacity: 1}], 
	{ duration: 600, fill: 'forwards', easing: 'ease-out', delay: 300}
);
export var fadeInRightwardsLatched = new EntranceEffect(
	[ { transform: 'translateX(-20%)', opacity: 0}, { transform: 'translateX(0px)', opacity: 1}], 
	{ duration: 600, fill: 'forwards', easing: 'ease-out', delay: 650}
);



export var fadeInLeftwards = new EntranceEffect(
	[ { transform: 'translateX(20%)', opacity: 0}, { transform: 'translateX(0px)', opacity: 1}], 
	{ duration: 600, fill: 'forwards'}
);
export var fadeInLeftwardsDelayed = new EntranceEffect(
	[ { transform: 'translateX(20%)', opacity: 0}, { transform: 'translateX(0px)', opacity: 1}], 
	{ duration: 600, fill: 'forwards', easing: 'ease-out', delay: 300}
);
export var fadeInLeftwardsLatched = new EntranceEffect(
	[ { transform: 'translateX(20%)', opacity: 0}, { transform: 'translateX(0px)', opacity: 1}], 
	{ duration: 600, fill: 'forwards', easing: 'ease-out', delay: 650}
);



export var fadeInDownwards = new EntranceEffect(
	[ { transform: 'translateY(-50%)', opacity: 0}, { transform: 'translateY(0px)', opacity: 1}], 
	{ duration: 800, fill: 'forwards', easing: 'ease-out'}
);
export var fadeInUpwards = new EntranceEffect(
	[ { transform: 'translateY(50%)', opacity: 0}, { transform: 'translateY(0px)', opacity: 1}], 
	{ duration: 800, fill: 'forwards', easing: 'ease-out'}
);
export var fadeInUpwardsDelayed = new EntranceEffect(
	[ { transform: 'translateY(50%)', opacity: 0}, { transform: 'translateY(0px)', opacity: 1}], 
	{ duration: 800, fill: 'forwards', easing: 'ease-out', delay: 300}
);



export var fadeInExplosive = new EntranceEffect(
	[ { transform: 'scale(0.5, 0.5)', opacity: 0}, { transform: 'scale(1, 1)', opacity: 1}], 
	{ duration:600, fill: 'forwards', easing: 'ease-out'}
);
export var fadeInExplosiveDelayed = new EntranceEffect(
	[ { transform: 'scale(0.5, 0.5)', opacity: 0}, { transform: 'scale(1, 1)', opacity: 1}], 
	{ duration:600, fill: 'forwards', easing: 'ease-out', delay: 300}
);
export var fadeInExplosiveLatched = new EntranceEffect(
	[ { transform: 'scale(0.5, 0.5)', opacity: 0}, { transform: 'scale(1, 1)', opacity: 1}], 
	{ duration:600, fill: 'forwards', easing: 'ease-out', delay: 650}
);
