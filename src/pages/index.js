import React from 'react';
import Column from "../modules/column";
import * as utils from "../utils";
import Image from "../modules/Image";
import ImageLinked from "../modules/Image_linked";
import Boarder from "../config/border";
import Youtube from "../modules/youtube";

import "../css/index.css";

import Slider from "../modules/slider";
import { wrapDiv} from "../utils";
import { fadeInExplosive, fadeInExplosiveDelayed, fadeInExplosiveLatched, fadeInRightwardsLatched, fadeInUpwards, fadeInUpwardsDelayed } from "../modules/defaults/entrance_effect";
import TitledMediaText from "../modules/titled_media_text";
import TitledContainer from "../modules/titled_container";
import InvertableColumn from "../modules/invertable_columns";
import { fadeInDelayed } from "../modules/defaults/entrance_effect";
import createFootNote from "../footnote";
import twitterIntent from 'twitter-intent';

import { EntranceEffect } from '../modules/entrance_effect';
import articlesHome from '../articles/article_home';
import FETCHED_MSGS from '../python/fetched_msgs';
import Border from '../config/border';
import FanMsg from '../modules/fan_msg';

const Home = () => {
    EntranceEffect.stopAllRequest();
    window.scrollTo(0, 0);

    var arrow = new ScrollIndicator();
    const App = utils.merge(
        arrow.get(), 
        createLogoBanner(), 
        createAbout(), 
        //createNews(), 
        //createCurrentEvent(), 
        createMsgCase(), 
        createFootNote("0px")
    );

    EntranceEffect.startAllRequest();
    EntranceEffect.debug();
    
    return App;
}
  
export default Home;


function createMsgCase(){
    var slider = new Slider();
    var youtube = new Youtube();

    youtube.setWidth("85%");
    youtube.setCorner(Boarder.ALL, "10px");

    var titleCont = new TitledContainer();
    titleCont.setTitle("Submissions");

    var iconHolder = new Column(3);
    iconHolder.setMargin(Boarder.ALL, "20px");
    
    titleCont.setFontColor(255, 255, 255, 1);
    titleCont.setTitleColor(229, 49, 76, 1);
    titleCont.setBodyColor(181, 38, 59, 1);
    titleCont.setRight();

    //const slicedMsgs = fetchedMsgs.slice(0, 1);
    var cntMsgs = 0;
    for (let msg of FETCHED_MSGS.reverse())
    {
        if (cntMsgs++ >= 100000)
            break;

        var showcase = new FanMsg(msg, true);
        showcase.setMargin(Boarder.ALL, "15px");
        //slider.append(showcase.get());
        var cols = new InvertableColumn();

        const passage = wrapDiv("passage", showcase.context);
        const title = wrapDiv("title", utils.wrapLanguages(articlesHome[3].title));
        const fullMsg = wrapDiv("titled-media-text", utils.merge(title, passage))
        cols.insert(0, showcase.getMsgCard());
        //cols.insert(1, showcase.context);
        //cols.insert(1, fullMsg);
        slider.append(cols.get());
    }
    //slider.append(youtube.get("https://youtu.be/aHt-fGy5BYQ"));
    //slider.append(youtube.get("https://youtu.be/LLuqBMnfKJY"));

    slider.setClickWidth("4VW");
    slider.setWidth("100%"); 
    slider.setBarColor(229, 49, 76, 1);
    slider.setDotColor(255, 255, 255,1);
    slider.setPeriod(2000);
    slider.hideBar();

    

    /*wrapDiv("titled-media-text", graphics);
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
    }*/
    //mediaText.setTitleColor(229, 49, 76, 1);
    //mediaText.setBodyColor(181, 38, 59, 1);
    //mediaText.setButton("View all", "/#/fan-msgs");
    //mediaText.setRight();

    const style = {color: titleCont.fontColor.get(), background: titleCont.titleColor.get()};
    const anime = fadeInExplosiveLatched;
      
    var a = anime.get(TitledMediaText.createButton("View all messages", "/#/fan-msgs", style));
    //var a = anime.get(TitledMediaText.createButton("View all messages", href, style));

    return titleCont.get(utils.merge(slider.get(), a));
  
}


function createAbout(){
    var cols = new Column(2);

    cols.setMargin(Boarder.TOP, "2%");
    cols.setPadding(Boarder.LEFT, "10%");
    cols.setPadding(Boarder.RIGHT, "10%");
    cols.setMargin(Boarder.BOTTOM, "20%");

    cols.setColumnInterval("0px");
    cols.setRatios(35, 65);

    var imgLinked = new ImageLinked();
    imgLinked.setWidth("100%");
    imgLinked.setCorner(Boarder.ALL, "10px");

    var waterMark = new Image();
    waterMark.setWidth("35%");
    const yotubeIcon = waterMark.get("fig/common/icons/youtube.png");
    imgLinked.setWaterMark(utils.merge(yotubeIcon, wrapDiv("haachama-channel-text", "芦澤サキ / SAKI ASHIZAWA")));

    const haatoPfp = imgLinked.get("fig/pfp_saki_yt.jpg", 
        "https://www.youtube.com/channel/UCPZgBtMYoFKypEG2SCvBN9A");
    
    let aboutArticle = articlesHome[2];    
    const title = wrapDiv("title", utils.wrapLanguages(aboutArticle.title));
    const passage = wrapDiv("passage", utils.wrapLanguages(aboutArticle.intro));
      
    
    const button = TitledMediaText.createButton("Submit Now!", "https://forms.gle/ys4Xca2oZpSuFuNy7", 
        {background: "crimson", marginTop: "10%"});

    cols.insert(0, fadeInExplosiveLatched.get(haatoPfp));
    cols.insert(1, fadeInDelayed.get(passage), fadeInExplosiveLatched.get(button));

    return wrapDiv("intro", fadeInUpwards.get(title),  cols.get());
}



function createLogoBanner(){
    var img = new Image();
    img.setWidth("100%");
    img.setCorner(Border.ALL, "25px");

    const bannerImg = img.get("fig/SiteBanner.png");
    const placeHolder = 
        <div id = "place_holder_banner" 
            className="logo_banner_place_holder " style={{opacity: "0"}}>
            <div id = "place_holder_img_id"
                className="logo_banner_inner_image"> {bannerImg}
            </div>
        </div>;
    
    const logoBanner = 
        <div id="logo_banner" className="logo_banner">
            <div id = "img" className="logo_banner_inner_image">
                {fadeInExplosive.get(bannerImg)}
            </div>
        </div>;

    return utils.merge(placeHolder, logoBanner);
}


document.addEventListener('scroll', function(e){
    var logoBanner = document.getElementById('logo_banner');
    if(!logoBanner)
        return;

    var placeHolder = document.getElementById('place_holder_banner');
    if(!placeHolder || placeHolder.style.opacity=="1")
        return;

    const ratio = 0.5+placeHolder.getBoundingClientRect().top/window.innerHeight;
    logoBanner.style.opacity = ratio>0? ratio.toString(): "0";
    
    var placeHolderImg = document.getElementById('place_holder_img_id');
    if(placeHolderImg && placeHolderImg.getBoundingClientRect().bottom < 0){
        logoBanner.removeChild(logoBanner.childNodes[0]);
        placeHolder.style.opacity="1";
    }

})


class ScrollIndicator extends Image{
    static uid = "index-scoll-indicator";
    static duration = 850;
    static keyframes = [
        {transform: 'translateY(-20%)', opacity: 0.65}, 
        {transform: 'translateY(10%)', opacity: 0}
    ];
    static options = {duration: ScrollIndicator.duration, 
        fill:'forwards', easing: 'ease-out'};

    static timer = 0; 
    constructor(){
        super();
        this.setWidth("50%");
        this.item = super.get("fig/index/arrow1.png");
    }

    timerCallBack(){
        var elem = document.getElementById(ScrollIndicator.uid);
        if(!elem)
            return;

        if(utils.isScrolled()){
            clearInterval(ScrollIndicator.timer);
            elem.remove();
        }
        else
            elem.animate(ScrollIndicator.keyframes, ScrollIndicator.options);
    }

    get(){
        var args = {};
        args.className="image-container";
        args.id = ScrollIndicator.uid;
        args.style = ScrollIndicator.keyframes[1];

        ScrollIndicator.timer = setInterval(
                this.timerCallBack.bind(this), ScrollIndicator.duration*1.2);

        return wrapDiv(["scroll-indicator", args], this.item);
    }
}