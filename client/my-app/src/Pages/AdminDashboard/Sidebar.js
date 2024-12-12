import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronRight, FaTachometerAlt, FaWrench, FaChartBar, FaUsers } from 'react-icons/fa';

const MenuItem = ({ icon, title, subMenus, isOpen, toggleOpen }) => {
  return (
    <div className="mb-2">
      <motion.button
        className="flex items-center w-full p-3 text-white hover:bg-sky-600 rounded-lg transition-colors duration-200"
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="mr-3">{icon}</span>
        <span className="font-medium">{title}</span>
        {subMenus && (
          <motion.span
            className="ml-auto"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronDown />
          </motion.span>
        )}
      </motion.button>
      <AnimatePresence>
        {isOpen && subMenus && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-6 mt-2 space-y-2"
          >
            {subMenus.map((subMenu, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={subMenu.path}
                  className="block p-2 text-sm text-sky-200 hover:text-white hover:bg-sky-600 rounded-md transition-colors duration-200"
                >
                  {subMenu.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({});

  const menuItems = [
    {
      icon: <FaTachometerAlt />,
      title: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <FaChartBar />,
      title: 'Lesson Management',
      subMenus: [
        { title: 'Create Lesson', path: '/dashboard/create-a-lesson' },
        { title: 'All Lessons', path: '/dashboard/all-lessons' },
        
      ],
    },
    {
      icon: <FaWrench/>,
      title: 'Vocabulary Management',
      subMenus: [
        { title: 'Create A Vocabulary', path: '/dashboard/create-a-vocabulary' },
        { title: 'All Vocabularies', path: '/dashboard/all-vocabularies' },
      ],
    },
    {
      icon:  <FaUsers />,
      title: 'User Management',
      subMenus: [
        { title: 'All Users', path: '/create-a-vocabulary' },
        
      ],
    },
   
  ];

  const toggleMenu = (index) => {
    setOpenMenus(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-sky-500 to-sky-50 text-white w-64 min-h-screen fixed left-0 top-0 z-30 shadow-lg"
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? 0 : '-100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="p-4">
        <motion.h1
          className="text-2xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              {...item}
              isOpen={openMenus[index]}
              toggleOpen={() => toggleMenu(index)}
            />
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;

