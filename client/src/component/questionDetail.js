import * as React from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  ThumbUpAlt,
  ThumbUpOffAlt,
  ThumbDownAlt,
  ThumbDownOffAlt,
  BookmarkAdd,
  PersonPin,
  Share,
} from "@mui/icons-material";
export default function QuestionDetail(props) {
  // console.log('question detail',props)
  const [name,setFullName] = React.useState()
  
async function question(){
  const response = await fetch(`http://localhost:5000/api/${props._id}/getQUser`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
    },
    // body: JSON.stringify({ postId: props._id }),
  });
  const data = await response.json()
  setFullName(data)
  console.log(props._id)
}

async function likePost(){
   try {
     const response = await fetch(
       `http://localhost:5000/api/posts/${props._id}/like`,
       { method: "PUT" }
     );
     // Handle success
      const data = await response.json();
      console.log(data);
      // props.likes = props.likes +1
      // setFullName(data);
   } catch (error) {
     console.error("Error liking post:", error);
     // Handle error
   }
}
React.useEffect(()=>{
  question()
},[])

  return (
    <div className="question">
      <div className="image">
        <IconButton>
          <PersonPin sx={{ color: "#3d52a0", fontSize: 40 }} />
        </IconButton>
        <p>{name}</p>
      </div>
      <div className="questiontext">
        <h4>{props.title}</h4>

        <p>{props.description}</p>
        <div className="questionDetails">
          <div
            style={{
              flexdirection: "row",
              display: "flex",
            }}
          >
            {props.tags.map((tags, index) => (
              <p style={{ margin: 5, color: "#09217b" }} key={index}>
                #{tags}
              </p>
            ))}
          </div>
          <p style={{ margin: 5 }}>{props.createdAt}</p>

          <button className="reportButton">report</button>
          {/* <div></div> */}
        </div>
      </div>
      <div className="detail">
        <IconButton onClick={likePost}>
          <ThumbUpAlt style={{ color: "#3d52a0" }} />
          <p>{props.likes}</p>
        </IconButton>
        <IconButton>
          <BookmarkAdd style={{ color: "#3d52a0" }} />
          <p>4654</p>
        </IconButton>
        <IconButton>
          <Share style={{ color: "#3d52a0" }} />
        </IconButton>
      </div>
    </div>
  );
}
