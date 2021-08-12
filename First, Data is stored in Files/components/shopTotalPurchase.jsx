import React, { Component } from "react";
import http from "../services/httpService";

class shopTotalPurchasesView extends Component {
  state = {
    purchases: [],
    shops: [],
  };

  async componentDidMount() {
    let { id } = this.props.match.params;
    let response = await http.get(`/totalPurchase/shop/${+id}`);
    let response2 = await http.get("/shops");
    let { data: data1 } = response;
    let { data: data2 } = response2;
    this.setState({ purchases: data1, shops: data2 });
  }
  render() {
    let { purchases, shops } = this.state;
    let { id } = this.props.match.params;
    let shop = shops.find((ele) => ele.shopId === +id);
    console.log(shop);

    return (
      <div className="container pt-2">
        <h5 className="pb-1">Shop Name: {shop ? shop.shopName : ""}</h5>
        <div className="row border-top h6 py-2 fw-bold text-center">
          <div className="col-3">productId</div>
          <div className="col-3">product Name</div>
          <div className="col-3">Quantity</div>
          <div className="col-3">Price</div>
        </div>
        {purchases.map((ele, index) => (
          <div
            className={
              index % 2 === 0
                ? "row border-top border-bottom h6 py-3 bg-light text-center"
                : "row h6 py-2 text-center"
            }
            key={index}
          >
            <div className="col-3">{ele.productId}</div>
            <div className="col-3">{ele.productName}</div>
            <div className="col-3">{ele.quantity}</div>
            <div className="col-3">{ele.price}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default shopTotalPurchasesView;
