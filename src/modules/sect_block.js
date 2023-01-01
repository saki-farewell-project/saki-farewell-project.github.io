import "../css/sect_block.css";
import ColourRGBA from "../config/colour_rgba";
import { wrapDivRecursive, wrapDiv, wrapLanguages} from "../utils";
import { fadeInLeftwards, fadeInRightwards } from "./defaults/entrance_effect";

export default class SectBlock{
    constructor(){
        this.title = {};
    }

    setTitle(title){
        this.title.en = title.en? title.en: title;
        this.title.jp = title.jp? title.jp: this.title.en;
    }

    get(item){
        var header = [];

        var langs = wrapLanguages(this.title);
        langs = wrapDiv("title", langs);
        langs = fadeInLeftwards.get(langs);
        header.push(langs);
        //header.push(wrapDiv("view-all", "aaaaaa"));

        header = wrapDiv("header", header);
        item = wrapDiv("content", item);
        return wrapDiv("sect-block", header, item);
    }

}