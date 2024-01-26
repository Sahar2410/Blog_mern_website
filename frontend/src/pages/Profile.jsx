import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"
import axios from "axios"
import { IF, URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"


const Profile = () => {
  const param=useParams().id
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {user,setUser}=useContext(UserContext)
  const navigate=useNavigate()
  const [posts,setPosts]=useState([])
  const [updated,setUpdated]=useState(false)
  // console.log(user)

const fetchProfile=async ()=>{
  try{
     const res=await axios.get(URL+"/api/users/"+user._id)
     setUsername(res.data.username)
     setEmail(res.data.email)
     setPassword(res.data.password)
  }
  catch(err){
     console.log(err)
  }
}

const handleUserUpdate=async ()=>{
  setUpdated(false)
  try{
    const res=await axios.put(URL+"/api/users/"+user._id,{username,email,password},{withCredentials:true})
    // console.log(res.data)
    setUpdated(true)

  }
  catch(err){
    console.log(err)
    setUpdated(false)
  }

}

const handleUserDelete=async()=>{
  try{
    const res=await axios.delete(URL+"/api/users/"+user._id,{withCredentials:true})
    setUser(null)
    navigate("/")
    // console.log(res.data)

  }
  catch(err){
    console.log(err)
  }
}
// console.log(user)
const fetchUserPosts=async ()=>{
  try{
    const res=await axios.get(URL+"/api/posts/user/"+user._id)
    // console.log(res.data)
    setPosts(res.data)


  }
  catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  fetchProfile()

},[param])

useEffect(()=>{
  fetchUserPosts()

},[param])

  return (
    <div>
      <Navbar/>
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-0 flex md:flex-row flex-col-reverse md:items-start items-start bg-sky-700 pt-20 pb-20 
      border-solid border-2 border-sky-500 ...">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0 mb-10">
          <h1 className="text-2xl font-bold mb-5">Your Posts</h1>
          {posts?.map((p)=>(
            <ProfilePosts key={p._id} p={p}/>
          ))}
        </div>

        <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[25%] w-full md:items-end bg-gray-200 p-6 shadow-md rounded-lg ml-auto h-80 mb-10">

  <div className="flex flex-col space-y-4 items-start">
    <h1 className="text-xl font-bold mb-5">Profile</h1>
    <input
      onChange={(e) => setUsername(e.target.value)}
      value={username}
      className="outline-none px-4 py-2 text-gray-500 border border-gray-300 rounded-md"
      placeholder="Your username"
      type="text"
    />
    <input
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      className="outline-none px-4 py-2 text-gray-500 border border-gray-300 rounded-md "
      placeholder="Your email"
      type="email"
    />
    <div className="flex items-center space-x-4 mt-8 ">
      <button
        onClick={handleUserUpdate}
        className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400 rounded-md mb-8 mt-4"
      >
        Update
      </button>
      <button
        onClick={handleUserDelete}
        className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400 rounded-md mb-8 mt-4"
      >
        Delete
      </button>
    </div>
    {updated && (
      <h3 className="text-green-500 text-sm text-center mt-4">
        User updated successfully!
      </h3>
    )}
  </div>
</div>

      </div>
      <Footer/>
    </div>
  )
}

export default Profile