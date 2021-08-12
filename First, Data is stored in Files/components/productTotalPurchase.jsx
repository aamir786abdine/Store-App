import React, { Component } from "react";
import http from "../services/httpService";

class productTotalPurchasesView extends Component {
  state = {
    purchases: [],
    products: [],
  };

  async componentDidMount() {
    let { id } = this.props.match.params;
    let response = await http.get(`/totalPurchase/product/${+id}`);
    let response2 = await http.get("/products");
    let { data: data1 } = response;
    let { data: data2 } = response2;
    this.setState({ purchases: data1, products: data2 });
  }
  render() {
    let { purchases, products } = this.state;
    let { id } = this.props.match.params;
    let product = products.find((ele) => ele.productId === +id);
    console.log(product);

    return (
      <div className="container pt-2">
        <h5 className="pb-1">
          Product Name: {product ? product.productName : ""}
        </h5>
        <div className="row border-top h6 py-2 fw-bold text-center">
          <div className="col-2">shopId</div>
          <div className="col-4">Shop Name</div>
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
            <div className="col-2">{ele.shopId}</div>
            <div className="col-4">{ele.shopName}</div>
            <div className="col-3">{ele.quantity}</div>
            <div className="col-3">{ele.price}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default productTotalPurchasesView;
