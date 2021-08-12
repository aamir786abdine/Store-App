import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    let { user } = this.props;
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Shop Stores
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Shops
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/shop/view">
                        View
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/shop/add">
                        Add
                      </Link>
                    </li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Products
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/product/view">
                        View
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/product/add">
                        Add
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/purchases">
                    Purchases
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
export default NavBar;
