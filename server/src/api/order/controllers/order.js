"use strict";

/**
 * order controller
 */

console.log(`Secret Key Stripe : `, process.env.STRIPE_SECRET_KEY)
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    // @ts-ignore
    const { products, userName, email } = ctx.request.body.data;
    // @ts-ignore
    console.log("🚀 ~ create ~ ctx.request.body:", ctx.request.body)
    console.log("🚀 ~ create ~ products:", products)
    try {
      //retrieve item information
      const lineItems = await Promise.all(
        products.map(async (product) => {
          console.log(`Product ID: `, product.id)
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);
          console.log("🚀 ~ products.map ~ item:", item)

          return {
            price_data: {
              currency: "usd",
              product_data: { name: item.name },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );
      console.log("🚀 ~ create ~ lineItems:", lineItems)

      //   create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "http://localhost:3000/checkout/success",
        cancel_url: "http://localhost:3000",
        line_items: lineItems,
      });
      console.log("🚀 Created Session: ", session)

      //   create the item
      await strapi.service("api::order.order").create({
        data: { userName, products, stripeSessionId: session.id },
      });

      //return the session id
      return { id: session.id };
    } catch (error) {
      ctx.response.status = 500;
      return {
        error: { message: `There was a problem creating the payment`, report : error },
      };
    }
  },
}));
