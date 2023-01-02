import "../css/fanart_case.css";
import ColourRGBA from "../config/colour_rgba";
import { wrapDivRecursive, wrapDiv, wrapLanguages, wrapClassId, wrapId, wrapImgId} from "../utils";
import { fadeIn, fadeInExplosiveDelayed, fadeInExplosiveLatched, fadeInLeftwards, fadeInRightwards } from "./defaults/entrance_effect";
import FanMsg from "./fan_msg";
import UniqueIDGenerator from "./unique_id_generator";
import LightBox from "./light_box";
import "../css/light_box.css";

export default class FanartCase extends FanMsg{
    static UID_GEN = new UniqueIDGenerator("fanart-case");
    static DEBUG = "";

    constructor(kwargs){
        super(kwargs);
        this.imgs = kwargs.imgs;
        this.ids = {
            canvus: FanartCase.UID_GEN.genId(), 
            wrap: FanartCase.UID_GEN.genId(), 
            img: FanartCase.UID_GEN.genId(), 
        };
        
        if (kwargs.cred)
            this.cred = kwargs.cred;
    }

    getCase(){
        var items = [];
        var name = wrapDiv("name", this.name);
        name = fadeIn.get(name);
        items.push(name);

        var wrap = [this.is_jp ? "「": "You've become my"];
        var quote = this.is_jp ? "「": " \"";
        quote += this.quote + (this.is_jp ? "」": "\"");

        wrap.push(wrapDiv("quote", quote));
        wrap = wrapId("txt-wrap", this.ids.wrap, wrap);

        if (this.cred){
            var cred = "credit: " + this.cred;
            items.push(wrapDiv("credit", cred));
        }

        const canvus = wrapId("canvus", this.ids.canvus);
        const img = wrapImgId("frame",  this.ids.img, this.imgs[0]);
        
        items.push(canvus);
        items.push(img);
        items.push(wrap);

        var box = new LightBox();
        for (let file of this.imgs)
            box.appendImg(file);

        const rslt = <div class = {"fanart-case"} 
            onMouseEnter = {this.animate.bind(this, 0)} 
            onMouseLeave = {this.animate.bind(this, 1)}> 
            {wrapDiv("rel", items)}
        </div>;

        return <div onClick={box.get()}>{rslt}</div>;
    }

    animate(rev){
        var elems = [];
        for (let tag in this.ids){
            var elem = document.getElementById(this.ids[tag]);
            if (!elem)
                return;

            elems.push(elem);
        }

        const styles = ["width", "height", "top", "opacity", "transform"];
        const opts = { duration: 350, fill: 'forwards', easing: 'ease-out'};
        for (let elem of elems){
            var frames = [{}, {}];
            const comp = window.getComputedStyle(elem);
            if (!FanartCase.DEBUG && elem.id == this.ids.canvus && rev){
                var log = comp.getPropertyValue("width");
                log += " x " + comp.getPropertyValue("height");
                FanartCase.DEBUG = log;
            }
            for (let style of styles){
                for (var i = 0; i < 2; i++){
                    const tag = "--" + (i != rev? "end-": "init-") + style;
                    const val = comp.getPropertyValue(tag);
                    if (val)
                        frames[i][style] = val;
                }
            }
            elem.animate(frames, opts);
        }  
    }
}