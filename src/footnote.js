import "./css/footnote.css";
import Column from "./modules/column";
import Image from "./modules/Image";
import articlesFootNote from "./articles/article_footnote";

import { wrapDiv, wrapDivStyled, wrapLanguages, wrapLink } from "./utils";
import{fadeInExplosive, fadeInExplosiveDelayed, 
    fadeInDelayed} from "./modules/defaults/entrance_effect";


function createFootNoteBotton(text, link, imgPath){
    var img = new Image();
    img.setWidth("2.5VW");
    const content = wrapDiv("foot-button", img.get(imgPath), text);
    
    return fadeInExplosiveDelayed.get(wrapLink(link, content));
}


export default function createFootNote(topMargin){
    var cols = new Column(2);
    const dir = "fig/common/icons/";
    for(var i = 0; i < 2; i++){
        const link = i? "https://twitter.com/sakifansupport1":
            "https://virtualyoutuber.fandom.com/wiki/Ashizawa_Saki";

        cols.insert(i, createFootNoteBotton(
            wrapLanguages(articlesFootNote.button[i]), 
            link, i? dir+"contact.png": dir+"youtube.png"));
    }

    var objs = [fadeInExplosive.get(wrapLanguages(articlesFootNote.suptitle))];
    for (let lines of articlesFootNote.passage)
    {
        var group = [];
        for (let line of lines)
        {
            var args = {className: "line"};
            if (line.style)
                args.style = line.style;

            group.push(fadeInDelayed.get(wrapDiv(args, wrapLanguages(line))));
        }
        objs.push(wrapDiv("passage", group));
    }
    return wrapDivStyled("footnote", {marginTop: topMargin}, objs, cols.get());

}