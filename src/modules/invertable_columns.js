import Border from "../config/border";
import "../css/invertable_columns.css";
import { merge} from "../utils";
import ColourRGBA from "../config/colour_rgba";


export default class InvertableColumn{
    constructor(){
        this.items = [0, 0];
        this.margin =  new Border();
        this.padding =  new Border();
        this.corners = new Border();
        this.colour = new ColourRGBA(0, 0, 0, 0);
        this.imgBackground = "none";

    }

    setColour(r, g, b, a){
        this.colour = new ColourRGBA(r, g, b, a);
    }

    setCorner(ind, val){
        this.corners.set(ind, val);
    }
    setMargin(ind, val){
        this.margin.set(ind, val);
    }
    setPadding(ind ,val){
        this.padding.set(ind, val);
    }

    insert(ind, ...items){
        this.items[ind] = merge(items);
    }


    setBackgroundImage(path){
        this.imgBackground = "url("+path+")";
    }


    get(){
        return (
            <div className="w3-container" style = {{maxWidth: "auto", backgroundImage: this.imgBackground, 
                margin: this.margin.get(), padding: this.padding.get(), 
                backgroundColor: this.colour.get(), borderRadius: this.corners.get(), 
                backgroundSize: "contain", backgroundRepeat: "no-repeat"}}>
                <div className="invertable_row">
                    {this.items.map(function(x, i){
                        return (<div className="invertable_columns" key={i}> {x}</div>);
                    })}
                </div>
            </div>
        );

    }

}
