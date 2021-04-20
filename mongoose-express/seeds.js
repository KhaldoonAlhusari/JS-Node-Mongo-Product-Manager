const mongoose = require("mongoose");
const Product = require("./models/products");

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected.");
    })
    .catch((err) => {
        console.log(err);
    });

// const p = new Product({
//     name: "Ruby Grapefruit",
//     price: 1.99,
//     category: "fruit"
// });

// p.save().then(p => console.log(p)).catch(e => console.log(e));

const seedProducts = [
    {
        name: "Fairy Eggplant",
        price: 1.00,
        category: "vegetable"
    },
    {
        name: "Organic Goddess Melon",
        price: 4.99,
        category: "fruit"
    },
    {
        name: "Organic Mini Seedless Watermelon",
        price: 3.99,
        category: "fruit"
    },
    {
        name: "Organic Celery",
        price: 1.50,
        category: "vegetable"
    },
    {
        name: "Chocolate Whole Milk",
        price: 2.69,
        category: "dairy"
    },
];

Product.insertMany(seedProducts).then(r => console.log(r)).catch(e => console.log(e));