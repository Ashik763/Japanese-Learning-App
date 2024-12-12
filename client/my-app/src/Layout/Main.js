import React, { useContext } from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import { AuthContext } from '../Contexts/AuthProvider';
import Spinner from '../Pages/Shared/Spinner/Spinner';
import "./Main.css"

const Main = () => {
    const {loading} = useContext(AuthContext);

    if(loading){
        return <Spinner></Spinner>
    }
    return (
        <div className='main'>
            <Navbar></Navbar>
            
           
            <div className='outlet'>
            <Outlet className=" w-100 md:w-3/4">
                
            </Outlet>
             </div>
            <Footer></Footer>
            
        </div>
    );
};

export default Main;