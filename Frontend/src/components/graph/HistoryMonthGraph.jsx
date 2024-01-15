import React, { useContext, useEffect, useState } from "react";
import { context } from "../../context/context";
import BarMonthChart from "./BarMonthGraph";

function HistoryMonthGraph({ month, year }) {
  const { state, dispatch } = useContext(context);
  const expensesSummary = [];
  let addedCategories = {};

  const monthlyExpenses = state.user?.expenses?.filter(
    (exp) =>
      new Date(exp.date).getMonth() === month &&
      new Date(exp.date).getFullYear() === year
  );

 /*  console.log(monthlyExpenses); */

  monthlyExpenses?.map((exp) => {
    const { amount, category } = exp;
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
  /* console.log(expensesSummary); */

  const [chartData, setChartData] = useState({
    labels: expensesSummary?.map(
      (expense) =>
        expense?.category?.charAt(0).toUpperCase() + expense?.category.slice(1)
    ),
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
      labels: expensesSummary?.map((expense) => expense?.category),
      datasets: [
        {
          label: "Amount Spent ",
          data: expensesSummary?.map((expense) => expense?.amount),
          backgroundColor: [
            "#e5d193",
            "#f5ea50",
            "#b9e49e",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 0,
        },
      ],
    });
  }, [year, month]);
  return (
    <div>
      <BarMonthChart chartData={chartData} month={month} year={year} />
    </div>
  );
}

export default HistoryMonthGraph;
