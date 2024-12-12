import React, { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { decodeToken } from "../utils/decodeToken";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();



const AuthProvider = ({ children }) => {
 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {

    if(!user || user === null){
      const token = Cookies.get('token'); 
      console.log(token);
      if (token) {
        const user = decodeToken(token);
        console.log(user);
        setUser(user); 
      }

    }
   
  }, [user]);

  const logOut = () =>{
    console.log("clicked");
    Cookies.remove('token');
    setUser(null);
    setError("");
    setLoading(false);
    
    
  }




  const authInfo = {
    user,
    setUser,
    setLoading,
    loading,
    error,
    setError,
    logOut
   
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
