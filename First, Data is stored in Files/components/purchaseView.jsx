import React, { Component } from "react";
import http from "../services/httpService";
import LeftPanelOptions from "./leftPanelOptions";
import queryString from "query-string";

class PurchasesView extends Component {
  state = {
    purchases: [],
  };

  async fetchData() {
    let queryParams = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParams);
    let response = await http.get(`/purchases?${searchStr}`);
    let { data } = response;
    this.setState({ purchases: data });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.fetchData();
  }

  handleOptionChange = (options) => {
    this.callURL("/purchases", options);
  };

  callURL = (url, options) => {
    let searchString = this.makeSearchString(options);
    this.props.history.push({
      pathname: url,
      search: searchString,
    });
  };

  makeSearchString = (options) => {
    let { shop, product, sort } = options;
    let searchStr = "";
    searchStr = this.addToQueryString(searchStr, "shop", shop);
    searchStr = this.addToQueryString(searchStr, "product", product);
    searchStr = this.addToQueryString(searchStr, "sort", sort);
    return searchStr;
  };

  addToQueryString = (str, paramName, paramValue) =>
    paramValue
      ? str
        ? `${str}&${paramName}=${paramValue}`
        : `${paramName}=${paramValue}`
      : str;
  render() {
    let { purchases } = this.state;
    let queryParams = queryString.parse(this.props.location.search);
    return (
      <div className="container pt-4">
        <div className="row">
          <div className="col-3 pb-4">
            <LeftPanelOptions
              options={queryParams}
              handleOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-9">
            <div className="row border-top h6 py-2 fw-bold text-center">
              <div className="col-3">shopId</div>
              <div className="col-3">productId</div>
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
                <div className="col-3">{ele.shopId}</div>
                <div className="col-3">{ele.productId}</div>
                <div className="col-3">{ele.quantity}</div>
                <div className="col-3">{ele.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default PurchasesView;
