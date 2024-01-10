import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import SideMenu from "../sideMenu/SideMenu";
import "react-calendar/dist/Calendar.css";
import BASE_URL from "../../config/urlConfig";
import "./addIncomes.css";
import History from "../history/History";

export default function AddIncomes() {
  const [calDate, setCalDate] = useState(new Date());
  const incomeCategory = useRef();
  const incomeAmount = useRef();
  const [enteredIncomes, setEnteredIncomes] = useState([]);

  useEffect(() => {
    fetchIncomes();
  }, []);

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
        setEnteredIncomes(incomesData.data);
      } else {
        console.error("Error while retrieving income:", response.statusText);
      }
    } catch (error) {
      console.error("Error while retrieving income:", error.message);
    }
  };

  // add new created income
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
        setEnteredIncomes([newIncome, ...enteredIncomes]);
        incomeAmount.current.value = "";
        incomeCategory.current.value = "Salary";
      } else {
        console.error("Error while adding income", response.statusText);
      }
    } catch (error) {
      console.error("Error while adding income", error.message);
    }
    fetchIncomes();
  };

  function onChange(calDate) {
    setCalDate(calDate);
  }

  // .... delete income ................

  const handleDelete = (id, index) => {
    deleteIncome(id, index);
  };

  const deleteIncome = async (id, index) => {
    console.log(id, index);
    const token = localStorage.getItem("token");

    try {
      // delete income from database
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
      if (response.ok) {
        console.log("deleted income");
      } else {
        console.error("Error while deleting income", response.statusText);
      }
    } catch (error) {
      console.error("Error while deleting income", error.message);
    }
  };

  //........................................

  return (
    <div className="addIncome">
      <SideMenu />
      <div className="addIncomesHero">
        <form className="incomeForm">
          <Calendar onChange={onChange} value={calDate} className="calendar" />

          <div className="incomeEnterSection">
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
          </div>

          <div className="displayEnteredIncome">
            <h2>Added Incomes</h2>
            <ul>
              {enteredIncomes.map((income, index) => (
                <li key={index}>
                  Date: {new Date(income.date).toLocaleDateString()}| Category:{" "}
                  {income.category}| Amount: {income.amount}
                  <button
                    type="button"
                    className="delete"
                    onClick={() => handleDelete(income._id, index)}
                  >
                    {" "}
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
