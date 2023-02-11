import InvertableColumn from "../modules/invertable_columns";
import "../css/credit.css";
import Image from "../modules/Image";
import { merge, wrapDiv, wrapDivRecursive, wrapDivStyled, wrapLanguages, wrapStyle} from "../utils";
import Border from "../config/border";
import { wrapLink } from "../utils";
import FanartCase from "../modules/fanart_case";
import { EntranceEffect } from "../modules/entrance_effect";
import createFootNote from "../footnote";
import TitledContainer from "../modules/titled_container";
import articlesHome from "../articles/article_home";
import LAST_UPDATE from "../python/last_update";
import FanMsg from "../modules/fan_msg";
import FETCHED_MSGS from "../python/fetched_msgs";
import SectBlock from '../modules/sect_block';
import { fadeIn, fadeInDelayed, fadeInExplosive, fadeInExplosiveDelayed } from "../modules/defaults/entrance_effect";


const Credit = () => {
    EntranceEffect.stopAllRequest();
    window.scrollTo(0, 0);

    const App = merge(
        createAll(), 
        createFootNote("0px")
    );

    EntranceEffect.startAllRequest();
    EntranceEffect.debug();

    return App;
};
  
export default Credit;

function getCredit(en, jp, names) {
    var items = [];
    items.push(fadeInExplosive.get(wrapDiv("position", wrapLanguages({en:en, jp:jp}))));
    
    for (let name of names) 
        items.push(fadeIn.get(wrapDiv("name", name)));
    
    return wrapDiv("cred", items);
}


function createAll(){
    var sect = new SectBlock();
    sect.setTitle("Credit");

    var items = [];
    items.push(getCredit("Programming", "プログラミング", ["Leo Hsieh"]));
    items.push(getCredit("UI Design", "UI デザイン", ["Seira Astramor"]));
    items.push(getCredit("Translation", "翻訳", ["Aster", "Aryadi Subagio"]));
    items.push(getCredit("Special Thanks", "Special Thanks", [
        "RIOT MUSIC English Fan Server", 
        wrapLanguages({en:"All Project Participants", jp:"企画参加者全員"})
    ]));

    return wrapStyle({marginTop: "60px"}, sect.get(items));
}