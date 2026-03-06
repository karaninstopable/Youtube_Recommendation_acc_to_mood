import { useState } from "react";
import axios from "axios";
import "./App.css";
function App(){
  const[text,setText]=useState("Sanjith Hegde");
  const[video,setVideo]=useState([]);
  const getVideo=async()=>{
  const res=await axios.post("https://youtube-recommendation-acc-to-mood-2.onrender.com/mood",
    {text:text});
    setVideo(res.data)
  }
  return(
    <div className="app">
      <h1>Mood based Video recommender</h1>
      <input type="text" placeholder="How is your mood today" onChange={(e)=>setText(e.target.value)} />
      <button onClick={getVideo}>Predict Videos</button>
      <div className="video">
        {video.map((v)=>(
          <iframe width="640" 
          key={v.id.videoId}
          height="360" 
          src={`https://www.youtube.com/embed/${v.id.videoId}`}
          title={v.snippet.title} />
        ))}
      </div>
    </div>
  )
}
export default App;
