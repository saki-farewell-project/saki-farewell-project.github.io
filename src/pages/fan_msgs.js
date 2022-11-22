import InvertableColumn from "../modules/invertable_columns";
import "../css/previous_works.css";
import Image from "../modules/Image";
import { merge, wrapDiv, wrapDivRecursive, wrapLanguages} from "../utils";
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
    var cols = new InvertableColumn();
    var img = new Image();
    img.setWidth("65%");
    img.setCorner(Border.ALL, "15px");

    const preffix = "fig/previous_works/";
    const filenames = ["proj1.jpg", "proj2.jpg"];
    const link = "#/previous-works/proj";
    for(var i = 0; i < 2; i++){
        const fig = img.get(preffix+filenames[i]);
        const image = wrapDiv(["thumbnail-container", "button"], 
            !i? wrapLanguages(articlesProject1[0].title): 
            wrapLanguages(articlesProject2[0].title), fig);

        cols.insert(i, wrapLink(link+(i+1).toString(), image));
    }
    
    const title = wrapDivRecursive(["title-container","title"], "Coming Soon!");
    return wrapDiv("page-container", title);
}
