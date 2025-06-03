import React from "react";
import LayoutTemp from "./../components/layout/LayoutTemp";
import { useCart } from "../context/cart";
import { useAuth } from ".././context/Auth.jsx";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";


const CartShopping = () => {
  const { cart, setCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
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

  const totalPrice = () => {
    try {
      let total = 0;
      cart.forEach((item) => {
        total += item.price * (item.quantity || 1);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);99
    }
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeCartItem = (pid) => {
    let myCart = [...cart];
    myCart = myCart.filter((item) => item._id !== pid);
    updateCart(myCart);
  };

  const increaseQuantity = (pid) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const decreaseQuantity = (pid) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  return (
    <LayoutTemp>
      <div className="cart-container" style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
  <h3 style={{ margin: 0 }}>Shopping Cart ({cart.length} items)</h3>
  <button
    onClick={() => navigate("/")}
    style={{
      background: "none",
      border: "none",
      color: "black",
      textDecoration: "none",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    ← Back to Shopping
  </button>
</div>
        {cart.map((p) => (
          <div
            key={p._id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
            }}
          >
            <img
              src={`http://localhost:9090/api/v1/product/product-photo/${p._id}`}
              alt={p.name}
              style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "4px" }}
            />
            <div style={{ flex: 1, padding: "0 15px" }}>
              <h4 style={{ margin: "0 0 5px" }}>{p.name}</h4>
              <p style={{ margin: 0, color: "#777", fontSize: "14px" }}>
                Size: {p.size || "—"} | Color: {p.color || "—"}
              </p>
              <p style={{ margin: "5px 0", fontWeight: "bold" }}>${p.price}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => decreaseQuantity(p._id)}
                style={{
                  padding: "5px 10px",
                  fontSize: "16px",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                -
              </button>
              <span style={{ margin: "0 10px" }}>{p.quantity || 1}</span>
              <button
                onClick={() => increaseQuantity(p._id)}
                style={{
                  padding: "5px 10px",
                  fontSize: "16px",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                +
              </button>

              <button
                onClick={() => removeCartItem(p._id)}
                style={{
                  marginLeft: "15px",
                  fontSize: "18px",
                  color: "red",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                title="Remove item"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        {/* Summary */}
        {cart.length > 0 && (
          <>
            <div style={{ borderTop: "1px solid #ccc", paddingTop: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal:</span>
                <span>{totalPrice()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "18px" }}>
                <span>Total:</span>
                <span>{totalPrice()}</span>
              </div>
            </div>

            {auth?.user?.address && cart.length > 0 && (
              <button
                onClick={makePayment}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "20px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Proceed to Checkout
              </button>
            )}

            {!auth?.token && (
              <button
                onClick={() => navigate("/login", { state: "/cart" })}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "10px",
                  backgroundColor: "orange",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Please login to checkout
              </button>
            )}

            {auth?.token && !auth?.user?.address && (
              <button
                onClick={() => navigate("/dashboard/user/profile")}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "10px",
                  backgroundColor: "orange",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add Shipping Address
              </button>
            )}

            {auth?.user?.address && (
              <button
                onClick={() => navigate("/dashboard/user/profile")}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "10px",
                  backgroundColor: "orange",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Update Address
              </button>
            )}
          </>
        )}

        {cart.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p>Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "10px 20px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Back to Shopping
            </button>
          </div>
        )}
      </div>
    </LayoutTemp>
  );
};

export default CartShopping;
