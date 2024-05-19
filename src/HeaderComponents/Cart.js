import classes from "./cart.module.css";
import CartModel from "../ProductDetailsComponent/CartModel";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ProductDetailsContext } from "../Store/ContexrStore";

export default function Cart() {
  const [openModel, setOpenModel] = useState(false);
  const context = useContext(ProductDetailsContext).cartItems;
  const [cartItems, setItemTocart] = useState(context.length);

  const localStorageData = localStorage.getItem("product");
  const numbersOfItem = JSON.parse(localStorageData);

  useEffect(() => {
    setItemTocart(numbersOfItem.length);
  }, [numbersOfItem]);

  return (
    <>
      <div className={classes.cart_icon}>
        <button
          onClick={() => setOpenModel(true)}
          className={classes.cart_button}
        >
          <i className={`fa-solid fa-cart-plus ${classes.cart_icon}`}></i>
          <span>cart({cartItems})</span>
        </button>
      </div>
      {openModel && <CartModel onClose={() => setOpenModel(false)} />}
    </>
  );
}
