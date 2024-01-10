import React, {useState, useEffect, useContext} from 'react';
import SideMenu from "../sideMenu/SideMenu";
import Profile from "../profile/Profile";
import "./UpdateUserDetails.css";
import { useNavigate } from "react-router-dom";
import { context } from "../../context/context";
import axios from "axios"
import BASE_URL from '../../config/urlConfig';


function UpdateUserDetails() {
    const {state, dispatch} = useContext(context)
const [firstName, setFirstName] = useState(state.user?.firstName)
const [lastName, setLastName] = useState(state.user?.lastName)
const UpdateDetails =  ()=>{
    const newData = {
        ...state.user,firstName:firstName,lastName:lastName
       
    }
    const token=localStorage.getItem("token")
    axios.patch(`${BASE_URL}/api/users/updateUserDetailsById`, newData,{headers:{token:token}})
    .then(response=>dispatch({type:"setUser",payload:response.data}) )
    .catch(err => console.log(err))
    dispatch({type:"setUpdateUser", payload:true})
}
console.log(state.user)

  return (
    <div className="UpdateDetails">
      <SideMenu />
      <div className="UpdateDetailsHero">
        <h1>Update User Details</h1>
<div>
<label htmlFor="First Name"> First Name:</label> 
<input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>

<label htmlFor="Last Name"> Last Name:</label>
<input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
<button type='button' onClick={UpdateDetails}>Update</button>
</div>
      </div>
<Profile/>
    </div>
  );
}

export default UpdateUserDetails;
