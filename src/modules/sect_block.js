import "../css/sect_block.css";
import ColourRGBA from "../config/colour_rgba";
import { wrapDivRecursive, wrapDiv, wrapLanguages} from "../utils";
import { fadeInLeftwards, fadeInRightwards } from "./defaults/entrance_effect";
import Button from "./button";

export default class SectBlock{
    constructor(){
        this.title = {};
        this.viewAll = false;
    }

    setTitle(title){
        this.title.en = title.en? title.en: title;
        this.title.jp = title.jp? title.jp: this.title.en;
    }

    setViewAll(url) {
        this.viewAll = true;
        this.url = url;
    }

    get(item){
        var header = [];

        var langs = wrapLanguages(this.title);
        langs = wrapDiv("title", langs);
        langs = fadeInLeftwards.get(langs);
        header.push(langs);
        if (this.viewAll) {
            var all = new Button({jp: "View All", en: "View All"});
            header.push(wrapDiv("view-all", all.get(this.url)));
        }
            

        header = wrapDiv("header", header);
        item = wrapDiv("content", item);
        return wrapDiv("sect-block", header, item);
    }

}