import React, { useContext, useState, useEffect } from "react";
import Profile from "../profile/Profile";
import SideMenu from "../sideMenu/SideMenu";
import { context } from "../../context/context";
import "./history.css";
import BASE_URL from "../../config/urlConfig";

function History() {
  const { state, dispatch } = useContext(context);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDate()); //! added
  const [weekStart, setWeekStart] = useState(new Date().getDate() - new Date().getDay() - 6)
  const [weekLast, setWeekLast]= useState(new Date().getDate() - new Date().getDay() )

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // GET USER BY ID
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

  // EXPENSES SUMMARY
  const summeriseExpenses = (filterExpenses) => {
    const expensesSummary = [];
    let addedCategories = {};
    filterExpenses?.map((exp) => {
      const { category, amount, date } = exp;
      if (
        addedCategories[category]
        //new Date(addedCategories[date]).getMonth() === month
      ) {
        addedCategories[category] += amount;
      } else {
        addedCategories[category] = amount;
      }
    });
    for (const category in addedCategories) {
      expensesSummary.push({ category, amount: addedCategories[category] });
    }
    return expensesSummary;
  };

  // HANDLE LAST WEEK
  const handleWeek = () => {
    setSelectedDuration("week");
    getUserById();
    const currentDate = new Date();
    const lastWeekStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() - 6
    );
    const lastWeekEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const lastWeekExpenses = state.user?.expenses.filter(
      (exp) =>
        new Date(exp.date) >= lastWeekStartDate &&
        new Date(exp.date) <= lastWeekEndDate
    );
    const summary = summeriseExpenses(lastWeekExpenses);
    setFilteredExpenses(summary);
  };

  // HANDLE MONTH
  const handleMonth = () => {
    setSelectedDuration("month");
    setFilteredExpenses([]); 
    getUserById();
    const currentMonthExpenses = state.user?.expenses.filter(
      (exp) =>
        new Date(exp.date).getMonth() === month &&
        new Date(exp.date).getFullYear() === year
    );
    const summary = summeriseExpenses(currentMonthExpenses);
    setFilteredExpenses(summary);
  };

  // HANDLE YEAR
  const handleYear = () => {
    setSelectedDuration("year");
    setFilteredExpenses([]);
    getUserById();
    const yearlyExpenses = state.user?.expenses.filter(
      (exp) => new Date(exp.date).getFullYear() === year
    );
    const summary = summeriseExpenses(yearlyExpenses);
    setFilteredExpenses(summary);
  };


// HANDLE DAY  //! added
const handleDay = () => {
  setSelectedDuration("day");
  setFilteredExpenses([]);
  getUserById();
  const currentDayExpenses = state.user?.expenses.filter(
    (exp) =>
      new Date(exp.date).getDate() === day &&
      new Date(exp.date).getMonth() === month &&
      new Date(exp.date).getFullYear() === year
  );
  const summary = summeriseExpenses(currentDayExpenses);
  setFilteredExpenses(summary);
};

  // // HANDLE 6 MONTHS
  // const handleSixMonths = () => {
  //   setSelectedDuration("6 months");
  //   getUserById();
  //   const currentDate = new Date();
  //   const lastSixMonthsStartDate = new Date(
  //     currentDate.getFullYear(),
  //     currentDate.getMonth() - 5,
  //     1
  //   );
  //   const lastSixMonthsEndDate = new Date(
  //     currentDate.getFullYear(),
  //     currentDate.getMonth() + 1,
  //     0
  //   );
  //   const lastSixMonthsExpenses = state.user?.expenses.filter(
  //     (exp) =>
  //       new Date(exp.date) >= lastSixMonthsStartDate &&
  //       new Date(exp.date) <= lastSixMonthsEndDate
  //   );
  //   const summary = summeriseExpenses(lastSixMonthsExpenses);
  //   setFilteredExpenses(summary);
  // };


  // HANDLE LAST AND NEXT MONTH
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



  // HANDLE LAST AND NEXT YEAR
  const handleLastYear = () => {
   setYear(year - 1); 
  }
  const handleNextYear = () => { 
      setYear(year + 1);
  }

  
  useEffect(() => {
    getUserById();
  }, []);



  // CASE
  useEffect(() => {
    switch (selectedDuration) {
      case "week":
        handleWeek();
        break;
      case "month":
        handleMonth();
        break;
      // case "6 months":
      //   break;
      case "day":  //! added
        handleDay();
        break; 
      case "year":
        handleYear();
        break;
      default:
        break;
    }
  }, [selectedDuration, month, year]);

  const total = filteredExpenses.reduce((acc, exp) => {
    acc += exp.amount;
    return acc;
  }, 0);

  return (
    <div className="history">
      <SideMenu />

      <div className="historyHero">
        <div className="historyTop">
          <h3>Select the duration to view the history of spendings</h3>
          <ul className="historyTop-options">
            <li>
              <button type="submit" onClick={handleWeek}>
                Week
              </button>
            </li>
            <li>
              <button type="submit" onClick={handleMonth}>
                Month
              </button>
            </li>
            {/* <li>
              <button type="submit" onClick={handleSixMonths}>
                6 Months
              </button>
            </li> */}
            <li>
              <button type="submit" onClick={handleDay}>
               Day
              </button>
            </li>
            <li>
              <button type="submit" onClick={handleYear}>
                Year
              </button>
            </li>
          </ul>
        </div>

        <div className="historyBottom">
          <div className="history-bottom-left">
            <div className="history-bottom-graphs">graphs</div>
            <div className="history-bottom-data">
              {selectedDuration === "month" && (
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

              {selectedDuration === "year" && (
                <div>
                  <button type="submit" onClick={handleLastYear}>
                    {"<<"}
                  </button>
                  <h3>
                    <span>{year}</span>
                  </h3>
                  <button type="submit" onClick={handleNextYear}>
                    {">>"}
                  </button>
                </div>
              )}

              <div>
                {filteredExpenses?.map((exp) => (
                  <div className="expData" key={`${exp.category}-${exp.date}`}>
                    <p>{exp.category}</p>
                    <p>{exp.amount}</p>
                    {/* <p>{new Date(exp.date).toLocaleDateString()}</p> */}
                  </div>
                ))}
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
