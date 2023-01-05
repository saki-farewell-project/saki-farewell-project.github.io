import {fadeInDelayed, fadeInExplosiveDelayed, 
    fadeInLeftwardsLatched, fadeInRightwardsLatched
} from "./defaults/entrance_effect";
import { merge, wrapDiv, wrapDivStyled, wrapDivRecursive, wrapLink, wrapLanguages} from "../utils";
import "../css/button.css";


export default class Button{
    constructor(txt){
        if (txt.jp)
            this.txt = wrapLanguages(txt);
        else
            this.txt = txt;

    }


    get(url){
        var segs = [wrapDiv("text", this.txt)];
        segs.push(wrapDiv("right-parral"));

        segs = wrapDiv("canvus", segs);
        var rslt = wrapDiv("button", segs);
        if (url)
            rslt = wrapLink(url, rslt);
        return rslt;
    }
}