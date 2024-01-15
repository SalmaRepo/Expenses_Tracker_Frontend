import React, { useContext, useEffect } from "react";
import Chart from "chart.js/auto";
import { BarController, CategoryScale } from "chart.js";
import { useState } from "react";
import { context } from "../../context/context";
import { DoughnutChart } from "./DoughnutChart.jsx";
import BASE_URL from "../../config/urlConfig";
Chart.register(CategoryScale);

function ExpensesHomeGraph() {
  const { state, dispatch } = useContext(context);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/expenses/getExpensesByUser`, {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((result) => dispatch({ type: "setExpenses", payload: result.data }))
      .catch((err) => console.log(err));
  }, []);

  console.log(state.user?.expenses);

  //summing up similar categories
  const expensesSummary = [];
  let addedCategories = {};

  const monthlyExpenses = state.user?.expenses?.filter(
    (exp) =>
      new Date(exp.date).getMonth() === new Date().getMonth() &&
      new Date(exp.date).getFullYear() === new Date().getFullYear()
  );

  console.log(monthlyExpenses);

  monthlyExpenses?.map((exp) => {
    const { amount, category } = exp;
    if (addedCategories[category]) {
      addedCategories[category] += amount;
    } else {
      addedCategories[category] = amount;
    }
  });

  console.log(addedCategories);

  for (const category in addedCategories) {
    expensesSummary.push({ category, amount: addedCategories[category] });
  }
  console.log(expensesSummary);

  const [chartData, setChartData] = useState({
    labels: expensesSummary?.map(
      (expense) =>
        expense?.category?.charAt(0).toUpperCase() + expense?.category.slice(1)
    ),
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

  console.log(chartData);
  return (
    <div>
      <DoughnutChart chartData={chartData} />
    </div>
  );
}

export default ExpensesHomeGraph;
