import React, { Component,useEffect, useState } from 'react'
import NavBar from '../component/navbar';
import logo from "../images/logo1.png";
import { Link } from 'react-router-dom';
function Profile ()  {
  const [userData,setUserData] = useState(
    {
      fullname:'',
      email:'',
      username:'',
      password:'',
      phoneNumber:'',
    }
  )
  const local = localStorage.getItem("UserData");
   async function getUser() {
    // const local = localStorage.getItem("UserData");
    console.log(JSON.parse(local).uid);
     const response = await fetch("http://localhost:5000/api/getUser", {
       method: "POST",
       headers: {
         "content-Type": "application/json",
       },
       Credentials: "include",
       body: JSON.stringify({ uid: JSON.parse(local).uid }),
     });
     const data = await response.json();
     setUserData(data);
    //  console.log(data);
   }
   async function updateProfile(e){
      e.preventDefault();
      console.log({fullname: userData.fullname,
           email: userData.email,
           username: userData.username,
           phoneNumber: userData.phoneNumber,})
     const response = await fetch(
       `http://localhost:5000/api/updateprofile/${JSON.parse(local).uid}`,
       {
         method: "POST",
         headers: {
           "content-Type": "application/json",
         },
         Credentials: "include",
         body: JSON.stringify({
           fullname: userData.fullname,
           email: userData.email,
           username: userData.username,
           phoneNumber: userData.phoneNumber,
         }),
       }
     );
     const data = await response.json();
     setUserData(data);
    //  console.log(data);
   }
  useEffect(()=>{
    // const data = localStorage.getItem("UserData");
  //  setUserData(JSON.parse(data));
  getUser()
  },[])
    return (
      <div className="profile">
        <NavBar />
        <div className="profile-form ">
          <img
            src={logo}
            width={150}
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              display: "block",
            }}
          />

          <h1>User Profile</h1>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              required
              type="text"
              id="fullName"
              value={
                userData.fullname
                // == null || userData.fullname == undefined
                //   ? ""
                //   : userData.fullname
              }
              className="bright-input"
              onChange={(e) =>
                setUserData({ ...userData, fullname: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              required
              type="email"
              id="email"
              value={
                userData.email
                //  == null ? "" : userData.email
              }
              className="bright-input"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="alumniId">UserName:</label>
            <input
              required
              type="text"
              id="alumniId"
              value={
                userData.username
                // == null ? "" : userData.username
              }
              className="bright-input"
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              required
              type="tel"
              id="phoneNumber"
              value={
                userData.phoneNumber
                // == null ? "" : userData.phoneNumber
              }
              onChange={(e) =>
                setUserData({ ...userData, phoneNumber: e.target.value })
              }
              placeholder="Your Phone Number"
              className="bright-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Password:</label>
            <input
              required
              type="password"
              id="dateOfBirth"
              value={"password"}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              placeholder="Your Password"
              className="bright-input"
            />
            <Link to="/ForgotPassword">
              <button type="submit" className="button-save">
                Change Password
              </button>
            </Link>
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="button-save"
              onClick={updateProfile}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    );
 
}

export default Profile