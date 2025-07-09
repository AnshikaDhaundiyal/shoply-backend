const Order = require("../models/orderModel");
const express = require("express");
const { verifyUser } = require("../middlewares/authMiddleware");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
require("dotenv").config()

const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
);

const router = express.Router();

router.post(
  "/create-checkout-session",
  express.json({ extended: true, limit: "30mb" }),
  verifyUser,
  async (req, res) => {
    try {
      const taxRate = await stripe.taxRates.create({
        display_name: "GST",
        inclusive: false,
        percentage: 10,
        country: "IN",
      });

      // const customer = await stripe.customers.create({
      //   metadata: {
      //     userId: req.user._id.toString(),
      //     cart: JSON.stringify(req.body.items),
      //   },
      // });

      // console.log(req.user._id)
      const data = req.body;

      let items = await Promise.all(
        data.items.map(async (item) => {
          let product = await Product.findById(item.productId);
          return {
            productId: product._id,
            productImage: product.image,
            productName: product.name,
            price: product.price,
            qty: item.qty,
          };
        })
      );

      const line_items = items.map((item) => {
        return {
          price_data: {
            currency: "INR",
            product_data: {
              name: item.productName,
              images: [item.productImage],
            },

            unit_amount: item.price * 100,
          },
          tax_rates: [taxRate.id],
          quantity: item.qty,
        };
      });

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items,
        customer_email: req.user.email,
        success_url: "https://shoply-beta.vercel.app/checkout/success",
        cancel_url: "https://shoply-beta.vercel.app/",
      });
      let subtotal = items.reduce((st, item) => st + item.price * item.qty, 0);
      let taxPer = subtotal * 0.1;
      let total = subtotal + taxPer;

      const newOrder = await new Order({
        userId: req.user._id,
        stripeSessionId: session.id,
        items: items,
        shipping: data.shipping,
        payment_status: "paid",
        total,
        subtotal,
      }).save();
      

      res.status(200).json({ url: session.url });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// shipping_address_collection: {
//   allowed_countries: ["IN"],
// },
// shipping_options: [
//   {
//     shipping_rate_data: {
//       type: "fixed_amount",
//       fixed_amount: {
//         amount: 0,
//         currency: "inr",
//       },
//       display_name: "Free Shipping",
//       delivery_estimate: {
//         minimum: {
//           unit: "business_day",
//           value: 5,
//         },
//         maximum: {
//           unit: "business_day",
//           value: 7,
//         },
//       },
//     },
//   },
//   {
//     shipping_rate_data: {
//       type: "fixed_amount",
//       fixed_amount: {
//         amount: 30000,
//         currency: "inr",
//       },
//       display_name: "Next Day Delivery",
//       delivery_estimate: {
//         minimum: {
//           unit: "business_day",
//           value: 1,
//         },
//         maximum: {
//           unit: "business_day",
//           value: 1,
//         },
//       },
//     },
//   },
// ],

// const createOrder = async (customer, data) => {
//     const items = JSON.parse(customer.metadata.cart)
//     // console.log("Items From Metadata:" , customer.metadata.cart)
//     const cartItems = await Cart.find({ userId: customer.metadata.userId });
//     // console.log("User Id : ", customer.metadata.userId)
//     // console.log(cartItems);
//     // console.log("Data :" , data )
//     const itemsToSave = cartItems[0].items.filter(item => items.some(clientItem => item.productId.toString() === clientItem.productId  ))

//     const newOrder = new Order({
//       userId : customer.metadata.userId,
//       customerId : data.customer,
//       payment_intent_id : data.payment_intent,
//       items : itemsToSave,
//       subtotal : data.amount_subtotal,
//       total : data.amount_total,
//       shipping : data.customer_details,
//       payment_status : data.payment_status
//     })

//     try {
//       const savedOrder = await newOrder.save()
//       return savedOrder
//     } catch (error) {
//       console.log(error)
//     }
//   }

// const endpointSecret = "whsec_02157c92d4773482e9d9f8552b11eb239c3654c00e71722f9018f39623c3a5e7";

// router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   console.log("in webhook")
//   let data ;
//   let eventType;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     res.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   data = event.data.object;
//   eventType = event.type

//   if(eventType === "checkout.session.completed") {
//       stripe.customers.retrieve(data.customer).then(customer => {
//         createOrder(customer,data)
//       }).catch(err => console.log(err))
//   }
//   res.send().end();
// });

module.exports = router;
