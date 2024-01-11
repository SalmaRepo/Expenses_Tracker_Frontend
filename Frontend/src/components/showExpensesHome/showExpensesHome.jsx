import React from "react";
import { useContext,useEffect } from "react";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import ShowExpenses from "../showExpenses/ShowExpenses";
import "./showExpensesHome.css"

function ShowExpensesHome() {

  const { state, dispatch } = useContext(context);
  let curr=state.user?.currency.slice(3)+"s";
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
  },[]);

  //console.log(state.expenses)

 

  return (
    <div>
        <h1>Your Most Recent Expenses</h1>
      { state.expenses?.length > 3
        ? state.expenses
       
            
            .map((expense) => {
              return (
                <div key={expense._id} className="showExpenses">
                  <p>
                    {expense?.category?.charAt(0).toUpperCase() +
                      expense?.category.slice(1)}
                  </p>
                  <p>{expense?.amount}<span>{curr}</span></p>
                  <p>{new Date(expense?.date).toLocaleString()}</p>
                </div>
              );
            }).reverse().slice(0,5)
            
        :  state.expenses
            .map((expense) => {
              return (
                <div key={expense?._id} className="showExpenses">
                  <p>
                    {expense?.category?.charAt(0).toUpperCase() +
                      expense?.category.slice(1)}
                  </p>
                  <p>{expense?.amount}<span>{curr}</span></p>
                  <p>{new Date(expense?.date).toLocaleString()}</p>
                </div>
              );
            })
            .reverse()}
    </div>
  );
}

export default ShowExpensesHome;
