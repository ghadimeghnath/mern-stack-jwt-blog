import { useContext } from "react";
import { useEffect } from "react";
import  { useState } from "react";
import { createContext} from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const [showComponent, setShowComponent] = useState(false);
    const [active, setActive] = useState('');
    const [user, setUser] = useState(false);
    const [admin, setAdmin]= useState(false);

    // user authentication on first render
    const checkUserAuthStatus = async()=>{
       try {
         const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/is-auth`,{
            method: 'GET',
            credentials: 'include',
        })
        const data = await request.json();
        if (data.success) {
            setUser(true);
        }
       } catch (error) {
        toast.error(error.message);
        setUser(false);
       }

    }
    
    //admin authentication

    const checkAdminAuthentication = async()=>{
        try {
            const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/admin/is-admin`,{
            method: 'GET',
            credentials: 'include'
        })
        const data = await req.json();
        
        if (data.success) {
            setAdmin(true);
            setUser(true);
            return <Navigate to={'/admin'} replace/>
        }
    } catch (error) {
        toast.error(error.message);
        setAdmin(false);
        }
    }

    useEffect(()=>{
        checkUserAuthStatus();
        checkAdminAuthentication();
    },[])

    const value={showComponent, setShowComponent, active, setActive, user, setUser, admin, setAdmin, checkUserAuthStatus, checkAdminAuthentication };

   return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext);
}
