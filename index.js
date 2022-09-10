const express = require("express");
const app = express();
const mangoose = require("mongoose");
const body_parser = require("body-parser");

mangoose.connect("mongodb://0.0.0.0:27017/e-comm");

var db = mangoose.connection;

app.use(express.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/sign-up", (req, res) => {
  var name = req.body.nam;
  var brand = req.body.brand;
  var price = req.body.price;
  var category = req.body.category;

  var data = {
    name: name,
    brand: brand,
    price: price,
    category: category,
  };

  db.collection("products").insertOne(data, (err, coll) => {
    if (err) {
      throw err;
    } else {
      console.log("Record inserted successfully");
    }
  });
  return res.redirect("/");
});

app.get("/", (req, res) => {
  return res.redirect("index.html");
});

app.listen(3000);
