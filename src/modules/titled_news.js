import TitledContainer from "./titled_container";
import { merge, wrapDiv, wrapDivStyled, wrapStyle, wrapLanguages} from "../utils";
import "../css/titled_news.css";
import "../css/news_page.css";
import Slider from "./slider";
import Column from "./column";
import Image from "./Image";
import Border from "../config/border";
import { Mutex } from "async-mutex";
import { fadeIn, fadeInExplosive, fadeInExplosiveDelayed, fadeInExplosiveLatched, fadeInRightwardsDelayed} from "./defaults/entrance_effect";
import { fadeInRightwards } from "./defaults/entrance_effect";
import InvertableColumn from "./invertable_columns";
import Youtube from "./youtube";
import { NavLink } from "react-router-dom";
import articlesNews from "../articles/article_news";
import UniqueIDGenerator from "./unique_id_generator";
import TitledMediaText from "./titled_media_text";

var pageSlider = new Slider(); 

class NewsContent extends Column{
    constructor(article){
        super(2);
        this.setRatiosEqually();

        this.date = article.date;
        this.graphic = article.graphic;
        this.comparableId = createComparableId(this.date);
        this.title = article.title;
        this.passage = article.passage;

        if(article.external){
            this.external = article.external;
            console.log(article.external);
        }
    }

    getExternal(){
        if(!this.external)
            return 0;

        const style = {backgroundColor: "crimson", marginTop: "0px"};
        var button = TitledMediaText.createButton(
            wrapLanguages(this.external.text), this.external.link, style);
        
        return fadeInExplosiveDelayed.get(wrapDiv("external", button));
    }

    getGraphic(){
        if(!this.graphicCreated){
            this.graphicCreated = true;
            const isYoutube = this.graphic.type == "youtube";

            var loader = isYoutube? new Youtube(): new Image();
            loader.setCorner(Border.ALL, "10px");

            this.graphic = loader.get(this.graphic.path);
            if(!isYoutube)
                this.graphic = wrapStyle({aspectRatio: "16 / 9", overflow:"hidden"}, this.graphic);
            
        }
        return this.graphic;
    }

    getTitle(){
        return wrapDiv("title", wrapLanguages(this.title));
    }

    getPassage(){
        return wrapDiv("passage", this.passage.map(function(line){
            var args = {className: "line"};
            if(line.style)
                args.style = line.style;

            return wrapDiv(args, wrapLanguages(line));
        }));
    }

    getDate(){
        return wrapDiv("date", createSwitchableDate(this.date));
    }

    get(aid, animate){
        var date = this.getDate();
        var title = this.getTitle();
        var graphic = this.getGraphic();

        if(animate){
            graphic = fadeInExplosive.get(graphic);
            date = fadeInRightwards.get(date);
            title = fadeInRightwards.get(title);
        }

        this.insert(0, graphic);
        var navLink = <NavLink to="/news" activeStyle>{
            wrapDiv("titled-news", date, title)}</NavLink>

        this.insert(1, <div onClick={this.onclick.bind(this, aid)}>{navLink}</div>);
        return super.get();
    }

    onclick(aid){
        pageSlider.setActiveId(aid);
    }

}


export default class NewsDataBase extends TitledContainer{
    static uidGen = new UniqueIDGenerator("news-database-uid");
    static allNews = articlesNews.map(function(article){
        return new NewsContent(article);}

    ).sort(function(a, b) {return b.comparableId-a.comparableId;});

    static keyframes = [{opacity: 0}, { opacity: 1}]; 
    static options = {duration: 600, fill: 'forwards', easing: 'ease-out'};
    
    constructor(){
        super();
        while(NewsDataBase.allNews.length%4)
            NewsDataBase.allNews.push(false);

        pageSlider.resize(articlesNews.length);
        pageSlider.hideArrow();
        pageSlider.hideBar();
        this.setTitle("News")

        this.lastButtonId = NewsDataBase.uidGen.generateUniqueID();
        this.nextButtonId = NewsDataBase.uidGen.generateUniqueID();

    }

    createPageSwitch(aid){
        aid+=articlesNews.length;
        aid%=articlesNews.length;
        let tgtNews = NewsDataBase.allNews[aid];
        var pageSwitch = <div onClick={this.onclick.bind(this, aid)}>{
            merge(tgtNews.getDate(), tgtNews.getTitle())}</div>;

        return pageSwitch;
    }

    onClick(aid){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        pageSlider.callBackJump(aid);
    }

    onMouse(noneUid, dispUid){
        var elem = document.getElementById(noneUid);
        if(elem)
            elem.style.display = "none";
        
        elem = document.getElementById(dispUid);
        if(elem){
            elem.style.display = "block";
            //elem.style = NewsDataBase.keyframes[0];
            elem.animate(NewsDataBase.keyframes, NewsDataBase.options);
        }

        elem = document.getElementById(dispUid);
    }

    getHomeTabs(){
        var slider = new Slider();
        var cols = new InvertableColumn();
        var cells = [0, 0, 0, 0];
        for(var i = 0; i < NewsDataBase.allNews.length; i++){
            let news = NewsDataBase.allNews[i];
            cells[i%4] = news? news.get(i, slider.empty()): 
                wrapStyle({width:"100%", aspectRatio: "32 / 9"}, "");
            if((i+1)%4===0){
                cols.insert(0, cells[0], cells[1]);
                cols.insert(1, cells[2], cells[3]);
                slider.append(cols.get());
            }
        }

        slider.setClickWidth("5VW");
        slider.dotColor = this.fontColor;
        slider.barColor = this.titleColor;

        return super.get(slider.get());
    }

    createPageSwitches(aid){
        var cols = new Column(3);
        cols.setRatios(25, 50, 25); 
        

        var colId = 0;
        var queryObjs = [];
        const srcUid = NewsDataBase.uidGen.generateUniqueID();
        let srcNews = NewsDataBase.allNews[aid];
        queryObjs.push(wrapDiv({className: "mid-title", id: srcUid}, 
            srcNews.getDate(), srcNews.getTitle()))


        const style = {backgroundColor: "crimson", marginTop: 0};
        var lastButton = TitledMediaText.createButton(
            wrapLanguages({en: "Next", jp:"次へ"}), "", style);
        var nextButton = TitledMediaText.createButton(
            wrapLanguages({en: "Previous", jp:"戻る"}), "", style);

        for(let i of [aid-1, aid+1]){
            i+=articlesNews.length;
            i%=articlesNews.length;
            
            const tgtUid = NewsDataBase.uidGen.generateUniqueID();
            let tgtNews = NewsDataBase.allNews[i];

            queryObjs.push(wrapDiv({className: "mid-title", id: tgtUid, 
                style:{display: "none"}}, tgtNews.getDate(), tgtNews.getTitle()))
            
            cols.insert(colId, <div id = {colId? this.nextButtonId: this.lastButtonId} 
                onMouseEnter={this.onMouse.bind(this, srcUid, tgtUid)} 
                onMouseLeave={this.onMouse.bind(this, tgtUid, srcUid)} 
                onClick={this.onClick.bind(this, i)}>{colId? nextButton: lastButton}</div>);

            colId+=2;
        }

        //nextTitle = NewsDataBase.allNews[nextAid].getDate();
        cols.insert(1, merge(queryObjs));

        return cols.get();

    }
    
    getPageTabs(){
        for(var i = 0; i < articlesNews.length; i++){
            let news = NewsDataBase.allNews[i];

            var objs = [];
            const style = {backgroundColor: "crimson", marginTop: 0};
            objs.push(fadeIn.get(news.getDate()));
            objs.push(fadeIn.get(news.getTitle()));
            objs.push(fadeInExplosiveDelayed.get(wrapDiv("graphic", news.getGraphic())));
            objs.push(fadeInRightwardsDelayed.get(news.getPassage()));
            
            var external = news.getExternal();
            if(external)
                objs.push(external);    

            objs.push(fadeInExplosiveLatched.get(this.createPageSwitches(i)));
            

            pageSlider.insert(i, merge(objs));
        }
        return wrapDiv("news-page", pageSlider.get());
    }

}

const monthAbbrs = ["Jan", "Feb", "Mar", "Apr", 
    "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function createSwitchableDate(date){
    var obj = {};
    obj.en = date.day.toString()+"th "+
        monthAbbrs[date.month-1]+". "+date.year.toString();
    obj.jp = date.year.toString()+"年"+
        date.month.toString()+"月"+date.day.toString()+"日";

    return wrapLanguages(obj);
}

function createComparableId(date){
    return (date.year*13+date.month)*32+date.day;
}

