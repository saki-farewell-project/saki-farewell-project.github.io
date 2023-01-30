import "../css/fan_msg.css";
import { merge, wrapDiv, wrapDivRecursive, wrapDivStyled, wrapLink } from "../utils";
import Boarder from "../config/border";
import { wrapLanguages } from "../utils";
import Image from "./Image";
import ImageLinked from "./Image_linked";
import "../css/image.css";
import "../css/fanmsg_card.css";
import twitterIntent from 'twitter-intent';
import UniqueIDGenerator from "./unique_id_generator";
import { useRef } from "react";
import { fadeIn, fadeInDelayed, fadeInExplosive, fadeInExplosiveDelayed, fadeInExplosiveLatched, fadeInLatched, fadeInRightwards, fadeInRightwardsDelayed, fadeInRightwardsLatched} from "./defaults/entrance_effect";

export default class FanMsg {
    static FIRE_IMG = "fig/fire.jpg";
    static uidGen = new UniqueIDGenerator("msg-cards");
    constructor(kwargs, is_txt) {
        this.name = kwargs.name;
        this.context = is_txt ? wrapLanguages(kwargs): "";
        this.margin =  new Boarder();
        this.padding =  new Boarder();
        this.is_jp = kwargs.is_jp == 1;
        this.quote = kwargs.quote;
        this.uid = FanMsg.uidGen.generateUniqueID();
        this.is_txt = !kwargs.imgs;
        this.ref = useRef(null);
    }

    goToMsg() {
        window.scrollTo({
            top:this.ref.current.offsetTop, 
            behavior: "smooth"
        });
    }

    getMsgCard(){
        //front side of card
        var items = [];
        var temp = this.is_jp ? "サキはなりましたよ、私の": "Saki has become my";
        temp = wrapDiv("temp", temp);
        items.push(fadeInDelayed.get(temp));

        var quote = this.is_jp ? "「": " \"";
        quote += this.quote + (this.is_jp ? "」に": "\"");
        quote = wrapDiv("quote", quote);
        items.push(fadeInExplosive.get(quote));

        var name = this.is_jp ? this.name + " より": "from " + this.name;
        name = wrapDiv("name", name);
        items.push(fadeInDelayed.get(name));

        const args = {backgroundImage: "url(" + FanMsg.FIRE_IMG + ')'};
        const front = wrapDivStyled("front", args, items);
        const back = wrapDiv("back", this.context);
        const card = wrapDivRecursive(["fanmsg-card", "inner"], [front, back]);

        return fadeIn.get(card);
    }

    setMargin(ind, val){
        this.margin.set(ind, val);
    }

    setPadding(ind, val){
        this.padding.set(ind, val);
    }

    getAll(){
        var items = [];

        var name = wrapDiv("name", this.name);
        items.push(fadeInDelayed.get(name));
        items.push(fadeInLatched.get(this.get()));

        var quote = this.is_jp ? "サキは私の": "Saki has become my";
        quote += this.is_jp ? "「": " \"";
        quote += this.quote + (this.is_jp ? "」になりました": "\"");
        quote = wrapDiv("quote", quote);
        items.push(fadeInExplosiveDelayed.get(quote));

        var cont = wrapDivStyled("div", {width:"85%"}, this.context);
        items.push(fadeInRightwardsLatched.get(this.context));
        
        return <div ref={this.ref}>{wrapDiv("all_msgs", items)}</div>;
    }


    getTwitterPost(){
        var text = 
            "@sakifansupport1\n" + this.name + " says:\n\n" +
            "Saki, you've become my \""+this.quote+"\"\n"+
            "サキは私の「"+this.quote+"」になりました\n\n"+
            "saki-farewell-project.github.io/\n";

        return twitterIntent.tweet.url({
            text: text,
            hashtags: ['芦澤サキ'],
        });
    }


    get(){
        var img = new ImageLinked();
        img.setWidth("100%");
        img.setCorner(Boarder.ALL, "15px");
        const divArgs = [
            {
                className: "container", 
                style: {
                    maxWidth: "25%", 
                    margin: this.margin.get(),
                    marginLeft: "calc(50% - 25% / 2)",
                    padding: this.padding.get()
                }
            }, 
            {
                className: "row", 
                style: {maxWidth: "auto"}
            }
        ];

        var waterMark = new Image();
        waterMark.setWidth("35%");
        //img.setWaterMark(waterMark.get("fig/common/icons/ext_link.png"));
                   
        return wrapDiv(divArgs, img.get("fig/common/icons/tweet.png", this.getTwitterPost()));
    }
}
