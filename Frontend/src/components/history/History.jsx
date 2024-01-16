import React, { useContext, useState, useEffect } from "react";
import Profile from "../profile/Profile";
import SideMenu from "../sideMenu/SideMenu";
import { context } from "../../context/context";
import "./history.css";
import BASE_URL from "../../config/urlConfig";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HistoryBarGraph from "../graph/HistoryBarGraph";

function History() {
  const { state, dispatch } = useContext(context);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("month");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDate()); //! added
  const [calDate, setCalDate] = useState(new Date());
  const [recieptCategory, setRecieptCategory] = useState("");
  const [weekDay, setWeekDay] = useState(new Date());

  const [weekStart, setWeekStart] = useState(
    new Date(
      weekDay.setDate(
        weekDay.getDate() - weekDay.getDay() + (weekDay.getDay() > 0 ? 1 : -6)
      )
    )
  );
  const [weekLast, setWeekLast] = useState(
    new Date(weekDay.setDate(weekStart.getDate() + 6))
  );
  const [isRecieptView, setIsRecieptView] = useState(false);
  const [recieptUrl, setRecieptUrl] = useState("");
  const [recieptDate, setRecieptDate] = useState(null);
  const curr = state.user?.currency?.slice(3);
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

/*   console.log(weekStart);
  console.log(weekLast); */
  /*  console.log(new Date(
    weekStart.setDate(
      weekStart.getDate() - weekStart.getDay() + (weekStart.getDay() === 0 ? 1 : -6)
    )
  )) */

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
    /*     const currentDate = new Date();

    const currentWeekStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() - 6
    );
    console.log(currentWeekStartDate);
    const currentWeekEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    console.log(currentWeekEndDate); */
    const currentWeekExpenses = state.user?.expenses.filter(
      (exp) =>
        new Date(exp.date).getDate() >= new Date(weekStart).getDate() &&
        new Date(exp.date).getDate() <= new Date(weekLast).getDate()
    );
    const summary = summeriseExpenses(currentWeekExpenses);
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
  const selectedDate = (calDate) => {
    setCalDate(calDate);
    handleDay();
  };
  const handleDay = () => {
    setSelectedDuration("day");
    setFilteredExpenses([]);
    getUserById();
    /* console.log(calDate); */
    const currentDayExpenses = state.user?.expenses.filter(
      (exp) =>
        new Date(exp.date).getDate() === new Date(calDate).getDate() &&
        new Date(exp.date).getMonth() === new Date(calDate).getMonth() &&
        new Date(exp.date).getFullYear() === new Date(calDate).getFullYear()
      /*  new Date(exp.date).getDate() === day &&
      new Date(exp.date).getMonth() === month &&
      new Date(exp.date).getFullYear() === year */
    );
    /*  const summary = summeriseExpenses(currentDayExpenses); */
    setFilteredExpenses(currentDayExpenses);
  };
  /* 
  console.log(filteredExpenses); */

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
  };
  const handleNextYear = () => {
    setYear(year + 1);
  };

  const setToStartOfWeek = (date) => {
    return new Date(
      date.setDate(
        date.getDate() - date.getDay() + (date.getDay() > 0 ? 1 : -6)
      )
    );
  };

  const setToEndOfWeek = (date) => {
    return new Date(date.setDate(date.getDate() + 6));
  };

  const handleLastWeek = () => {
    const lastWeekStart = setToStartOfWeek(
      new Date(weekDay.setDate(weekDay.getDate() - 7))
    );
    setWeekStart(lastWeekStart);
    setWeekLast(setToEndOfWeek(new Date(lastWeekStart)));
  };

  const handleNextWeek = () => {
    const nextWeekStart = setToStartOfWeek(
      new Date(weekDay.setDate(weekDay.getDate() + 7))
    );
    setWeekStart(nextWeekStart);
    setWeekLast(setToEndOfWeek(new Date(nextWeekStart)));
  };

  useEffect(() => {
    getUserById();
  }, []);

  const handleReciept = (url, date, category) => {
    setIsRecieptView(true);
    setRecieptUrl(url);
    setRecieptDate(date);
    setRecieptCategory(category);
  };

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
      case "day": //! added
        handleDay();
        break;
      case "year":
        handleYear();
        break;
      default:
        break;
    }
  }, [selectedDuration, month, year, calDate, weekStart, weekLast]);

  const handleCloseImg = () => {
    setIsRecieptView(false);
  };

  const total = filteredExpenses.reduce((acc, exp) => {
    acc += exp.amount;
    return acc;
  }, 0);

  return (
    <div className="history">
      <SideMenu />

      <div className="historyHero">
        {isRecieptView && (
          <div className="reciept-container">
            <button onClick={handleCloseImg} className="closeImage">
              close
            </button>
            <img src={recieptUrl} alt="no-img" className="selectReciept" />
            <div className="reciept-details">
              <p>{new Date(recieptDate).toLocaleDateString()}</p>
              <p>{recieptCategory}</p>
            </div>
          </div>
        )}
        <div className="historyTop">
          <h3>Select the duration to view the history of spendings</h3>
          <ul className="historyTop-options">
            <li>
              <button type="submit" onClick={handleDay}>
                Day
              </button>
            </li>
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
              <button type="submit" onClick={handleYear}>
                Year
              </button>
            </li>
          </ul>
        </div>

        <div className="historyBottom">
          <div className="history-bottom-left">
            <div className="history-bottom-graphs">
              <HistoryBarGraph
                selectedDuration={selectedDuration}
                year={year}
                month={month}
                day={calDate}
                weekStart={weekStart}
                weekLast={weekLast}
                weekDay={weekDay}
              />
            </div>
            <div className="history-bottom-data">
              {selectedDuration === "month" && (
                <div className="history-timeTravel">
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
                <div className="history-timeTravel">
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

              {selectedDuration === "week" && (
                <div className="history-timeTravel">
                  <button type="submit" onClick={handleLastWeek}>
                    {"<<"}
                  </button>
                  <h3>
                    <span>{`${new Date(
                      weekStart
                    ).toLocaleDateString()} - ${new Date(
                      weekLast
                    ).toLocaleDateString()} `}</span>
                  </h3>
                  <button type="submit" onClick={handleNextWeek}>
                    {">>"}
                  </button>
                </div>
              )}

              {selectedDuration === "day" && (
                <div>
                  <Calendar
                    onChange={selectedDate}
                    value={calDate}
                    name="calendar"
                    className="calendar"
                  />
                </div>
              )}

              <div className="expData-container">
                <table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount</th>
                      {selectedDuration === "day" && <th>Reciept</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses?.map((exp) => (
                      <tr
                        className="expData"
                        key={`${exp.category}-${exp.date}`}
                      >
                        <td>
                          {exp?.category.charAt(0).toUpperCase() +
                            exp?.category.slice(1)}
                        </td>
                        <td>
                          {exp?.amount} <span>{curr}</span>
                        </td>
                        {/* <p>{new Date(exp.date).toLocaleDateString()}</p> */}
                        {selectedDuration === "day" && (
                          <td>
                            <img
                              src={
                                exp.reciept.includes("undefined")
                                  ? "images/no-image.jpg"
                                  : `${BASE_URL}/${exp.reciept}`
                              }
                              alt="no-img"
                              style={{
                                width: "40px",
                                height: "40px",
                                border: "1px solid",
                              }}
                              onClick={() =>
                                handleReciept(
                                  exp.reciept.includes("undefined")
                                    ? "images/no-image.jpg"
                                    : `${BASE_URL}/${exp.reciept}`,
                                  exp.date,
                                  exp.category
                                )
                              }
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {selectedDuration !== "day" && (
              <div className="total">
                Total<p>{total}</p>
              </div>
            )}
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
