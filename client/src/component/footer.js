import React, { Component } from "react";
import { Avatar, IconButton } from "@mui/material";
import { Mail, LinkedIn, Facebook } from "@mui/icons-material";
import { Link } from "react-router-dom";

export class footer extends Component {
  render() {
    return (
      <div className="footer">
        {/* <div className='footer-content'> */}
        <div>
          <a href="/">
            <IconButton>
              <Mail className="footer-icon" />
            </IconButton>
          </a>
          <a href="/">
            <IconButton>
              <LinkedIn className="footer-icon" />
            </IconButton>
          </a>
          <a href="/">
            <IconButton>
              <Facebook className="footer-icon" />
            </IconButton>
          </a>
        </div>
        <div>
          <Link to="/Home" className="footer-links">Home</Link>
          <Link to="/Story" className="footer-links">Stories</Link>
          <Link to="/Blogs" className="footer-links">Blogs</Link>
          <Link to="/News" className="footer-links">News</Link>
        </div>
        <div>
          <p
            style={{
              color: "white",
              margin:10
            }}
          >
            Copyright © 2024 All rights reserved | PoliDemoCracy is Design &
            Developed by Abdullah Halari 👨‍🎓
          </p>
        </div>
      </div>
      // </div>
    );
  }
}

export default footer;
