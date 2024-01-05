import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import SideMenu from "../sideMenu/SideMenu";
import "react-calendar/dist/Calendar.css";
import BASE_URL from "../../config/urlConfig";
import "./addIncomes.css";

export default function AddIncomes() {
  const [calDate, setCalDate] = useState(new Date());
  const incomeCategory = useRef();
  const incomeAmount = useRef();
  const [enteredIncomes, setEnteredIncomes] = useState([]);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${BASE_URL}/api/incomes/getIncomesByUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token":token
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

  const incomesUpdate = async (e) => {
    const token = localStorage.getItem("token")
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
          "token":token
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
  };

  function onChange(calDate) {
    setCalDate(calDate);
  }

  return (
    <div className="addIncome">
      <SideMenu />
      <div className="addIncomesHero">
        <form
          action="incomeForm"
          className="incomeForm"
          onSubmit={incomesUpdate}
        >
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

            <button type="submit">Confirm Income</button>
          </div>

          <div className="displayEnteredIncome">
            <h2>Added Incomes</h2>
            <ul>
              {enteredIncomes.map((income, index) => (
                <li key={index}>
                  Date: {new Date(income.date).toLocaleDateString()}| Amount: {income.amount} | Category: {income.category}
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
