import "../css/top_banner.css";
import { merge, wrapDiv } from "../utils";
import { fadeIn } from "./defaults/entrance_effect";
import UniqueIDGenerator from "./unique_id_generator";

export default class TopBanner{
    static UID_GEN = new UniqueIDGenerator("top_banner");

    constructor(msgs){
        this.quotes = msgs.map(x => x.quote);
        this.quotes.sort((a, b) => 0.5 - Math.random());
        this.quotes = this.quotes.slice(0, 3);
        this.quotes.push("")
        this.inProg = true;;
        this.FIXED_ID = TopBanner.UID_GEN.generateUniqueID();
        this.STATIC_ID = TopBanner.UID_GEN.generateUniqueID();
        this.PROG_ID = TopBanner.UID_GEN.generateUniqueID();
    }

    scrollCallBack(){
        if (!this.inProg)
            return;

        var elemProg = document.getElementById(this.PROG_ID);
        if (!elemProg)
            return;

        const height = document.documentElement.clientHeight;
        const scroll = document.body.scrollTop || document.documentElement.scrollTop;
        const scrolled = (scroll / height) * 100;
        elemProg.style.width = scrolled + "%";
        if (scrolled >= 100){
            console.log("aaaaaa!!!!!!!!!!!!!!!!!!!!!!!!!aa", scrolled);
            var elem = document.getElementById(this.FIXED_ID);
            elem.style.display = "none";
            this.inProg = false;
            document.getElementById(this.FIXED_ID)
        }
    }

    get(pos){
        var title = wrapDiv(["upper", "suptitle"], "You Have Become My");
        var prog = <div id ={this.PROG_ID} className="progress"></div>;
        var prog = wrapDiv("bar-container", prog);

        var items = [title, prog];
        for (let quote of this.quotes){
            var item = wrapDiv("quote", "「" + quote + "」");
            //items.push(item);
        }

        items.push(wrapDiv("lower"));
        const rslt = wrapDiv(["top-banner", pos], items);
        const id = pos == "fixed" ? this.FIXED_ID: this.STATIC_ID;

        return <div id ={id}>{rslt}</div>;
    }

}