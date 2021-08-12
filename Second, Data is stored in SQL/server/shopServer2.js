var express = require("express");
const Pool = require("pg").Pool;
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

const pool = new Pool({
  host: "Your host",
  user: "your usename",
  database: "Your db",
  password: "Your passord",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

//Error fix at local level

//  Shop EndPoint

app.get("/shops", function (req, res) {
  const query = "SELECT *FROM shops";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, (err, result) => {
        if (err) {
          console.log(err.stack);
        } else {
          const shops = result.rows;
          let shopArr = shops.map(function (s1) {
            return { shopId: s1.shopid, shopName: s1.name };
          });
          res.send(shopArr);
        }
      });
    } finally {
      done();
    }
  });
});

app.post("/shops", function (req, res) {
  let body = req.body;
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      var data = null;
      const query = "SELECT shopid from shops";
      client.query(query, (err, result) => {
        if (err) {
          console.log(err.stack);
          res.status(400).send("Data not found");
        } else {
          console.log("row", result.rows);
          let arr = result.rows;
          var maxId = arr.reduce(
            (acc, curr) => (acc > curr.shopid ? acc : curr.shopid),
            0
          );
          console.log("maxId", maxId);
          data = [maxId + 1, body.shopName, body.rent];
          console.log(data);
          const query2 = "INSERT INTO shops(shopid,name,rent) VALUES($1,$2,$3)";
          console.log("data", data);
          client.query(query2, data, (err, result) => {
            if (err) {
              console.log(err.stack);
              res.status(400).send("Data not found");
            } else {
              console.log("affected " + result.rowCount + " row");
              res.send(data);
            }
          });
        }
      });
    } finally {
      done();
    }
  });
});

//  Products EndPoint

app.get("/products", function (req, res) {
  const query = "SELECT *FROM products";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, (err, result) => {
        if (err) {
          console.log(err.stack);
        } else {
          const products = result.rows;
          res.send(products);
        }
      });
    } finally {
      done();
    }
  });
});

app.post("/products", function (req, res) {
  let body = req.body;
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      var data = null;
      const query = "SELECT productid from products";
      client.query(query, (err, result) => {
        if (err) {
          console.log(err.stack);
          res.status(400).send("Data not found");
        } else {
          console.log("row", result.rows);
          let arr = result.rows;
          var maxId = arr.reduce(
            (acc, curr) => (acc > curr.productid ? acc : curr.productid),
            0
          );
          console.log("maxId", maxId);
          data = [maxId + 1, body.productName, body.category, body.description];
          console.log(data);
          const query2 =
            "INSERT INTO products(productid,productname,category,description) VALUES($1,$2,$3,$4)";
          console.log("data", data);
          client.query(query2, data, (err, result) => {
            if (err) {
              console.log(err.stack);
              res.status(400).send("Data not found");
            } else {
              console.log("affected " + result.rowCount + " row");
              res.send(data);
            }
          });
        }
      });
    } finally {
      done();
    }
  });
});

app.put("/products/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  let data = [body.productName, body.category, body.description, +id];
  const query =
    "UPDATE products SET productname=$1,category=$2,description=$3 WHERE productid=$4";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, data, (err, result) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log("affected " + result.rowCount + " row");
          res.send(data);
        }
      });
    } finally {
      done();
    }
  });
});

//Purchases endPoint

app.get("/purchases", function (req, res) {
  let { shop, product, sort } = req.query;
  const query = "SELECT *FROM purchases";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, (err, result) => {
        if (err) {
          console.log(err.stack);
        } else {
          var purchases = result.rows;
          let purchaseArr = purchases.map(function (p1) {
            return {
              shopId: p1.shopid,
              productId: p1.productid,
              quantity: p1.quantity,
              price: p1.price,
            };
          });
          if (shop)
            purchaseArr = purchaseArr.filter((p1) => p1.shopId === +shop);
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
                (val1, val2) =>
                  val1.quantity * val1.price - val2.quantity * val2.price
              );

            if (sort === "ValueDesc")
              purchaseArr.sort(
                (val1, val2) =>
                  val2.quantity * val2.price - val1.quantity * val1.price
              );
          }

          res.send(purchaseArr);
        }
      });
    } finally {
      done();
    }
  });
});

app.get("/purchases/shops/:id", function (req, res) {
  let id = req.params.id;
  let sql = "SELECT *FROM purchases";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(sql, (err, result) => {
        if (err) {
          console.log(err.stack);
        } else {
          let purchases = result.rows;
          let shopArr = purchases.filter((p1) => p1.shopid === +id);
          res.send(shopArr);
        }
      });
    } finally {
      done();
    }
  });
});

app.get("/purchases/products/:id", function (req, res) {
  let id = req.params.id;
  let sql = "SELECT *FROM purchases";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(sql, (err, result) => {
        if (err) {
          console.log(err.stack);
        } else {
          let purchases = result.rows;
          let shopArr = purchases.filter((p1) => p1.productid === +id);
          res.send(shopArr);
        }
      });
    } finally {
      done();
    }
  });
});

app.get("/totalPurchase/shop/:id", function (req, res) {
  let id = req.params.id;
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      var data = null;
      const query = "SELECT *FROM products";
      client.query(query, (err, result) => {
        if (err) {
          console.log(err.stack);
          res.status(400).send("Data not found");
        } else {
          console.log("row", result.rows);
          var products = result.rows;
          const query2 = "SELECT *FROM purchases";
          client.query(query2, (err, result) => {
            if (err) {
              console.log(err.stack);
              res.status(400).send("Data not found");
            } else {
              var purchases = result.rows;
              let shopArr = purchases.filter((p1) => p1.shopid === +id);
              let arr1 = [];
              let arr = shopArr.map((s1) => {
                let index = arr1.findIndex(
                  (ele) => ele.productId === s1.productid
                );
                let prName = products.find(
                  (ele) => ele.productid === s1.productid
                );
                if (index < 0)
                  arr1.push({
                    productId: s1.productid,
                    productName: prName.productname,
                    quantity: s1.quantity,
                    price: s1.price,
                  });
                else {
                  let qty = arr1[index].quantity + s1.quantity;
                  let data1 = {
                    productId: s1.productid,
                    productName: prName.productname,
                    quantity: qty,
                    price: s1.price,
                  };
                  arr1[index] = data1;
                }
              });
              console.log(shopArr);
              res.send(arr1);
            }
          });
        }
      });
    } finally {
      done();
    }
  });
});

app.get("/totalPurchase/product/:id", function (req, res) {
  let id = req.params.id;
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      const query = "SELECT *FROM shops";
      client.query(query, (err, result) => {
        if (err) {
          console.log(err.stack);
          res.status(400).send("Data not found");
        } else {
          console.log("row", result.rows);
          var shops = result.rows;
          const query2 = "SELECT *FROM purchases";
          client.query(query2, (err, result) => {
            if (err) {
              console.log(err.stack);
              res.status(400).send("Data not found");
            } else {
              var purchases = result.rows;
              let productArr = purchases.filter((p1) => p1.productid === +id);
              let arr1 = [];
              let arr = productArr.map((s1) => {
                let index = arr1.findIndex(
                  (ele) => ele.shopId === s1.shopid && ele.price === s1.price
                );
                let shopName = shops.find((ele) => ele.shopid === s1.shopid);
                if (index < 0)
                  arr1.push({
                    shopId: s1.shopid,
                    shopName: shopName.name,
                    quantity: s1.quantity,
                    price: s1.price,
                  });
                else {
                  let qty = arr1[index].quantity + s1.quantity;
                  let data1 = {
                    shopId: s1.shopid,
                    shopName: shopName.name,
                    quantity: qty,
                    price: s1.price,
                  };
                  arr1[index] = data1;
                }
              });
              console.log(productArr);
              res.send(arr1);
            }
          });
        }
      });
    } finally {
      done();
    }
  });
});

app.post("/purchases", function (req, res) {
  let body = req.body;
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      var data = null;
      const query = "SELECT purchaseid from purchases";
      client.query(query, (err, result) => {
        if (err) {
          console.log(err.stack);
          res.status(400).send("Data not found");
        } else {
          console.log("row", result.rows);
          let arr = result.rows;
          var maxId = arr.reduce(
            (acc, curr) => (acc > curr.purchaseid ? acc : curr.purchaseid),
            0
          );
          console.log("maxId", maxId);
          data = [
            maxId + 1,
            body.shopid,
            body.productid,
            body.quantity,
            body.price,
          ];
          console.log(data);
          const query2 =
            "INSERT INTO purchases(purchaseid,shopid,productid,quantity,price) VALUES($1,$2,$3,$4,$5)";
          console.log("data", data);
          client.query(query2, data, (err, result) => {
            if (err) {
              console.log(err.stack);
              res.status(400).send("Data not found");
            } else {
              console.log("affected " + result.rowCount + " row");
              res.send(data);
            }
          });
        }
      });
    } finally {
      done();
    }
  });
});
