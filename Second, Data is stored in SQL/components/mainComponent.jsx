import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import http from "../services/httpService";
import NavBar from "./navBar";
import ShopView from "./shopView";
import ProductView from "./productView";
import PurchasesView from "./purchaseView";
import shopPurchasesView from "./shopPurchase";
import shopTotalPurchasesView from "./shopTotalPurchase";
import AddShop from "./addShop";
import productPurchasesView from "./productPurchase";
import productTotalPurchasesView from "./productTotalPurchase";
import AddProduct from "./addProduct";

class MainComponent extends Component {
  state = { products: [] };

  async fectchData() {
    let response = await http.get("/products");
    let { data } = response;
    this.setState({ products: data });
  }

  componentDidMount() {
    this.fectchData();
  }

  componentDidUpdate(prevProps) {
    console.log("prevProps", prevProps);
    if (prevProps !== this.props) this.fectchData();
  }

  render() {
    let { products } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route
            path="/shop/totalpurchases/:id"
            component={shopTotalPurchasesView}
          />
          <Route
            path="/product/totalpurchases/:id"
            component={productTotalPurchasesView}
          />
          <Route path="/shop/purchases/:id" component={shopPurchasesView} />
          <Route
            path="/product/purchases/:id"
            component={productPurchasesView}
          />
          <Route
            path="/product/edit/:id"
            render={(props) => <AddProduct {...props} products={products} />}
          />
          <Route path="/shop/view" component={ShopView} />
          <Route path="/shop/add" component={AddShop} />
          <Route path="/product/add" component={AddProduct} />
          <Route path="/product/view" component={ProductView} />
          <Route path="/purchases" component={PurchasesView} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default MainComponent;
