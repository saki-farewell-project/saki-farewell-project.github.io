import "../css/top_banner.css";
import { merge, wrapDiv, wrapDivStyled } from "../utils";
import { fadeInDelayed, fadeInExplosive, fadeInRightwards} from "./defaults/entrance_effect";
import UniqueIDGenerator from "./unique_id_generator";
import Image from "./Image";
import Border from "../config/border";

export default class TopBanner{
    static UID_GEN = new UniqueIDGenerator("top_banner");

    constructor(msgs){
        this.quotes = msgs.map(x => x.quote);
        this.quotes.sort((a, b) => 0.5 - Math.random());
        this.quotes = this.quotes.slice(0, 10);
        this.quotes.push("");
        
        this.lid = -1;
        this.inProg = true;
        this.quoteIds = this.quotes.map(x => TopBanner.UID_GEN.genId());
        
        this.FIXED_ID  = TopBanner.UID_GEN.genId();
        this.STATIC_ID = TopBanner.UID_GEN.genId();
        this.PROG_ID   = TopBanner.UID_GEN.genId();
        this.PROJ_ID   = TopBanner.UID_GEN.genId();
    }

    scrollCallBack(){
        if (!this.inProg)
            return;

        var elem = document.getElementById(this.PROG_ID);
        if (!elem)
            return;

        const height = document.documentElement.clientHeight;
        const scroll = document.body.scrollTop || document.documentElement.scrollTop;
        const scrolled = scroll / height;

        const setDisp = function(id, stat) { 
            var elem = document.getElementById(id);
            if (elem)
                elem.style.display = stat;
        };

        if (scrolled >= 0.95){
            setDisp(this.FIXED_ID, "none");
            this.inProg = false;
            /*var elem = document.getElementById(this.PROJ_ID);
            //elem.animate(effect.keyframes, effect.options);
            const kfs = [ {transform: 'scale(0.5, 0.5)', opacity: 0}, 
                { transform: 'scale(1, 1)', opacity: 1}
            ];

            const opts = {duration:600, fill: 'forwards', 
                easing: 'ease-out', delay: 300
            };
            elem.animate(kfs, opts);*/
        }

        else if (scrolled > 0.01){
            elem.style.width = scrolled * 100 + "%";
            const nid = Math.floor(scrolled * this.quotes.length);

            if (this.lid == nid)
                return;

            else if (this.lid != -1)
                setDisp(this.quoteIds[this.lid], "none");

            setDisp(this.quoteIds[nid], "block");
            this.lid = nid;
            var elem = document.getElementById(this.PROJ_ID);
            if (elem)
                elem.style.opacity = scrolled;
        }
    }

    getImg(file){
        var img = new Image();
        img.setWidth("100%");
        return wrapDiv("img-frame", img.get(file));
    }

    get(pos){
        var items = [];
        const isFix = pos == "fixed";
        //items.push(this.getImg("15%", "fig/banner-upper.png"));

        var title = wrapDiv("suptitle", fadeInExplosive.get("You Have Become My"));
        //title = fadeInExplosiveDelayed.get(title);
        var upperImg = this.getImg("fig/banner-upper.png");
        upperImg = fadeInDelayed.get(upperImg);

        items.push(wrapDiv("upper", upperImg, title));
        
        var style = {};
        if (!isFix)
            style.width = "100%";

        var prog = <div id ={this.PROG_ID} 
            className="progress" style={style}>
        </div>;

        prog = wrapDivStyled("bar-container", style, prog);
        items.push(prog);

        var lowerImg = this.getImg("fig/banner-lower.png");
        
        var quotes = [];
        if (isFix){
            lowerImg = <div id ={this.PROJ_ID} style={{opacity: 0}}>{lowerImg}</div>;
            for (var i = 0; i < this.quotes.length; i++){
                const style = {display: i? "none": "block"};

                var quote = "「" + this.quotes[i] + "」";
                quote = <div id ={this.quoteIds[i]} className="quote" style={style}>{quote}</div>
                quotes.push(quote);
            }
        }
        else{
            quotes.push(wrapDiv("quote", "「」"));
            //quotes.push(proj);
            lowerImg = <div style={{opacity: 1}}>{lowerImg}</div>;
        }
        
        items.push(wrapDiv("lower", quotes, lowerImg));
        const rslt = wrapDiv(["top-banner", pos], items);
        const id = isFix ? this.FIXED_ID: this.STATIC_ID;

        return <div id ={id}>{rslt}</div>;
    }

}