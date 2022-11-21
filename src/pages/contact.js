import createFootNote from "../footnote";
import { merge, wrapLanguages, wrapDiv, wrapDivStyled, wrapStyle} from '../utils';
import { EntranceEffect } from '../modules/entrance_effect';
import RawParagraph from '../modules/raw_paragraph';
import articlesContact from "../articles/article_contact";
import TitledContainer from "../modules/titled_container";
import Image from "../modules/Image";
import ImageLinked from "../modules/Image_linked";
import Border from "../config/border";
import Column from "../modules/column";
import InvertableColumn from "../modules/invertable_columns";
import Slider from "../modules/slider";
import { fadeIn, fadeInDelayed, fadeInExplosiveDelayed} from "../modules/defaults/entrance_effect";
import { staffInformationLeo, staffInformationZhadar, 
    staffInformationSakazuki, staffInformationAbner, staffInformationSteve} 
from "../modules/staff_information";


const Contact = () => {
    EntranceEffect.stopAllRequest();
    window.scrollTo(0, 0);
    
    const App = merge(
        createContacts(), 
        createColaborators(), 
        createStaffs(), 
        createBussiness(), 
        createSocialMedia(), 
        createFootNote(0)
    );

    EntranceEffect.startAllRequest();
    EntranceEffect.debug();
    
    return App;
};
  
export default Contact;


function createColaborators(){
    var paragraph = new RawParagraph();
    paragraph.setSuptitle("Contact");
    paragraph.setTitle(wrapLanguages(articlesContact.participants.title));
    paragraph.setPassage(articlesContact.participants.passage.map(
        function(x){return wrapLanguages(x)}));
    return wrapStyle({marginBottom: "5%"}, paragraph.get());
}

function createContacts()
{
    var img = new Image();
    img.setWidth("60%");
    img.setMargin(Border.ALL, "10px");
    img.setMargin(Border.BOTTOM, "0px");

    var imgLink = new ImageLinked(); 
    imgLink.setWidth("35%");
    img.setMargin(Border.ALL, "0px");
    img.setCorner(Border.ALL, "0");
    imgLink.setMargin(Border.TOP, "20px");
    imgLink.setWaterMark(img.get("fig/common/icons/ext_link.png"));

    var cols = new InvertableColumn();
    for (var i = 0; i < 2; i++)
    {
        var platform = "Twitter";
        var path = "twitter.png";
        if (i)
        {
            platform = "Discord";
            path = "discord.png";
        }
        path = "fig/common/icons/" + path;
        cols.insert(i, fadeInExplosiveDelayed.get(img.get(path)));
    }

    var titledContainer = new TitledContainer();
    titledContainer.setTitle("Social Media");
    titledContainer.setFontColor(255, 255, 255,1);
    titledContainer.setTitleColor(229, 49, 76, 1);
    titledContainer.setBodyColor(181, 38, 59, 1);
    titledContainer.setRight();

    var paragraph = new RawParagraph();
    paragraph.setSuptitle("Contact");
    paragraph.setTitle("");
    paragraph.setPassage("lololo");

    return titledContainer.get(wrapDiv("titled-media-text",
        wrapStyle({width: "80%", marginLeft: "10%"}, cols.get())));
}

function createBussiness(){
    var paragraph = new RawParagraph();
    //paragraph.setSuptitle("Contact");
    paragraph.setTitle(wrapLanguages(articlesContact.bussiness.title));
    paragraph.setPassage(articlesContact.bussiness.passage.map(
        function(x){return wrapLanguages(x)}));
    return wrapStyle({marginBottom: "5%"}, paragraph.get());
}


function createSocialMedia(){
    var img = new Image();
    img.setWidth("60%");
    img.setMargin(Border.ALL, "10px");
    img.setMargin(Border.BOTTOM, "0px");
    img.setCircle();
    
    var items = [];
    

    var cols = new InvertableColumn();
    cols.insert(0, fadeInExplosiveDelayed.get(img.get("fig/common/pfp.jpg")));

    var imgLink = new ImageLinked(); 
    imgLink.setWidth("35%");
    img.setMargin(Border.ALL, "0px");
    img.setCorner(Border.ALL, "0");
    imgLink.setMargin(Border.TOP, "20px");
    imgLink.setWaterMark(img.get("fig/common/icons/ext_link.png"));

    items.push(fadeInDelayed.get(imgLink.get("fig/common/icons/email.webp", "mailto:wws.haato@gmail.com")));
    items.push(fadeInDelayed.get(wrapDiv("title", "wws.haato@gmail.com")));
    cols.insert(1, merge(items));
    //cols.setPadding(Border.LEFT, "10px");

    var titledContainer = new TitledContainer();
    titledContainer.setTitle("Email");
    titledContainer.setFontColor(255, 255, 255, 1);
    titledContainer.setTitleColor(70, 132, 219, 1);
    titledContainer.setBodyColor(60, 112, 185, 1);
    titledContainer.setLeft();

    return titledContainer.get(wrapDiv("titled-media-text",
        wrapStyle({width: "80%", marginLeft: "10%"}, cols.get())));
    
}

function createStaffs(){
    var titledContainer = new TitledContainer();
    titledContainer.setTitle("Staff");
    titledContainer.setFontColor(255, 255, 255,1);
    titledContainer.setTitleColor(229, 49, 76, 1);
    titledContainer.setBodyColor(181, 38, 59, 1);
    titledContainer.setRight();

    var slider = new Slider();
    slider.append(staffInformationLeo.get());
    slider.append(staffInformationZhadar.get());
    slider.append(staffInformationSakazuki.get());
    slider.append(staffInformationAbner.get());
    slider.append(staffInformationSteve.get());

    slider.setClickWidth("4VW");
    slider.setBarColor(229, 49, 76, 1);
    slider.setDotColor(255,255,255,1);
    slider.setWidth("100%");
    
    const leftContent = fadeInExplosiveDelayed.get(slider.get());

    return titledContainer.get(leftContent);
}