import createFootNote from "../footnote";
import { merge, wrapLanguages} from '../utils';
import { EntranceEffect } from '../modules/entrance_effect';
import RawParagraph from '../modules/raw_paragraph';
import articlesAbout from "../articles/article_about";
const About = () => {
    EntranceEffect.stopAllRequest();
    window.scrollTo(0, 0);
    
    const App = merge(
        createAboutUs(), 
        createFootNote("0px")
    );

    EntranceEffect.startAllRequest();
    EntranceEffect.debug();
    
    return App;
};
  
export default About;


function createAboutUs(){
    var paragraph = new RawParagraph();
    paragraph.setSuptitle("About Us");
    paragraph.setTitle("World Wide Support for Haato");
    paragraph.setPassage(articlesAbout.map(
        function(x){return wrapLanguages(x)}));
    return paragraph.get();
}