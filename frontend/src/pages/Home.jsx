import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { IF, URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from '../components/Loader';
import { UserContext } from "../context/UserContext";

const Home = () => {
  const imageUrls = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
    'https://img.freepik.com/free-photo/cardano-blockchain-platform_23-2150411956.jpg',
    // Add more image URLs as needed
  ];
  
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="bg-sky-700">
      <div className=" text-black p-4 text-center w-1/2 mx-auto py-18 " >
  <h1 className="text-3xl font-bold mb-4 py-5 italic">
  Navigating the tech world, one post at a time.
  </h1>
  <p className="italic">
  Welcome to TechnoBlog, your go-to destination for the latest in technology trends, innovations, and insights. Dive into a world where cutting-edge meets user-friendly as we explore the ever-evolving landscape of tech. 
  </p>
</div>

<div className="flex flex-wrap justify-center items-center gap-12 p-20" >
  {/* Your content goes here */}

      {imageUrls.map((imageUrl, index) => (
        <div
          key={index}
          className="w-[calc(50% - 24px)] h-[300px] border border-gray-300 rounded-lg shadow-lg shadow-black overflow-hidden "
        >
          <img
            src={imageUrl}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
    </div>
      <Footer />
    </>
  );
};

export default Home;



