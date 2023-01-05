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
import { fadeInExplosiveLatched, fadeInUpwards} from "../modules/defaults/entrance_effect";
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
import LAST_UPDATE from '../python/last_update';
import FanMsg from '../modules/fan_msg';
import ProjectDetails from '../modules/project_details';
import { TOP_BANNER } from '../modules/defaults/top_banner';
import LightBox from '../modules/light_box';
import SectBlock from '../modules/sect_block';
import FanartCase from '../modules/fanart_case';
import Button from '../modules/button';

const Home = () => {
    EntranceEffect.stopAllRequest();
    LightBox.HIDDENS.clear();

    window.scrollTo(0, 0);
    TOP_BANNER.inProg = true;
    var arrow = new ScrollIndicator();

    const blocks = [
        TOP_BANNER.get("fixed"), 
        TOP_BANNER.get("static"), 
        arrow.get(), 
        createAbout(), 
        createFanartCase(),
        createMsgCase(), 
        createAll(),
        createFootNote("0px"), 
    ];

    const App = utils.merge(LightBox.HIDDENS, blocks);
    EntranceEffect.startAllRequest();
    EntranceEffect.debug();
    
    return App;
}
  
export default Home;


function createFanartCase(){
    var sect = new SectBlock();
    sect.setTitle("Fanart");
    var items = [];
    for (let msg of FETCHED_MSGS)
        if (msg.imgs)
            items.push(msg);

    if (items.length % 2)
        items.push(items[0]);

    var cols = new InvertableColumn();
    var slider = new Slider();

    slider.setClickWidth("45px");
    slider.setPadding(Boarder.LEFT, "45px");
    slider.setPadding(Boarder.RIGHT, "45px");
    slider.setBarColor(228, 0, 18, 1);
    slider.setPeriod(4000);
    slider.hideBar();
    for (let i in items){
        var msg = new FanartCase(items[i]);
        cols.insert(i % 2, msg.getCase());
        if (i % 2)
            slider.append(cols.get());
    }

    return sect.get(slider.get());
}



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

    var cols = new InvertableColumn();
    var cells = [0, 0, 0, 0];

    var fetchMsgs = FETCHED_MSGS.reverse().map(function(x){return x;});
    while (fetchMsgs.length % 4)
        fetchMsgs.push(fetchMsgs[fetchMsgs.length % 4 - 1]);

    var i = 0;
    for (let msg of fetchMsgs){
        if (!msg)
            cells[i % 4] = utils.wrapStyle(
                {width:"100%", aspectRatio: "2 / 1"}, "");
        else{
            var showcase = new FanMsg(msg, true);
            showcase.setMargin(Boarder.ALL, "15px");
            cells[i % 4] = showcase.getMsgCard();
        }
        
        if ((i+1) % 4 === 0){
            cols.insert(0, cells[0], cells[1]);
            cols.insert(1, cells[2], cells[3]);
            slider.append(cols.get());
        }
        i++;
    }

    slider.setClickWidth("4VW");
    slider.setWidth("100%"); 
    slider.setBarColor(229, 49, 76, 1);
    slider.setDotColor(255, 255, 255,1);
    slider.setPeriod(4000);
    slider.hideBar();

    const title = wrapDiv("title", utils.wrapLanguages(articlesHome[3].title));
    return titleCont.get(utils.merge(wrapDiv("titled-media-text", title), slider.get()));
  
}

function createAll(){
    var tc = new TitledContainer();
    tc.setTitle("All Messages");
    var updatetime = {
        jp: articlesHome[4].jp + LAST_UPDATE, 
        en: articlesHome[4].en + LAST_UPDATE
    };
    
    const title = wrapDiv("title", utils.wrapLanguages(updatetime));
    var cols = new InvertableColumn();
    var items = [[], []];
    var i = 0;
    for (let msg of FETCHED_MSGS.reverse()){
        var fmsg = new FanMsg(msg, true);
        if (!fmsg.is_txt)
            continue;

        items[i%2].push(fmsg.getAll());
        i++;
    }

    for (var i = 0; i < 2; i++)
        cols.insert(i, items[i]);

    tc.setFontColor(255, 255, 255, 1);
    tc.setTitleColor(229, 49, 76, 1);
    tc.setBodyColor(181, 38, 59, 1);
    var cont = utils.merge(wrapDiv("titled-media-text", title), cols.get())
    return tc.get(cont);
}



function createAbout(){
    var cols = new Column(2);

    cols.setPadding(Boarder.TOP, "2%");
    cols.setPadding(Boarder.LEFT, "10%");
    cols.setPadding(Boarder.RIGHT, "10%");

    cols.setColumnInterval("0px");
    cols.setRatios(35, 65);

    var imgLinked = new ImageLinked();
    imgLinked.setWidth("100%");

    var waterMark = new Image();
    waterMark.setWidth("35%");
    const icon = waterMark.get("fig/common/icons/youtube.png");
    imgLinked.setWaterMark(utils.merge(icon, wrapDiv("channel-text", "芦澤サキ / SAKI ASHIZAWA")));

    const haatoPfp = imgLinked.get("fig/pfp_saki_yt.jpg", 
        "https://www.youtube.com/channel/UCPZgBtMYoFKypEG2SCvBN9A");
    
    let about = articlesHome[2];    
    var title = wrapDiv("title", utils.wrapLanguages(about.title));
    const intro = wrapDiv("passage", utils.wrapLanguages(about.intro));
    const langs = utils.wrapLanguages({jp: "メッセージ投稿", en: "Submit Now!"});
    const url ="https://forms.gle/ys4Xca2oZpSuFuNy7"
    var button = TitledMediaText.createButton(langs, url, 
        {background: "crimson", marginTop: "10%"});

    cols.insert(0, fadeInExplosiveLatched.get(haatoPfp));
    
    var submit = new Button({jp: "メッセージ投稿", en: "Submit Now!"});
    submit = submit.get("https://forms.gle/ys4Xca2oZpSuFuNy7");
    cols.insert(1, fadeInDelayed.get(intro), fadeInExplosiveLatched.get(submit));

    return utils.wrapDiv("intro", fadeInUpwards.get(title),  cols.get());
}


document.addEventListener('scroll', function(e){
    TOP_BANNER.scrollCallBack();
})


class ScrollIndicator extends Image{
    static uid = "index-scoll-indicator";
    static duration = 850;
    static keyframes = [
        {transform: 'translateY(25%)', opacity: 0.85}, 
        {transform: 'translateY(65%)', opacity: 0}
    ];
    static options = {duration: ScrollIndicator.duration, 
        fill:'forwards', easing: 'ease-out'};

    static timer = 0; 
    constructor(){
        super();
        this.setWidth("15%");
        this.item = super.get("fig/index/scroll.png");
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
        args.className = "image-container";
        args.id = ScrollIndicator.uid;
        args.style = ScrollIndicator.keyframes[1];

        ScrollIndicator.timer = setInterval(
                this.timerCallBack.bind(this), ScrollIndicator.duration * 1.2);

        return wrapDiv(["scroll-indicator", args], this.item);
    }
}