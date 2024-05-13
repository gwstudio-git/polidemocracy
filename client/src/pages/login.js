import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import NavBar from "../component/navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUser} from "../store/userstore";
import logo from "../images/logo1.png"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  async function login(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
        
      });
      const user  = await response.json();
      if (response.ok) {
      //  dispatch(getUser({id:user}))
       localStorage.setItem("UserData", JSON.stringify({
        // fullname:user.fullname,
        // email:user.email,
        // username: user.username,
        // password:user.password,
        uid:user.user._id
       }));
        navigate("/Home", { replace: true });
        // localStorage.setItem("userData", JSON.stringify(user))
        // console.log(response.json());
      } else {
        setError(user.message);
        console.log(user.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    // <section>
    <div>
      <NavBar />
      <div className="container">
        <div className="col-lg-6 login">
          <form className="form" onSubmit={login}>
            <img
              src={logo}
              width={150}
              style={{
                marginRight: "auto",
                marginLeft: "auto",
                display: "block",
              }}
            />
            <h3>Log in:</h3>
            <label className="userid" htmlFor="student-id">
              Email:
            </label>
            <input
              required
              className="useridbox"
              placeholder="Enter Email Here..."
              type="text"
              id="student-id"
              name="student-id"
              onChange={(e) => setEmail(e.target.value)}
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

            <br />
            <p class="error">{error}</p>
            <br />
            <button className="button1">
              Login
            </button>
            <button className="button1" onClick={() => navigate("/signup")}>
              Sign UP
            </button>
            <h6 className="forgotpassword">
              Forgot Password? <Link to="/ForgotPassword">Click Here</Link>
            </h6>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
