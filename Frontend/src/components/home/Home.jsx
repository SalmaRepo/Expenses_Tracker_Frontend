import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import ShowExpenses from "../showExpenses/ShowExpenses";
import SideMenu from "../sideMenu/SideMenu";
import "./home.css";
import Profile from "../profile/Profile";

export default function Home() {
  const {state,dispatch}=useContext(context)
  const navigate=useNavigate()
  const homeAddNewExp=()=>{
    navigate("/addExpenses")
  }
  const homeAddNewInc=()=>{
    navigate("/addIncomes")
  }
 


  console.log(state.user)

  

  return (
  
<div className="home">
      <SideMenu/>
      <div className="homeHero">
        <h1>Home</h1>
        <div className="homeHeroTop">
          
        </div>
        <div className="homeHeroMiddle">
        {state.user?<ShowExpenses/>:<p className="homeExpensesDisplay">No Expenses to Show</p>}
        </div>
        <div className="homeHeroBottom">
         <button className="homeAddExpButton" onClick={()=>homeAddNewExp()}>Add New Expenses+</button>
         <button className="homeAddIncomeButton" onClick={()=>homeAddNewInc()}>Add New Icome+</button>
        </div>

      </div>
      <Profile/>
    </div>
    
    
   
  );
}
