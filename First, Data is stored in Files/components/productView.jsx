import React, { Component } from "react";
import http from "../services/httpService";

class ProductView extends Component {
  state = {
    products: [],
  };

  async fetchData() {
    let response = await http.get("/products");
    let { data } = response;
    this.setState({ products: data });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.fetchData();
  }

  showPurchases = (id) => {
    this.props.history.push(`/product/purchases/${id}`);
  };
  showTotalPurchases = (id) => {
    this.props.history.push(`/product/totalpurchases/${id}`);
  };
  handleEdit = (id) => {
    this.props.history.push(`/product/edit/${id}`);
  };
  render() {
    let { products } = this.state;
    return (
      <div className="container pt-4">
        <div className="row border-top h6 py-2 fw-bold">
          <div className="col-1">PrId</div>
          <div className="col-2">pr Name</div>
          <div className="col-2">Category</div>
          <div className="col-2">Description</div>
          <div className="col-1"></div>
          <div className="col-2"></div>
          <div className="col-2"></div>
        </div>
        {products.map((ele, index) => (
          <div
            className={
              index % 2 === 0
                ? "row border-top border-bottom h6 py-3 bg-light"
                : "row h6 py-2"
            }
            key={index}
          >
            <div className="col-1">{ele.productId}</div>
            <div className="col-2">{ele.productName}</div>
            <div className="col-2">{ele.category}</div>
            <div className="col-2">{ele.description}</div>
            <div className="col-1">
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={() => this.handleEdit(ele.productId)}
              >
                Edit
              </button>
            </div>
            <div className="col-2 text-center">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => this.showPurchases(ele.productId)}
              >
                Purchases
              </button>
            </div>
            <div className="col-2 text-center">
              <button
                className="btn btn-outline-info btn-sm"
                onClick={() => this.showTotalPurchases(ele.productId)}
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
export default ProductView;
