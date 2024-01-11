import React, { useEffect, useContext } from "react";
import axios from "axios";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";

const Balance = ({ userId }) => {
  const { state, dispatch } = useContext(context);

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      try {
       
        // Fetch user data with incomes and expenses populated
        const userResponse = await axios.get(
          `${BASE_URL}/api/users/getUserById/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        const user = userResponse.data;

        if (!user) {
          console.error("Invalid user data:", response);
          return;
        }

        //?console.log("User", user.data);
        
        // Calculate total incomes 
        let totalIncomes = 0;
        if (user.data.incomes) {
          for (let i = 0; i < user.data.incomes.length; i++) {
            const income = user.data.incomes[i];
            totalIncomes += income.amount;
          }
        }
        

        // Calculate total expenses 
        let totalExpenses = 0;
        if (user.data.expenses) {
          for (let i = 0; i < user.data.expenses.length; i++) {
            const expense = user.data.expenses[i];
            totalExpenses += expense.amount;
          }
        }
       

        // Balance calc
        const currentBalance = totalIncomes - totalExpenses;
        dispatch({ type: "setBalance", payload: currentBalance });
        

      } catch (err) {
        console.error("Error retrieving balance data ", err);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Your Balance is {state.balance} </h2>
    </div>
  );
};

export default Balance;
