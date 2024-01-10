import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import "./selectCurrency.css";

function SelectCurrency() {
const {state,dispatch}=useContext(context)
console.log(state.user)
  const currenySearch = useRef();
  const navigate=useNavigate();
  const selectedCurr=useRef()
  const [all, setAll] = useState(null);
/*   const [searchValue, setSearchValue] = useState(""); */
  const [filter,setFilter]=useState(null);
  const [curr,setCurr]=useState(null)


 /*  useEffect(() => {
    fetch("https://openexchangerates.org/api/currencies.json")
      .then((res) => res.json())
      .then((result) => setAll(result))
      .catch((err) => console.log(err));
  }, []); */

  let res = all && [...Object.entries(all)];
  all && console.log(Object.entries(all));
  console.log(res);
  const handleSearch = (e) => {
    fetch("https://openexchangerates.org/api/currencies.json")
      .then((res) => res.json())
      .then((result) => setAll(result))
      .catch((err) => console.log(err));
    console.log(currenySearch.current.value);
    /* setSearchValue(currenySearch.current.value); */
    let searchValue=currenySearch.current.value
    setFilter(res?.filter((val) => {
    
        return val[1].includes(searchValue[0]?.toUpperCase() + searchValue?.slice(1));
      }))
    
  };

  console.log(filter)

  const handleSelectedCurr=(value)=>{
     setCurr(value)
     currenySearch.current.value=  value
     setFilter(null)
     
  }

  console.log(curr)
  console.log(typeof(curr))

  const handleSubmit=()=>{
    const token=localStorage.getItem("token")
    console.log(curr)
    const user={...state.user,
        currency:curr
     }
    console.log(user) 
    if(curr){
            
            fetch(`${BASE_URL}/api/users/updateCurrencyById/${state.user?._id}`,{
                method:"PATCH",
                headers:{token:token,"Content-Type": "application/json" },
                body:JSON.stringify(user)
            }).then(res=>res.json())
            .then(result=>{
                dispatch({type:"setUser",payload:result.data})
                if(result.success){
                    navigate("/home")
                }
            })
            .catch((err) => console.log(err))
       
     
   
    }
  }

  console.log(state.user)

 

  return (
    <div className="selectCurr">
      <div className="curr-Left">
       
          <label htmlFor="dropdown">Currency:</label>
          {/* <select id="dropdown" name="dropdown" ref={currenySelector}>
              <option value="Euros">Euros</option>
              <option value="Dollars">Dollars</option>
              <option value="Pesos">Pesos</option>
              <option value="Yuan">Yuan</option>
              <option value="Other">Other</option>
            </select> */}
          <input
            type="search"
            className="currencySearch"
            name="search"
            ref={currenySearch}
            onInput={handleSearch}
          />
          {filter&&<div className="alllistCurrencies">
            {filter?.map((re) => {
              return (
                <div className="singleCurrList">
                  <button type="button" ref={selectedCurr} onClick={()=>handleSelectedCurr(re[0]+" "+re[1])} >{re[0]+" "+re[1]}</button>
                </div>
              );
            })}
          </div>}

          <button type="submit" onClick={handleSubmit}>Submit</button>
       
      </div>
      <div>
        <h1>Expenses Tracker</h1>
      </div>
    </div>
  );
}

export default SelectCurrency;
