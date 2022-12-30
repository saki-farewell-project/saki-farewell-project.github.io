import FETCHED_MSGS from '../python/fetched_msgs';
import FanMsg from '../modules/fan_msg';


const FanartGallery = () => {
    window.scrollTo(0, 0);
    return merge();
};
  
export default FanartGallery;

function GetFanarts(){
    var msgs = [];
    for (let msg of FETCHED_MSGS)
        if (msg.imgs)
            msgs.push(new FanMsg(msg));
    
    return msgs; 
}
