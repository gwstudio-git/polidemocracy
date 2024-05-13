import React,{useEffect, useState} from "react";
import ReactWordcloud from "react-wordcloud";
import { words } from "../component/word";
import NavBar from "../component/navbar";
import LinearIndeterminate from "../component/loader";
import logo from "../images/logo1.png";
import { useNavigate } from "react-router-dom";
export function Topics () {
  const [loading,setLoading] = useState(true)
//     const callbacks = {
//       getWordColor: (word) => (word.value > 15 ? "white" : "#1f2325"),
//         onWordClick: (word) => (console.log(word.text)),
//       //   onWordMouseOver: console.log,
//       //   getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
//     };
// const options = {
//   rotations: 0,
//   rotationAngles: [-90, 100],
//   fontFamily: "courier new",
//   fontSizes: [110, 120],
  
  
// };
// const size = [1600, 400];
  const [data,setData] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/story",{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include'
       });
      
      if (!response.ok) {
        navigate('/login')
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data.items)
      setLoading(false);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
},[]);
    return (
      <div>
        <NavBar />
        {loading ? (
          <LinearIndeterminate />
        ) : (<div>
            <img src={logo} width={150} style={{marginRight:'auto',marginLeft:'auto',display:'block'}}/>
          <div className="stories">
            {data.map((video, index) => (
              // <li key={index}>
              <div
                style={{
                  borderRadius: 5,
                  border: "solid #ff9409",
                  margin: 20,
                  backgroundColor: "#ff9409",
                }}
                >
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title="Polidemo Stories"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  />
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    );
      }


export default Topics