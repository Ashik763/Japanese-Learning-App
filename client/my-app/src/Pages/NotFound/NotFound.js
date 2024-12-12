import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFound.css';
import { Helmet } from 'react-helmet';


const Title = "404 😑"

const NotFound = () => {
    return (
        <div className='border  container flex justify-center items-center'>
        <Helmet> 
           <title> {Title} </title>
        </Helmet>
        <div className="w-25 not-found border text-center scale-125 ">
            <b> 404 </b>
            <p> Not Found 😑</p>
            <NavLink to="/" className={ ({ isActive }) => (isActive ? ' active topic-name text-decoration-none' : ' topic-name text-decoration-none')  }> Go Home</NavLink>
        </div>
      
        
    </div>
    );
};

export default NotFound;