import React, {useState, useEffect, useContext} from 'react'
import { context } from '../../context/context';
import BASE_URL from '../../config/urlConfig';
import './profile.css';

export default function Profile() {
  const { state, dispatch } = useContext(context);
   const id=state.user?._id
  //console.log("User data:", state.user );
/*   useEffect(()=>{
    const token=localStorage.getItem("token")
    fetch(`${BASE_URL}/api/users/getUserById/${state.user?._id}}`, {
      method:"GET",
      headers:{token:token}
    })
    .then(res=>res.json())
    .then(result=>dispatch({type:"setUser",payload:result.data}))
    .catch(err=>console.log(err))
      },[]) */
      console.log(state.user)
      const userName = state.user ? state.user.firstName : "N/A";
      const email = state.user ? state.user.email : "N/A";
      
  return (
    <>
<div className="profile">
      <div className="page">
        <div className="profile-image-container"></div>
      {/*   <p>User Name: {userName}</p>
        <p>Email: {email}</p> */}
        <p>{state.user?.firstName}</p>
      </div>
      <div className="balance">
        {/* <Balance userId={state.user._id} /> */}
      </div>
    </div>
    </>
  );
}