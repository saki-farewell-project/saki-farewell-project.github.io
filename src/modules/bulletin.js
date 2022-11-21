import "../css/bulletin.css";
import Column from "./column";
import Youtube from "./youtube";
import {merge } from "../utils";


export default class Bulletin{
    constructor(height){
        this.height = height;
        this.items = [];
    }

    clear(){
        this.items.clear();
    }

    append(item){
        this.items.push(item);
    }

    get(){
        return (<div class="scrollable_bulletin">{
            this.items.map(function(x, i){
                return (<div class="message" key={i}> {x}
                </div>);
            })
        }</div>);
    }

}

export class VideoRelease{
    constructor(){
        this.date = "";
        this.desc = "";
        this.link = "";
    }

    setDate(date){
        this.date = date;
    }

    setDescription(desc){
        this.desc = desc;
    }

    setYoutubeLink(link){
        this.link = link;
    }
    
    get(){
        var youtube = new Youtube();
        const date = <div style = {{color: "white", margin: "auto auto",
            marginLeft: isCellphone()? "1VW": "0.5VW", 
            fontSize: isCellphone()? "2.5VW": "1.2VW"}}>{this.date}</div>;

        const desc = <div style = {{color: "white", 
            marginLeft: isCellphone()? "1VW": "0.5VW", 
            fontSize:   isCellphone()? "2.0VW": "1VW"}}>{this.desc}</div>;

        if(isCellphone())
            return merge(date, desc, youtube.get(this.link));
        
        var cols = new Column(2);
        cols.setRatiosEqually();
        cols.setTextAlignment(0, "left");
        cols.insert(1, youtube.get(this.link));
        cols.insert(0, date, desc);
        return cols.get();
    }

}
