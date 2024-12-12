import logo from './logo.svg';
import './App.css';
import 'react-photo-view/dist/react-photo-view.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Router/Routes/Routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="">
      <RouterProvider router={routes} > </RouterProvider>
      <ToastContainer />
   
    </div>
  );
}

export default App;
