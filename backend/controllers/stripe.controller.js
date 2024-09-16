const stripe = require("stripe")(
  "sk_test_51PzS8yRq7RA8KXljSRFfysLXpzz7UOMlVemiMQiEIAH1CiwwowjXM63QnFmjNJDpuQcZrL20lKEgKpCUclICJU5500NxwCXfi3"
);

exports.stripe = async (req, res) => {
  const { items } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create the product" });
  }
};
