import React from 'react'
import { useAppContext } from '../context/AppContext'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Admin from '../admin/Admin';
import { useEffect } from 'react';

function ProtectedRoute({children}) {
    const {admin, checkAdminAuthentication}= useAppContext();
    const navigate = useNavigate()
 
    useEffect(()=>{
        checkAdminAuthentication();
        if(admin === false){    
        navigate('/admin/login');
    }
    },[admin])

    return(
       children
    )
}

export default ProtectedRoute