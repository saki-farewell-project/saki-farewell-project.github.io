import "../css/fan_msg.css";
import { merge, wrapDiv, wrapDivStyled } from "../utils";
import Boarder from "../config/border";
import { wrapLanguages } from "../utils";
import Image from "./Image";
import ImageLinked from "./Image_linked";
import "../css/image.css";
import twitterIntent from 'twitter-intent';
import UniqueIDGenerator from "./unique_id_generator";
import { fadeInExplosive, fadeInExplosiveDelayed, fadeInLeftwardsLatched} from "./defaults/entrance_effect";

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
        this.img_path = kwargs.img_path;
        this.is_jp = kwargs.is_jp == 1;
        this.quote = kwargs.quote;
        this.uid = FanMsg.uidGen.generateUniqueID();
        this.is_txt = !kwargs.imgs;
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

        return wrapDivStyled("card", 
            {backgroundImage: "url("+FanMsg.FIRE_IMG+')'}, items);
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
        var suptitle = this.is_jp ? "サキはなりましたよ、私の": "Saki has become my";
        suptitle = wrapDiv("suptitle", suptitle);
        items.push(suptitle);

        var quote = this.is_jp ? "「": " \"";
        quote += this.quote + (this.is_jp ? "」に": "\"");
        quote = wrapDiv("passage", quote);
        items.push(quote);

        var name = this.is_jp ? this.name + " より": "from " + this.name;
        name = wrapDiv("name", name);
        items.push(fadeInExplosiveDelayed.get(wrapDiv("passage", this.name)));
        
        return wrapDiv("titled-media-text", items);
    }


    get()
    {
        var img = new ImageLinked();
        img.setWidth("100%");
        img.setCorner(Boarder.ALL, "10px");

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
        waterMark.setWidth("15%");
    
        img.setWidth("100%");
        var text = 
            "@sakifansupport1\n" + this.name + " says:\n\n" +
            "SAKI, you have become my \""+this.quote+"\"\n"+
            "サキは私の「"+this.quote+"」になりました\n\n"+
            "submit/投稿: https://forms.gle/ys4Xca2oZpSuFuNy7\n"+
            "website/ウェブサイト: https://saki-farewell-project.github.io\n";

        const href = twitterIntent.tweet.url({
            text: text,
            hashtags: ['芦澤サキ', 'Saki_Farewell_Project'],
        });
        const tweet = wrapDiv("tweet-text","Tweet!");
        img.setWaterMark(merge(waterMark.get("fig/common/icons/twitter.png"), tweet));

        /*var bundle = 
            (<div className="centered-img" style={{width: "100%", margin: this.margin.get()}}>
                <img src={img_path}  class="centered-img" 
                        style={{width: "100%", borderRadius: this.corner.get()}}>
                            
                </img>
                
            </div>);*/
                   
        return wrapDiv(divArgs, img.get(this.img_path, href));

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
