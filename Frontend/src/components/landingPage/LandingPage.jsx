import React from 'react'
import { useNavigate } from 'react-router-dom';
import LandNavBar from '../landingNavBar/LandNavBar'
import "./landingPage.css"
import About from '../about/About';


export default function LandingPage() {
  const navigate=useNavigate()
  const getStarted=()=>{
    const token=localStorage.getItem("token");

    if(token){
      navigate("/home")
    }else{
      navigate("/login")
    }
  }
  return (
    <div className='landingPage'>
      <LandNavBar/>
      <div className='landingPage-Hero'>
       <h1>Welcome to Expenses-Tracker</h1>
       <button onClick={()=>getStarted()} className="getStarted">Get Started</button>

      </div>
      <About/>
    </div>
  )
}