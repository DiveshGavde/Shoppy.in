import classes from "./ProductCartModel.module.css";
import { getUserLocation } from "../HeaderComponents/GetusersLocation";
import AddToCartButton from "../Buttons/AddToCartButton";

import { ProductDetailsContext } from "../Store/ContexrStore";
import { useState, useEffect, useContext } from "react";

export default function ProductCartModel({ itemDetails }) {
  const [location, setLocation] = useState();

  const [itemAllreadyExist, setItemAllReadyExist] = useState(false);
  const context = useContext(ProductDetailsContext);
  let allreadyExist;
  const localStorageData = localStorage.getItem("product");
  const parseData = JSON.parse(localStorageData);
  parseData?.map((curValue, index) => {
    if (curValue.id === itemDetails.id) {
      allreadyExist = true;
    }
  });

  useEffect(() => {
    setItemAllReadyExist(allreadyExist);
  }, [allreadyExist]);

  useEffect(() => {
    async function getUsersLocationData() {
      try {
        const data = await getUserLocation();
        setLocation(data);
      } catch (error) {
        setLocation(error);
      }
    }

    getUsersLocationData();
  }, []);

  return (
    <>
      {(itemDetails.minPrice !== null || undefined) && (
        <div className={classes.product_cart_model}>
          <div className={classes.product_item_container}>
            <span className={classes.inr_currency}>₹</span>
            <span className={classes.cart_item_price}>
              {itemDetails.minPrice}
            </span>
            {itemDetails.minprice > 500 ? <span>Free Delivery</span> : ""}
            {/* <span className={classes.user_location_icon}>
              <i className={`fa-solid fa-location-dot `}></i>
            </span> */}
            {location?.message ? (
              <span className={classes.location_message}>
                {location.message}
              </span>
            ) : (
              <span className={classes.location_message}>
                Delivering to {location?.city} {location?.postcode}
              </span>
            )}

            <span className={classes.product_available}>
              {itemDetails.productAvailability}
            </span>
            <span className={classes.item_add_to_cart}>
              <AddToCartButton
                isDisable={itemAllreadyExist}
                clickEvents={() => context.AddItemsTocart(itemDetails)}
                cssClass={classes.item_add_to_cart_btn}
              >
                Add to Cart
              </AddToCartButton>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
