import { useEffect, useState } from "react";
import "./App.css";
import CartItem from "./components/CartItem";
import ProductCard from "./components/ProductCard";

function App() {
  const jsonDataPath = "shoes.json";
  const [productData, setProductData] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];
  
  useEffect(() => {
    fetch(jsonDataPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Không thể lấy dữ liệu (${response.status} ${response.statusText})`
          );
        }
        return response.json();
      })
      .then((data) => {
        setProductData(data.shoes);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    setCart((prevCart) => {
      let total = 0;
      for (let i = 0; i < prevCart?.length; i++) {
        total += prevCart[i].price * prevCart[i].count;
      }
      setTotalPrice(total.toFixed(2));
      return localStorageCart;
    });
  }, [localStorageCart]);

  return (
    <div>
      <div className="app-main-content d-flex align-items-center justify-content-between position-relative flex-wrap">
        <div className="app-card d-flex flex-column shadow overflow-hidden position-relative">
          <div className="card-top">
            <img
              src="/assets/nike.png"
              className="img-fluid position-relative"
              alt="logo"
              style={{ width: "50px" }}
            />
          </div>
          <div className="card-title my-2">Our Products</div>
          <div className="card-body d-flex justify-content-center flex-wrap overflow-hidden overflow-y-scroll position-relative">
            {productData?.map((item, idx) => (
              <ProductCard data={item} key={idx} />
            ))}
          </div>
        </div>
        <div className="app-card d-flex flex-column shadow overflow-hidden position-relative">
          <div className="card-top">
            <img
              src="/assets/nike.png"
              className="img-fluid position-relative"
              alt="logo"
              style={{ width: "50px" }}
            />
          </div>
          <div className="card-title d-flex flex-row justify-content-between">
            <p>Your cart</p> <p>${totalPrice}</p>
          </div>
          <div className="card-body d-flex justify-content-center flex-wrap overflow-y-scroll position-relative">
            <div className="d-block">
              {cart?.length > 0 ? (
                cart?.map((item, idx) => <CartItem data={item} key={idx} />)
              ) : (
                <p className="text">Your cart is empty</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
