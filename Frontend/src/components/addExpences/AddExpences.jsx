import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useRef } from "react";
import "./addExpences.css";
import SideMenu from "../sideMenu/SideMenu";


export default function AddExpences() {
  const [calDate, setCalDate] = useState(new Date());
  const [preview, setPreview] = useState("");
  const expCategory = useRef();
  const expAmount = useRef();

  const grabImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); 
    reader.onload = (main) => {
      console.log(main.target.result);
      setPreview(main.target.result);
    };
  }
  
 /*  const expenses = {
    amount: parseFloat(expAmount.current.value),
    category: expCategory.current.value,
    date: calDate,
    reciept:preview
  };
   */

  const expensesUpdate = (e) => {
    e.preventDefault();

    

  };
  const uploadFile=()=>{
    
  }

    function onChange(calDate) {
      // change results based on calendar date click
      setCalDate(calDate);
    }

    console.log(calDate);

    return (
      <div className="addExpenses">
        <SideMenu />
        <div className="addExpensesHero">
          <form
            action="expForm"
            className="expForm"
            onSubmit={expensesUpdate}
          >
            <Calendar
              onChange={onChange}
              value={calDate}
              className="calendar"
            />
            <div className="expensesEnterSection">
              <input
                type="number"
                placeholder="Enter the Amount"
                className="expensesAmount"
                ref={expAmount}
              />
              <select name="category" ref={expCategory}>
                <option value="food">Food</option>
                <option value="fuel">Fuel</option>
                <option value="shopping">Shopping</option>
                <option value="telephone">Tele-Phone</option>
                <option value="pets">Pets</option>
                <option value="kids">Kids</option>
                <option value="Insurance">Insurance</option>
                <option value="energy">Energy</option>
                <option value="rent">Rent</option>
                <option value="holidays">Holidays</option>
                <option value="other">Others</option>
              </select>
              <div className="addReciept">
                <h4>Add Reciept</h4>
                <form action="reciept" onSubmit={uploadFile}>
                <input type="file" onChange={grabImage} />
                <button>Upload</button>
                </form>
                
              </div>
              <button type="submit">Confirm Expenses</button>
            </div>
            <div className="displayExpArea">
              <div className="displayEnteredExp"></div>
              <div className="showReciept">
                <img src={preview} alt="recipet" className="recieptImage" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  
}
