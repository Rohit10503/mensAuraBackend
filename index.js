const express = require("express");
// const nodemailer = require('nodemailer');
// const bodyparser = require("body-parser");
const app = express();
const nodemailer = require("nodemailer");

require("./db/config");

const User = require("./db/userSchema");
const Product = require("./db/productSchema");
const Cart = require("./db/cartSchema");
const Order = require("./db/myorderSchema")
app.use(express.json())
const cors = require("cors");



app.use(cors());

const axios = require("axios")
app.post("/signup", async (req, res) => {

    let check_present = await User.findOne({ email: req.body.email });

    if (check_present) {
        res.send({ result: "present" })

    } else {

        let testAccount = await nodemailer.createTestAccount();

        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password, result.cPassword;
        res.send(result);



        //codee to mail  someone
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.email',
            port: 587,
            auth: {
                user: 'rohitpandey10503@gmail.com',
                pass: 'lkff zwil okxq cfja'
            }
        });

        const mailOption = ({
            from: '"Mens Aura 👻" <mensaura@test.com>', // sender address
            to: `${result.email}`, // list of receivers
            subject: "Registered  Successfully on mensAura", // Subject line
            text: "Hello world?", // plain text body
            html: `<div><p>On behalf of the entire team of Mens's Aura, I'm delighted to extend a warm welcome to you! Thank you for choosing us. Don't hesitate to contact us any time</p>Regards, <a href="rohit10503.github.io/sem4">Rohitkumar Pandey</a></div>`, // html body
        });

        const sendMail = async (transporter, mailOption) => {
            try {
                await transporter.sendMail(mailOption)
            } catch (error) {
                console.error(error)
            }
        }

        sendMail(transporter, mailOption)



    }

});


app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password -cPassword")
        if (user) {
            res.send(user);
        }
        else {
            res.send({ "resut": "user not found" });
        }
    }
    else {
        res.send({ "result": "necessary credential missing" })
    }
})

app.get("/", async (req, res) => {
    let products = await Product.find({}).limit(10);
    if (products.length > 0) {
        res.send(products);

    }
    else {
        res.send({ result: "None" })
    }
    let try_to_activate_ml = await fetch("https://mensaura-ml.onrender.com/")
})

app.get("/visit/:id", async (req, res) => {
    let prd_id = req.params.id;
    let result = await Product.findOne({ _id: prd_id });

    if (result) {

        let result1 = []
        await axios.get(`https://mensaura-ml.onrender.com/predict/${prd_id}`)
            .then(response => {
                let data = response.data;
                array = data.slice(1, -1).split(", ")
                array = array.map(item => item.slice(1, -1));  // Remove quotes from each item
                let promises = array.map(item => {
                    return Product.findOne({ _id: item }).exec();
                });

                // Resolve all promises
                return Promise.all(promises);


            })
            .then(individualItems => {
                result1 = individualItems
                // res.send(result1);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        result = { ...result._doc, recommendedProducts: result1 };
        res.send(result);
    }
    else {
        res.send({ result: "not found" });
    }





})

app.post("/cart-push", async (req, res) => {

    let carts_product = new Cart(req.body);
    let result = await carts_product.save();
    res.send({ result: "success" })


})






app.get("/cart-show/:id", async (req, res) => {
    try {
        let cur_user = req.params.id;
        let carts = await Cart.find({ userId: cur_user });
        if (carts.length > 0) {
            let prdIds = carts.map(cart => cart.productId);
            let result = await Product.find({ _id: { $in: prdIds } });
            res.send(result);
        } else {
            res.send({ result: "None" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: "Error" });
    }
});

app.delete("/delete/:user_id/:prd_id", async (req, res) => {
    let product_id = req.params.prd_id;
    let user = req.params.user_id
    let result = await Cart.deleteOne({ userId: user, productId: product_id });
    res.send(result)

})

app.delete("/delete/:user_id", async (req, res) => {

    let user = req.params.user_id
    let result = await Cart.deleteMany({ userId: user });
    res.send(result)

})

app.post("/order", async (req, res) => {
    let my_order = new Order(req.body);
    let result = await my_order.save();
    if (result) {
        res.send({ result: "success" })
    }
})

app.get("/order/:user_id", async (req, res) => {
    let userId = req.params.user_id;
    let result = await Order.find({ userid: userId });
    if (result) {
        res.send(result)
    }
    else {
        res.send({ result: "empty" })
    }
})

app.get("/getarray", (req, res) => {

    res.send(displayFolderItems)
})


app.listen(process.env.port || 5000);
