import "../css/column.css";
import { merge, wrapDiv } from "../utils";
import Boarder from "../config/border";
import NumberSuffix from "../config/number_suffix";

export default class Column{
    constructor(nCols){
        this.nCols = nCols;
        this.items = [];
        this.ratios = [];
        this.margin =  new Boarder();
        this.padding =  new Boarder();
        this.colInterval = "10px";
        this.textAligns = [];
        
        const avg = 100.0/this.nCols;
        for(var i = 0; i < nCols; i++){
            this.items.push(0);
            this.ratios.push(avg);
            this.textAligns.push("center");
        }

    }

    setTextAlignment(ind, align){
        this.textAligns[ind] = align;
    }

    setRatiosEqually(){
        this.ratios.fill(100.0/this.nCols);
    }

    setColumnInterval(val){
        this.colInterval = val;
    }

    setMargin(ind, val){
        this.margin.set(ind, val);
    }
    setPadding(ind, val){
        this.padding.set(ind, val);
    }

    setRatios(...ratios){
        var sum = 0.0;
        for(let r of ratios)
            sum+=r;
        
        for(var i = 0; i < this.nCols; i++)
            this.ratios[i] = 100.0*ratios[i]/sum;
    }

    insert(ind, ...items){
        this.items[ind] = merge(items);
    }


    get(){
        var colInt = new NumberSuffix(this.colInterval);
        var extInt = colInt.clone();
        extInt.val/=2;

        var colItems = [];
        var colBorder = new Boarder();
        var ratioSuffix = new NumberSuffix("0%");
        for(var i = 0; i < this.items.length; ++i){
            colBorder.set(Boarder.LEFT, extInt.get());
            colBorder.set(Boarder.RIGHT, extInt.get());
            ratioSuffix.setVal(this.ratios[i]);
            const divArgs = {
                className: "column", 
                style: {
                    margin: colBorder.get(), 
                    textAlign: this.textAligns[i],
                    width: ratioSuffix.calc('-', colInt)
                }
            };

            colItems.push(wrapDiv(divArgs, this.items[i]));
        }

        const divArgs = [
            {
                className: "w3-container", 
                style: {
                    maxWidth: "auto", 
                    margin: this.margin.get(),
                    padding: this.padding.get()
                }
            }, 
            {
                className: "row", 
                style: {maxWidth: "auto"}
            }
        ];
        return wrapDiv(divArgs, colItems);
    }

}
