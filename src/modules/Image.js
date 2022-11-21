import "../css/image.css";
import Border from "../config/border";

export default class Image{
    constructor(){
        this.width = "100%";
        this.margin =  new Border();
        this.padding =  new Border();
        this.corner = new Border();
        this.id = "";
        this.flip = 1;

    }
    setFlip(flip){
        this.flip = flip? -1: 1;
    }

    setMargin(ind, val){
        this.margin.set(ind, val);
    }
    setPadding(ind ,val){
        this.padding.set(ind, val);
    }
    setCorner(ind, val){
        this.corner.set(ind, val);
    }

    setCircle(){
        this.setCorner(Border.ALL, "50%");
    }
    setWidth(val){
        this.width = val;
    }
    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }


    get(path){
        const flip = this.flip
        return (
        <div className="w3-container" style = {{maxWidth: "auto",
            margin: this.margin.get(), padding: this.padding.get()}}>
            <div id ={this.getId()} className="centered-img" style={{width: "100%"}}>
                <img src={path} alt="..." class="centered-img" 
                style={{width: this.width, transform: "scaleX("+this.flip.toString()+")", 
                borderRadius: this.corner.get()}} loading="eager"></img>
            </div>
        </div>);
    }

}
