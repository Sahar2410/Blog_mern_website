import { useNavigate, useParams } from "react-router-dom"
import Comment from "../components/Comment"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import axios from "axios"
import { URL,IF } from "../url"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "../components/Loader"


const PostDetails = () => {

  const postId=useParams().id
  const [post,setPost]=useState({})
  const {user}=useContext(UserContext)
  const [comments,setComments]=useState([])
  const [comment,setComment]=useState("")
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
  

  const fetchPost=async()=>{
    try{
      const res= await axios.get(URL+"/api/posts/"+postId)
      // console.log(res.data)
      setPost(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleDeletePost=async ()=>{

    try{
      const res=await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
      console.log(res.data)
      navigate("/")

    }
    catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    fetchPost()

  },[postId])

  const fetchPostComments=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/comments/post/"+postId)
      setComments(res.data)
      setLoader(false)

    }
    catch(err){
      setLoader(true)
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchPostComments()

  },[postId])

  const postComment=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post(URL+"/api/comments/create",
      {comment:comment,author:user.username,postId:postId,userId:user._id},
      {withCredentials:true})
      
      // fetchPostComments()
      // setComment("")
      window.location.reload(true)

    }
    catch(err){
         console.log(err)
    }

  }


  const backgroundImageUrl = "/assets/your-image.jpg";

  return (
    <div
      className="w-full h-full bg-cover bg-center"
    >

        <Navbar/>
        {loader?<div className="h-[80vh] flex justify-center items-center w-full "><Loader/></div>:<div className="px-8 md:px-[200px]  bg-sky-700 pt-10 " >
        
        <div className="flex justify-between items-center p-4 md:p-6">
  <h1 className="text-xl md:text-3xl font-bold text-black">{post.title}</h1>
  {user?._id === post?.userId && (
    <div className="flex items-center justify-center space-x-4">
      <p
        className="cursor-pointer text-2xl"
        onClick={() => navigate("/edit/" + postId)}
      >
        <BiEdit />
      </p>
      <p
        className="cursor-pointer text-2xl"
        onClick={handleDeletePost}
      >
        <MdDelete />
      </p>
    </div>
  )}
</div>

<div className="w-50 border-b-2 border-black mb-4 bg-slate-400"></div>

        <div className="flex items-center justify-between mt-3 md:mt-4 ">
        <p className=" bg-slate-200 p-2 rounded-lg">@{post.username}</p>
       <div className="flex space-x-2 bg-slate-200 p-2 rounded-lg">
       <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
       </div>
        </div>
        <img src={IF+post.photo} className="w-full  mx-auto mt-8" alt=""/>
         <p className="mx-auto mt-8 mb-6">{post.desc}</p>
         <div className="w-50 border-b-2 border-black mb-4  "></div>
         <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
          {post.categories?.map((c,i)=>(
            <>
            <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
            </>
            
          ))}
            
          </div>
         </div>

         


         <div className="comments-box bg-white p-6 mt-8 rounded-md bg-gray-100 shadow-xl shadow-black bg-slate-200 ">
  <div className="flex flex-col pb-1">
    <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
    {comments?.map((c) => (
      <Comment key={c._id} c={c} post={post} />
    ))}
  </div>
  {/* Comment Form */}
  <div className="comment-form-container w-full flex flex-col mt-4 md:flex-row">
    <input
      onChange={(e) => setComment(e.target.value)}
      type="text"
      placeholder="Write a comment"
      className="comment-input md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 border border-gray-400 rounded-md shadow-md"
    />
    <button
      onClick={postComment}
      className="comment-btn bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0 rounded-md shadow-md hover:bg-gray-800"
    >
      Add Comment
    </button>
  </div>
</div>

        </div>}
        <Footer/>
    </div>
  )
}

export default PostDetails