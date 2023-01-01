import "../css/fanart_case.css";
import ColourRGBA from "../config/colour_rgba";
import { wrapDivRecursive, wrapDiv, wrapLanguages} from "../utils";
import { fadeIn, fadeInExplosiveDelayed, fadeInExplosiveLatched, fadeInLeftwards, fadeInRightwards } from "./defaults/entrance_effect";
import FanMsg from "./fan_msg";
import UniqueIDGenerator from "./unique_id_generator";
import LightBox from "./light_box";
import "../css/light_box.css";

export default class FanartCase extends FanMsg{
    static UID_GEN = new UniqueIDGenerator("fanart-case");
    constructor(kwargs){
        super(kwargs);
        this.imgs = kwargs.imgs;
        this.gid = FanartCase.UID_GEN.genId();
        this.cid = FanartCase.UID_GEN.genId();
        this.tid = FanartCase.UID_GEN.genId();
        if (kwargs.cred)
            this.cred = kwargs.cred;
    }

    getCase(){
        var items = [];
        var name = wrapDiv("name", this.name);
        name = fadeIn.get(name);
        items.push(name);
        //items.push(temp);

        var wrap = [this.is_jp ? "「": "You've become my"];
        var quote = this.is_jp ? "「": " \"";
        quote += this.quote + (this.is_jp ? "」": "\"");
        quote = wrapDiv("quote", quote);
        wrap.push(quote);

        if (this.cred){
            var cred = "credit: " + this.cred;
            items.push(wrapDiv("credit", cred));
        }

        items.push(<div className={"canvus"} id={this.cid}></div>);
        var img = <img src={this.imgs[0]} className={"frame"} id={this.gid}></img>;
        //img = fadeInExplosiveDelayed.get(img);
        items.push(img);
        items.push(<div className={"txt-wrap"} id={this.tid}>{wrap}</div>);

        var box = new LightBox();
        for (let file of this.imgs)
            box.append(<img src={file} className={"fill"}></img>);

        const rslt = <div class={"fanart-case"} 
            onMouseEnter={this.animate.bind(this, 0)} 
            onMouseLeave={this.animate.bind(this, 1)}> 
            {wrapDiv("rel", items)}</div>;

        return <div onClick={box.get()}>{rslt}</div>;
        return <div class={"fanart-case"} onMouseEnter={this.animate.bind(this, 0)} onMouseLeave={this.animate.bind(this, 1)}> 
            {wrapDiv("rel", items)}</div>;
    }

    animate(rev){
        var elem = document.getElementById(this.gid);
        if (!elem)
            return;

        for (var i = 0; i < 2; i++){
            var elem = document.getElementById(i? this.gid: this.cid);
            if (!elem)
                return;
            
            var frames = [{ width: '100%'}, { width: i? '45%': '0%'}];
            if (rev)
                frames.reverse();

            const opts =  { duration: 350, fill: 'forwards', easing: 'ease-out'};
            elem.animate(frames, opts);
        }

        var elem = document.getElementById(this.tid);
        if (!elem)
            return;
            
        var frames = [ { transform: 'scale(0.5, 0.5)', opacity: 0}, { transform: 'scale(1, 1)', opacity: 1}];
        if (rev)
            frames.reverse();

        const opts =  { duration: 350, fill: 'forwards', easing: 'ease-out'};
        elem.animate(frames, opts);

    }

}