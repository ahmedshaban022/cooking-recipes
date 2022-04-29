import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
    if (user.name && user.email && user.password && user.confirmPassword) {
      if (user.password === user.confirmPassword) {
        try {
          const res = await axios.post("/api/users/register", { ...user });
          localStorage.setItem("token", res.data.token);
          toast.success("Registration Successful");
          // navigate('/');
          window.location.replace("/");
        } catch (err) {
          toast.error(err.response.data.msg);
        }
      } else {
        toast.error("Password not match confirm Password !");
      }
    } else {
      toast.error("All feilds are require!");
    }
  };

  return (
    <div className="w-50 m-auto my-5">
      <form onSubmit={handleSubmit} className="w-75 m-auto my-5">
        <div className="form-floating mb-3">
          <input
            type="text"
            onChange={handleOnChange}
            name="name"
            className="form-control"
            id="floatingName"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingName">Name</label>
        </div>
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
        <div className="form-floating mb-3">
          <input
            type="password"
            onChange={handleOnChange}
            name="confirmPassword"
            className="form-control"
            id="confirmPassword"
            placeholder="Password"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
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

export default Register;
