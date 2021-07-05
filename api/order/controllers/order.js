"use strict";

const stripe = require("stripe")(
  "sk_test_51J9Xy6CaAkMYTVNMwG2EhAcVayniOHBZWvy4rilpI5y6aPwxcpqdmFUl70FmysoQPMYGP3XefePE9Sm7tgiemvCT00Tyiyq0BU"
);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (ctx) => {
    const { name, total, items, stripeTokenId } = ctx.request.body;
    const { id } = ctx.state.user;

    const charge = await stripe.charges.create({
      amount: Math.floor(total * 100),
      currency: "usd",
      source: stripeTokenId,
      description: `Order ${new Date()} by ${ctx.state.user.username}`,
    });
    return strapi.services.order.create({
      name,
      total,
      items,
      user: id,
    });
  },
};
