import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineGoogle } from "react-icons/ai";
import { AuthContext } from "../../Contexts/AuthProvider";
import Cookies from 'js-cookie'; 
import { decodeToken } from "../../utils/decodeToken";
const Register = () => {
  const [error, setError] = useState("");
  const {
 
    setLoading,
    user,
    setUser
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  
  const handleSubmit = (event) => {

    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const image = form[1].files[0];
    const email = form.email.value;
    const password = form.password.value;
    const checked = form.checkbox.checked;
    if (checked) {
      // setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=d2532bc119b3ee946764e98dd043df67`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          if (imgData.success) {
            const photoURL = imgData.data.url;
            fetch('http://localhost:5000/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Indicate JSON content
              },
              body: JSON.stringify({
                name, email, photo:photoURL, password
              })
            })
            .then(res => res.json())
              .then((res) => {
                // Signed in
              
                setError("");
                form.reset();
                console.log(res);
                Cookies.set('token', res.token, { expires: 7 });
                const decodedValue = decodeToken(res.token);
                console.log(decodedValue);
                setUser(decodedValue)
                // setLoading(false);
                navigate("/");
              
                

              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
                setError(errorMessage);
              });
          }
        });
    } else {
      setError("please accept terms & conditions");
    }
    //();(checked);
  };



  if (user) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
  return (
    <div className="m-5  login-container d-flex align-items-center">
      <div className=" border login-content p-10 m-auto ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h2 className="text-center text-2xl"> Register</h2>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control border w-full h-8"
              aria-describedby="emailHelp"
              required
            />
            <label htmlFor="photo" className="form-label">
              Image:
            </label>
            <input
              type="file"
              name="photoUrl"
              className="form-control border w-full h-8"
              id="photo"
              aria-describedby="emailHelp"
              required
            />
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control border w-full h-8"
              id="email"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control border w-full h-8"
              id="password"
              required
            />
          </div>
          <div className="mb-3">
            <input type="checkbox" name="checkbox" className="me-2" required />
            <label htmlFor="checkbox" className="form-label">
              Accept terms & conditions
            </label>
          </div>

          <button type="submit" className="btn mt-5 btn-outline w-full border ">
            Register
          </button>
          <p className="error text-danger">
            {" "}
            <small className="text-danger">{error} </small>{" "}
          </p>
        </form>
        <p className="text-center mt-3">
          Already have an account?
          <Link className="link" to="/login">
            Log in
          </Link>
        </p>
        <div className=" sign-in-options text-center ">
          <h6>Or you can continue with </h6>
          <p className=" flex justify-center mt-2">
            <span
              
              className="sign-in-option  sign-in-with-google text-5xl"
            >
              <AiOutlineGoogle></AiOutlineGoogle>{" "}
            </span>
            {/* <span className="sign-in-option sign-in-with-github text-5xl"><AiFillGithub></AiFillGithub> </span> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
