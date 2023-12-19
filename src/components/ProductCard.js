import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const ProductCard = ({ data }) => {
  const itemData = { ...data, count: 1 };
  const [cart, setCart] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
    const isItemInCart = cart.some((item) => item.id === itemData.id);
    setIsInCart(isItemInCart);
  }, [cart]);

  const addToCart = () => {
    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCartItems, itemData];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsInCart(true);
  };
  return (
    <div className="product-card flex-column py-4">
      <div
        className="product-image d-flex align-items-center overflow-hidden"
        style={{ backgroundColor: `${itemData.color}` }}
      >
        <motion.img
          src={itemData.image}
          alt="product"
          className="img-fluid bg-transparent d-block"
        />
      </div>
      <h3 className="name">{itemData.name}</h3>
      <p className="description">{itemData.description}</p>
      <div className="d-flex justify-content-between align-items-center">
        <div className="price">$ {itemData.price}</div>
        {isInCart ? (
          <div className="btn-check d-flex align-items-center position-relative">
            <FaCheck />
          </div>
        ) : (
          <button
            className="d-flex border-0 align-items-center position-relative user-select-none fw-bold"
            onClick={isInCart ? false : addToCart}
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
