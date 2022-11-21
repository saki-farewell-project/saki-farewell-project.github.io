import "../css/raw_paragraph.css"
import { wrapDiv } from "../utils";
import { fadeInDelayed, fadeInExplosiveLatched, fadeInRightwards } from "./defaults/entrance_effect";


export default class RawParagraph{
    constructor(){
        this.lines = [];
    }

    setSuptitle(suptitle){
        this.suptitle = suptitle;
    }


    setTitle(title){
        this.title = title;
    }


    setPassage(... lines){
        if(lines.length == 1 && lines[0].length)
            this.lines = lines[0]; //in case passing arr directly
        else
            this.lines = lines;
    }

    get(){
        var items = [];
        if(this.suptitle)
            items.push(fadeInRightwards.get(wrapDiv("suptitle", this.suptitle)));

        if(this.title)
            items.push(fadeInDelayed.get(wrapDiv("title", this.title)));

        const lines = this.lines.map(function(line){
            return fadeInExplosiveLatched.get(wrapDiv("line", line));
        });

        items.push(wrapDiv("passage", lines));
        return wrapDiv("raw-paragraph", items);

    }

}