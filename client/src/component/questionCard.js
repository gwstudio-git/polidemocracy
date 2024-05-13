import * as React from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Popup from "../component/popup";
import { getToken } from "../action/actions";

export default function QuestionCard(props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [reason,setReason] = React.useState('')
  const [login,setLogin]  = React.useState()
   const togglePopup = () => {
     setIsOpen(!isOpen);
   };
  async function viewCount() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${props._id}/like`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ action:'view' }),
        }
      );
    } catch (error) {
      console.error("Error liking post:", error);
      // Handle error
    }
  }

  async function report(){
    const local = localStorage.getItem("UserData");
    // console.log(JSON.parse(local).uid);
    const response = await fetch("http://localhost:5000/api/reportquestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        postId: props._id,
        reporterId: JSON.parse(local).uid,
        reason
      }),
    });
      if (response.ok) {
        setIsOpen(!isOpen);
        setReason('')
      }
  }
   React.useEffect(() => {
     (async function () {
       try {
         const token = await getToken();
         setLogin(token);
       } catch (error) {
         setLogin(false);
       }
     })();
   }, []);

  return (
    <div className="question">
      <div className="image">
        {/* <Avatar
          sx={{ width: 60, height: 60 }}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        /> */}
        <button
          className="logOutButton button"
          onClick={() => {
            if (login) {
              navigate(`/Answers/${props._id}`, {
                state: { props },
              });
              viewCount();
              console.log(props);
            } else {
              navigate("/login");
            }
          }}
        >
          Answer
        </button>
      </div>
      <div className="questiontext">
        <h4>{props.title} </h4>
        <p>{props.subject}</p>
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
          <button
            className="reportButton"
            onClick={() => {
              if (login) {
                togglePopup();
              } else {
                navigate("/login");
              }
            }}
          >
            report
          </button>
          {/* <div></div> */}
        </div>
      </div>
      <div className="detail">
        <div>
          <p>{props.answers.length}</p>
          <p>Replies</p>
        </div>
        <div>
          <p>{props.view}</p>
          <p>Views</p>
        </div>
        <div>
          <p>{props.likes}</p>
          <p>Likes</p>
        </div>
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
