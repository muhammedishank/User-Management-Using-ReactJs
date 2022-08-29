import { createContext, useState } from "react";
export const AuthContext = createContext(null)

export default function Context ({children}) {
    const [userDetails,setUserDetails] = useState()
    
    return(
        <AuthContext.Provider value={{userDetails,setUserDetails}}>
            {children}
        </AuthContext.Provider>
    )
 }