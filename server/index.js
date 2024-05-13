const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/mongodb");
dotenv.config({ path: "./config.env" });
const convert = require("xml-js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { DOMParser } = require("xmldom");
const nodemailer = require("nodemailer");

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's URL
    credentials: true, // Enable credentials (cookies)
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server is running");
});
connectDB();
const verifyToken = require("./middleware/authentication")
const User = require("./models/userSchema");
const Post = require("./models/postSchema");
const QuestionReport = require("./models/reportQSchema");
const AnswerReport = require("./models/reportASchema");
// SignUp
app.post("/api/signup", async (req, res) => {
  try {
    const { email, username, password, fullname } = req.body;
    console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(req.body, hashedPassword);
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(403).json({ message: "email already exist" });
    } else {
      const user = new User({ email, username, fullname, password });
      await user.save();
      res.status(201).json({ message: "Signup success" });
      console.log(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Signup  unsuccess" });
  }
});
//login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    } else {
      const passwordValidate = await bcrypt.compare(password, user.password);
      console.log("passwordValidate", passwordValidate);
      if (!passwordValidate) {
        return res.status(401).json({ message: "Invalid email/password" });
      }
      const token = await user.generateAuthToken();
      // const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY, {
      //   expiresIn: "2 days",
      // });
      // console.log("the user", user);
      res.cookie("polidemo", token, { httpOnly: true, expiresIn: '2 days' });
      res.json({ user, token });
    }
  } catch (error) {
    console.log(error);
  }
});


//checking token in cookie
app.get("/api/checkToken", (req, res) => {
  // If token is valid, return success message
  const token = req.cookies.polidemo;
  // console.log('check',token)
   if (!token) {
    // console.log('not found')
     return res.status(401).json({ error: "unauth: No token exist" });
   }
   try {
     const decode = jwt.verify(token, process.env.SECRETKEY);
    console.log(decode)
     res.status(200).json({ message: "Token is valid",token:token });
   } catch (error) {
     console.log('error',error);
     return res.status(401).json({ error: "unauth: Invalid token" });
   }

});
//logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("polidemo");
  res.json({ message: "logout successfully" });
});

app.get("/api/newsData",verifyToken, async (req, res) => {
  try {
    const response = await fetch(process.env.newsUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.json(data);
    //  console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

app.get("/api/blogsData", verifyToken,async (req, res) => {
  try {
    const response = await fetch(process.env.blogUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const xmlData = await response.text();
    res.set("Content-Type", "text/xml");
    res.send(xmlData);
    // console.log(xmlData)
  } catch (error) {
    console.error("Error fetching Twingly data:", error);
    res.status(500).json({ error: "Failed to fetch Twingly data." });
  }
});
app.get("/api/story",verifyToken, async (req, res) => {
  try {
    const response = await fetch(process.env.storyUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.json(data);
    //  console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

app.post("/api/postquestion",async(req,res)=>{
  const {title,subject,description,uid,tags} = req.body;
  try {
    console.log(req.body)
    const tagTexts = tags.map((tag) => tag.text);
    const post = new Post({
      title:title,
      subject:subject,
      description:description,
      author:uid,
      tags:tagTexts
    })
    const postId = "66316a0c75b7ddd88910faa8";
    // try {
    //   const post = await Post.findById(postId).populate("author");
    //   // console.log(post.author.email);
    // } catch (error) {
    //   console.error("Error fetching post:", error);
    // }
    await post.save();
  } catch (error) {
    console.log(error)
    throw error
  }
})
app.post("/api/getUser", async (req, res) => {
  try {
    const {uid} = req.body;
    const user = await User.findById(uid);
    res.json(user);
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/getQuestion",async(req,res) =>{
  try {
    const question = await Post.find();
    res.json(question)
    // console.log(question)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
})
app.get("/api/:postId/getQUser",async(req,res)=>{
  const { postId } = req.params;
    try {
      const post = await Post.findById(postId).populate("author");
      // console.log(post.author.email);
      res.json(post.author.username)
    } catch (error) {
      console.error("Error fetching post:", error);
    }
})
app.get("/api/:postId/getAUser", async (req, res) => {
  const { postId } = req.params;
  // console.log(req.params)
  try {
      const post = await Post.findById(postId);
      const user = await post.populate("answers.user");
      const userFullnames = post.answers.map((answer) => answer.user);
      // console.log(userFullnames);
    res.json(userFullnames);
  } catch (error) {
    console.error("Error fetching post:", error);
  }
});
app.post("/api/posts/:postId/answers", async (req, res) => {
  try {
    const { postId } = req.params;
    const { answer, userId } = req.body;
    // console.log(postId,req.body)
    const post = await Post.findById(postId);
    const newAnswer = {
      answer: answer,
      user: userId, // Assuming userId is provided
      createdAt: new Date(),
    };
    post.answers.push(newAnswer);
    await post.save();

    res
      .status(201)
      .json({ message: "Answer added successfully", answer: newAnswer });
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/posts/:postId/getAnswer",async(req,res)=>{
  try {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      // console.log(postId)
      res
        .status(201)
        .json({ message: "Answer added successfully", answers: post });
        // console.log(post)
  } catch (error) {
    console.log(error)
  }
});

app.put("/api/posts/:postId/like", async (req, res) => {
  try {
    const { postId } = req.params;
    const { action } = req.body;
    console.log(req.body)
  if (action === 'like') {
    await Post.updateOne({ _id: postId }, { $inc: { likes: 1 } });

  } else if (action === 'view') {
    await Post.updateOne({ _id: postId }, { $inc: { view: 1 } });

  } else if (action === "dislike") {
    await Post.updateOne({ _id: postId }, { $inc: { dislike: 1 } });
  } else if (action === "bookmark") {
    await Post.updateOne({ _id: postId }, { $inc: { bookmark: 1 } });
  } else {
    res.status(400).json({ error: "Invalid action" });
    return;
  }
    res.status(200).json({message:"Liked successfully"});
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).send("Internal server error");
  }
});

app.put("/api/posts/:postId/:ansId/answerlike", async (req, res) => {
  try {
    const { postId,ansId } = req.params;
    const { action } = req.body;
    console.log(req.params);

    if (action === "like") {
      await Post.updateOne(
        { _id: postId, "answers._id": ansId },
        { $inc: { "answers.$.like": 1 } }
      );
    }else if (action === "dislike") {
     await Post.updateOne(
       { _id: postId, "answers._id": ansId },
       { $inc: { "answers.$.dislike": 1 } }
     );
    }else {
      res.status(400).json({ error: "Invalid action" });
      return;
    }
    res.status(200).json({ message: "Liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).send("Internal server error");
  }
});
app.post("/api/reportquestion", async (req, res) => {
  const {postId,reporterId,reason} = req.body;
  const report = new QuestionReport({postId,reporterId,reason})
  report.save()
  res.json({message:'reported'})
});
app.post("/api/reportanswer",(req,res)=>{
    const { postId,answerId, reporterId, reason } = req.body;
    const report = new AnswerReport({ postId, answerId, reporterId, reason });
    report.save();
    res.json({ message: "reported" });
})

app.post("/api/forgotpassword",async(req,res)=>{
   try {
    // Find the user by email
    const user = await User.findOne({ email:req.body.email});
    console.log(user)
    // If user not found, send error message
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a unique JWT token for the user that contains the user's id
    const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY, {
      expiresIn: "10m",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });
  

    // Email configuration
    const mailOptions = {
      from: `Polidemocracy<${process.env.email}>`,
      to: req.body.email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:3000/resetpassword/${token}">http://localhost:3000/resetpassword/${token}</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
        return res.status(500).send({ error: err.message });
      }
      res.status(200).send({ message: "Email sent" });
    });
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: "invalid /server error" });
  }
})

app.post("/api/resepassword/:token",async(req,res)=>{
   try {
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.SECRETKEY
    );

    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res.status(401).send({ message: "no user found" });
    }
    
    user.password = req.body.password;
    await user.save();

    console.log('password updated')
    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'reset link expired' });
  }
})

app.post("/api/updateprofile/:userId",async(req,res)=>{
  try{
    const { userId } = req.params;
   const { fullname,email,username,phoneNumber } = req.body;
    console.log(fullname, email, username, phoneNumber);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullname, email, username, phoneNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})