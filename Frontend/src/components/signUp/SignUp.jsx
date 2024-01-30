import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../config/urlConfig";
import LandNavBar from "../landingNavBar/LandNavBar";
import axios from "axios";
import { context } from "../../context/context";
import "./SignUp.css";

export default function Signup() {
  const [preview, setPreview] = useState("");
  const [showImg, setShowImg] = useState("");
  const navigate = useNavigate();

  const { state, dispatch } = useContext(context);

  const grabImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const link = e.target.files[0];
    setPreview(link);
    setShowImg(URL.createObjectURL(link));
  };

  const signupUser = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const data = new FormData();
    data.append("userImage", preview);
    data.append("firstName", e.target.firstname.value),
      data.append("lastName", e.target.lastname.value),
      data.append("email", e.target.email.value),
      data.append("password", e.target.password.value);
    const user={
      firstName:e.target.firstname.value,
      lastName:e.target.lastname.value,
      email: e.target.email.value,
      password:e.target.password.value
    }
    /* console.log(user) */

    axios
      .post(`${BASE_URL}/api/users/signUp`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        if (result.errors) {
          console.log(result.errors);
          toast.error(JSON.stringify(result.errors));
        } else {
          e.target.reset();
          toast.success("You successfully signed up!");
          dispatch({ type: "setIsSignUp", payload: true });
          setTimeout(() => {
            navigate("/login");
        }, 1500);
        }
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response.data.errors[0]["msg"]));
        console.log(err)
      }
        );
  };

  return (

    <>
      <LandNavBar />
      <div className="signup">
        <div className="left"></div>
        <div className="right">
          <main className="mainDiv">
            {/* <h1>Signup</h1> */}
            <Toaster position="top-center" /> {/* toast position*/}
            <form onSubmit={signupUser}>
              <section>
                <label htmlFor="firstname">First Name: </label>
                <input
                  className="inputs"
                  type="text"
                  id="firstname"
                  name="firstname"
                />{" "}
                <br />
                <label htmlFor="lastname">Last Name: </label>
                <input
                  className="inputs"
                  type="text"
                  id="lastname"
                  name="lastname"
                />{" "}
                <br />
                <label htmlFor="email">Email :</label>
                <input
                  className="inputs"
                  type="email"
                  id="email"
                  name="email"
                />{" "}
                <br />
                <label htmlFor="password">Password : </label>
                <input
                  className="inputs"
                  type="password"
                  id="password"
                  name="password"
                />{" "}
                <br />
              </section>
              {/* upload img */}
              <section className="upload-section">
                <h3>Upload your Image</h3>

                <div className="file-input-container">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={grabImage}
                  />
                  {/* added this extra line of label for the CSS purpose */}
                  <label htmlFor="file" className="chooseFile-label">
                    Choose File
                  </label>
                </div>

                <div className="profileImg-container">
                  <img src={showImg} alt="" className="img-preview" />
                </div>

                <button className="signup-btn">SignUp</button>
              </section>

        
            </form>
          </main>
        </div>
      </div>
    </>
  );
}
