import ColourRGBA from "../config/colour_rgba";
import "../css/page_switcher.css";
import { merge, wrapDiv } from "../utils";
import { fadeInExplosive } from "./defaults/entrance_effect";
import TitledMediaText from "./titled_media_text";

export default class PageSwithcer{
    constructor(link, ... objs){
        this.link = link; 
        this.item = merge(objs);
    }

    setBackground(r, g, b, a){
        this.background = new ColourRGBA(r, g, b, a);
    }
    
    get(){
        var style = {width: "60%", marginLeft: "20%"};
        if(this.background)
            style.backgroundColor = this.background.get();

        return TitledMediaText.createButton(this.item, this.link, style);
    }
}