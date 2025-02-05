import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/reducers';
import CustomButton from '../ReusuableComponents/CustomButton';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_YOUR_KEY_HERE", // Replace with your Razorpay key
      amount: Math.round(total * 100), // Amount in paise
      currency: "INR",
      name: "Myntra Clone",
      description: "Purchase from Myntra Clone",
      handler: function(response) {
        // Handle successful payment
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // Here you would typically:
        // 1. Verify the payment on your backend
        // 2. Clear the cart
        // 3. Save the order details
        // 4. Redirect to order confirmation page
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#e72744"
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-4">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            {cart.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid rounded-start"
                      style={{ maxHeight: '150px', objectFit: 'contain', padding: '10px' }}
                    />
                  </div>
                  <div className="col-md-10">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title">{item.title}</h5>
                        <button
                          className="btn btn-link text-danger"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <p className="card-text text-primary fw-bold">${item.price}</p>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Total: ${total.toFixed(2)}</h4>
              <CustomButton
                text="Pay Now"
                backgroundColor="#e72744"
                onClick={handlePayment}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;