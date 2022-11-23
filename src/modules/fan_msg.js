import "../css/fan_msg.css";
import { merge, wrapDiv, wrapDivStyled, wrapLink } from "../utils";
import Boarder from "../config/border";
import { wrapLanguages } from "../utils";
import Image from "./Image";
import ImageLinked from "./Image_linked";
import "../css/image.css";
import twitterIntent from 'twitter-intent';
import UniqueIDGenerator from "./unique_id_generator";
import { useRef } from "react";
import { fadeInDelayed, fadeInExplosiveDelayed, fadeInExplosiveLatched, fadeInRightwardsLatched} from "./defaults/entrance_effect";

export default class FanMsg
{
    static FIRE_IMG = "fig/fire.jpg";
    static uidGen = new UniqueIDGenerator("msg-cards");
    constructor(kwargs, is_txt)
    {
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

    goToMsg()
    {
        window.scrollTo({
            top:this.ref.current.offsetTop, 
            behavior: "smooth"
        });
    }

    getMsgCard()
    {
        var items = [];
        var suptitle = this.is_jp ? "サキはなりましたよ、私の": "Saki has become my";
        suptitle = wrapDiv("suptitle", suptitle);
        items.push(suptitle);

        var quote = this.is_jp ? "「": " \"";
        quote += this.quote + (this.is_jp ? "」に": "\"");
        quote = wrapDiv("passage", quote);
        items.push(quote);

        var name = this.is_jp ? this.name + " より": "from " + this.name;
        name = wrapDiv("name", name);
        items.push(name);

        var out = wrapDivStyled("card", 
            {backgroundImage: "url("+FanMsg.FIRE_IMG+')'}, items);
        return wrapLink(this.getTwitterPost(), out);
    }

    setMargin(ind, val)
    {
        this.margin.set(ind, val);
    }

    setPadding(ind, val)
    {
        this.padding.set(ind, val);
    }

    getAll()
    {
        var items = [];

        var name = wrapDiv("name", this.name);
        items.push(fadeInDelayed.get(name));
        items.push(fadeInExplosiveLatched.get(this.get()));

        var quote = this.is_jp ? "サキは私の": "Saki has become my";
        quote += this.is_jp ? "「": " \"";
        quote += this.quote + (this.is_jp ? "」になりました": "\"");
        quote = wrapDiv("quote", quote);
        items.push(fadeInExplosiveDelayed.get(quote));

        var cont = wrapDivStyled("div", {width:"85%"}, this.context);
        items.push(fadeInRightwardsLatched.get(this.context));
        
        return <div ref={this.ref}>{wrapDiv("all_msgs", items)}</div>;
    }


    getTwitterPost()
    {
        var text = 
            "@sakifansupport1\n" + this.name + " says:\n\n" +
            "SAKI, you have become my \""+this.quote+"\"\n"+
            "サキは私の「"+this.quote+"」になりました\n\n"+
            "submit/投稿: https://forms.gle/ys4Xca2oZpSuFuNy7\n"+
            "see full message/メッセージ全文: https://saki-farewell-project.github.io/\n";

        return twitterIntent.tweet.url({
            text: text,
            hashtags: ['芦澤サキ', 'Saki_Farewell_Project'],
        });
    }


    get()
    {
        var img = new ImageLinked();
        img.setWidth("100%");
        img.setCorner(Boarder.ALL, "15px");
        const divArgs = [
            {
                className: "w3-container", 
                style: {
                    maxWidth: "auto", 
                    margin: this.margin.get(),
                    padding: this.padding.get(), 
                }
            }, 
            {
                className: "row", 
                style: {maxWidth: "auto"}
            }
        ];

        var waterMark = new Image();
        waterMark.setWidth("35%");
    
        img.setWidth("15%");
        img.setWaterMark(waterMark.get("fig/common/icons/ext_link.png"));

        /*var bundle = 
            (<div className="centered-img" style={{width: "100%", margin: this.margin.get()}}>
                <img src={img_path}  class="centered-img" 
                        style={{width: "100%", borderRadius: this.corner.get()}}>
                            
                </img>
                
            </div>);*/
                   
        return wrapDiv(divArgs, img.get("fig/common/icons/twitter.png", this.getTwitterPost()));

        return img.get(img_path);
        
        /*var colInt = new NumberSuffix(this.colInterval);
        var extInt = colInt.clone();
        extInt.val/=2;

        var colItems = [];
        var colBorder = new Boarder();
        var ratioSuffix = new NumberSuffix("0%");
        for(var i = 0; i < this.items.length; ++i){
            colBorder.set(Boarder.LEFT, extInt.get());
            colBorder.set(Boarder.RIGHT, extInt.get());
            ratioSuffix.setVal(this.ratios[i]);
            const divArgs = {
                className: "column", 
                style: {
                    margin: colBorder.get(), 
                    textAlign: this.textAligns[i],
                    width: ratioSuffix.calc('-', colInt)
                }
            };

            colItems.push(wrapDiv(divArgs, this.items[i]));
        }

        const divArgs = [
            {
                className: "w3-container", 
                style: {
                    maxWidth: "auto", 
                    margin: this.margin.get(),
                    padding: this.padding.get()
                }
            }, 
            {
                className: "row", 
                style: {maxWidth: "auto"}
            }
        ];
        return wrapDiv(divArgs, colItems);*/
    }

}
