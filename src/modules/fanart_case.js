import "../css/fanart_case.css";
import ColourRGBA from "../config/colour_rgba";
import { wrapDivRecursive, wrapDiv, wrapLanguages, wrapClassId, wrapId, wrapImgId, wrapStyle} from "../utils";
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
        var header = [];
        header.push(<hr class="decor-line"></hr>);
        header.push(wrapDiv("name", this.name));
        var name = wrapDiv("header", header);
        name = fadeIn.get(name);

        var dots = [];
        while (dots.length < 3)
            dots.push(wrapDiv("dot"));

        var items = [];
        while (items.length < 2) {
            var args = { position: "absolute", width: "100%"};
            if (items.length) {
                args.bottom = "calc(var(--name) / 2)";
                args.display = "var(--lower-dots-disp)";
            }

            items.push(wrapStyle(args, dots));
        }

        items.push(name);
        var anchors = [];
        var wrap = [this.is_jp ? "なりましたよ、私の": "You've become my"];
        var quote = this.is_jp ? "「": " \"";
        quote += this.quote + (this.is_jp ? "」に": "\"");

        wrap.push(wrapDiv("quote", quote));
        wrap = wrapDiv("txt-wrap", wrap);
        wrap = wrapId("left", this.ids.wrap, wrap);

        if (this.cred && 0){
            var cred = "credit: " + this.cred;
            items.push(wrapDiv("credit", cred));
        }

        const canvus = wrapId("canvus", this.ids.canvus);
        var img = wrapImgId("frame",  this.ids.img, this.imgs[0]);
        img = wrapDiv("right", img);
        
        anchors.push(canvus);
        anchors.push(img);
        anchors.push(wrap);

        var box = new LightBox();
        for (let file of this.imgs)
            box.appendImg(file);

        const rslt = <div class = {"fanart-case"} 
            onMouseEnter = {this.animate.bind(this, 0)} 
            onMouseLeave = {this.animate.bind(this, 1)}> 
            {wrapDiv("anchor", items, anchors)}
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