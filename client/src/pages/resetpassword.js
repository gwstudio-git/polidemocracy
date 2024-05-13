import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import NavBar from "../component/navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/userstore";
import logo from "../images/logo1.png";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function resetpassword(e) {
    e.preventDefault();
    const token = window.location.pathname.split("/").pop();
    if (password === confirm) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/resepassword/${token}`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({password})
          }
        );
        const user = await response.json();
        if (response.ok) {
          navigate("/login", { replace: true });
        } else {
          setError(user.message);
        //   console.log(user.message);
        }
      } catch (error) {
        console.log(token);
      }
    }
  }
  return (
    // <section>
    <div>
      <NavBar />
      <div className="container">
        <div className="col-lg-6 login">
          <form className="form" onSubmit={resetpassword}>
            <img
              src={logo}
              width={150}
              style={{
                marginRight: "auto",
                marginLeft: "auto",
                display: "block",
              }}
            />
            <h3
              style={{
                textAlign: "center",
              }}
            >
              Reset Password:
            </h3>
            <label className="userid" htmlFor="student-id">
              New Password:
            </label>
            <br />
            <input
              required
              className="useridbox"
              placeholder="Enter Email Here..."
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label className="userid" htmlFor="student-id">
              Confirm Password:
            </label>
            <br />
            <input
              required
              className="useridbox"
              placeholder="Enter Email Here..."
              type="text"
              onChange={(e) => setConfirm(e.target.value)}
            />
            <br />
            <p class="error">{error}</p>
            <br />
            <button className="button1" type="submit">
              Send Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
