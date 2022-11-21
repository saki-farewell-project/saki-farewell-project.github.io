export default class NumberSuffix{
    /**
    * @param {string} arg val, suffixed by % or px
    */
    constructor(arg){
        var iend = arg.length-1;
        for(; iend > -1; iend--)
            if(arg[iend] >= '0' && arg[iend] <= '9')
                break;
        
        this.suffix = arg.substring(++iend, arg.length);
        this.val = parseFloat(arg.substring(0, iend));
    }

    get(){
        return this.val.toString()+this.suffix;
    }

    setVal(val){
        this.val = val;
    }
    
    /**
    * @param {char} op operator
    * @param {NumberSuffix} numSuffix 
    * @returns {string} calc()
    */
    calc(op, numSuffix){
        return "calc("+this.get()+' '+op+' '+numSuffix.get()+')';
    }

    clone(){
        return new NumberSuffix(this.get());
    }

    static initFromNumberAndSuffix(val, suffix){
        return new NumberSuffix(val.toString()+suffix);
    }
}