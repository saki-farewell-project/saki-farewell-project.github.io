import "../css/flex_cols.css";
import { merge, wrapDiv, wrapDivStyled} from "../utils";
import Column from "./column";


export default class FlexCols extends Column{
    constructor(){
        super(2);
    }

    get(){
        var items = [];
        for (var i in this.items){
            const style = {flex: this.ratios[i].toString() + "%"};
            const item = wrapDivStyled("item", style, this.items[i]);
            items.push(item);
        }

        return wrapDiv("flex-cols", items);
    }
}
