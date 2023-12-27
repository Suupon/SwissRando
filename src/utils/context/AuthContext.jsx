import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "../../supabase";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
    const [data, setData] = useState(null);
  
    const checkAuth = async () => {
      try {
        const authenticated = await supabase.auth.getUser();
        setData(authenticated?.data);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
      }
    };
  
    useEffect(() => {
      checkAuth();
    }, []);
  
    return (
      <AuthContext.Provider value={{ data }}>
        {children}
      </AuthContext.Provider>
    );
};
  
export const useAuth = () => useContext(AuthContext);
export { AuthContextProvider };