import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Spinner from "../../Pages/Shared/Spinner/Spinner";


import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute";
import NotFound from "../../Pages/NotFound/NotFound";
import Admin from "../../Pages/Admin/Admin";
import MakeAdmin from "../../Pages/Admin/MakeAdmin/MakeAdmin";


import AllLessons from "../../Pages/Lessons/AllLessons";
import SingleLesson from "../../Pages/SingleLesson/SingleLesson";
import Dashboard from "../../Pages/AdminDashboard/Dashboard";
import CreateALesson from "../../Pages/CreateALesson/CreateALesson";
import AdminAllLessons from "../../Pages/AdminAllLessons/AdminAllLessons";
import AdminRoute from "../../Components/PrivateRoute/AdminRoute";
import CreateWord from "../../Pages/CreateWord/CreateWord";
import ViewAllVocabularies from "../../Pages/ViewAllVocabularies/ViewAllVocabularies";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
            
              <Main></Main>
           
            ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "lessons",
        
        element:(<PrivateRoute> <AllLessons></AllLessons> </PrivateRoute>)
      },
      {
        path: "lessons/:lessonNo/words",
        element: <SingleLesson></SingleLesson>,
      },
      {
        path: "dashboard",
        element: (
          <AdminRoute>

            <Dashboard></Dashboard>

          </AdminRoute>),
        
        children:[
          {
            path: "/dashboard/create-a-lesson",
            element: <CreateALesson></CreateALesson> ,
          },
          {
            path: "/dashboard/all-lessons",
            element: <AdminAllLessons></AdminAllLessons> ,
          },
          {
            path: "/dashboard/create-a-vocabulary",
            element: <CreateWord></CreateWord>
          },
          {
            path: "/dashboard/all-vocabularies",
            element: <ViewAllVocabularies></ViewAllVocabularies> ,
          },
          

        ]
      },
      
 
     
  
     
      
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/spinner",
    element: <Spinner></Spinner>,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
