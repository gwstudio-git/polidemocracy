import React, { Component } from 'react'
import NavBar from '../component/navbar';

function MyActivity(){
    return (
      <div>
        <NavBar />
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flex: 1,
            height: 600,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>This page will soon display</h1>
        </div>
      </div>
    );
  
}

export default MyActivity;