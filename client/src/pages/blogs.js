import { Grid } from '@mui/material';
import React,{useState,useEffect} from 'react'
import CardUI from '../component/card'
import NavBar from '../component/navbar'
import LinearIndeterminate from "../component/loader.js";
import logo from "../images/logo1.png";
import { useNavigate } from 'react-router-dom';
function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  //  const fetchBlogs = async () => {
  //    const query = "technology"; // Customize your search query
  //    const language = "en"; // Specify language (e.g., 'en' for English)
  //    const country = "global"; // Specify country (e.g., 'global' for worldwide)
  //    const fromDate = "2023-12-28"; // Specify start date
  //    const toDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  //    const limit = 10; // Specify the maximum number of results

  //    const url = `${apiUrl}?apikey=${apiKey}&q=${query}&language=${language}&country=${country}&from=${fromDate}&to=${toDate}&limit=${limit}`;

  //    try {
  //      const response = await fetch(url);
  //      if (!response.ok) {
  //        throw new Error(`HTTP error! Status: ${response.status}`);
  //      }
  //      // const data = await response.json();
  //      // console.log("Blog posts:", data);
  //      // Process the retrieved blog posts
  //    } catch (error) {
  //      console.error("Error fetching blog posts:", error);
  //    }
  //  };
  //  useEffect(() => {
  //    fetchBlogs();
  //  }, []);

 const [posts, setPosts] = useState([]);

 useEffect(() => {
   fetchData();
 }, []);

 async function fetchData() {
   try {
     const response = await fetch("http://localhost:5000/api/blogsData",{
       method:'GET',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include'
       });
     
     if (!response.ok) {  
      navigate('/login')
      throw new Error(`Error fetching data: ${response.statusText}`);
     }
     const xmlData = await response.text();
     const parser = new DOMParser();
     const xmlDoc = parser.parseFromString(xmlData, "text/xml");

     // Extract data from the parsed XML document
      const postNodes = xmlDoc.getElementsByTagName("post");
      const parsedPosts = Array.from(postNodes).map((postNode) => {
      const id = postNode.getElementsByTagName("id")[0].textContent;
      const author = postNode.getElementsByTagName("author")[0].textContent;
      const title = postNode.getElementsByTagName("title")[0].textContent;
      const description = `Blog author:  ${   
        postNode.getElementsByTagName("author")[0].textContent
      }\n    Blog Name:  ${postNode.getElementsByTagName("blogName")[0].textContent} \n   Blog Tags: ${
        postNode.getElementsByTagName("tags")[0].textContent + '   '
      } `;
       const url = postNode.getElementsByTagName("url")[0].textContent;
       const publishedAt = postNode.getElementsByTagName("publishedAt")[0].textContent;
       const urlToImage =
         "https://cdn.pixabay.com/photo/2015/11/06/13/25/blog-1027861_640.jpg";
       return { id, author, title, description, url, publishedAt, urlToImage };
     });
     setPosts(parsedPosts);
     setLoading(false)
   } catch (error) {
    //  console.error("Error fetching data:", error);
   }
 }

  
  let props = {
    image:"data:image/jpeg;base64,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",
    title:"hello",date:"hdkjshdjkhk",description:"news descvription"
  }
  return (
    <div>
      <NavBar />
      {loading ? (
        // <LinearIndeterminate />
        <div>
          <LinearIndeterminate />
          <img
            src={logo}
            width={150}
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              display: "block",
            }}
          />

          <div className="blogs">
            {Array.from({ length: 10 }).map((_, index) => (
              <CardUI key={index} index={index} loading={loading} />
            ))}
          </div>
        </div>
      ) : (
        <div className="blogs">
          <div></div>
          {posts.map((item, index) => (
            <CardUI key={index} {...item} index={index} loading={loading} />
          ))}
        </div>
      )}
    </div>
  );
  }
  
export default Blogs