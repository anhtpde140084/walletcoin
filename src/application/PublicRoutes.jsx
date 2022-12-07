import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';


const PublicRoutes = (props) => {

    const auth = useAuth()

    return auth ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoutes;