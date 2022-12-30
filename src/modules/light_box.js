import "../css/light_box.css";
import { merge, wrapDiv, wrapDivRecursive, wrapDivStyled, wrapLink } from "../utils";
import Boarder from "../config/border";
import Image from "./Image";
import ImageLinked from "./Image_linked";
import "../css/image.css";
import "../css/light_box.css";
import Slider from "./slider";
import UniqueIDGenerator from "./unique_id_generator";
import { fadeInDelayed, fadeInExplosiveDelayed, fadeInExplosiveLatched, fadeInRightwardsLatched} from "./defaults/entrance_effect";
import { ProtectedArray } from "./entrance_effect";

export default class LightBox extends Slider{
    static UID_GEN = new UniqueIDGenerator("light-box-uid");
    static ESC_IMG = "fig/x.png";
    static HIDDENS = new ProtectedArray();
    constructor(){
        super();
        this.id = LightBox.UID_GEN.genId();
        this.setClickWidth("45px");
        this.setPadding(Boarder.LEFT, "45px");
        this.setPadding(Boarder.RIGHT, "45px");
        this.hideBar();
    }

    setText(text){
        this.txt = text;
    }

    toggleWindow(close){
        console.log("fuiyoh!", this.id);
        var elem = document.getElementById(this.id);
        if (!elem)
            return;
        
        console.log("fuiyoh!~~~!!!");
        elem.style.display = close ? "none": "block";
    }

    get(){
        var img = new Image();
        img.setWidth("100%");
        var items = [wrapDiv("esc", img.get(LightBox.ESC_IMG))];

        items[0] = <div onClick={this.toggleWindow.bind(this, true)}>{items[0]}</div>;
        if (this.txt)
            items.push(wrapDivRecursive(["container", "text"], this.txt));
        else if (this.items.length == 1)
            items.push(wrapDiv("container", this.items[0]));
        else
            items.push(wrapDiv("container", super.get()));

        LightBox.HIDDENS.push(wrapDiv({className: "light-box", id: this.id}, items));
        return this.toggleWindow.bind(this, false);
    }
}