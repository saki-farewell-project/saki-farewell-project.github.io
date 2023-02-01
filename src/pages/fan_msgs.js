import InvertableColumn from "../modules/invertable_columns";
import "../css/previous_works.css";
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
    var sect = new SectBlock();
    sect.setTitle("All Messages");

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

    return wrapStyle({marginTop: "60px"}, sect.get(cols.get()));
}