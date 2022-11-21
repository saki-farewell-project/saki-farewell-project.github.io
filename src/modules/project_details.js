import Border from "../config/border";
import "../css/previous_works.css";
import { merge, wrapDiv, wrapDivStyled, wrapLanguages, wrapStyle } from "../utils";
import Column from "./column";
import {fadeInDelayed, fadeInExplosiveLatched, 
    fadeInRightwards, fadeInLatched, fadeInExplosive, fadeInExplosiveDelayed } 
from "./defaults/entrance_effect";
import InvertableColumn from "./invertable_columns";
import Slider from "./slider";
import "../css/project_details.css";
import ColourRGBA from "../config/colour_rgba";


export default class ProjectDetails{
    static DUAL = 2;
    static SINGLE = 1;
    constructor(){
        this.items = [];
        this.blockDualities = [];
        this.imgPath = "fig/background/red_chessboard.png";
        this.graphics = new Map();
    }

    emplace(type){
        this.blockDualities.push(type);
    }

    setGraphic(id, graphic){
        this.graphics.set(id, graphic);
    }


    setContourColor(r, g, b, a){
        this.contourColor = new ColourRGBA(r, g, b, a);
    }

    setBackgroundImage(imgPath){
        this.imgPath = imgPath
    }

    appendCell(cell){
        var obj = {};
        if(cell.title)
            obj.title = wrapLanguages(cell.title);
        if(cell.graphicID)
            obj.graphic = this.graphics.get(cell.graphicID);
        if(cell.passage){
            obj.passage = {}
            if(cell.passage.title)
                obj.passage.title = wrapLanguages(cell.passage.title);
            if(cell.passage.lines)
                obj.passage.lines = cell.passage.lines.map(
                    function(line){
                        var obj = wrapLanguages(line);
                        if(line.style)
                            obj = wrapStyle(line.style, obj);
                        return obj;
                    }
                );
        }
            
        this.items.push(obj);
    }

    append(title, graphic, ... passages){
        var obj = {};
        if(title)
            obj.title = title;
        if(passages.length)
            obj.passages = passages;
        if(graphic)
            obj.graphic = graphic;

        this.items.push(obj);
    }

    setSuptitle(title){
        if(title.jp && title.en)
            this.title = wrapLanguages(title);
        else
            this.title = title;
    }


    get(){
        var i = 0;
        var items = [];
        if(this.title){
            var args = {className: "suptitle", style:{}};
            if(this.contourColor)
                args.style.backgroundColor = this.contourColor.get();

            items.push(fadeInExplosive.get(wrapDiv(args, this.title)));
        }
            

        var cols = new InvertableColumn();
        const classNames = ["left-block", "right-block"];
        for(let duality of this.blockDualities){
            var mergedObjs = [];
            for(var iend = i+duality; i < iend; i++){
                var objs = [];
                let item = this.items[i];
                if(item.title)
                    objs.push(fadeInExplosiveDelayed.get(wrapDiv("title", item.title)));
                
                if(item.graphic)
                    objs.push(fadeInExplosiveDelayed.get(item.graphic));

                if(item.passage){
                    var passage = [];
                    if(item.passage.title)
                        passage.push(fadeInLatched.get(wrapDiv("title", item.passage.title)));

                    if(item.passage.lines)
                        for(let line of item.passage.lines)
                            passage.push(fadeInLatched.get(wrapDiv("line", line)));
                        

                    var args = {className: "passage", style:{}};
                    if(this.contourColor)
                        args.style.backgroundColor = this.contourColor.get();
                    
                    objs.push(wrapDiv(args, passage));
                }
                
                mergedObjs.push(merge(objs));
            }

            var args = {className: "single-block"};
            if(this.contourColor)
                args.style ={borderColor: this.contourColor.get()};

            if(duality==ProjectDetails.SINGLE)
                items.push(wrapDiv(args, mergedObjs[0]));
            else{
                for(var j = 0; j < 2; ++j){
                    args.className = classNames[j];
                    cols.insert(j, wrapDiv(args, mergedObjs[j]));
                }
                    
                args.className = "block-container";
                items.push(wrapDiv(args, cols.get()));
            }

        }

        return wrapDivStyled("project-details", 
            {backgroundImage: "url("+this.imgPath+')'}, items);
    }


}