import React from "react";
import "./help.css";

function Help() {
  return (
    <div className="Help"> 
      <div className="HelpHero">
     
        <h1>FAQs</h1>
        <p>
          <h3> Q1 How to check my previous entries? </h3>
          If you wish to review your previous entries, expenses or incomes, go
          to the history tab, there you can check your daily, weekly, monthly
          and annual
          <h3> Q2 how do I change my user details? </h3>
          If you wish to change your user details, you can do that by going to
          the settings tab, and click on Update Profile Details.
          <h3>Q3 How to change currency of my income or expenses?</h3>
          If you wish to change currencies on income or expenses, you can go
          Settings and click on the change currency tab.
          <h3> Q4 How to add receipts? </h3>
          If you wish to add receipts to your expenses, go to the "Add expenses"
          Tab, after you enter the category, with the "Add Reciept" you can
          upload your receipt as an image.
        </p>
      </div>
    </div>
  );
}

export default Help;
