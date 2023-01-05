import {fadeInDelayed, fadeInExplosiveDelayed, 
    fadeInLeftwardsLatched, fadeInRightwardsLatched
} from "./defaults/entrance_effect";
import { merge, wrapDiv, wrapDivStyled, wrapDivRecursive, wrapLink, wrapLanguages} from "../utils";
import "../css/button.css";


export default class Button{
    constructor(txt){
        if (txt.jp)
            this.txt = wrapLanguages(txt).get();
        else
            this.txt = txt;

    }


    get(){
        var segs = [wrapDiv("text", this.txt)];
        segs.push(wrapDiv("right-parral"));

        segs = wrapDiv("canvus", segs);
        return wrapDiv("button", segs);
    }
}