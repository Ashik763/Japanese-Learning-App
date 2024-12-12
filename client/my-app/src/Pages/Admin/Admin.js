import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaAngular } from "react-icons/fa";
import { FaBuffer } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
// import TourInHome from '../Home/ServiceInHome/TourInHome';
// import { Helmet } from 'react-helmet';

const Admin = () => {
    
    return (
        <div>
            <div className='w-11/12 mx-auto border'>
                <div className='flex md:flex-row flex-col min-h-full   '>
                    <div style={{minWidth:'250px',minHeight:"60vh"}} className='basis-1/4 border p-8 md:w-1/4  '>
                        <div style={{borderBottom:"1px solid black"}} className='mb-2  flex flex-row text-center  '>
                            <FaAngular className='m-1'></FaAngular>
                           
                            <NavLink to="/admin/makeAdmin"  className={ ({ isActive }) => (isActive ? ' font-bold ' : ' topic-name text-decoration-none')  }>Make Admin</NavLink>
                        </div>
                        <div style={{borderBottom:"1px solid black"}} className='mb-2  flex flex-row  '>
                            <FaBuffer className='m-1'></FaBuffer>
                            <NavLink to="/admin/pendingTours"     className={ ({ isActive }) => (isActive ? ' font-bold ' : ' topic-name text-decoration-none')  }  >Pending Packages</NavLink>
                        </div>
                        <div style={{borderBottom:"1px solid black"}} className='mb-2 flex flex-row  '>
                            <FaCheck className='m-1'></FaCheck>
                            <NavLink to="/admin/approvedTours"  className={ ({ isActive }) => (isActive ? ' font-bold ' : ' topic-name text-decoration-none')  }  >Approved Packages </NavLink>
                        </div>
                        <div style={{borderBottom:"1px solid black"}} className='mb-2 flex flex-row  '>
                            <ImCross className='m-1'></ImCross>
                            <NavLink to="/admin/declinedTours"  className={ ({ isActive }) => (isActive ? ' font-bold ' : ' topic-name text-decoration-none')  }  >Declined Packages </NavLink>
                        </div>
                       
                   
                    </div>
                    <div className='basis-3/4'>
                        <Outlet className=" w-100 md:w-3/4">
                    
                        </Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;