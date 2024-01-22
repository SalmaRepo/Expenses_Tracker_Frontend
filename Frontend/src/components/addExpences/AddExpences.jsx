import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useRef, useContext } from "react";
import "./addExpences.css";
import SideMenu from "../sideMenu/SideMenu";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import ShowExpenses from "../showExpenses/ShowExpenses";
import Profile from "../profile/Profile";
import axios from "axios";


export default function AddExpences() {
  // State variables for managing calendar date, image preview, and expenses data
  const { state, dispatch } = useContext(context);
  const [calDate, setCalDate] = useState(new Date());
  const [preview, setPreview] = useState("");
  const [expenses, setExpenses] = useState({});

  // Refs for input fields and image file
  const expCategory = useRef();
  const expAmount = useRef();
  const expImg = useRef();

  // Retrieve token from local storage
  const token = localStorage.getItem("token");

  // Event handler to capture and preview selected image
  const grabImage = (e) => {
    e.stopPropagation();
    const link = e.target.files[0];
    setPreview(link);
    dispatch({
      type: "setReciept",
      payload: URL.createObjectURL(e.target.files[0]),
    });
  };

  // Toggle the state of image upload selection
  const isUploadImageSelect = () => {
    dispatch({
      type: "setIsUploadImageSelect",
      payload: !state.isUploadImageSelect,
    });
  };

  // Event handler for submitting expense data
  const expensesUpdate = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Create a FormData object for sending data as multipart/form-data
    const data = new FormData();
    data.append("file", preview);
    data.append("amount", expAmount.current.value);
    data.append("category", expCategory.current.value);
    data.append("date", calDate);
    data.append("userId", state.user._id);

    // Set expenses data for preview and dispatch to context
    setExpenses({
      amount: expAmount.current.value,
      category: expCategory.current.value,
      date: calDate,
      reciept: preview,
    });
    dispatch({ type: "setIsUpdateExpense", payload: true });
    dispatch({ type: "setExpensesFormData", payload: expenses });

    // POST request to the server to create an expense
    axios
      .post(`${BASE_URL}/api/expenses/createExpense`, data, {
        headers: { token: token, "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        // Update context with new expenses and user data
        dispatch({ type: "setExpenses", payload: result.data.data.expenses });
        dispatch({ type: "setUser", payload: result.data.data });
      });

    // Reset input values and states after submitting expenses
    expAmount.current.value = 0;
    expCategory.current.value = "food";
    setPreview("");
    dispatch({ type: "setReciept", payload: "images/no-image.jpg" });
    dispatch({ type: "setIsUploadImageSelect", payload: false });
  };

  // Event handler for changing calendar date
  function onChange(calDate) {
    setCalDate(calDate);
  }

  return (
    <div className="addExpenses">
      <SideMenu />

      <div className="addExpensesHero">
        {/* Expense form */}
        <form
          action="expForm"
          className="expForm"
          onSubmit={expensesUpdate}
          method="post"
        >
          <Calendar
            onChange={onChange}
            value={calDate}
            name="calendar"
            className="calendar"
          />
          {/* Entering expenses data */}
          <section className="expensesEnterSection">
            <div className="expensesAmountContainer">
              <input
                type="number"
                step="any"
                name="amount"
                placeholder="Enter the Amount"
                className="expensesAmount"
                ref={expAmount}
              />
              <p>{state.user?.currency?.slice(3)}</p>
            </div>

            {/* Dropdown for selecting expense category */}
            <select name="category" ref={expCategory}>
              <option value="food" className="expOption">Food</option>
              <option value="fuel" className="expOption">Fuel</option>
              <option value="shopping" className="expOption">Shopping</option>
              <option value="entertainment" className="expOption">Entertainment</option>
              <option value="telephone" className="expOption">Tele-Phone</option>
              <option value="pets" className="expOption">Pets</option>
              <option value="kids" className="expOption">Kids</option>
              <option value="insurance" className="expOption">Insurance</option>
              <option value="energy" className="expOption">Energy</option>
              <option value="rent" className="expOption">Rent</option>
              <option value="holidays" className="expOption">Holidays</option>
              <option value="others" className="expOption">Others</option>
            </select>

            {/* Adding receipt image */}
            <div className="addReciept">
              <h4>Add Reciept</h4>
              <button
                type="button"
                onClick={() => isUploadImageSelect()}
                className="isUploadButton"
              >
                +
              </button>

              {/* Render file input if image upload is selected */}
              {state.isUploadImageSelect && (
                <input
                  type="file"
                  name="file"
                  onChange={grabImage}
                  ref={expImg}
                />
              )}
            </div>

            <button type="submit">Confirm Expenses</button>
          </section>

          {/* Displaying entered expenses and receipt image */}
          <section className="displayExpArea">
            <div className="displayEnteredExp">
              <ShowExpenses expenses={expenses} setExpenses={setExpenses} />
            </div>
            {state.isUploadImageSelect && (
              <div className="showReciept">
                <img
                  src={state.reciept}
                  alt="recipet"
                  className="recieptImage"
                />
              </div>
            )}
          </section>
        </form>
      </div>
      <Profile />
    </div>
  );
}
