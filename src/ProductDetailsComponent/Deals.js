import classes from "./Deals.module.css";
import { DealOfDay, SearchAnyProduct } from "../Fetch functions/FetchApi";
import PaginationButton from "./Pagination-button";
import { ProductDetailsContext } from "../Store/ContexrStore";

import { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";

export function TopDeals() {
  const context = useContext(ProductDetailsContext);
  const dealsContainer = useRef(null);
  const [getWidth, setWidth] = useState();
  const [todaysDeal, getTodaysDeal] = useState();

  useEffect(() => {
    const width = dealsContainer.current;
    setWidth(width);
  }, []);

  useEffect(() => {
    async function getDealsData() {
      const data = await DealOfDay();

      getTodaysDeal(data);
    }
    getDealsData();
  }, []);

  return (
    <div className={classes.deal_container}>
      <div className={classes.deal_container_header}>
        <h3>Today's Deals</h3>
      </div>
      <div ref={dealsContainer} className={classes.first_deal_item}>
        <ul className={classes.deal_items_list}>
          {!todaysDeal && <span>Loading...</span>}
          {Array.isArray(todaysDeal) && todaysDeal.length === 0 && (
            <span>something went wrong with API...Please try again later</span>
          )}

          {todaysDeal?.message && <span>{todaysDeal.message}</span>}
          {todaysDeal?.productList?.map((product) => (
            <li key={product.id} className={classes.deal_item}>
              <Link
                to={product.id}
                onClick={() => context.todaysDeal(product.id)}
              >
                <img
                  className={classes.deal_product_image}
                  src={product.image}
                  alt="product_image"
                />
                <div className={classes.about_product}>
                  <span className={classes.discount}>{product.offer}</span>
                  <span className={classes.duration}>Limited time deal</span>
                </div>
                <div className={classes.product_pricing}>
                  <span
                    className={`${classes.product_price} ${classes.price_logo}`}
                  >
                    ₹
                  </span>
                  <span
                    className={`${classes.product_price} ${classes.original_price}`}
                  >
                    {product.minPrice.amount}
                  </span>
                  <span className={`${classes.product_price} ${classes.mrp}`}>
                    M.R.P.:{product.minPrice.amount}
                  </span>
                </div>
                <div className={classes.product_title}>
                  <span>{product.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {Array.isArray(todaysDeal) && !todaysDeal.length === 0 && (
          <PaginationButton container={getWidth} />
        )}
      </div>
    </div>
  );
}
