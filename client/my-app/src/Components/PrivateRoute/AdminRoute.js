import React, { useContext } from 'react';
// import { AuthContext } from '../../Contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../Pages/Shared/Spinner/Spinner';
import { AuthContext } from '../../Contexts/AuthProvider';

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return  <Spinner animation="border" variant="primary" />
    }

    if(!user || user?.role !== "admin"){
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }
    return children;
};

export default AdminRoute;