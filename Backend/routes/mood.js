const express=require("express")
const axios=require("axios");
const Sentiment = require("sentiment");
require('dotenv').config();
const router=express.Router();
const sentiment=new Sentiment();

function detectMood(text){
    const score = sentiment.analyze(text).score;

    if(score > 5){
        return "Excited";
    }
    if(score > 2){
        return "Happy";
    }
    if(score < -5){
        return "Terrible";
    }
    if(score < -2){
        return "Sad";
    }
    if(score === 0){
        return "bored";
    }
    return "Relaxed"; // default fallback
}
router.post("/",async(req,res)=>{
    const mood=detectMood(req.body.text);
    const API_KEY=process.env.API_KEY;
    const query = {
  Happy: "snehithane",
  Sad: "Arijit Singh songs",
  Relaxed: "Gaalipata Songs",
  Excited:"Balam Pichkari Songs",
  Blessed:"Alai payuthe",
  Terrible:"Murugan Songs",
  calm:"snehithane songs",
  angry:"Rowdy Baby Songs",
  anxious:"Kannamma Songs",
  bored:"Thaarame Thaarame Songs"
};
    const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query[mood]}&key=${API_KEY}&type=video&maxResults=5`;
    const response=await axios.get(url);
    res.json(response.data.items);
})
module.exports=router;