import "../css/slider.css";
import Image from "./Image";
import { getRawNumberAndSuffix, scrolledIntoView, wrapDiv, wrapDivStyled} from "../utils";
import { Mutex } from "async-mutex";
import ColourRGBA from "../config/colour_rgba";
import Border from "../config/border";
import Slider from "./slider";


export default class SliderPage extends Slider{
    //static uidGen = UniqueIDGenerator("slider-page-uid");
    constructor(){
        super();
        //this.hideArrow();
        //this.hideBar();
        this.setBarColor(229, 49, 76, 1);
        this.setClickWidth("5VW");
    }

    insert(id, item){
        this.items[id].item = item;
    }
    
}
