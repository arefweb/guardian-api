import React from 'react'
import { Link } from "react-router-dom";
import logo from "../assets/images/Guardian.jpg";


const Navbar = () => {
  return (
    <section className="navbar">
      <div className="container">
        <div className="row navbar__row">
          <figure className="col-4 navbar__logo">
            <img src={logo} alt="logo" />
          </figure>
          <nav className="col-6">
            <ul className="navbar__navlist">
              <li className="navbar__navlist-navitem">
                <Link to="/" className="navbar__navlist-navlink">
                  Home
                </Link>
              </li>
              <li className="navbar__navlist-navitem">
                <Link to="/about" className="navbar__navlist-navlink">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Navbar
