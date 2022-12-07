import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectRoutes = (props) => {
    const { auth } = useAuth()

    //if the role required is there or not
    // if (props.roleRequired) {
    // 	return auth ? (
    // 		props.roleRequired === role ? (
    // 			<Outlet />
    // 		) : (
    // 			<Navigate to="/pageNotFound" />
    // 		)
    // 	) : (
    // 		<Navigate to="/login" />
    // 	)
    // } else {
    return auth ? <Outlet /> : <Navigate to="/login" />
    // }
}

export default ProtectRoutes
