import React from 'react'
import {Link} from "react-router-dom"
import "./landingNavbar.css"
import {useContext} from "react" 
import {context} from "../../context/context"
import About from '../about/About'
import LogOut from '../logout/Logout'


export default function LandNavBar() {
  const {state, dispatch}= useContext(context)
  console.log(state)
  return (
    <div className='landingNavBar'>
       <Link to="/"><img className='logo' src="images/logoWhite.png" alt="logo of the project" /></Link>
      <ul className='landingNavList'> 
        <li>
          <a href='#about'> About </a> 
          
        </li>
        <li>
        <Link to="/login">{state.user?<LogOut/>:'Login'}</Link>
        </li>
        <li>
          <Link to="/SignUp">Sign-Up</Link>
        </li>
      </ul>
    </div>
  
  )
}
