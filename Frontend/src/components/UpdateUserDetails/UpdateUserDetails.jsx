import React, { useState, useContext } from "react";
import SideMenu from "../sideMenu/SideMenu";
import Profile from "../profile/Profile";
import "./UpdateUserDetails.css";
import { context } from "../../context/context";
import axios from "axios";
import BASE_URL from "../../config/urlConfig";

function UpdateUserDetails() {

const {state, dispatch} = useContext(context)
const [firstName, setFirstName] = useState(state.user?.firstName)
const [lastName, setLastName] = useState(state.user?.lastName)
const getUserById=()=>{
  if(state.user){
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/users/getUserById/${state.user?._id}`, {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((result) => dispatch({ type: "setUser", payload: result.data }))
      .catch((err) => console.log(err));
  
  }
}
/* useEffect(()=>{
  getUserById()
},[]) */
const UpdateDetails =  ()=>{
    const newData = {
        ...state.user,firstName:firstName,lastName:lastName
       
    }
    const token=localStorage.getItem("token")
    axios.patch(`${BASE_URL}/api/users/updateUserDetailsById`, newData,{headers:{token:token}})
    .then(response=>console.log("updated") )
    .catch(err => console.log(err))
   /*  dispatch({type:"setUpdateUser", payload:true}) */
    getUserById()
}
/* console.log(state.user) */


  return (
    <div className="UpdateDetails">
 
      <div className="UpdateDetailsHero">
        <h1>Update User Details</h1>
        
          <label htmlFor="First Name"> First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="Last Name"> Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="button" onClick={UpdateDetails}>
            Update
          </button>
        
      </div>

    </div>
  );
}

export default UpdateUserDetails;
