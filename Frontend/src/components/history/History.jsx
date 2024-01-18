import React, { useContext, useState, useEffect, useRef } from "react";
import Profile from "../profile/Profile";
import SideMenu from "../sideMenu/SideMenu";
import { context } from "../../context/context";
import "./history.css";
import BASE_URL from "../../config/urlConfig";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HistoryBarExpGraph from "../graph/ExpensesGraphs/ExpensesMainGraph/HistoryExpMainGraph";
import HistoryExpMainGraph from "../graph/ExpensesGraphs/ExpensesMainGraph/HistoryExpMainGraph";
import IncomeMainGraph from "../graph/IncomesGraphs/IncomeMainGraph/IncomeMainGraph";
import {
  months,
  setToEndOfWeek,
  setToStartOfWeek,
  summariseExpenses,
  summariseIncomes,
} from "./HistoryHelpers";
function History() {
  const { state, dispatch } = useContext(context);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]); //! added
  const [selectedDuration, setSelectedDuration] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDate());
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
  const getUserById = async () => {
    try {
      const token = localStorage.getItem("token");
      if (state.user) {
        const response = await fetch(
          `${BASE_URL}/api/users/getUserById/${state.user?._id}`,
          {
            method: "GET",
            headers: {
              token: token,
            },
          }
        );
        const result = await response.json();
        console.log(result);
        dispatch({ type: "setUser", payload: result.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const duration = localStorage.getItem("selectedDuration") || "month";
    setSelectedDuration(duration);
    getUserById();
    const day = localStorage.getItem("historyDate") || calDate;
    setCalDate(day);
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
      case "day":
        handleDay();
        break;
      case "year":
        handleYear();
        break;
      default:
        break;
    }
  }, [selectedDuration, month, year, calDate, weekStart, weekLast, state.user]);
  // HANDLE LAST WEEK
  const handleWeek = () => {
    setSelectedDuration("week");
    localStorage.setItem("selectedDuration", "week");
    const currentWeekExpenses = state.user?.expenses.filter(
      (exp) =>
        new Date(exp.date).getDate() >= new Date(weekStart).getDate() &&
        new Date(exp.date).getDate() <= new Date(weekLast).getDate()
    );
    const currentWeekIncomes = state.user?.incomes.filter(
      (inc) =>
        new Date(inc.date).getDate() >= new Date(weekStart).getDate() &&
        new Date(inc.date).getDate() <= new Date(weekLast).getDate()
    );
    const expensesSummary = summariseExpenses(currentWeekExpenses);
    setFilteredExpenses(expensesSummary);
    const incomesSummary = summariseIncomes(currentWeekIncomes);
    setFilteredIncomes(incomesSummary);
  };
  // HANDLE MONTH
  const handleMonth = () => {
    setSelectedDuration("month");
    localStorage.setItem("selectedDuration", "month");
    const currentMonthExpenses = state.user?.expenses.filter(
      (exp) =>
        new Date(exp.date).getMonth() === month &&
        new Date(exp.date).getFullYear() === year
    );
    const currentMonthIncomes = state.user?.incomes.filter(
      (inc) =>
        new Date(inc.date).getMonth() === month &&
        new Date(inc.date).getFullYear() === year
    );
    const expensesSummary = summariseExpenses(currentMonthExpenses);
    const incomesSummary = summariseIncomes(currentMonthIncomes);
    setFilteredExpenses(expensesSummary);
    setFilteredIncomes(incomesSummary);
  };
  // HANDLE YEAR
  const handleYear = () => {
    setSelectedDuration("year");
    localStorage.setItem("selectedDuration", "year");
    /*  setFilteredExpenses([]);
    setFilteredIncomes([]); */
    const yearlyExpenses = state.user?.expenses.filter(
      (exp) => new Date(exp.date).getFullYear() === year
    );
    const yearlyIncomes = state.user?.incomes.filter(
      (inc) => new Date(inc.date).getFullYear() === year
    );
    const expensesSummary = summariseExpenses(yearlyExpenses);
    const incomesSummary = summariseIncomes(yearlyIncomes);
    setFilteredExpenses(expensesSummary);
    setFilteredIncomes(incomesSummary);
  };
  // SELECTED DATE
  const selectedDate = (calDate) => {
    setCalDate(calDate);
    handleDay();
    localStorage.setItem("historyDate", calDate);
  };
  // HANDLE DAY
  const handleDay = () => {
    setSelectedDuration("day");
    localStorage.setItem("selectedDuration", "day");
    const currentDayExpenses = state.user?.expenses.filter(
      (exp) =>
        new Date(exp.date).getDate() === new Date(calDate).getDate() &&
        new Date(exp.date).getMonth() === new Date(calDate).getMonth() &&
        new Date(exp.date).getFullYear() === new Date(calDate).getFullYear()
    );
    const currentDayIncomes = state.user?.incomes.filter(
      //!
      (inc) =>
        new Date(inc.date).getDate() === new Date(calDate).getDate() &&
        new Date(inc.date).getMonth() === new Date(calDate).getMonth() &&
        new Date(inc.date).getFullYear() === new Date(calDate).getFullYear()
    );
    setFilteredExpenses(currentDayExpenses);
    setFilteredIncomes(currentDayIncomes); //!
  };
  // HANDLE LAST MONTH
  const handleLastMoth = () => {
    if (month >= 1 && month <= 11) {
      setMonth(month - 1);
    } else if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    }
    /*  localStorage.setItem("historyMonth", month);
    localStorage.setItem("historyYear", year); */
  };
  // HANDLE NEXT MONTH
  const handleNextMonth = () => {
    if (month >= 0 && month <= 10) {
      setMonth(month + 1);
    } else if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    }
  };
  // HANDLE LAST YEAR
  const handleLastYear = () => {
    setYear(year - 1);
  };
  // HANDLE NEXT YEAR
  const handleNextYear = () => {
    setYear(year + 1);
    localStorage.setItem("historyYear", year);
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
  // HANDLE RECIEPT
  const handleReciept = (url, date, category) => {
    setIsRecieptView(true);
    setRecieptUrl(url);
    setRecieptDate(date);
    setRecieptCategory(category);
  };
  const handleCloseImg = () => {
    setIsRecieptView(false);
  };
  // Total expenses
  const totalExpenses = filteredExpenses?.reduce((acc, exp) => {
    acc += exp.amount;
    return acc;
  }, 0);
  // Total incomes
  const totalIncomes = filteredIncomes?.reduce((acc, inc) => {
    acc += inc.amount;
    return acc;
  }, 0);
  // Total balance
  const totalBalance = totalIncomes - totalExpenses;

  return (
    <div className="history">
      <SideMenu />
      {/* HERO  */}
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
            <li>
              <button type="submit" onClick={handleYear}>
                Year
              </button>
            </li>
          </ul>
        </div>
        <div className="historyBottom">
          <div className="history-bottom-top">
            <div className="history-bottom-expenses-graphs">
              <h4 className="history-graph-title">Expenses</h4>
              <HistoryExpMainGraph
                selectedDuration={selectedDuration}
                year={year}
                month={month}
                day={calDate}
                weekStart={weekStart}
                weekLast={weekLast}
                weekDay={weekDay}
              />
            </div>
            <div className="history-bottom-incomes-graphs">
              <h4 className="history-graph-title">Incomes</h4>
              <IncomeMainGraph
                selectedDuration={selectedDuration}
                year={year}
                month={month}
                day={calDate}
                weekStart={weekStart}
                weekLast={weekLast}
                weekDay={weekDay}
              />
            </div>
          </div>
          <div className="history-bottom-left">
            {/* SELECT MONTH YEAR DAY */}
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
              {/* SHOW EXPENSES */}
              <div className="data-container">
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
                  <table className="exp-table">
                    <caption>Expenses</caption>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>{`Amount in ${curr}`}</th>
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
                          <td>{exp?.amount}</td>
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
                <div className="incData-container">
                  <table>
                    <caption>Incomes</caption>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>{`Amount in ${curr}`}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIncomes?.map((inc) => (
                        <tr
                          className="incData"
                          key={`${inc.category}-${inc.date}`}
                        >
                          <td>
                            {inc?.category.charAt(0).toUpperCase() +
                              inc?.category.slice(1)}
                          </td>
                          <td>{inc?.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* SHOW INCOMES */} 
          </div>
          <div className="history-bottom-right">
            <div className="expensesTotal">
              Expenses of the selected date: {totalExpenses}
            </div>
            <div className="incomesTotal">
              Income of the selected date: {totalIncomes}
            </div>
            <div className="displayReport">
              Balance of the selected date:{totalBalance}
            </div>
          </div>
        </div>
        {/* side right */} {/* !! added total  !! */}
      </div>
      <Profile />
    </div>
  );
}
export default History;
  