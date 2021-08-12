import React, { Component } from "react";
import http from "../services/httpService";

class AddShop extends Component {
  state = { form: {} };

  handleChange = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    s1.form[input.name] = input.value;
    this.setState(s1);
  };

  async postData(url, obj) {
    let response = await http.post(url, obj);
    alert("Data added Successfully");
    this.props.history.push("/shop/view");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.postData("/shops", this.state.form);
  };
  render() {
    let { form } = this.state;
    return (
      <div className="container">
        <h4 className=" py-3 text-center">Add Details of Shop</h4>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Shop Name
            </label>
            <input
              type="text"
              className="form-control"
              id="shopName"
              name="shopName"
              value={form.shopName}
              placeholder="Enter Shop Name"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rent" className="form-label">
              Rent
            </label>
            <input
              type="text"
              className="form-control"
              id="rent"
              name="rent"
              value={form.rent}
              placeholder="Enter Rent"
              onChange={this.handleChange}
            />
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default AddShop;
