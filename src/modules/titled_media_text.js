import TitledContainer from "./titled_container";
import InvertableColumn from "./invertable_columns";
import {fadeInDelayed, fadeInExplosiveDelayed, 
    fadeInLeftwardsLatched, fadeInRightwardsLatched
} from "./defaults/entrance_effect";
import { merge, wrapDiv, wrapDivStyled, wrapDivRecursive, wrapLink, wrapLanguages} from "../utils";
import "../css/titled_media_text.css";
import "../css/titled_container.css";


export default class TitledMediaText extends TitledContainer{
    /**
    * @param {boolean} reversed true to set fig at 1, otherwise 0
    */
    static createButton(text, link, style){
        style = {className:"button", style:style};
        const button = wrapDiv(["titled-media-text", style], text);
        
        if(!link)
            return button;
            
        return wrapLink(link, button);
    }

    constructor(isLeft){
        super(isLeft);

        this.cols = new InvertableColumn();

        this.graphic = {content: 0};
        this.passage = {title: "", content: ""};
        
    }

    getGraphID(){
        return this.isLeft? 1:0;
    }

    setGraphic(content){
        this.graphic.content=content;
    }

    setPassage(title, ... contents){
        this.passage = {title: title, content: contents};
    }

    setButton(text, link){
        this.button = {text: text, link: link};
    }

    initFromArticle(obj){
        if(obj.graphicTitle)
            this.graphic.title = wrapLanguages(obj.graphicTitle);

        this.passage = {
            title: wrapLanguages(obj.title), 
            content: wrapLanguages(obj.description)
        };

    }


    get(){
        const style = {color: this.fontColor.get()};
        var graphics = [];
        if(this.graphic.title){
            const style = {color: this.fontColor.get()};
            graphics.push(fadeInDelayed.get(wrapDivStyled("title", style, this.graphic.title)));
        }
    
        graphics.push(fadeInExplosiveDelayed.get(this.graphic.content));
        this.cols.insert(this.getGraphID(), wrapDiv("titled-media-text", graphics));
        
        var content = this.passage.content;
        if(!content.length)
            content = [content];
    
        content = content.map(function(x){return wrapDivStyled("passage", style, x);});
        const passage = wrapDiv("titled-media-text", content);
        const subtitle = wrapDiv("titled-media-text", wrapDivStyled("title", style, this.passage.title));
       
        var passages = [fadeInDelayed.get(subtitle), fadeInExplosiveDelayed.get(passage)];
        if(this.button){
            const style = {color: this.fontColor.get(), background: this.titleColor.get()};
            const anime = this.isLeft? fadeInRightwardsLatched: fadeInLeftwardsLatched;
            passages.push(anime.get(TitledMediaText.createButton(this.button.text, this.button.link, style)));
        }
            
        this.cols.insert(1-this.getGraphID(), passages);

        return super.get(this.cols.get());
    }
}