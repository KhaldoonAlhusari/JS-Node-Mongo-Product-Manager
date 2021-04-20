const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/products");

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected.");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const categories = ["fruit", "vegetable", "dairy"];

app.get("/products", async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category: category });
        res.render("products/index", { products, addAllBtn: true, category });
    } else {
        const products = await Product.find({});
        res.render("products/index", { products, addAllBtn: false });
    }
});

app.get("/products/new", (req, res) => {
    res.render("products/new", { categories });
});

app.post("/products", async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/products/${product._id}`);
})

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/displayProduct", { product });
});

app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${id}`)
});

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.redirect("/products");
});

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
});