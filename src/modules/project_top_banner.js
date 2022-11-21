import Border from "../config/border";
import "../css/project_top_banner.css";
import { merge, wrapDiv, wrapDivStyled, wrapLanguages } from "../utils";
import Column from "./column";
import {fadeInDelayed, fadeInExplosiveLatched, 
    fadeInRightwards, fadeInLatched, fadeInExplosiveDelayed } 
from "./defaults/entrance_effect";
import InvertableColumn from "./invertable_columns";
import LanguageSwitch from "./language_switch";
import Slider from "./slider";

export default class ProjectTopBanner extends InvertableColumn{
    constructor(){
        super();
        this.titledPassages = [];
        this.graphic = 0;
        /*this.setWidth("100%");
        this.setBarColor(165, 42, 42, 1);
        //this.setBarColor(0, 0, 0, 1);
        this.setBackgroundColor(218,165,32,1);
        this.setClickWidth("3VW");
        this.setPadding(Border.ALL, "10px");
        this.setPadding(Border.TOP, "15px");
        this.setCorner(Border.ALL, "20px");
        this.setPeriod(3000);*/
        this.passage = [];
    }
    append(a, b, c){

    }

    /*append(title, img, passage){
        var cols = new Column(2);
        cols.setRatios(35, 65);

        const titleItem = wrapDiv("subtitle", title);
        cols.insert(0, img);
        cols.insert(1, wrapDiv("passage", passage));
        
        super.append(merge(titleItem, cols.get()));
    }*/

    setGraphic(graphic){
        this.graphic = graphic;
    }

    setTitle(title){
        if(title.en && title.jp)
            this.title = wrapLanguages(title);
        else
            this.title = title;
       
    }

    setPassage(passage){
        this.passage = [];
        for(let titledLines of passage){
            var item = {};
            if(titledLines.title)
                item.title = new wrapLanguages(titledLines.title);
            
            if(titledLines.lines)
                item.lines = titledLines.lines.map(function(x){return wrapLanguages(x)});

            this.passage.push(item);
        }

    }

    setSuptitle(suptitle){
        if(suptitle.en && suptitle.jp)
            this.suptitle = wrapLanguages(suptitle);
        else
            this.suptitle = suptitle;
    }

    appendTitledPassage(title, passage){
        this.titledPassages.push({title: title, passage: passage});
    }

    appendTitledPassage(title, passage){
        this.titledPassages.push({title: title, passage: passage});
    }

    get(){
        this.insert(0, this.graphic);

        var passage = [];
        for(var i = 0; i < this.passage.length; i++){
            let x = this.passage.at(i);
            var objs = [];
            if(x.title)
                objs.push(fadeInExplosiveDelayed.get(wrapDiv("title", x.title)));
            if(x.lines)
                for(let line of x.lines)
                    objs.push(fadeInLatched.get(wrapDiv("line", line)));
            
            passage.push(wrapDiv("passage", objs));
        }

        this.insert(1, passage);
        var objs = [];
        if(this.suptitle)
            objs.push(fadeInRightwards.get(wrapDiv("suptitle", this.suptitle))); 
        if(this.title)
            objs.push(fadeInDelayed.get(wrapDiv("title", this.title))); 
        
        objs.push(super.get());
        return wrapDivStyled("project-top-banner", {marginTop: "10%"}, objs);
    }
}