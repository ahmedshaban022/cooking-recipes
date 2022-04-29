import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  const handleOnChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.email && user.password) {
      try {
        const res = await axios.post("/api/users/login", { ...user });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        toast.success("Login Successful");
        // navigate('/');
        window.location.replace("/");
      } catch (err) {
        toast.error(err.response.data.msg);
      }
    } else {
      toast.error("Email and Passwor are required!");
    }
  };

  return (
    <div className="w-50 m-auto my-5">
      <form onSubmit={handleSubmit} className="w-75 m-auto my-5">
        <div className="form-floating mb-3">
          <input
            type="email"
            onChange={handleOnChange}
            name="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            onChange={handleOnChange}
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
