export default class Border{
    static TOP=0;
    static RIGHT=1;
    static BOTTOM=2; 
    static LEFT=3; 
    static TOP_LEFT = 0;
    static TOP_RIGHT=1;
    static BOTTOM_RIGHT=2;
    static BOTTOM_LEFT=3; 
    static ALL=4; 

    constructor(){
        this.data = ["0", "0", "0", "0"];
        this.modified = false;
    }
    
    set(edgeType, val){
        this.modified = true;
        if(edgeType==Border.ALL)
            this.data.fill(val);
        else
            this.data[edgeType]=val;
    }

    get(){
        var style = "";
        for(let val of this.data)
            style = style.concat(val, " ");
    
        return style;
    }

    isModified(){
        return this.modified;
    }


}