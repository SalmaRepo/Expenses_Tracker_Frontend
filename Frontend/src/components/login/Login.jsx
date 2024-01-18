import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/urlConfig";
import toast, { Toaster } from "react-hot-toast";
import { context } from "../../context/context";
import Footer from "../footer/Footer";
import LandNavBar from "../landingNavBar/LandNavBar";


export default function Login() {
  const {state,dispatch}=useContext(context)

  const navigate = useNavigate();

  function showSignUp(){
    navigate("/signUp")
  }

  const loginUser = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => {
        const token = res.headers.get('token');
        if (token) {
          localStorage.setItem('token', token);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result)

       
        /* 
          navigate("/home"); */
          if (result.success) {
            dispatch({ type: "setUser", payload: result.data});
            e.target.reset();
            toast.success("You successfully logged in!"); // pop-up message
            setTimeout(() => {
              if(state.isSignUp){
                navigate("/selectCurrency")
              }else{
                navigate("/home");
              }
           
            }, 1500);
                  
          } else {
            toast.error(JSON.stringify(result.message));
          }  

      })
      .catch((err) => console.log(err)); 
  };

  

  console.log(state.user)


  return (
    <>
    <LandNavBar/>
      <div className="login">
        <h1>Login</h1>
        <Toaster position="top-center" />
        <form onSubmit={loginUser}>
          <label htmlFor="email">E-mail:</label>
          <br />
          <input type="email" id="email" name="email"></input>
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input type="password" id="password" name="password"></input>
          <br />
          <button>Login</button> 
        </form>
        <p>Don't have an account? </p>
        <button onClick={showSignUp}>create an account!</button>      
      </div>
      <Footer/>
    </>
  );
}

