import { Mutex } from "async-mutex";
import { scrolledIntoView } from "../utils";
import UniqueIDGenerator from "./unique_id_generator";


/** internal stuff**/

export class ProtectedArray extends Array{
	constructor(){
		super();
		this.mutex = new Mutex();
	}

	append(item){
		this.mutex.acquire();
		const id = this.length;
		this.push(item);
		this.mutex.runExclusive();

		return id;
	}

}


export class EntranceEffect{
	static PRIMARY = 1;
	static SCROLL = 0;

	static allEffects = new ProtectedArray();
	static allQueries = [new Map(), new Map()];

	static stopFlag = false;
	static stopMutices = [new Mutex(), new Mutex()];

	static uidGen = new UniqueIDGenerator("entrance-effect");

	static timerCallBack(isPrimary){
		EntranceEffect.stopMutices[isPrimary].acquire();
		for(let [uid, effID] of EntranceEffect.allQueries[isPrimary]){
			if(EntranceEffect.stopFlag)
				break;
	
			var elem = document.getElementById(uid);
			if(!elem)
				continue;
	
			if(isPrimary || scrolledIntoView(elem)){
				let effect = EntranceEffect.allEffects[effID];
				elem.animate(effect.keyframes, effect.options);
				EntranceEffect.allQueries[isPrimary].delete(uid);
			}
	
		}
	
		EntranceEffect.stopMutices[isPrimary].runExclusive();
	
	}

	static stopAllRequest(){
		EntranceEffect.stopFlag = true;

		//wait until callback ended
		EntranceEffect.stopMutices[1].acquire();
		EntranceEffect.stopMutices[0].acquire();

		EntranceEffect.allQueries[1].clear();
		EntranceEffect.allQueries[0].clear();

		EntranceEffect.stopMutices[1].runExclusive();
		EntranceEffect.stopMutices[0].runExclusive();

	}

	static startAllRequest(){
		EntranceEffect.stopFlag = false;
	}

	static debug(){
		console.log("primary:\t"+EntranceEffect.allQueries[1].size.toString());
		console.log("scroll:\t"+EntranceEffect.allQueries[0].size.toString());
	}
	
	static timers = [
		setInterval(EntranceEffect.timerCallBack, 10, EntranceEffect.PRIMARY), 
		setInterval(EntranceEffect.timerCallBack, 10, EntranceEffect.SCROLL) 
	];
	
	constructor(keyframes, options){
		this.effectID = EntranceEffect.allEffects.append(
			{keyframes: keyframes, options: options});
		
	}

	get(... args){
		if(args.length == 1){
			args.push(args[0]);
			args[0] = EntranceEffect.SCROLL;
		}
			
		const uid = EntranceEffect.uidGen.generateUniqueID();
		EntranceEffect.allQueries[args[0]].set(uid, this.effectID);

		const initStyle = EntranceEffect.allEffects[this.effectID].keyframes[0];
		return <div id ={uid} className="entrance-block" style={initStyle}>{args[1]}</div>;
	}
}



