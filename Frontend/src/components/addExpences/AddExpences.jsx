import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useRef,useContext,useEffect } from "react";
import "./addExpences.css";
import SideMenu from "../sideMenu/SideMenu";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import ShowExpenses from "../showExpenses/ShowExpenses";
import Profile from "../profile/Profile";
import axios from "axios"


export default function AddExpences() {
  const {state,dispatch}=useContext(context)
  //console.log(state.expenses)
  //console.log(state.user)

  const [calDate, setCalDate] = useState(new Date());
  const [preview, setPreview] = useState("");
  const expCategory = useRef();
  const expAmount = useRef();
  const expImg=useRef();
  const token=localStorage.getItem("token");
  const [expenses,setExpenses]=useState({})

  const getUserById=()=>{
    if(state.user){
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
    
  
}
  const grabImage = (e) => {
    /* const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); 
    reader.onload = (main) => { */
     /*  console.log(main.target.result); */
     e.stopPropagation();
     const link = e.target.files[0];
  
     setPreview(link)
      /* setPreview(main.target.result); */
    dispatch({type:"setReciept",payload:URL.createObjectURL( e.target.files[0])})
  }

  const isUploadImageSelect=()=>{
    dispatch({type:"setIsUploadImageSelect",payload:!state.isUploadImageSelect})
  }

 const expensesUpdate = (e) => {
  e.stopPropagation();
  e.preventDefault();

    const token=localStorage.getItem("token")
   /*  const data = new FormData(e.target) */
   const data=new FormData()
   console.log(preview)

  data.append('file',preview);
  data.append('amount',expAmount.current.value);
  data.append("category",expCategory.current.value);
  data.append("date",calDate);
  data.append("userId",state.user._id)
   
   //console.log(data)
    setExpenses({
      amount: expAmount.current.value,
      category: expCategory.current.value,
      date: calDate,
      reciept:preview
    }); 

    dispatch({type:"setIsUpdateExpense",payload:true})
    dispatch({type:"setExpensesFormData",payload:expenses})
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
      /* console.log(result) */
      dispatch({type:"setExpenses",payload:result.data.data.expenses})
      dispatch({type:"setUser",payload:result.data.data}) 
    })

    /* console.log(state.user.expenses) */
    expAmount.current.value=0;
    expCategory.current.value="food";
    setPreview("")
    dispatch({type:"setReciept",payload:"images/no-image.jpg"})
    dispatch({type:"setIsUploadImageSelect",payload:false})
  };
  

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
              <div className="expensesAmountContainer">
              <input
                type="number"
                name="amount"
                placeholder="Enter the Amount"
                className="expensesAmount"
                ref={expAmount}
              />
              <p>{state.user?.currency?.slice(3)}s</p>
              </div>
              
              <select name="category" ref={expCategory}>
                <option value="food">Food</option>
                <option value="fuel">Fuel</option>
                <option value="shopping">Shopping</option>
                <option value="entertainment">Entertainment</option>
                <option value="telephone">Tele-Phone</option>
                <option value="pets">Pets</option>
                <option value="kids">Kids</option>
                <option value="insurance">Insurance</option>
                <option value="energy">Energy</option>
                <option value="rent">Rent</option>
                <option value="holidays">Holidays</option>
                <option value="others">Others</option>
              </select>
              <div className="addReciept">
                <h4>Add Reciept</h4>
                <button type="button" onClick={()=>isUploadImageSelect()} className="isUploadButton">+</button>
                {state.isUploadImageSelect&&<input type="file" name="file" onChange={grabImage} ref={expImg} />} 
              </div>
              <button type="submit">Confirm Expenses</button>
            </div>
            <div className="displayExpArea">
              <div className="displayEnteredExp">
           <ShowExpenses expenses={expenses} setExpenses={setExpenses}/>
              </div>
              {state.isUploadImageSelect&&<div className="showReciept">
                <img src={state.reciept} alt="recipet" className="recieptImage" />
              </div>}
            </div>
          </form>
        </div>
        <Profile/>
      </div>
    );
  
}
