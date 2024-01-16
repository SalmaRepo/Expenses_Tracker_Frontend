import React, { useState, useRef, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import SideMenu from "../sideMenu/SideMenu";
import "react-calendar/dist/Calendar.css";
import BASE_URL from "../../config/urlConfig";
import "./addIncomes.css";
import { context } from "../../context/context";
import Profile from "../profile/Profile";

export default function AddIncomes() {
  const { state, dispatch } = useContext(context);
  const [calDate, setCalDate] = useState(new Date());
  const incomeCategory = useRef();
  const incomeAmount = useRef();

  
  const getUserById = () => {
    if (state.user) {
      const token = localStorage.getItem("token");
      fetch(`${BASE_URL}/api/users/getUserById/${state.user?._id}`, {
        method: "GET",
        headers: {
          token: token,
        },
      })
        .then((res) => res.json())
        .then((result) => dispatch({ type: "setUser", payload: result.data }))
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    fetchIncomes();
    getUserById();
  }, []);

  // Get incomes by user
  const fetchIncomes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/api/incomes/getIncomesByUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      if (response.ok) {
        const incomesData = await response.json();
        dispatch({ type: "setEnteredIncomes", payload: incomesData.data });
      } else {
        console.error("Error while retrieving income:", response.statusText);
      }
    } catch (error) {
      console.error("Error while retrieving income:", error.message);
    }
  };

  // Create and add income
  const incomesUpdate = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const newIncome = {
      date: calDate,
      amount: incomeAmount.current.value,
      category: incomeCategory.current.value,
    };
    try {
      const response = await fetch(`${BASE_URL}/api/incomes/createIncome`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(newIncome),
      });
      if (response.ok) {
        const updatedIncomes = [newIncome, ...state.enteredIncomes];
        dispatch({
          type: "setEnteredIncomes",
          // payload: [newIncome, ...state.enteredIncomes],
          payload: updatedIncomes,
        });
        incomeAmount.current.value = "";
        incomeCategory.current.value = "Salary";
      } else {
        console.error("Error while adding income", response.statusText);
      }
    } catch (error) {
      console.error("Error while adding income", error.message);
    }
    fetchIncomes();
    getUserById();
  };
  function onChange(calDate) {
    setCalDate(calDate);
  }

  // Delete income
  const handleDelete = (id, index) => {
    deleteIncome(id, index);
  };
  const deleteIncome = async (id, index) => {
    console.log(id, index);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${BASE_URL}/api/incomes/deleteIncome/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      fetchIncomes();
      getUserById();
      if (response.ok) {
        console.log("deleted income");
      } else {
        console.error("Error while deleting income", response.statusText);
      }
    } catch (error) {
      console.error("Error while deleting income", error.message);
    }
  };

  return (
    <div className="addIncome">
      <SideMenu />
      <div className="addIncomesHero">
        <form className="incomeForm">
          <Calendar onChange={onChange} value={calDate} className="calendar" />

          <section className="incomeEnterSection">
            <input
              type="number"
              placeholder="Enter the Amount"
              className="incomeAmount"
              ref={incomeAmount}
            />
            <select name="category" ref={incomeCategory}>
              <option value="Salary">Salary</option>
              <option value="Family-Allowance">Family-Allowance</option>
              <option value="Refunds">Refunds</option>
              <option value="Sales">Sales</option>
              <option value="Shares">Shares</option>
              <option value="Properties-Rent">Properties-Rent</option>
              <option value="Gifts">Gifts</option>
              <option value="Others">Others</option>
            </select>
            <button type="button" onClick={incomesUpdate}>
              Confirm Income
            </button>
          </section>

          <h2>Added Incomes</h2>

          <section className="displayEnteredIncome">
            
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {state.user?.incomes?.map((income, index) => (
                  <tr key={index}>
                    <td>{new Date(income.date).toLocaleDateString()}</td>
                    <td>{income.category}</td>
                    <td>{income.amount}</td>
                    <td>
                      <button
                        type="button"
                        className="delete"
                        onClick={() => handleDelete(income._id, index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>  

        </form>
      </div>
      <Profile />
    </div>
  );
}
