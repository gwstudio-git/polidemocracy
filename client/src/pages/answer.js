import React, { Component,useEffect,useState } from 'react'
import NavBar from '../component/navbar'
import QuestionDetail from '../component/questionDetail';
import AnswerCard from '../component/answerCard';
import { Avatar, IconButton } from "@mui/material";
import { useLocation } from 'react-router-dom';
import {
  ThumbUpAlt,
  ThumbUpOffAlt,
  ThumbDownAlt,
  ThumbDownOffAlt,
  BookmarkAdd,
  PersonPin,
  Share,
} from "@mui/icons-material";
const Answer = () => {
  const location = useLocation();
  const [answer, setAnswer] = useState("");
  const [ansData,setAns] = useState([]);
  const [name, setFullName] = React.useState();
  const [userData,setUserData] = React.useState([]);
  const data = { ...location.state };
  // console.log("props", data.props._id);
  const [questionDetails, setQuestionDetail] = useState({
    _id: data.props._id,
    title: "title",
    subject: "subject",
    description: "description",
    createdAt: "000",
    author: "author",
    tags: ["imran khan", "pakistan", "jail"],
    likes: 0,
    dislike: 0,
    bookmark: 0,
    view: "0",
  });
  async function addAnswer(e) {
    e.preventDefault();
     const local = localStorage.getItem("UserData");
    try {
      
      const response = await fetch(
        `http://localhost:5000/api/posts/${data.props._id}/answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer, userId: JSON.parse(local).uid }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log success message
        console.log("New answer:", data.answer); // Log the newly added answer
        setAnswer("");
        
      } else {
        console.log("Error adding answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  }
  async function getAnswer() {
    try {
      // console.log("props", data.props._id);
      const response = await fetch(
        `http://localhost:5000/api/posts/${data.props._id}/getAnswer`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setQuestionDetail(data.answers);
        setAns(data.answers.answers);
        // console.log("Answer Dataa:", questionDetails); // Log the newly added answer
        
      } else {
        console.log("Error adding answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  }

    async function question() {
      const response = await fetch(
        `http://localhost:5000/api/${questionDetails._id}/getQUser`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
          // body: JSON.stringify({ postId: questionDetails._id }),
        }
      );
      const data = await response.json();
      setFullName(data);
    }

    async function likePost(action) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/posts/${questionDetails._id}/like`,
          {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({ action }),
          }
        );
        // Handle success
        // const data = await response.json();
        console.log(questionDetails.likes + 1);
       
        // props.likes = props.likes +1
        // setFullName(data);
      } catch (error) {
        console.error("Error liking post:", error);
        // Handle error
      }
    }

  useEffect(()=>{
  getAnswer();
  question();
},[])
return (
  <div>
    <NavBar />
    <div className="answer">
      {/* {questionDetails.map((item, index) => ( */}
      <div className="question">
        <div className="image">
          <IconButton>
            <PersonPin sx={{ color: "#3d52a0", fontSize: 40 }} />
          </IconButton>
          <p>{name}</p>
        </div>
        <div className="questiontext">
          <h4>{questionDetails.title}</h4>

          <p>{questionDetails.description}</p>
          <div className="questionDetails">
            <div
              style={{
                flexdirection: "row",
                display: "flex",
              }}
            >
              {questionDetails.tags.map((tags, index) => (
                <p style={{ margin: 5, color: "#09217b" }} key={index}>
                  #{tags}
                </p>
              ))}
            </div>
            <p style={{ margin: 5 }}>{questionDetails.createdAt}</p>

            {/* <button className="reportButton">report</button> */}
            {/* <div></div> */}
          </div>
        </div>
        <div className="detail">
          <IconButton
            onClick={() => {
              likePost("like");
              setQuestionDetail((prevDetails) => ({
                ...prevDetails,
                likes: prevDetails.likes + 1,
              }));
            }}
          >
            <ThumbUpAlt style={{ color: "#3d52a0" }} />
            <p>{questionDetails.likes}</p>
          </IconButton>
          <IconButton>
            <BookmarkAdd
              style={{ color: "#3d52a0" }}
              onClick={() => {
                likePost("bookmark");
                setQuestionDetail((prevDetails) => ({
                  ...prevDetails,
                  bookmark: prevDetails.bookmark + 1,
                }));
              }}
            />
            <p>{questionDetails.bookmark}</p>
          </IconButton>
          <IconButton>
            <ThumbDownAlt
              style={{ color: "#3d52a0" }}
              onClick={() => {
                likePost("dislike");
                setQuestionDetail((prevDetails) => ({
                  ...prevDetails,
                  dislike: prevDetails.dislike + 1,
                }));
              }}
            />
            <p>{questionDetails.dislike}</p>
          </IconButton>
        </div>
      </div>
      {/* ))} */}
      <div>
        <hr></hr>
        <h1 style={{ color: "#3d52a0" }}>Answers</h1>
      </div>
      <div style={{ marginBottom: 105 }}>
        {ansData.map((item, index) => (
          <AnswerCard
            key={index}
            index={index}
            post_id={questionDetails._id}
            {...item}
          />
        ))}
      </div>
      {/* <div className="question-answer">
            <h2>question</h2>
            <div className="details">
              <p>date</p>
              <p>views</p>
              <p>likes</p>
            </div>
            <hr></hr>
            <div className="details">
              <button>like</button>
              <button>dislike</button>
              <button>share</button>
            </div>
            <p>subject</p>
            <p>description</p>
          </div>
          <div style={{ margin: 10 }}>Answer count</div> */}

      {/* <div>
            <p>answer</p>
            <div className="details">
              <p>date</p>
              <p>views</p>
              <p>likes</p>
            </div>
            <div className="details">
              <button>like</button>
              <button>dislike</button>
            </div>
            <hr></hr>
          </div> */}
    </div>

    <div className="ans-search">
      <form className="ans-search" onSubmit={addAnswer}>
        <input
          className="searchBox"
          placeholder="Enter Keyword..."
          type="text"
          id="student-id"
          name="student-id"
          required
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit" className="button" >
          Submit
        </button>
      </form>
    </div>
  </div>
);
}

export default Answer