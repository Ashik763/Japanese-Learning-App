import React from 'react';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';
// import { useSidebar } from '../hooks/useSidebar';
import { FaUsers, FaChartBar, FaTachometerAlt } from 'react-icons/fa';
import { useSidebar } from '../../Hooks/useSidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="  flex-1 flex flex-col overflow-hidden">
        {/* <header className=" shadow-md">
          <div className="  flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:text-gray-700 lg:hidden"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Welcome! </h2>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">John Doe</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://via.placeholder.com/150"
                alt="User avatar"
              />
            </div>
          </div>
        </header> */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

