import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const CartItem = ({ data }) => {
  const itemData = data;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [countItem, setCountItem] = useState(1);
  useEffect(() => {
    updateItemCount(itemData.id, countItem);
    if (countItem == 0) {
      removeFromCart(itemData.id);
    }
  }, [countItem]);

  const updateItemCount = (itemId, newCount) => {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    cart[itemIndex].count = newCount;
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  return (
    <div className="cart-item-wrapper d-flex">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="cart-item-left flex-grow-0 flex-shrink-1 d-block"
      >
        <div
          className="cart-image"
          style={{ backgroundColor: `${itemData.color}` }}
        >
          <div className="">
            <img
              src={itemData.image}
              alt="cartimg"
              className="d-block bg-transparent"
            />
          </div>
        </div>
      </motion.div>
      <div className="cart-item-right flex-grow-1 flex-shrink-1 d-block">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="cart-item-name"
        >
          {itemData.name}
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="cart-item-price"
        >
          ${itemData.price}
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.3 }}
          className="cart-item-actions d-flex align-items-center justify-content-between"
        >
          <div className="cart-item-count d-flex align-items-center justify-content-start">
            <button onClick={() => setCountItem(countItem - 1)}>-</button>
            <div className="text-center">{countItem}</div>
            <button onClick={() => setCountItem(countItem + 1)}>+</button>
          </div>
          <button
            className="remove-btn d-flex align-items-center justify-content-center border-0"
            onClick={() => removeFromCart(itemData.id)}
          >
            <img src="/assets/trash.png" className="img-fluid" alt="remove" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
