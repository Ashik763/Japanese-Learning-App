import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../Pages/Shared/Spinner/Spinner';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    console.log(user, loading);
    console.log("From Private route user: ", user);
    const location = useLocation();
    console.log("Current location", location.pathname);

    if(loading){
        return  <Spinner animation="border" variant="primary" />
    }

    if(!user){

        console.log("user not found.......................");
        // return <Navigate to="/login"  replace></Navigate>
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }
    return children;
};

export default PrivateRoute;