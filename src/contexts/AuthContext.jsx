import { createContext, useState } from "react";

export const authContext= createContext()

export default function AuthContextProvider({children}){

    const [userToken , setUserToken]= useState(localStorage.getItem("token"))
    
    return <authContext.Provider value={{userToken , setUserToken}}>
        {children}
    </authContext.Provider>
}