import React, { Component } from 'react'
import error from "../images/error.png"
import NavBar from '../component/navbar'
function NotFound(){
    return (
      <div>
        <NavBar />
        <img style={{marginLeft:'auto',marginRight:'auto',display:'block'}} src={error}/>
      </div>
    )
  
}

export default NotFound