import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import SideMenu from "../sideMenu/SideMenu";
import "./home.css";

export default function Home() {
  const {state,dispatch}=useContext(context)
  const navigate=useNavigate()
  const homeAddNewExp=()=>{
    navigate("/addExpenses")
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
        {state.user?.expenses.length>0?<p>show expenses</p>:<p className="homeExpensesDisplay">No Expenses to Show</p>}
        </div>
        <div className="homeHeroBottom">
         <button className="homeAddExpButton" onClick={()=>homeAddNewExp()}>Add New Expenses</button>
        </div>

      </div>
    </div>
  );
}
