import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../store/favoriteStore";
import NavBar from "../component/navbar";
import CardUI from "../component/card";
import { height } from "@mui/system";

function Favorite() {
  const dataArray = useSelector((state) => state.favoriteItems.favData);
  const dispatch = useDispatch();
  const handleAddToArray = (props)=>{
    dispatch(removeFavorite({ id: props }));
    console.log(props);
  };
  console.log(dataArray);
  return (
    <div>
      <NavBar />
      {/* <h1>hello</h1> */}
      {/* {dataArray.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>Author: {item.author || "Unknown"}</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
          <button onClick={() => handleAddToArray(index)}>Delete</button>
        </div>
      ))} */}
      {dataArray.length != 0 ? (<div className="blogs">
        {dataArray.map((item, index) => (
          <CardUI key={index} {...item} index={index} />
        ))}
      </div>):
      (<div style={{
        display:'flex',
        flex:1,
        height:600,
        justifyContent:'center',
        alignItems:'center'
      }}>
        <h1>No Favorites to show</h1>
      </div>)
      }
    </div>
  );
}

export default Favorite;
