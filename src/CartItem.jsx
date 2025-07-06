import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    //console.log("Calculating total amount for cart:", cart);

    return cart.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.substring(1));
      return total + (itemCost * item.quantity);
    }, 0);
 
  };

  const handleContinueShopping = (e) => {
    // Call the function passed as a prop to continue shopping
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    // Increment the quantity of the item in the cart
    const updatedQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, amount: updatedQuantity }));
    //console.log(`Incremented ${item.name} quantity to ${updatedQuantity}`);
  };

  const handleDecrement = (item) => {
    // Decrement the quantity of the item in the cart
    if (item.quantity <= 1) {
      // If quantity is 1 or less, remove the item from the cart
      dispatch(removeItem(item.name));
      //console.log(`Removed ${item.name} from cart`);
      return;
    } else {
      const updatedQuantity = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, amount: updatedQuantity }));
      //console.log(`Decremented ${item.name} quantity to ${updatedQuantity}`);
    }
    
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    //console.log(`Removed ${item.name} from cart`);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.substring(1)); // Remove the dollar sign and convert to float
    return (itemCost * item.quantity).toFixed(2); // Calculate total cost and format to 2 decimal places
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


