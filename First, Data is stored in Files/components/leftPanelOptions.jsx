import React, { Component } from "react";
import http from "../services/httpService";

class LeftPanelOptions extends Component {
  state = {
    products: [],
    shops: [],
    sorts: ["QtyAsc", "QtyDesc", "ValueAsc", "ValueDesc"],
  };

  handleChange = (e) => {
    let { currentTarget: input } = e;
    let options = { ...this.props.options };
    if (input.name === "product") {
      options[input.name] = this.updateCBs(
        options[input.name],
        input.checked,
        input.value
      );
    } else options[input.name] = input.value;
    this.props.handleOptionChange(options);
  };

  updateCBs = (inpvalues, checked, value) => {
    let inpArr = inpvalues ? inpvalues.split(",") : [];
    if (checked) inpArr.push(value);
    else {
      let index = inpArr.findIndex((ele) => ele === value);
      if (index >= 0) inpArr.splice(index, 1);
    }
    return inpArr.join(",");
  };

  async componentDidMount() {
    let response = await http.get("/products");
    let response2 = await http.get("/shops");
    let { data: data1 } = response;
    let { data: data2 } = response2;
    this.setState({ products: data1, shops: data2 });
  }

  render() {
    let { products, shops, sorts } = this.state;
    let { options } = this.props;
    let { product = "" } = options;
    return (
      <React.Fragment>
        <div className="row me-2" style={{ paddingLeft: "2rem" }}>
          <div className="col-12 py-2 border-top border-end border-start bg-light fw-bold">
            Products
          </div>
          {products.map((ele, index) => (
            <div
              className={
                index % 2 === 0
                  ? "col-12 border py-2"
                  : index === products.length - 1
                  ? "col-12 py-2 border-start border-end border-bottom"
                  : "col-12 py-2 border-start border-end"
              }
              key={index}
            >
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="product"
                  id="product"
                  value={ele.productId}
                  checked={
                    product
                      .split(",")
                      .findIndex((val) => +val === ele.productId) >= 0
                  }
                  onChange={this.handleChange}
                />
                <label class="form-check-label">{ele.productName}</label>
              </div>
            </div>
          ))}
        </div>
        <div className="row me-2" style={{ marginLeft: "1rem" }}>
          <div style={{ padding: "0" }}>
            <hr />
          </div>
        </div>
        <div className="row me-2" style={{ paddingLeft: "2rem" }}>
          <div className="col-12  py-2 border-top border-end border-start bg-light fw-bold">
            Shops
          </div>
          <select
            class="form-select"
            id="shop"
            name="shop"
            value={options.shop}
            onChange={this.handleChange}
          >
            <option selected value="">
              Select Shop
            </option>
            {shops.map((ele) => (
              <option value={ele.shopId} key={ele.shopId}>
                {ele.shopName}
              </option>
            ))}
          </select>
        </div>
        <div className="row me-2" style={{ marginLeft: "1rem" }}>
          <div style={{ padding: "0" }}>
            <hr />
          </div>
        </div>
        <div className="row me-2" style={{ paddingLeft: "2rem" }}>
          <div className="col-12  py-2 border-top border-end border-start bg-light fw-bold">
            Sort
          </div>
          <select
            class="form-select"
            id="sort"
            name="sort"
            value={options.sort}
            onChange={this.handleChange}
          >
            <option selected value="">
              Sort By
            </option>
            {sorts.map((ele) => (
              <option value={ele} key={ele}>
                {ele}
              </option>
            ))}
          </select>
        </div>
      </React.Fragment>
    );
  }
}
export default LeftPanelOptions;
