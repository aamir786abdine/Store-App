import React, { Component } from "react";
import { Link } from "react-router-dom";

class ShopNav extends Component {
  render() {
    return (
      <div className="container pt-2">
        <nav class="nav bg-light">
          <Link class="nav-link active" aria-current="page" href="#">
            Purchases
          </Link>
          <Link class="nav-link" to="/shop/totalPurchase">
            Total Purchases
          </Link>
        </nav>
      </div>
    );
  }
}
export default ShopNav;
