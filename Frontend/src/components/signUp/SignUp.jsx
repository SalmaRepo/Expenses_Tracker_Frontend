import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../config/urlConfig";
import LandNavBar from "../landingNavBar/LandNavBar";
import Footer from "../footer/Footer";


export default function Signup() {
  
  const navigate = useNavigate();

  const signupUser = (e) => {
    e.preventDefault();
    const user = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    fetch(`${BASE_URL}/api/users/signUp`, {
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
          setTimeout(() => {
           navigate("/login");
          }, 1500);
        }
      })
      .catch((err) => console.log(err));
  };

  const [preview, setPreview] = useState("");
  const grabImage = (e)=> {
    // const link = URL.createObjectURL(e.target.files[0])
    // console.log(link)
    // setPreview(link)

    const reader = new FileReader()

    reader.readAsDataURL(e.target.files[0]) //converting binary data into base64urlencodeddata
    reader.onload = (event)=>{
      console.log(event.target.result)
      setPreview(event.target.result)
    }
  }

  const uploadFile = (e)=>{
    e.preventDefault()
    fetch("http://localhost:5173/api/userimages",
    {method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify(preview),
  })
    .then(res => res.json())
    .then(result=>console.log(result))
  };
  
  return (
    <div>
      <LandNavBar/>
      <h1>Signup</h1>
      <Toaster position="top-center" /> {/* toast position*/}
      <form onSubmit={uploadFile}>
      <input type="file" onChange={grabImage} />
      <button>Upload</button>
      </form>
      <div style={{display:"flex", width:"200px", height:"200px", border:"2px solid black", justifyContent:"center"}}>
        <img src= {preview} alt=""  width="100%"/>
      </div>
      <form onSubmit={signupUser}>
        <label htmlFor="firstname">First Name: </label>
        <input type="text" id="firstname" name="firstname" /> <br />
        <label htmlFor="lastname">Last Name: </label>
        <input type="text" id="lastname" name="lastname" /> <br />
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" /> <br />
        <label htmlFor="password">Password : </label>
        <input type="password" id="password" name="password" /> <br />
        <button>SignUp</button>
      </form>
      <Footer/>
    </div>
  );
}

