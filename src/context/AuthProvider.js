import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);


   useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser && storedUser !== "undefined"){
            console.log("storedUser : ",storedUser);
            setUser(JSON.parse(storedUser));
        }
   },[])


    const authInfo = {
        user,
        setUser, 
        // login
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;