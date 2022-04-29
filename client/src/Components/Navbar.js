import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isLogged, setIslogged] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name"));

  useEffect(() => {
    setIslogged(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    setIslogged(false);
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="nav-link" to="/">
          <span className="text-danger fw-bold fs-5">AIM-TECH</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLogged && (
              <>
                {" "}
                <li className="nav-item">
                  <NavLink className="nav-link" to="add-recipe">
                    Add Recipe
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Recipes
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {isLogged ? (
            <div className="nav-item ms-auto">
              {name && (
                <div className="d-inline-block me-2">
                  {" "}
                  <h3 className="text-success">{name}</h3>
                </div>
              )}
              <button className="btn btn-danger " onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
