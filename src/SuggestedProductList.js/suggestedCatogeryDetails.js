import classes from "./SuggestedCategory.module.css";
import { ProductDetailsContext } from "../Store/ContexrStore";

import { Link } from "react-router-dom";
import { useContext } from "react";
export default function SuggestedCategoryDetails() {
  const context = useContext(ProductDetailsContext);
  return (
    <div className={classes.Category_details}>
      {(context.itemName !== "" ||
        context.productList?.productList !== null) && (
        <>
          <div className={classes.category_heading}>
            <Link to="../">
              <i className={`fa-solid fa-chevron-left ${classes.backicon}`}></i>
            </Link>
            <h2 className={classes.category_name}>
              {context.itemName !== "" ? context.itemName : "Back"}
            </h2>

            <span className={classes.deal_name}>
              {context.itemName !== ""
                ? ` deals on ${context.itemName}-great summer sale`
                : "Best deals for you "}
            </span>
          </div>
          <div className={classes.category_container}>
            {context.productList?.productList && (
              <img
                src={context.productList.productList[1].image}
                alt="product"
              />
            )}

            <span className={classes.offer_slogan}>
              Offers that you can't resist
            </span>
            <span className={classes.total_product}>
              {context.productList?.productList?.[1].totalProducts - 1}+
              Products Available
            </span>
          </div>
        </>
      )}
    </div>
  );
}
