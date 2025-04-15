import React from 'react';
import LayoutTemp from './../components/layout/LayoutTemp';
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CartShopping = () => {
  const { cart, setCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  // ✅ Stripe payment
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51RBqVnDBGd2fwg7t8NUoaHhLP9Vh5wTgEEoZNvtW929raqCcHcGW5bDfehkdJ5EreJzgw2qpRAR6rC9YQ7PYMavC00WIt1X3UD");
    const body = {
      products: cart,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`http://localhost:9090/api/v1/auth/create-checkout-session`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  // ✅ Total price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * (item.quantity || 1);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Increment quantity
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Decrement quantity
  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId && (item.quantity || 1) > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <LayoutTemp>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1 ? (
                auth?.token ? (
                  <p>You have {cart.length} items in your cart</p>
                ) : (
                  <p>Please login to check out</p>
                )
              ) : (
                <p>Your cart is empty</p>
              )}
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">cart item
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:9090/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : ${p.price}</p>

                  {/* ✅ Quantity control */}
                  <div className="d-flex align-items-center gap-2 my-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => decreaseQuantity(p._id)}
                    >
                      -
                    </button>
                    <span className="fw-bold">{p.quantity || 1}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => increaseQuantity(p._id)}
                    >
                      +
                    </button>
                  </div>

                  <div className="btn btn-danger" onClick={() => removeCartItem(p._id)}>
                    Remove
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>

            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}

            {/* ✅ Stripe Payment Button */}
            {auth?.user?.address && cart?.length > 0 && (
              <button className="btn btn-primary mt-3" onClick={makePayment}>
                Proceed to Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </LayoutTemp>
  );
};

export default CartShopping;
