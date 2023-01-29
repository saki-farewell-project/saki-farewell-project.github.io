import InvertableColumn from "../modules/invertable_columns";
import "../css/previous_works.css";
import Image from "../modules/Image";
import { merge, wrapDiv, wrapDivRecursive, wrapDivStyled, wrapLanguages} from "../utils";
import Border from "../config/border";
import { wrapLink } from "../utils";
import FanartCase from "../modules/fanart_case";


const Debug = () => {
    window.scrollTo(0, 0);
    return merge(
        createTabs()
    )
};
  
export default Debug;

function createTabs(){
    window.screen.width;
    return wrapDivStyled("page-container", {fontSize: "5VW", color:"white"}, 
        window.screen.width + " x " + window.screen.height + ", artcase:" + FanartCase.DEBUG);
}
