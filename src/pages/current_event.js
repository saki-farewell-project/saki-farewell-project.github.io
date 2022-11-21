import React from "react";
import TitledContainer from '../modules/titled_container';
import InvertableColumn from "../modules/invertable_columns";
import "../css/previous_works.css";
import Image from "../modules/Image";
import Youtube from "../modules/youtube";
import { displayAnimationQueries, merge, wrapDiv, wrapDivRecursive, wrapDivStyled, wrapLanguages, wrapStyle } from "../utils";
import { fadeInExplosiveLatched, fadeInDelayed, fadeInExplosive } from "../modules/defaults/entrance_effect";
import TitledMediaText from "../modules/titled_media_text";
import Border from "../config/border";
import Slider from "../modules/slider";
import ProjectTopBanner from "../modules/project_top_banner";
import ProjectDetails from "../modules/project_details";
import createFootNote from "../footnote";
import ColourRGBA from "../config/colour_rgba";
import ImageLinked from "../modules/Image_linked";
import Column from "../modules/column";
import { EntranceEffect } from "../modules/entrance_effect";
import PageSwithcer from "../modules/page_switcher";
import "../css/page_switcher.css";
import "../css/project_details.css";

import articlesCurrentEvent from "../articles/article_current_event";
import LanguageSwitch from "../modules/language_switch";



const CurrentEvent = () => {
    EntranceEffect.stopAllRequest();
    window.scrollTo(0, 0);
    const App = merge(
        createTopBanner(), 
        createDescription(),
        createProgramming(), 
        createWriters(), 
        createArtists(), 
        createFootNote("70px")
    );
    EntranceEffect.startAllRequest();
    EntranceEffect.debug();
    
    return App;
}

export default CurrentEvent;


const dir = "fig/current_event/";
function createTopBanner(){
    let topBannerTexts = articlesCurrentEvent[0];
    var img = new Image();
    img.setCorner(Border.ALL, "10px");
    var topBanner = new ProjectTopBanner();

    topBanner.setGraphic(img.get(dir+"haachama_vn_thumb.jpg"));
    topBanner.setSuptitle(topBannerTexts.suptitle);
    topBanner.setTitle(topBannerTexts.title);
    topBanner.setPassage(topBannerTexts.passage);
    
    return topBanner.get();
}

function createDescription(){
    let videoTexts = articlesCurrentEvent[1];
    var details = new ProjectDetails();

    details.setContourColor(0, 102, 204, 0.6);
    details.setSuptitle(videoTexts.suptitle);
    details.setBackgroundImage("fig/background/blue.png");

    var img = new Image();
    img.setWidth("35%");

    var slider = new Slider();
    slider.hideBar();
    slider.setClickWidth("5VW");

    var notifyCnt = 0;
    for(let line of videoTexts.contents[0][1].graphicPassage){
        var args = {className: "line"};
        if(line.style) 
            args.style = line.style;
        

        const fileName = "notification_" +(++notifyCnt).toString()+".png";
        slider.append(wrapDiv(["passage", args], img.get(dir+fileName), wrapLanguages(line)));
    }

    details.setGraphic("secret-note", slider.get());

    img.setWidth("50%");
    details.setGraphic("vn", img.get(dir+"vn.png"));

    var discord = new ImageLinked();
    discord.setWidth("120px");
    discord.setMargin(Border.TOP, "10px");

    
    discord.setWaterMark(img.get("fig/common/icons/ext_link.png"));

    
    details.setGraphic("discord", discord.get(
        "fig/common/icons/discord.png", "https://discord.gg/HqQ5n2cMBY"));
    
    
    for(let content of videoTexts.contents){
        details.emplace(content.length);
        for(let cell of content)
            details.appendCell(cell);

    }
    
    return details.get();
}


function createProgramming(){
    let videoTexts = articlesCurrentEvent[2];
    var details = new ProjectDetails();

    details.setContourColor(106, 13, 173, 0.4);
    details.setSuptitle(videoTexts.suptitle);
    details.setBackgroundImage("fig/background/purple.png");

    const args = {marginTop: "20px", marginBottom: "30px", 
        backgroundColor: details.contourColor.getA(0.6)};
    const button = wrapLanguages({en: "Join as Programmer!", jp: "プログラマーとして参加！"});

    var img = new Image();
    img.setWidth("15%");
    details.setGraphic("programmer", TitledMediaText.createButton(
        merge(img.get(dir+"prog_w.png"), button), "https://docs.google.com/document/d/e/2PACX-1vRsKeYzNQ8aCqZd_hHjd3z-90GeE9NRlzB1fYa9ez6vGx9K2q0_Qcq4OzuTsjRQE3ElEzHA2o4JP4Eh/pub", args));
    
    for(let content of videoTexts.contents){
        console.log(content);
        details.emplace(content.length);
        for(let cell of content)
            details.appendCell(cell);

    }
    
    return details.get();
}


function createWriters(){
    let videoTexts = articlesCurrentEvent[3];
    console.log(videoTexts);
    var details = new ProjectDetails();

    details.setContourColor(181, 0, 0, 0.4);
    details.setSuptitle(videoTexts.suptitle);
    details.setBackgroundImage("fig/background/red.png");

    const args = {marginTop: "20px", marginBottom: "30px", 
        backgroundColor: details.contourColor.getA(0.6)};

    var img = new Image();
    img.setWidth("15%");
    details.setGraphic("screen-writer", TitledMediaText.createButton(
        merge(img.get(dir+"writer_w.png"), 
        wrapLanguages({en: "Join as Screen Writer!", jp: "脚本家として参加！"})), "https://docs.google.com/document/d/e/2PACX-1vRKltOjj0dsQuZmHMNG3h618kWvQJrXXMsIrMAXbYYzl82HR_fwSWXauTQwXojBdJz6uO1PdkbJ9tKe/pub#id.hn0zkkg5d3t4", args));
    details.setGraphic("writer", TitledMediaText.createButton(
        merge(img.get(dir+"writer_w.png"), 
        wrapLanguages({en: "Join as Writer!", jp: "ライターとして参加！"})), "https://docs.google.com/document/d/e/2PACX-1vRKltOjj0dsQuZmHMNG3h618kWvQJrXXMsIrMAXbYYzl82HR_fwSWXauTQwXojBdJz6uO1PdkbJ9tKe/pub#id.kv4appch547w", args));
    details.setGraphic("editor", TitledMediaText.createButton(
        merge(img.get(dir+"edit_w.png"), 
        wrapLanguages({en: "Join as Editor!", jp: "エディターとして参加！"})), "https://docs.google.com/document/d/e/2PACX-1vRKltOjj0dsQuZmHMNG3h618kWvQJrXXMsIrMAXbYYzl82HR_fwSWXauTQwXojBdJz6uO1PdkbJ9tKe/pub#id.37pk0dl67mx9", args));
    details.setGraphic("translator", TitledMediaText.createButton(
        merge(img.get(dir+"edit_w.png"), 
        wrapLanguages({en: "Join as Translator!", jp: "通訳者として参加！"})), "https://docs.google.com/document/d/e/2PACX-1vRKltOjj0dsQuZmHMNG3h618kWvQJrXXMsIrMAXbYYzl82HR_fwSWXauTQwXojBdJz6uO1PdkbJ9tKe/pub#id.lf3wdla3arst", args));

    for(let content of videoTexts.contents){
        console.log(content);
        details.emplace(content.length);
        for(let cell of content)
            details.appendCell(cell);

    }
    
    return details.get();
}


function createArtists(){
    let videoTexts = articlesCurrentEvent[4];
    console.log(videoTexts);
    var details = new ProjectDetails();

    details.setContourColor(186, 38, 59,0.4);
    details.setSuptitle(videoTexts.suptitle);
    details.setBackgroundImage("fig/background/pink.png");

    const args = {marginTop: "20px", marginBottom: "30px", 
    backgroundColor: details.contourColor.getA(0.6)};

    var img = new Image();
    img.setWidth("15%");
    details.setGraphic("illustrator", TitledMediaText.createButton(
        merge(img.get(dir+"artist_w.png"), 
        wrapLanguages({en: "Join as Illustrator!", jp: "イラストレーターとして参加！"})), "https://docs.google.com/document/d/e/2PACX-1vQHgPa6-CXMaEehzRhl0dbsHwOobT6Ljkico2icBs-YoTFfp8QRiMxj36TQX8JMYoRJsU98pEz7SbEE/pub#id.rxu1r34gru2a", args));
    details.setGraphic("musician", TitledMediaText.createButton(
        merge(img.get(dir+"music.png"), 
        wrapLanguages({en: "Join as Musician!", jp: "ミュージシャンとして参加！"})), "https://docs.google.com/document/d/e/2PACX-1vQHgPa6-CXMaEehzRhl0dbsHwOobT6Ljkico2icBs-YoTFfp8QRiMxj36TQX8JMYoRJsU98pEz7SbEE/pub#id.syrv8ge3uqto", args));
    details.setGraphic("animator", TitledMediaText.createButton(
        merge(img.get(dir+"movie_w.png"), 
        wrapLanguages({en: "Join as Animator!", jp: "アニメーターとして参加！"})), "https://docs.google.com/document/d/e/2PACX-1vQHgPa6-CXMaEehzRhl0dbsHwOobT6Ljkico2icBs-YoTFfp8QRiMxj36TQX8JMYoRJsU98pEz7SbEE/pub#id.dmlzktr6hb5u", args));
    
    for(let content of videoTexts.contents){
        console.log(content);
        details.emplace(content.length);
        for(let cell of content)
            details.appendCell(cell);

    }
    
    return details.get();
}

function createAboutTheGame(){
    let videoTexts = articlesCurrentEvent[2];
    var details = new ProjectDetails();

    details.setContourColor(181, 38, 59, 0.6);
    details.setSuptitle(videoTexts.suptitle);
    details.setBackgroundImage("fig/background/red_chessboard.png");

    var youtube = new Youtube();
    youtube.setWidth("65%");
    youtube.setCorner(Border.ALL, "10px");

    details.setGraphic(1, youtube.get("https://youtu.be/aHt-fGy5BYQ"));
    
    for(let content of videoTexts.contents){
        details.emplace(content.length);
        for(let cell of content)
            details.appendCell(cell);

    }
    
    return details.get();
}