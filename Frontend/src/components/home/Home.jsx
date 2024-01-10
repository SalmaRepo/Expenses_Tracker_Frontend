import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import ShowExpensesHome from "../showExpensesHome/showExpensesHome";
import SideMenu from "../sideMenu/SideMenu";
import "./home.css";
import Profile from "../profile/Profile";
import ExpensesHomeGraph from "../graph/ExpensesHomeGraph";

export default function Home() {
  const {state,dispatch}=useContext(context);
  const navigate=useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/expenses/getExpensesByUser`, {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((result) => dispatch({ type: "setExpenses", payload: result.data }))
      .catch((err) => console.log(err));
  }, []);

  const homeAddNewExp=()=>{
    navigate("/addExpenses")
  }
  const homeAddNewInc=()=>{
    navigate("/addIncomes")
  }
 


  //console.log(state.expenses)

  

  return (
  
<div className="home">
      <SideMenu/>
      <div className="homeHero">
        <h1>Home</h1>
        <div className="homeHeroTop">
          <ExpensesHomeGraph expenses={state.expenses}/>
        </div>
        <div className="homeHeroMiddle">
        {state.expenses?<ShowExpensesHome/>:<p className="homeExpensesDisplay">No Expenses to Show</p>}
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
