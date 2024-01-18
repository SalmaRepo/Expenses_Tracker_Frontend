import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import "./selectCurrency.css";

function SelectCurrency() {
  const { state, dispatch } = useContext(context);
  const currenySearch = useRef();
  const navigate = useNavigate();
  const selectedCurr = useRef();
  const [all, setAll] = useState(null);
  const [filter, setFilter] = useState(null);
  const [curr, setCurr] = useState(null);

  let res = all && [...Object.entries(all)];
  all && console.log(Object.entries(all));

  // Fetching all currencies and handling search input
  const handleSearch = (e) => {
    fetch("https://openexchangerates.org/api/currencies.json")
      .then((res) => res.json())
      .then((result) => setAll(result))
      .catch((err) => console.log(err));

    let searchValue = currenySearch.current.value;
    setFilter(
      res?.filter((val) => {
        return val[1].includes(
          searchValue[0]?.toUpperCase() + searchValue?.slice(1)
        );
      })
    );
  };

  // Handling selection of a currency
  const handleSelectedCurr = (value) => {
    setCurr(value);
    currenySearch.current.value = value;
    setFilter(null);
  };

  // Handling form submission
  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const user = { ...state.user, currency: curr };

    if (curr) {
      // Updating user's currency on the server
      fetch(`${BASE_URL}/api/users/updateCurrencyById/${state.user?._id}`, {
        method: "PATCH",
        headers: { token: token, "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((result) => {
          dispatch({ type: "setUser", payload: result.data });
          if (result.success) {
            navigate("/home");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="selectCurr">
      <div className="curr-Left">
        {/* Input for currency search */}
        <label htmlFor="dropdown">Currency:</label>
        <input
          type="search"
          className="currencySearch"
          name="search"
          ref={currenySearch}
          onInput={handleSearch}
        />
        {/* Displaying filtered currencies */}
        {filter && (
          <div className="alllistCurrencies">
            {filter?.map((re) => {
              return (
                <div className="singleCurrList">
                  <button
                    type="button"
                    ref={selectedCurr}
                    onClick={() => handleSelectedCurr(re[0] + " " + re[1])}
                  >
                    {re[0] + " " + re[1]}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {/* Button for submitting the selected currency */}
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div>
        <h1>Expenses Tracker</h1>
      </div>
    </div>
  );
}

export default SelectCurrency;
