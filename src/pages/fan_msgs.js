import InvertableColumn from "../modules/invertable_columns";
import "../css/previous_works.css";
import Image from "../modules/Image";
import { merge, wrapDiv, wrapDivRecursive, wrapDivStyled, wrapLanguages} from "../utils";
import Border from "../config/border";
import { wrapLink } from "../utils";


const FanMsgs = () => {
    window.scrollTo(0, 0);
    return merge(
        createTabs()
    )
};
  
export default FanMsgs;

function createTabs(){
    window.screen.width;
    return wrapDivStyled("page-container", {fontSize: "5VW", color:"white"}, 
        window.screen.width + " x " + window.screen.height);
}
