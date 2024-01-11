import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../config/urlConfig";
import LandNavBar from "../landingNavBar/LandNavBar";
import Footer from "../footer/Footer";
import axios from "axios"
import { context } from "../../context/context";

export default function Signup() {
  const [preview, setPreview] = useState("");
  const [showImg,setShowImg]=useState("");
  const navigate=useNavigate()

  export default function Signup() {
  const {state,dispatch}=useContext(context)
  
   
    const grabImage=(e)=>{ 
    const link = e.target.files[0]
    setPreview(link)

    setShowImg(URL.createObjectURL(link))
  }

  const signupUser = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const user = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const data=new FormData();
    data.append('userImage',preview);
    data.append('firstName',e.target.firstname.value),
    data.append('lastName', e.target.lastname.value),
    data.append('email', e.target.email.value),
    data.append('password',e.target.password.value)
    /* fetch(`${BASE_URL}/api/users/signUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors) {
          console.log(result.errors);
          toast.error(JSON.stringify(result.errors));
        } else {
          e.target.reset();
          toast.success("You successfully signed up!"); // pop-up message
          dispatch({type:"setIsSignUp",payload:true})
          setTimeout(() => {
           navigate("/login");
          }, 1500);
        }
      })
      .catch((err) => console.log(err)); */

      axios.post(`${BASE_URL}/api/users/signUp`, data,{headers:{"Content-Type": "multipart/form-data"}})
      .then((result) => {
        if (result.errors) {
          console.log(result.errors);
          toast.error(JSON.stringify(result.errors));
        } else {
          e.target.reset();
          toast.success("You successfully signed up!"); // pop-up message
          setTimeout(() => {
           navigate("/login");
          }, 1500);
        }
      })
      .catch((err) => console.log(err));
  };


 
  // const uploadFile = (e)=>{
  //   e.stopPropagation()
  //   e.preventDefault()
  //   const data=new FormData()
  //   console.log(preview)
  //   data.append('file',preview);
  //   fetch("http://localhost:5000/api/userimages/uploadImage",
  //   {method:"POST",
  //   // headers:{"content-type":"application/json"},
  //   body:data,
  // })
  //   .then(res => res.json())
  //   .then(result=>console.log(result.okay))
  // };
  
  return (
    <div>
      <LandNavBar/>
      <h1>Signup</h1>
      <Toaster position="top-center" /> {/* toast position*/}
      
      
      <form onSubmit={signupUser}>
        <label htmlFor="firstname">First Name: </label>
        <input type="text" id="firstname" name="firstname" /> <br />
        <label htmlFor="lastname">Last Name: </label>
        <input type="text" id="lastname" name="lastname" /> <br />
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" /> <br />
        <label htmlFor="password">Password : </label>
        <input type="password" id="password" name="password" /> <br />

        <h3>Upload your Image</h3>
        <input type="file" name="file" onChange={grabImage} />   
      <div style={{display:"flex", width:"200px", height:"200px", border:"2px solid black", justifyContent:"center"}}>
        <img src= {showImg} alt=""  width="100%"/>
      </div>
        <button>SignUp</button>
      </form>
      <Footer/>
    </div>
  );
}

