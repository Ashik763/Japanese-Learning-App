import React, { useContext } from "react";
import "./Login.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import { AiOutlineGoogle, AiFillGithub } from "react-icons/ai";
import Cookies from 'js-cookie'
import { decodeToken } from "../../utils/decodeToken";
// import Spinner from "../../Shared/Spinner";

const Login = () => {
  const {

    loading,
    setLoading,
    error,
    setError,
    setUser
   
  } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  //();(loading);
  const navigate = useNavigate();
  const location = useLocation();

  //();(location);
  const from = location.state?.from?.pathname || "/";
  if (user) {
     
    return <Navigate to={from} replace />;
  }

  // Sign in with Email and password
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;



    fetch('http://localhost:5000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate JSON content
      },
      body: JSON.stringify({
        email, password
      })
    })
    .then(res => res.json())
      .then((res) => {
        // Signed in
      
        setError("");
        form.reset();
     
        Cookies.set('token', res.token, { expires: 7 });
        const decodedValue = decodeToken(res.token);
        console.log(decodedValue);
        setUser(decodedValue)
        setLoading(false);
        navigate(from, { replace: true });
      
        

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        setError(errorMessage);
      }).finally(() => {
        setLoading(false);
      });

     
  };
  return (
    <div className=" login-container flex align-center">
      <div className="  login-content border p-10 m-auto ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h2 className="text-center text-2xl"> Log In</h2>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control border w-full h-8"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control border w-full h-8"
              id="password"
            />
          </div>

          <button type="submit" className="btn mt-5 btn-outline w-full border ">
            Login
          </button>
        </form>
        <div className="text  text-red-600">{error}</div>
        <p className="text-center mt-3">
          Don't have an account?
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
       
      </div>
    </div>
  );
};

export default Login;
