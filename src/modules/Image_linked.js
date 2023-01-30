import "../css/image.css";
import Image from "./Image";
import {wrapDivStyled, wrapStyle, merge } from "../utils";

export default class ImageLinked extends Image{
    constructor(){
        super();
        this.waterMark = 0;
    }

    setWaterMark(item){
        this.waterMark = item;
    }

    get(path, link){
        var items = [];
        items.push(<div className="centered-img" style={{width: "100%", margin: this.margin.get()}}>
            <img src={path} alt="..." class="centered-img" 
                style={{width: this.width, borderRadius: this.corner.get()}}>
            </img>
        </div>);
        if (this.waterMark)
            items.push(wrapDivStyled("water-mark", {width: this.width}, this.waterMark));
            
        return(
            <a href={link}>
                <div className="img-hover">
                {items}
                </div>
            </a>
        );
    }

}
