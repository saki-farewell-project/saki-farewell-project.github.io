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
import Column from "./column";
import LightBox from "./light_box";

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
        this.imgs = kwargs.imgs;
        if (kwargs.cred)
            this.cred = kwargs.cred;
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
        var temp = {jp:"なりましたよ、私の", en:"Saki has become my"};
        temp = wrapDiv("temp", wrapLanguages(temp));
        items.push(fadeInDelayed.get(temp));

        var quote = {en: "\"" + this.quote + "\"", jp: "「" + this.quote + "」に"};
        quote = wrapDiv("quote", wrapLanguages(quote));
        items.push(fadeInExplosive.get(quote));

        var name = {jp: this.name + " より", en: "from " + this.name};
        name = wrapDiv("name", wrapLanguages(name));
        items.push(fadeInDelayed.get(name));

        const args = {backgroundImage: "url(fig/cards/" + this.name.replace(" ", "-") + ".png)"};
        items = [];
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

    getImg(ind) {
        var img = new Image();
        img.setWidth("100%");
        img = img.get(this.imgs[ind]);
        const rslt = <div onClick={this.box.get()}>{img}</div>;
        return wrapDiv("fanart-hover", rslt);
    }

    getAll(){
        var items = [];

        var name = wrapDiv("name", this.name);
        items.push(fadeInDelayed.get(name));
        items.push(fadeInLatched.get(this.get()));

        var wrap = [wrapLanguages({jp:"なりましたよ、私の", en: "You've become my"})];
        var quote = {jp:"「", en: " \""};
        for (let tag in quote)
            quote[tag] += this.quote + (tag=="jp" ? "」に": "\"");
        //quote += this.quote + (this.is_jp ? "」に": "\"");

        var quote = {jp: "私の「", en: "Saki has become my \""};
        for (let tag in quote)
            quote[tag] += this.quote + (tag=="jp" ? "」になりました": "\"");
        
        quote = wrapDiv("quote", wrapLanguages(quote));
        items.push(fadeInRightwardsDelayed.get(quote));

        if (this.is_txt) 
            items.push(fadeInExplosiveLatched.get(this.context));

        else {
            this.box = new LightBox();
            for (let file of this.imgs)
                this.box.appendImg(file);

            var img = this.getImg(0);
            if (this.imgs.length == 2) {
                var col = new Column(2);
                for (var i = 0; i < 2; i++) 
                    col.insert(i, this.getImg(i));

                img = col.get();
            }
            
            items.push(fadeInExplosiveLatched.get(img));
            if (this.cred){
                var cred = "credit: " + this.cred;
                items.push(wrapDiv("credit", cred));
            }
        }


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
