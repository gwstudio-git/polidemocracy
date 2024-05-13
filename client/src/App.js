import logo from "./logo.svg";
import "./App.css";
import React,{useEffect} from "react";
import { Route, Routes, BrowserRouter,useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Footer from "./component/footer";
import Topics from "./pages/topics";
import Blogs from "./pages/blogs";
import News from "./pages/news";
import Answer from "./pages/answer";
import Favorite from "./pages/favorite";
import Profile from "./pages/profile";
import MyActivity from "./pages/myactivity";
import ForgotPassword from "./pages/forgotpassword";
import NotFound from "./pages/notfound";
import ResetPassword from "./pages/resetpassword";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top on route change
  }, [pathname]);

  return null; // This component doesn't render anything, it just handles scrolling
}

function App() {
 
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Story" element={<Topics />} />
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/News" element={<News />} />
        <Route path="/Answers/:id" element={<Answer />} />
        <Route path="/Favorites" element={<Favorite />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/MyActivity" element={<MyActivity />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
