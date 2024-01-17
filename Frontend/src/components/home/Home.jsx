import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import ShowExpensesHome from "../showExpensesHome/showExpensesHome";
import SideMenu from "../sideMenu/SideMenu";
import "./home.css";
import Profile from "../profile/Profile";
import ExpensesHomeGraph from "../graph/ExpensesHomeGraph";

export default function Home() {
  const { state, dispatch } = useContext(context);
  const navigate = useNavigate();

  // Fetching user expenses data when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Making a GET request to fetch user expenses using the API
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

  // Navigate to Add Expenses
  const homeAddNewExp = () => {
    navigate("/addExpenses");
  };

  // Navigate to Add Incomes
  const homeAddNewInc = () => {
    navigate("/addIncomes");
  };

  return (
    <div className="home">
      <SideMenu />
      <div className="homeHero">
        <h1>Home</h1>
        <div className="homeHeroTop">
          <ExpensesHomeGraph />
        </div>
        <div className="homeHeroMiddle">
          {state.expenses ? (
            <ShowExpensesHome />
          ) : (
            <p className="homeExpensesDisplay">No Expenses to Show</p>
          )}
        </div>
        <div className="homeHeroBottom darkmode">
          <button className="homeAddExpButton darkmodeExpenses" onClick={() => homeAddNewExp()}>
            Add New Expenses+
          </button>
          <button
            className="homeAddIncomeButton darkmodeIncomes"
            onClick={() => homeAddNewInc()}
          >
            Add New Icome+
          </button>
        </div>
      </div>
      <Profile />
    </div>
  );
}
