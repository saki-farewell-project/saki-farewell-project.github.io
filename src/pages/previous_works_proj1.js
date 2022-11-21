import "../css/previous_works.css";
import "../css/page_switcher.css";

import Image from "../modules/Image";
import Youtube from "../modules/youtube";

import TitledMediaText from "../modules/titled_media_text";
import Border from "../config/border";
import Slider from "../modules/slider";
import ProjectTopBanner from "../modules/project_top_banner";
import ProjectDetails from "../modules/project_details";
import createFootNote from "../footnote";
import ImageLinked from "../modules/Image_linked";
import Column from "../modules/column";
import PageSwithcer from "../modules/page_switcher";
import articlesProject1 from "../articles/article_proj1";
import articlesProject2 from "../articles/article_proj2";

import { EntranceEffect } from "../modules/entrance_effect";
import {merge, wrapDiv, wrapDivStyled, wrapLanguages} from "../utils";
import {fadeInExplosiveLatched, fadeInExplosive } from "../modules/defaults/entrance_effect";



const PreviousWorksProject1 = () => {
    EntranceEffect.stopAllRequest();
    window.scrollTo(0, 0);

    const App = merge(
        createTopBanner(), 
        createVideoDetails(), 
        createWebsiteDetails(), 
        createPageSwithcer(), 
        createFootNote("70px")
    );

    EntranceEffect.startAllRequest();
    EntranceEffect.debug();
    
    return App;
}

export default PreviousWorksProject1;


function createPageSwithcer(){
    var img = new Image();
    img.setWidth("25%");
    img.setCorner(Border.ALL, "2.5px");
    img.setMargin(Border.ALL, "5px");

    var switcher = new PageSwithcer(
        "/#/previous-works/proj2", 
        img.get("fig/previous_works/proj2.jpg"), 
        wrapLanguages(articlesProject2[0].title));

    switcher.setBackground(181, 38, 59, 1);
    return wrapDivStyled("page-switcher", {marginTop: "70px"}, 
        fadeInExplosive.get(switcher.get()));
}


function createSlide(title, imgPath, lines){
    var img = new Image();
    var cols = new Column(2);
    cols.setRatios(35, 65);

    const titleItem = wrapDiv("title", wrapLanguages(title));
    cols.insert(0, img.get(imgPath));

    var wrapLines = lines.map(function(x){
        return wrapDiv("line", wrapLanguages(x));});

    cols.insert(1, wrapLines.shift());
    
    
    return wrapDiv("passage", titleItem, cols.get(), wrapLines);
}

function createTopBanner(){
    var topBanner = new ProjectTopBanner();
    var slider = new Slider();

    slider.setWidth("100%");
    slider.setBarColor(165, 42, 42, 1);
    slider.setBackgroundColor(218,165,32,1);
    slider.setClickWidth("3VW");
    slider.setPadding(Border.ALL, "10px");
    slider.setPadding(Border.TOP, "15px");
    slider.setCorner(Border.ALL, "20px");
    slider.setPeriod(3000);

    const dir = "fig/previous_works/proj1/";
    var i = 0;
    const imgPaths = ["supportive_msgs.png", "camera.png"];
    for(let slide of articlesProject1[0].slider){
        slider.append(createSlide(slide.title, 
            dir+imgPaths[i++], slide.lines));
    }

    
    

    topBanner.setGraphic(fadeInExplosiveLatched.get(slider.get()));
    let topBannerTexts = articlesProject1[0];
    topBanner.setSuptitle(topBannerTexts.suptitle);
    topBanner.setTitle(topBannerTexts.title);
    topBanner.setPassage(topBannerTexts.passage);

    return topBanner.get();
}


function createVideoDetails(){
    const dir = "fig/previous_works/proj1/";
    var details = new ProjectDetails();

    //details.setContourColor(0, 102, 204, 0.6);
    //details.setBackgroundImage("fig/background/3c.jpg");
    details.setContourColor(0, 102, 204, 0.6);
    details.setBackgroundImage("fig/background/blue.png");

    let videoTexts = articlesProject1[1];
    details.setSuptitle(videoTexts.suptitle);

    var youtube = new Youtube();
    youtube.setWidth("65%");
    youtube.setCorner(Border.ALL, "10px");

    details.setGraphic("video", youtube.get("https://youtu.be/LLuqBMnfKJY"));


    var img = new Image();
    img.setWidth("50%");

    details.setGraphic("homography-frames", img.get(dir+"desc_img.png"));
    details.setGraphic("earth", img.get(dir+"earth.png"));
    
    for(let content of videoTexts.contents){
        details.emplace(content.length);
        for(let cell of content)
            details.appendCell(cell);

    }
    
    return details.get();
}


function createWebsiteDetails(){
    var details = new ProjectDetails();
    details.setContourColor(106, 13, 173, 0.4);
    details.setBackgroundImage("fig/background/purple.png");
    details.setGraphic("view-website", TitledMediaText.createButton(
        "Visit website", "https://haatotabi.tk/home", 
        {background: details.contourColor.getA(0.6), marginTop: "10%", marginBottom: "7%"})
    );

    
    var waterMark = new Image();
    waterMark.setWidth("50%");

    var img = new ImageLinked();
    img.setWidth("25%");
    const dir = "fig/common/icons/";

    img.setWaterMark(waterMark.get(dir+"ext_link.png"));
    details.setGraphic("mass", img.get(dir+"mass.png", "https://twitter.com/ManoSquad"));

    let videoTexts = articlesProject1[2];
    details.setSuptitle(videoTexts.suptitle);

    
    for(let content of videoTexts.contents){
        details.emplace(content.length);
        for(let cell of content)
            details.appendCell(cell);

    }
    return details.get();
}