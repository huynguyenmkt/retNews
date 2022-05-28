import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const user = useSelector(state => state.user)
    const isExitUser = Object.keys(user).length > 0

    return isExitUser ? children : <Navigate to="/login" />
}

export default PrivateRoute