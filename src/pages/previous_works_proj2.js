import "../css/page_switcher.css";
import "../css/previous_works.css";

import Image from "../modules/Image";
import Youtube from "../modules/youtube";

import Border from "../config/border";
import ProjectTopBanner from "../modules/project_top_banner";
import ProjectDetails from "../modules/project_details";
import createFootNote from "../footnote";
import ImageLinked from "../modules/Image_linked";
import Column from "../modules/column";

import { EntranceEffect } from "../modules/entrance_effect";
import {fadeInExplosive } from "../modules/defaults/entrance_effect";
import {merge, wrapDiv,wrapDivStyled, wrapLanguages, } from "../utils";

import PageSwithcer from "../modules/page_switcher";
import articlesProject1 from "../articles/article_proj1";
import articlesProject2 from "../articles/article_proj2";



const PreviousWorksProject2 = () => {
    EntranceEffect.stopAllRequest();
    window.scrollTo(0, 0);
    const App = merge(
        createTopBanner(), 
        createVideoDetails(), 
        createDescriptionDetails(), 
        createMeaningOfLyrics(),
        createPageSwithcer(), 
        createFootNote("70px")
    );
    EntranceEffect.startAllRequest();
    EntranceEffect.debug();
    
    return App;
}

export default PreviousWorksProject2;


function createTopBanner(){
    let topBannerTexts = articlesProject2[0];
    var img = new Image();
    img.setCorner(Border.ALL, "10px");
    var topBanner = new ProjectTopBanner();

    const dir = "fig/previous_works/proj2/";
    topBanner.setGraphic(img.get(dir+"compressed.gif"));
    topBanner.setSuptitle(topBannerTexts.suptitle);
    topBanner.setTitle(topBannerTexts.title);
    topBanner.setPassage(topBannerTexts.passage);
    return topBanner.get();
}


function createPageSwithcer(){
    var img = new Image();
    img.setWidth("25%");
    img.setCorner(Border.ALL, "2.5px");
    img.setMargin(Border.ALL, "5px");

    var switcher = new PageSwithcer(
        "/#/previous-works/proj1", 
        img.get("fig/previous_works/proj1.jpg"), 
        wrapLanguages(articlesProject1[0].title));

    switcher.setBackground(181, 38, 59, 1);
    return wrapDivStyled("page-switcher", {marginTop: "70px"}, 
        fadeInExplosive.get(switcher.get()));
}


function createVideoDetails(){
    let videoTexts = articlesProject2[1];
    var details = new ProjectDetails();

    details.setContourColor(0, 102, 204, 0.6);
    details.setBackgroundImage("fig/background/blue.png");

    details.setSuptitle(videoTexts.suptitle);

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


function createDescriptionDetails(){
    var details = new ProjectDetails();
    let staffTexts = articlesProject2[2];

    details.setSuptitle(staffTexts.suptitle);
    details.setContourColor(106, 13, 173, 0.4);
    details.setBackgroundImage("fig/background/purple.png");

    const dir = "fig/previous_works/proj2/";


    var img = new Image();
    img.setWidth("50%");
    img.setMargin(Border.ALL, "10px");
    img.setCorner(Border.ALL, "10px");
    details.setGraphic("org", img.get(dir+"haachama.png"));
    details.setGraphic("singing-haatons", img.get(dir+"haaton.png"));

    for(let content of staffTexts.contents){
        details.emplace(content.length);
        for(let cell of content)
            details.appendCell(cell);

    }
    
    return details.get();
}


function createMeaningOfLyrics(){
    var details = new ProjectDetails();
    let staffTexts = articlesProject2[3];

    details.setSuptitle(staffTexts.suptitle);
    details.setContourColor(181, 38, 59, 0.4);
    details.setBackgroundImage("fig/background/red.png");

    const dir = "fig/previous_works/proj2/";


    var img = new Image();
    img.setWidth("75%");
    img.setMargin(Border.ALL, "10px");
    img.setCorner(Border.ALL, "10px");
    details.setGraphic("beast", img.get(dir+"beast.png"));
    details.setGraphic("zorga", img.get(dir+"zorga.png"));
    details.setGraphic("pineapple", img.get(dir+"pineapple.png"));

    for(let content of staffTexts.contents){
        details.emplace(content.length);
        for(let cell of content)
            details.appendCell(cell);

    }
    
    return details.get();
}