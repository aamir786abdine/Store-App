const fs = require("fs");
const fastcsv = require("fast-csv");
const Pool = require("pg").Pool;

function insertDb(csvFile) {
  let stream = fs.createReadStream(csvFile);
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push(data);
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();

      // connect to the PostgreSQL database
      // save csvData
    });
  stream.pipe(csvStream);
  return csvData;
}

const pool = new Pool({
  host: "Your host",
  user: "your usename",
  database: "Your db",
  password: "Your passord",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

function tableShops() {
  const query =
    "CREATE TABLE shops(shopid integer not null, name varchar(50) not null, rent integer not null)";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          //console.log("inserted " + res.rowCount + " row:", row);
          console.log(res);
        }
      });
    } finally {
      done();
    }
  });
}

function tableProducts() {
  const query =
    "CREATE TABLE products(productid integer not null,productname varchar(50) not null,category varchar(50) not null,description varchar(50) not null)";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          //console.log("inserted " + res.rowCount + " row:", row);
          console.log(res);
        }
      });
    } finally {
      done();
    }
  });
}

function tablePurchases() {
  const query =
    "CREATE TABLE purchases(purchaseid integer not null,shopid integer not null,productid integer not null,quantity integer not null,price integer not null)";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          //console.log("inserted " + res.rowCount + " row:", row);
          console.log(res);
        }
      });
    } finally {
      done();
    }
  });
}

function insertShops() {
  let csvData = insertDb("shops.csv");
  const query = "INSERT INTO shops (shopid, name, rent) VALUES ($1, $2, $3)";

  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      csvData.forEach((row) => {
        client.query(query, row, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log("inserted " + res.rowCount + " row:", row);
          }
        });
      });
    } finally {
      done();
    }
  });
}

function insertProducts() {
  let csvData = insertDb("products.csv");
  const query =
    "INSERT INTO products (productid,productname,category,description) VALUES ($1, $2, $3, $4)";

  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      csvData.forEach((row) => {
        client.query(query, row, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log("inserted " + res.rowCount + " row:", row);
          }
        });
      });
    } finally {
      done();
    }
  });
}

function insertPurchases() {
  let csvData = insertDb("purchases.csv");
  const query =
    "INSERT INTO purchases (purchaseid,shopid,productid,quantity,price) VALUES ($1, $2, $3, $4,$5)";

  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      csvData.forEach((row) => {
        client.query(query, row, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log("inserted " + res.rowCount + " row:", row);
          }
        });
      });
    } finally {
      done();
    }
  });
}

//tableShops();
//tableProducts();
//tablePurchases();
//insertShops();
//insertProducts();
//insertPurchases();
