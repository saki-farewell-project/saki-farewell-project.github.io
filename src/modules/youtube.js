import "../css/image.css";
import "../css/youtube.css";
import Border from "../config/border";

export default class Youtube{
     /**
     * @param {string} link youtube link
     */
    static resolveYoutubeLink(link){
        var relLink = link;
        relLink = relLink.replace("youtu.be", "youtube.com");
        if(!relLink.includes("embed")){
            const index = relLink.lastIndexOf("/");
            relLink = relLink.substring(0, index).concat(
                "/embed", relLink.substring(index, relLink.length));
        }
        return relLink;
    }
    constructor(){
        this.width = "100%";
        this.margin =  new Border();
        this.padding =  new Border();
        this.corner = new Border();

    }

    setMargin(ind, val){
        this.margin.set(ind, val);
    }
    setPadding(ind, val){
        this.padding.set(ind, val);
    }
    setCorner(ind, val){
        this.corner.set(ind, val);
    }

    setWidth(val){
        this.width = val;
    }

    /**
     * @param {string} link youtube link
     */
    get(link){
        const relLink = Youtube.resolveYoutubeLink(link);
        return (
            <div className="w3-container" style={{width:this.width, margin: "auto", position: "static"}}>
            <div className="video-wrapper" style={{width:"100%"}}>
                <iframe style={{
                    width: "100%", 
                    margin: this.margin.get(), 
                    padding: this.padding.get(), 
                    borderRadius: this.corner.get()
                }} src={relLink}></iframe>
            </div>
            </div>
        );
        
    }

}
