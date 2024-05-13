import React,{useState} from "react";
import NavBar from "../component/navbar";
import QuestionCard from "../component/questionCard"
import Popup from "../component/popup";
import { WithContext as ReactTags } from "react-tag-input";
import { useNavigate } from "react-router-dom";
import { getToken } from "../action/actions";
import Footer from "../component/footer";
function Home() {
   const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
  const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const [title,setTitle]= useState('');
const [subject,setSubject]= useState('');
const [description,setDescription]= useState('')
const [tags, setTags] = useState([]);
const [questions,setQuestions] = useState([])
const [filteredQuestions, setFilteredQuestions] = useState([]);
const [login,setLogin] = useState(false);
const navigate = useNavigate();
  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
    console.log(tags)
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };
   const handleTagClick = (index) => {
     console.log("The tag at index " + index + " was clicked");
   };

   const togglePopup = () => {
     setIsOpen(!isOpen);
   };
   async function postQuestion(title, subject, description) {
    // e.preventDefault()
     const data = localStorage.getItem("UserData");
     const userData = JSON.parse(data);

     const response = fetch("http://localhost:5000/api/postquestion", {
       method: "POST",
       headers: {
         "content-Type": "application/json",
       },
       Credential: "include",
       body: JSON.stringify({ title, subject, description, uid: userData.uid,tags }),
     });
     console.log(title, subject, description);
     setIsOpen(!isOpen);
   }
    async function getQuestion() {
      const response = await fetch("http://localhost:5000/api/getQuestion", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
        Credentials: "include",
      });
      const data = await response.json();
      setQuestions(data);
      setFilteredQuestions(data);
      // console.log(data)

    }
    const handleSearch = (query) => {
    const filtered = filteredQuestions.filter(
      (questionItem) =>
        questionItem.title.toLowerCase().includes(query.toLowerCase()) ||
        questionItem.subject.toLowerCase().includes(query.toLowerCase()) ||
        questionItem.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
    );
     setQuestions(filtered);
     setSearchQuery(query);
    //  console.log(filteredQuestions);
  }
    React.useEffect(() => {
      getQuestion();
      (async function () {
        try {
          const token = await getToken();
          setLogin(token);
        } catch (error) {
          setLogin(false);
        }
      })();
      //  const filtered = questions
      //    .filter(function (item) {
      //      return item.title.indexOf(searchQuery) > -1;
      //    })
      //    .map(function ({ question }) {
      //      return { question };
      //    });
      //  console.log(filtered);
      //  setQuestions(filtered);

    },[]);
    
  return (
    <div>
      <NavBar />
      <div className="home">
        <div className="search">
          <input
            required
            className="searchBox"
            placeholder="Enter Keyword..."
            type="text"
            id="student-id"
            name="student-id"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div>
            <button
              className="button"
              onClick={() => {
                login ? togglePopup() : navigate("/login");
              }}
            >
              Ask Question
            </button>
          </div>
        </div>
        {/* <div className="all-ques">
        <div>
          <h1>All Questions</h1>
        </div>
        <div>
          <button className="button" onClick={togglePopup}>
            Ask Question
          </button>
        </div>
      </div> */}
        <div className="questionheader" style={{ backgroundColor: "#3d52a0" }}>
          <div className="questionheadertext">
            <p>Engage and Explore: Unveiling Discussion Topics </p>
          </div>
          <div className="detail" style={{ color: "white" }}>
            <div>
              <p>Replies</p>
            </div>
            <div>
              <p>Views</p>
            </div>
            <div>
              <p>Likes</p>
            </div>
          </div>
        </div>
        <hr></hr>

        <div className="questions">
          {questions.map((question, index) => (
            <QuestionCard key={index} {...question} />
          ))}
        </div>
      </div>
      {/* <div className="question">
        <div>
        <p>votes 852</p>
        <p>ans 542</p>
        <p>views 968</p>
        </div>
        <div>
        <h3>what is Politics</h3>
          <p>all the description are here</p>
          </div>
          
          <div>
          <button className="button">Answer here</button>
          </div>
          </div>
          <hr></hr>
          <div className="question">
          <div>
          <p>votes 852</p>
          <p>ans 542</p>
          <p>views 968</p>
          </div>
          <div>
          <h3>what is Politics</h3>
          <p>all the description are here</p>
          </div>
          
          <div>
          <button className="button">Answer here</button>
          </div>
          </div>
        <hr></hr> */}
      {/* <div>
        <input
        type="button"
          value="Click to Open Popup"
          onClick={togglePopup}
          />
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p> */}
      {isOpen && (
        <Popup
          content={
            <form
              onSubmit={(e) => {
                e.preventDefault();
                postQuestion(title, subject, description);
              }}
            >
              <h3>Ask Question:</h3>
              <label className="label">Topic:</label>
              <br />
              <input
                required
                className="text-input"
                placeholder="Enter Title Here..."
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="label">Question:</label>
              <br />
              <input
                required
                className="text-input"
                placeholder="Enter Subject Here..."
                type="text"
                name="title"
                onChange={(e) => setSubject(e.target.value)}
              />
              <label className="label">Description:</label>
              <br />
              <input
                required
                className="text-input"
                placeholder="Enter Description Here..."
                type="text"
                name="title"
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* <br /> */}
              <br />
              <label className="label">Tags:</label>
              <br />
              <div>
                <ReactTags
                  tags={tags}
                  classNames={{
                    // tags: "tags",
                    // tagInput: "tags",
                    tagInputField: "text-input",
                    selected: "selectedClass",
                    tag: "tags",
                    remove: "removeClass",
                    suggestions: "suggestionsClass",
                    activeSuggestion: "activeSuggestionClass",
                    editTagInput: "editTagInputClass",
                    editTagInputField: "editTagInputField",
                    clearAll: "clearAllClass",
                  }}
                  // suggestions={suggestions}
                  delimiters={delimiters}
                  placeholder={"Enter tags here"}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  handleTagClick={handleTagClick}
                  // inputFieldPosition="bottom"
                  // inline={true}
                />
              </div>
              <br />
              <button
                type="submit"
                className="button"
                // onClick={() => postQuestion(title, subject, description)}
              >
                Post Question
              </button>
            </form>
          }
          handleClose={togglePopup}
        />
      )}
      {/* </div> */}
    </div>
  );
}

export default Home;
