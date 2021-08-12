var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
const port = process.env.PORT || 2410;
app.listen(port, () => console.log("Listening on port : ", port));

const { data } = require("./shopData.js");

//  Shop EndPoint

app.get("/shops", function (req, res) {
  let { shops } = data;
  let shopArr = shops.map(function (s1) {
    return { shopId: s1.shopId, shopName: s1.name };
  });
  console.log(shopArr);
  res.send(shopArr);
});

app.post("/shops", function (req, res) {
  let body = req.body;
  let { shops } = data;
  let maxId = shops.reduce(
    (acc, curr) => (acc > curr.shopId ? acc : curr.shopId),
    0
  );
  let data1 = { shopId: maxId + 1, name: body.shopName, rent: body.rent };
  shops.push(data1);
  res.send(data1);
});

// Products EndPoint

app.get("/products", function (req, res) {
  let { products } = data;
  res.send(products);
});

app.post("/products", function (req, res) {
  let body = req.body;
  let { products } = data;
  let maxId = products.reduce(
    (acc, curr) => (acc > curr.productId ? acc : curr.productId),
    0
  );
  let newId = maxId + 1;
  let data1 = { productId: newId, ...body };
  products.push(data1);
  res.send(data1);
});

app.put("/products/:id", function (req, res) {
  let id = req.params.id;
  console.log(id);
  let body = req.body;
  let { products } = data;
  let index = products.findIndex((p1) => p1.productId === +id);
  let data1 = {
    productId: +id,
    productName: products[index].productName,
    ...body,
  };
  products[index] = data1;
  res.send(data1);
});

// Purchase EndPoint

app.get("/purchases", function (req, res) {
  let { shop, product, sort } = req.query;
  let { purchases } = data;
  let purchaseArr = purchases.map(function (p1) {
    return {
      shopId: p1.shopId,
      productId: p1.productid,
      quantity: p1.quantity,
      price: p1.price,
    };
  });
  if (shop) purchaseArr = purchaseArr.filter((p1) => p1.shopId === +shop);
  if (product) {
    let prArr = product.split(",");
    console.log("prArr", prArr);
    purchaseArr = purchaseArr.filter((p1) =>
      prArr.find((ele) => +ele === p1.productId)
    );
  }

  if (sort) {
    if (sort === "QtyAsc")
      purchaseArr.sort((val1, val2) => val1.quantity - val2.quantity);
    if (sort === "QtyDesc")
      purchaseArr.sort((val1, val2) => val2.quantity - val1.quantity);

    if (sort === "ValueAsc")
      purchaseArr.sort(
        (val1, val2) => val1.quantity * val1.price - val2.quantity * val2.price
      );

    if (sort === "ValueDesc")
      purchaseArr.sort(
        (val1, val2) => val2.quantity * val2.price - val1.quantity * val1.price
      );
  }

  res.send(purchaseArr);
});

app.get("/purchases/shops/:id", function (req, res) {
  let id = req.params.id;
  let { purchases } = data;
  let shopArr = purchases.filter((p1) => p1.shopId === +id);
  res.send(shopArr);
});

app.get("/purchases/products/:id", function (req, res) {
  let id = req.params.id;
  let { purchases } = data;
  let productArr = purchases.filter((p1) => p1.productid === +id);
  res.send(productArr);
});

app.get("/totalPurchase/shop/:id", function (req, res) {
  let id = req.params.id;
  let { purchases, products } = data;
  let shopArr = purchases.filter((p1) => p1.shopId === +id);
  let arr1 = [];
  let arr = shopArr.map((s1) => {
    let index = arr1.findIndex((ele) => ele.productId === s1.productid);
    let prName = products.find((ele) => ele.productId === s1.productid);
    if (index < 0)
      arr1.push({
        productId: s1.productid,
        productName: prName.productName,
        quantity: s1.quantity,
        price: s1.price,
      });
    else {
      let qty = arr1[index].quantity + s1.quantity;
      let data1 = {
        productId: s1.productid,
        productName: prName.productName,
        quantity: qty,
        price: s1.price,
      };
      arr1[index] = data1;
    }
  });
  console.log(shopArr);
  res.send(arr1);
});

app.get("/totalPurchase/product/:id", function (req, res) {
  let id = req.params.id;
  let { purchases, shops } = data;
  let productArr = purchases.filter((p1) => p1.productid === +id);
  let arr1 = [];
  let arr = productArr.map((s1) => {
    let index = arr1.findIndex(
      (ele) => ele.shopId === s1.shopId && ele.price === s1.price
    );
    let shopName = shops.find((ele) => ele.shopId === s1.shopId);
    if (index < 0)
      arr1.push({
        shopId: s1.shopId,
        shopName: shopName.name,
        quantity: s1.quantity,
        price: s1.price,
      });
    else {
      let qty = arr1[index].quantity + s1.quantity;
      let data1 = {
        shopId: s1.shopId,
        shopName: shopName.name,
        quantity: qty,
        price: s1.price,
      };
      arr1[index] = data1;
    }
  });
  console.log(productArr);
  res.send(arr1);
});

app.post("/purchases", function (req, res) {
  let body = req.body;
  let { purchases } = data;
  let maxId = purchases.reduce(
    (acc, curr) => (acc > curr.purchaseId ? acc : curr.purchaseId),
    0
  );
  let data1 = { purchaseId: maxId + 1, ...body };
  purchases.push(data1);
  res.send(data1);
});
