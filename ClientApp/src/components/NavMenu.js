import React, { Component, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './NavMenu.scss';

export const NavMenu = () => {
  
  const [collapsed, setCollapsed] = useState(true)
  const location = useLocation()

  const toggleNavbar = () => {
    setCollapsed(!collapsed)
  }

  const isLocation = (path) => location.pathname === path ? 'active' : ''

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Inventory</Link>
          <button className="navbar-toggler" type="button" onClick={toggleNavbar} aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="test" className={`navbar-collapse ${collapsed ? 'hide': 'show'}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${isLocation("/")}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isLocation("/items")}`} to="/items">Items</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isLocation("/counter")}`} to="/counter">Counter</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isLocation("/fetch-data")}`} to="/fetch-data">Fetch Data</Link>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );

}
