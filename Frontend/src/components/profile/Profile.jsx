import React, {useState, useEffect, useContext} from 'react'
import { context } from '../../context/context';

import './profile.css';
import BASE_URL from '../../config/urlConfig';

export default function Profile({token}) {
  const {state, dispatch} = useContext(context)
  console.log(state.user)
  
  return (

<div className="profile">
    <div className='page'>
      <div className="profile-image-container"><img src={`${BASE_URL}/${state.user?.userImage}`} style={{width:"100px", height:"100px"}} alt="noImg" /></div>
      <p>User Name: {state.user?.firstName} </p>
      <p>Email: {state.user?.email}</p>
    </div>   
    <div className='balance'>
      <p>Display Balance</p>
    </div>
  </div>
  
);
}
