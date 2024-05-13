import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import NavBar from "../component/navbar";
import logo from "../images/logo1.png"
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname,setFullName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  async function signup(e) {
    e.preventDefault();
    try {
      if (password == confirmPassword) {
        const response = await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password,fullname }),
        });
        const data = await response.json()
        if (response.ok) {
          navigate("/login", { replace: true });
        } else {
         setError(data.message);
          // console.log("not registered");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <React.Fragment>
      <section>
        <NavBar />
        <div className="container">
          <div className=" login">
            <form className="form" onSubmit={signup}>
              <img
                src={logo}
                width={150}
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  display: "block",
                }}
              />
              <h3>Sign Up:</h3>
              <label className="userid" htmlFor="student-id">
                Email ID:
              </label>
              <input
                required
                className="useridbox"
                placeholder="Enter Email Here..."
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="userid" htmlFor="student-id">
                Full Name:
              </label>
              <input
                required
                className="useridbox"
                placeholder="Enter Full Name Here..."
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />
              <label className="userid" htmlFor="student-id">
                User Name:
              </label>
              <input
                required
                className="useridbox"
                placeholder="Enter User Name Here..."
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="passwordtext" htmlFor="password">
                Password:
              </label>
              <div className="passwordbox">
                <div className="password">
                  <input
                    required
                    className="passwordtextbox"
                    placeholder="Enter Password Here..."
                    type={passwordType}
                    // id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* <div className="eye-btn"> */}
                <button onClick={togglePassword} className="eye-btn">
                  {passwordType === "password" ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                    // <p>edsf</p>
                    //   <FontAwesomeIcon icon="fa-regular fa-eye-slash" />
                  )}
                </button>
                {/* </div> */}
              </div>
              <label className="passwordtext" htmlFor="password">
                Confirm Password:
              </label>
              <div className="passwordbox">
                <div className="password">
                  <input
                    required
                    className="passwordtextbox"
                    placeholder="Enter Password Here..."
                    type={passwordType}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {/* <div className="eye-btn"> */}
                <button onClick={togglePassword} className="eye-btn">
                  {passwordType === "password" ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                    // <p>edsf</p>
                    //   <FontAwesomeIcon icon="fa-regular fa-eye-slash" />
                  )}
                </button>
                {/* </div> */}
              </div>
              <br />
              <p class="error">{error}</p>
              <br />
              <button className="button1">SignUp</button>
              {/* <h6 className="forgotpassword">
                Forgot Password? <Link to="/ForgotPassword">Click Here</Link>
              </h6> */}
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignUp;
