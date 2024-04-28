import React, { useState, useEffect } from "react";

const ProductDisplay = () => (
    <div className="checkoutbody">
  <section className="checkoutSection">
    <div className="product">
      <img
        className="checkoutImg"
        src="https://th.bing.com/th/id/OIP.71hLPhAxg6afbJUZdkGlQgHaHR?pid=ImgDet&rs=1"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3 className="checkH3">Application fees</h3>
      <h5 className="checkH5">Rs 1500</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit" className="checkoutBtn">
        Checkout
      </button>
    </form>
  </section>
  </div>
);

const Message = ({ message }) => (
  <section>
    <p className="messageP">{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}