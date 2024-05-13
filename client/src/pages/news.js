import React,{useState,useEffect} from 'react'
import CardUI from "../component/card";
import NavBar from "../component/navbar";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from '../store/favoriteStore';
import LinearIndeterminate from '../component/loader';
import logo from "../images/logo1.png";
import { useNavigate } from 'react-router-dom';
function News() {
  const [news, setNews] = useState([]);
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();
  const dataArray = useSelector((state) => state.favoriteItems.favData);
  const navigate = useNavigate();
  const handleAddToArray = () => {
    dispatch(addFavorite({id:"newItem"}));
  };


 useEffect(() => {
   const fetchData = async () => {
     
     try {
       const response = await fetch("http://localhost:5000/api/newsData",{
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
       setNews(data.articles.filter(
        (item) => item.title !== '[Removed]'
        ) );
        setLoading(false)
      //  console.log(data.articles);
     } catch (error) {
      //  console.error("Error fetching data:", error);
     }
   };

   fetchData();
   console.log('data array',dataArray)
 }, []);
  return (
    <div>
      <NavBar />
      {loading ? (
        <div>
          <LinearIndeterminate />
          <img
            src={logo}
            width={150}
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              display: "block",
            }}
          />

          <div className="blogs">
            {Array.from({ length: 10 }).map((_, index) => (
              <CardUI key={index} index={index} loading={loading} />
            ))}
          </div>
        </div>
      ) : (
        <div className="blogs">
          {/* <button onClick={handleAddToArray}>Add to Array</button> */}
          {news.map((item, index) => (
            <CardUI key={index} {...item} index={index} loading={loading} />
          ))}

          {/* <div>
          <CardUI />
        </div>
        <div>
          <CardUI />
        </div>
        <div>
          <CardUI />
        </div>
        <div>
          <CardUI />
        </div>
        <div>
          <CardUI />
        </div>
        <div>
          <CardUI />
        </div> */}
        </div>
      )}
    </div>
  );
}

export default News