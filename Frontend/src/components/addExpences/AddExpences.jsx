import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useRef,useContext,useEffect } from "react";
import "./addExpences.css";
import SideMenu from "../sideMenu/SideMenu";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import axios from "axios"
import ShowExpenses from "../showExpenses/ShowExpenses";




export default function AddExpences() {
  const {state,dispatch}=useContext(context)
  console.log(state.expenses)
  console.log(state.user)

  const [calDate, setCalDate] = useState(new Date());
  const [preview, setPreview] = useState("");
  const expCategory = useRef();
  const expAmount = useRef();
  const expImg=useRef();
  const token=localStorage.getItem("token")

  
  const grabImage = (e) => {
    /* const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); 
    reader.onload = (main) => { */
     /*  console.log(main.target.result); */
     const link = e.target.files[0];
     setPreview(link)
      /* setPreview(main.target.result); */
    dispatch({type:"setReciept",payload:URL.createObjectURL( e.target.files[0])})
  }

 const expensesUpdate = (e) => {
  e.preventDefault();
    const token=localStorage.getItem("token")
   /*  const data = new FormData(e.target) */
   const data=new FormData()
   console.log(preview)
   data.append('file',preview);
   data.append('amount',parseFloat(expAmount.current.value));
   data.append("category",expCategory.current.value);
   data.append("date",calDate);
   data.append("userId",state.user._id)
   
   console.log(data)
    /* const expenses = {
      amount: parseFloat(expAmount.current.value),
      category: expCategory.current.value,
      date: calDate,
      reciept:data
    }; */

    dispatch({type:"setUpdateExpense",payload:true})
    /* fetch(`${BASE_URL}/api/expenses/createExpense`,{
      method:"POST",
      headers:{"token":token,"Content-Type": "multipart/form-data"},
      body:data
    })
    .then((res)=>{
      console.log(res.json())
      return res.json()}
      )
    .then((result)=>{
      console.log(result)
    }).catch((err)=>console.log(err)) */

    axios.post(`${BASE_URL}/api/expenses/createExpense`,data,
    {headers:{"token":token,"Content-Type": "multipart/form-data"}})
    .then(result=>{
      console.log(result)
      dispatch({type:"setExpenses",payload:result.data.data.expenses})
      dispatch({type:"setUser",payload:result.data.data})
    })

    expAmount.current.value="";
    expCategory.current.value="";
    setPreview("")
    dispatch({type:"setReciept",payload:""})
  };
  
console.log(state.expenses)
    function onChange(calDate) {
      // change results based on calendar date click
      setCalDate(calDate);
    }

    return (
      <div className="addExpenses">
        <SideMenu />
        <div className="addExpensesHero">
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
            <div className="expensesEnterSection">
              <input
                type="number"
                name="amount"
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
           
                <input type="file" name="file" onChange={grabImage} ref={expImg} />  
              </div>
              <button type="submit">Confirm Expenses</button>
            </div>
            <div className="displayExpArea">
              <div className="displayEnteredExp">
           <ShowExpenses/>
              </div>
              <div className="showReciept">
                <img src={state.reciept} alt="recipet" className="recieptImage" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  
}
