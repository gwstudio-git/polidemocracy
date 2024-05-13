import * as React from "react";
import { Avatar,IconButton } from "@mui/material";
import {
  ThumbUpAlt,
  ThumbUpOffAlt,
  ThumbDownAlt,
  ThumbDownOffAlt,
  Share,
} from "@mui/icons-material";
import Popup from "../component/popup";

export default function AnswerCard(props) {
 const [userData, setUserData] = React.useState('unknown');
 const [isOpen, setIsOpen] = React.useState(false);
 const [reason, setReason] = React.useState("");
 const togglePopup = () => {
   setIsOpen(!isOpen);
 };
  const [answerDetail, setAnswerDetail] = React.useState({
    answer: "Answer",
    createdAt: "date",
    dislike: props.dislike,
    like:props.like,
  });
   async function likePost(action) {
     try {
       const response = await fetch(
         `http://localhost:5000/api/posts/${props.post_id}/${props._id}/answerlike`,
         {
           method: "PUT",
           headers: {
             "content-Type": "application/json",
           },
           body: JSON.stringify({ action }),
         }
       );
      
     } catch (error) {
       console.error("Error liking post:", error);
       // Handle error
     }
   }
   async function report() {
     const local = localStorage.getItem("UserData");
     // console.log(JSON.parse(local).uid);
     const response = await fetch("http://localhost:5000/api/reportanswer", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       credentials: "include",
       body: JSON.stringify({
         postId: props.post_id,
         reporterId: JSON.parse(local).uid,
         answerId:props._id,
         reason,
       }),
     });
     if (response.ok) {
       setIsOpen(!isOpen);
       setReason("");
     }
   }
    async function answerDetails() {
      const response = await fetch(
        `http://localhost:5000/api/${props.post_id}/getAUser`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
          // body: JSON.stringify({ postId: questionDetails._id }),
        }
      );

      const data = await response.json();
      setUserData(data[props.index].username);
      //  console.log('asas',data[props.index].fullname );
    }
     React.useEffect(() => {
       answerDetails();
       
     }, []);
  return (
    <div className="question">
      {/* <div className="image">
        <Avatar
          sx={{ width: 60, height: 60 }}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
      </div> */}
      <div className="questiontext">
        <p>{props.answer}</p>
        <div className="questionDetails">
          {/* <div> */}
          <p style={{ margin: 5 }}>{userData}</p>
          <p style={{ margin: 5 }}>{props.createdAt}</p>
          <button className="reportButton" onClick={togglePopup}>
            report
          </button>
          {/* </div> */}
          {/* <div></div>
          <div></div> */}
        </div>
      </div>
      <div className="detail">
        <IconButton
          onClick={() => {
            likePost("like");
            setAnswerDetail((prevDetails) => ({
              ...prevDetails,
              like: prevDetails.like + 1,
            }));
          }}
        >
          <ThumbUpAlt style={{ color: "#3d52a0" }} />
          <p>{answerDetail.like}</p>
        </IconButton>
        <IconButton
          onClick={() => {
            likePost("dislike");
            setAnswerDetail((prevDetails) => ({
              ...prevDetails,
              dislike: prevDetails.dislike + 1,
            }));
          }}
        >
          <ThumbDownAlt style={{ color: "#3d52a0" }} />
          <p>{answerDetail.dislike}</p>
        </IconButton>
        {/* <IconButton>
          <Share style={{ color: "#3d52a0" }} />
          <p>4654</p>
        </IconButton> */}
      </div>
      {isOpen && (
        <Popup
          content={
            <>
              <h3>Report Question:</h3>
              <label className="label">Write a reason here:</label>
              <br />
              <input
                required
                className="text-input"
                placeholder="Enter Title Here..."
                type="text"
                name="title"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <br />
              <br />
              <button
                className="button"
                type="submit"
                style={{ backgroundColor: "red" }}
                onClick={report}
              >
                Report Question
              </button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}
