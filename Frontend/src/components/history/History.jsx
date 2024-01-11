import React, { useContext, useState, useEffect } from "react";
import Profile from "../profile/Profile";
import SideMenu from "../sideMenu/SideMenu";
import { context } from "../../context/context";
import "./history.css";
import BASE_URL from "../../config/urlConfig";

function History() {
  const { state, dispatch } = useContext(context);
  const [monthExp, setMonthExp] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sepetember",
    "October",
    "November",
    "December",
  ];

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
    getUserById();
  }, []);

  const handleMonth = () => {
    setFilterType("month");
    getUserById()
    console.log(state.user.expenses)
    let currentMonth = state.user?.expenses.filter(
      (exp) =>
        new Date(exp.date).getMonth() === month &&
        new Date(exp.date).getFullYear() === year
    );

    console.log(currentMonth)

    const expensesSummary = [];
    let addedCategories = {};
    currentMonth?.map((exp) => {
      const { category, amount, date } = exp;

      if (
        addedCategories[category] &&
        new Date(addedCategories[date]).getMonth === month
      ) {
        addedCategories[category] += amount;
      } else {
        addedCategories[category] = amount;
      }
    });
    for (const category in addedCategories) {
      expensesSummary.push({ category, amount: addedCategories[category] });
    }
    setMonthExp(expensesSummary);
  };

  console.log(monthExp);
  const total = monthExp.reduce((acc, exp) => {
    acc += exp.amount;
    return acc;
  }, 0);

  const handleLastMoth = () => {
    if (month >= 1 && month <= 11) {
      setMonth(month - 1);
    } else if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    }
  };

  const handleNextMonth = () => {
    if (month >= 0 && month <= 10) {
      setMonth(month + 1);
    } else if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    }
    handleMonth();
  };

  useEffect(() => {
    handleMonth();
  }, [month]);

  return (
    <div className="history">
      <SideMenu />
      <div className="historyHero">
        <div className="historyTop">
          <h3>Select the duration to view the history of spendings</h3>
          <ul className="historyTop-options">
            <li>
              <button type="submit">Week</button>
            </li>
            <li>
              <button type="submit" onClick={handleMonth}>
                Month
              </button>
            </li>
            <li>
              <button type="submit">6 Months</button>
            </li>
            <li>
              <button type="submit">Year</button>
            </li>
          </ul>
        </div>
        <div className="historyBottom">
          <div className="history-bottom-left">
            <div className="history-bottom-graphs">graphs</div>
            <div className="history-bottom-data">
              {filterType === "month" && (
                <div>
                  <button type="submit" onClick={handleLastMoth}>
                    {"<<"}
                  </button>
                  <h3>
                    {months[month]}
                    <span>{year}</span>
                  </h3>
                  <button type="submit" onClick={handleNextMonth}>
                    {">>"}
                  </button>
                </div>
              )}
              <div>
                {monthExp?.map((exp) => {
                  return (
                    <div className="expData">
                      <p>{exp.category}</p>
                      <p>{exp.amount}</p>
                      <p>{new Date(exp.date).toLocaleString}</p>
                    </div>
                  );
                })}
              </div>
              <div className="expData total">
                Total<p>{total}</p>
              </div>
            </div>
          </div>
          <div className="history-bottom-right">
            <div className="expensesTotal">expenses</div>
            <div className="incomesTotal">income</div>
            <div className="displayReport">high/low</div>
          </div>
        </div>
      </div>

      <Profile />
    </div>
  );
}

export default History;
