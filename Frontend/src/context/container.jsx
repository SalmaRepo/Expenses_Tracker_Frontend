import { useReducer,useEffect, useState } from "react"
import { context } from "./context"
import { initialState,reducer } from "./reducer"
import BASE_URL from "../config/urlConfig"


export default function Container({children}){
    const [state,dispatch]=useReducer(reducer,initialState)
    const [darkMode, setDarkMode]= useState(false)


    useEffect(() => {
        //on load
        const token = localStorage.getItem("token")
    
        if (token) {
          fetch(`${BASE_URL}/api/users/verifytoken`, {
            method: "GET",
            headers: { token: token },
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.success) {
                /* setUser(result.data); */
                dispatch({type:"setUser", payload:result.data})
              } else {
                console.log(result.message);
              }
            });
          } 
          
      }, [])

    return(
        <context.Provider value={{state,dispatch, darkMode, setDarkMode}}>
        {children}
        </context.Provider>

    )
}
