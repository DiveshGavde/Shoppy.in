import classes from "./CartModel.module.css";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function CartModel({ onClose }) {
  const products = localStorage.getItem("product");

  const productsObj = JSON.parse(products);
  let itemsInLocalStorage;
  if (productsObj !== null || undefined) {
    itemsInLocalStorage = [...productsObj];
  }

  const stringToNumber = [...itemsInLocalStorage];

  const [addItemtoCart, setItemTocart] = useState(stringToNumber);

  const totalPrice = addItemtoCart?.reduce((prev, cur) => {
    return prev + cur.price * cur.quantity;
  }, 0);

  function increaseQuantity(target) {
    setItemTocart((prev) => {
      const updatedItems = [...prev];
      const existingItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === target.id
      );

      const existingCartItem = updatedItems[existingItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingItemIndex] = updatedItem;
        localStorage.setItem("product", JSON.stringify(updatedItems));
      }

      return updatedItems;
    });
  }

  function reduceQuantity(target) {
    setItemTocart((prev) => {
      const updatedItems = [...prev];
      const existingItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === target.id
      );

      const existingCartItem = updatedItems[existingItemIndex];

      if (existingCartItem.quantity === 1) {
        updatedItems.splice(existingItemIndex, 1);
        productsObj.splice(existingItemIndex, 1);
        localStorage.setItem("product", JSON.stringify(productsObj));
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedItems[existingItemIndex] = updatedItem;
      }

      return updatedItems;
    });
  }

  function deleteCartItems(target) {
    setItemTocart((prev) => {
      const updatedItems = [...prev];
      const existingItemIndex = updatedItems.findIndex(
        (cart) => cart.id === target.id
      );

      const existingCartItem = updatedItems[existingItemIndex];
      if (existingItemIndex > -1) {
        updatedItems.splice(existingCartItem, 1);

        productsObj.splice(existingCartItem, 1);
        localStorage.setItem("product", JSON.stringify(updatedItems));
      }
    });
  }

  return createPortal(
    <div className={classes.model_container}>
      <dialog open className={classes.model}>
        <h2 className={classes.your_cart}>Your Cart</h2>
        {(!addItemtoCart || addItemtoCart?.length === 0) && (
          <span className={classes.isEmpty}>No items in cart</span>
        )}
        {addItemtoCart && productsObj?.length !== 0 && (
          <>
            <div className={classes.all_items_in_cart}>
              <ul className={classes.cart_item_list}>
                {addItemtoCart?.map((curEl, index) => {
                  const totalPrice = curEl.price * curEl.quantity;
                  return (
                    <li key={curEl.id} className={classes.cart_item}>
                      <figure className={classes.cart_item_image_wrapper}>
                        <img
                          className={classes.cartitem_image}
                          src={curEl.image}
                          alt="itemimage"
                        />
                      </figure>
                      <span className={classes.cart_item_title}>
                        {curEl.title}
                      </span>

                      <div className={classes.item_quantity_btn}>
                        <button
                          onClick={() => increaseQuantity(curEl)}
                          className={classes.add_item}
                        >
                          <span>
                            <i class="fa-solid fa-plus"></i>
                          </span>
                        </button>
                        <span className={classes.product_quantity}>
                          {curEl.quantity}
                        </span>
                        <button
                          onClick={() => reduceQuantity(curEl)}
                          className={classes.reduce_item}
                        >
                          <span>
                            <i class="fa-solid fa-minus"></i>
                          </span>
                        </button>
                        <div className={classes.cart_item_price}>
                          <span className={classes.item_price}>
                            ₹{totalPrice}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteCartItems(curEl)}
                        className={classes.remove_btn}
                      >
                        <i
                          className={`${classes.remove_icon} fa-solid fa-trash`}
                        ></i>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={classes.cart_footer}>
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </>
        )}
        <div className={classes.close_model_btn}>
          <button className={classes.close_model} onClick={onClose}>
            <span>close</span>
          </button>
        </div>
      </dialog>
    </div>,
    document.getElementById("modal")
  );
}
