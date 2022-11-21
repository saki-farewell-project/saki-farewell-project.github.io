import { Mutex } from "async-mutex";

export default class UniqueIDGenerator extends Mutex{
    constructor(preffix){
        super();
        if(preffix.slice(-1) != "-")
            preffix+="-";

        this.preffix = preffix;
        
        this.uid = 0;
    }

    generateUniqueID(){
        this.acquire();
        const uid = this.uid++;
        this.runExclusive();

        return this.preffix+uid.toString();
    }
}

export class UniqueIDMap extends Map{
    constructor(preffix){
        super();
        this.uidGen = new UniqueIDGenerator(preffix);
    }

    insert(item){
        const uid = this.uidGen.generateUniqueID();
        this.set(uid, item);
        return uid;
    }
}
