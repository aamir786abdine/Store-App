import React, { Component } from "react";
import http from "../services/httpService";

class ShopView extends Component {
  state = {
    shops: [],
  };

  async fetchData() {
    let response = await http.get("/shops");
    let { data } = response;
    this.setState({ shops: data });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevprops) {
    if (prevprops !== this.props) this.fetchData();
  }

  showPurchases = (id) => {
    this.props.history.push(`/shop/purchases/${id}`);
  };
  showTotalPurchases = (id) => {
    this.props.history.push(`/shop/totalpurchases/${id}`);
  };
  render() {
    let { shops } = this.state;
    return (
      <div className="container pt-4">
        <div className="row border-top h6 py-2 fw-bold">
          <div className="col-2">ShopId</div>
          <div className="col-4">Shop Name</div>
          <div className="col-3"></div>
          <div className="col-3"></div>
        </div>
        {shops.map((ele, index) => (
          <div
            className={
              index % 2 === 0
                ? "row border-top border-bottom h6 py-3 bg-light"
                : "row h6 py-2"
            }
            key={index}
          >
            <div className="col-2">{ele.shopId}</div>
            <div className="col-4">{ele.shopName}</div>
            <div className="col-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => this.showPurchases(ele.shopId)}
              >
                Purchases
              </button>
            </div>
            <div className="col-3">
              <button
                className="btn btn-outline-info"
                onClick={() => this.showTotalPurchases(ele.shopId)}
              >
                Total Purchases
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default ShopView;
