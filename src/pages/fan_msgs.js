import InvertableColumn from "../modules/invertable_columns";
import "../css/previous_works.css";
import Image from "../modules/Image";
import { merge, wrapDiv, wrapDivRecursive, wrapDivStyled, wrapLanguages} from "../utils";
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


const FanMsgs = () => {
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
  
export default FanMsgs;


function createAll(){
    var tc = new TitledContainer();
    tc.setTitle("All Messages");
    var updatetime = {
        jp: articlesHome[4].jp + LAST_UPDATE, 
        en: articlesHome[4].en + LAST_UPDATE
    };
    
    const title = wrapDiv("title", wrapLanguages(updatetime));
    var cols = new InvertableColumn();
    var items = [[], []];
    var i = 0;
    for (let msg of FETCHED_MSGS){
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
    var cont = merge(wrapDiv("titled-media-text", title), cols.get())
    return tc.get(cont);
}