import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../sass/Modules/navbar.scss";
import { AuthContext } from "../Store/Store";

const Navbar = () => {
  const {isLoginCorrect} = useContext(AuthContext);
  const navbarItems = [
    { to: "/", name: "HOME" },
    { to: "/products", name: "PRODUCTS" },
    { to: "/information", name: "INFO" },
    { to: "/login", name: isLoginCorrect ? "LOGOUT" : "LOGIN" },
  ];
  const navbar = document.querySelector(".navbar-container");
  window.onscroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-container-active");
    } else {
      navbar.classList.remove("navbar-container-active");
    }
  };
  return (
    <nav className="navbar-container">
      {navbarItems.map((item) => {
        return (
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            {item.name}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navbar;
