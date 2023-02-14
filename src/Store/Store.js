import { createContext, useEffect, useReducer, useState } from "react";
import useFetch from "../Hooks/useFetch";
import { ToggleReducer } from "./Reducers/InfoReducers";
import { toggleObject } from "./Reducers/InfoReducers";

export const AuthContext = createContext(null);
export const StateContext = createContext(null);
export const DispatchContext = createContext(null);

export function InfoProvider ({children}) {
  const { fetchInfo, setFetchInfo, error } = useFetch(
    "https://randomuser.me/api/?results=55"
  );
  const [toggleInfo, dispatch] = useReducer(ToggleReducer, toggleObject);

  return (
    <StateContext.Provider value={{fetchInfo, setFetchInfo, error, toggleInfo}}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
export function AuthProvider ({children}) {
  const [isLoginCorrect, setIsLoginCorrect] = useState(false);
  useEffect(() => {
    const isLoginCorrect = localStorage.getItem('isLoginCorrect');
    if (isLoginCorrect === 'true') {
      setIsLoginCorrect(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{isLoginCorrect, setIsLoginCorrect}}>
        {children}
    </AuthContext.Provider>
  )
}
