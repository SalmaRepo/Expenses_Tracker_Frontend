import React, { useContext, useState, useEffect } from "react";
import { context } from "../../../../context/context";
/* import BarDayGraph from "./BarExpDayGraph"; */
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarExpDayGraph from "./BarExpDayGraph";
Chart.register(CategoryScale);


function HistoryExpDayGraph({ day, month, year }) {
  /* console.log(day); */
  const { state, dispatch } = useContext(context);
  const expensesSummary = [];
  let addedCategories = {};

  const dayExpenses = state.user?.expenses?.filter(
    (exp) =>
      new Date(exp.date).getDate() === new Date(day).getDate() &&
      new Date(exp.date).getMonth() === month &&
      new Date(exp.date).getFullYear() === year
  );

  /*  console.log(monthlyExpenses); */

  dayExpenses?.map((exp) => {
    const { amount, category } = exp;
  /*   console.log(amount) */
    if (addedCategories[category]) {
      addedCategories[category] += amount;
    } else {
      addedCategories[category] = amount;
    }
  });

  /* console.log(addedCategories); */

  for (const category in addedCategories) {
    expensesSummary.push({ category, amount: addedCategories[category] });
  }
/*   console.log(expensesSummary); */

  const [chartData, setChartData] = useState({
    labels: expensesSummary?expensesSummary.map((expense) => expense?.category):[],
    datasets: [
      {
        label: "Amount Spent ",
        data: expensesSummary?.map((expense) => expense?.amount),
        backgroundColor: ["#3e47ed", "#e49ec3", "#f3ba2f", "#2a71d0"],
        borderColor: "black",
        borderWidth: 0,
        barThickness: 30,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: expensesSummary?expensesSummary.map((expense) => expense?.category):[],
      datasets: [
        {
          label: "Amount Spent ",
          data: expensesSummary?.map((expense) => expense?.amount),
          backgroundColor: [
            "#2a71d0",
            "#35d02a",
            "#d02aa9",
            "#d0a12a",
            "#d02a3b",
            "#2ad0cb",
            "#97dd73",
          ],
          borderColor: "black",
          borderWidth: 0,
        },
      ],
    });

  /*   console.log(chartData) */
  }, [day , month , year,state.user]);

/* console.log(chartData) */
  return (
    <div>
      {chartData &&<BarExpDayGraph chartData={chartData} day={day}  />}
    </div>
  );
}

export default HistoryExpDayGraph;
