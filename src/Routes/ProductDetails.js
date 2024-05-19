import classes from "./ProductDetails.module.css";
import { Link } from "react-router-dom";
import SuggestedCategoryDetails from "../SuggestedProductList.js/suggestedCatogeryDetails";
import { ProductDetailsContext } from "../Store/ContexrStore";
import { useContext } from "react";

export default function ProductDetails() {
  const product = useContext(ProductDetailsContext).productList;
  const context = useContext(ProductDetailsContext);

  let removeCurrencyLogo;
  let removeCurrencyLogo2;
  let priceAfterDiscount;
  let priceBeforeDiscount;
  let offerPrice;
  let calcDiscountPercentage;
  return (
    <>
      {!product && <span className="loading_text">Loading data...</span>}
      {product?.error && (
        <span className={classes.error_message}>{product.error.message}</span>
      )}
      <div className={classes.product_result}>
        <div className={classes.category_container}>
          {product && !product?.error && (
            <>
              <h2 className={classes.h2}>Categories</h2>
              <SuggestedCategoryDetails />
            </>
          )}
        </div>
        <div className={classes.productitem_details}>
          {product?.productList && (
            <div className={classes.heading}>
              <span>Results</span>
            </div>
          )}

          <ul className={classes.productitems}>
            {product &&
              product.productList?.map((item) => {
                const minprice = item.minPrice;
                const maxPrice = item.maxprice;

                const toarray = minprice?.split("");
                const toarray2 = maxPrice?.split("");

                if (toarray && toarray2) {
                  removeCurrencyLogo = toarray
                    .slice(1, toarray.length)
                    .toString()
                    .replaceAll(",", "");

                  removeCurrencyLogo2 = toarray2
                    .slice(1, toarray2.length)
                    .toString()
                    .replaceAll(",", "");

                  priceAfterDiscount = +removeCurrencyLogo;
                  priceBeforeDiscount = +removeCurrencyLogo2;

                  offerPrice = priceBeforeDiscount - priceAfterDiscount;
                  calcDiscountPercentage =
                    (offerPrice / priceBeforeDiscount) * 100;
                }

                let content;
                let cssClasses;

                if (
                  item.additionalInfo !== undefined &&
                  priceAfterDiscount < 500
                ) {
                  content = "Free delivery on order above ₹499";
                  cssClasses = "delivery_condition";
                }

                if (item.additionalInfo && priceAfterDiscount > 500) {
                  content = "Free Delivery";
                  cssClasses = "free_delivery";
                }

                return (
                  <Link
                    className={classes.link}
                    key={item.id}
                    to={`../productDetails/${item.id}`}
                  >
                    <li
                      onClick={() => {
                        context.getSelectedProductSummary(item.id);
                      }}
                      className={classes.productitems_list}
                    >
                      <div className={classes.img_wrapper}>
                        <img
                          className={classes.productitem_image}
                          src={item.image}
                          alt="productimg"
                        />
                      </div>

                      <h3 className={classes.productitem_title}>
                        {item.title}
                      </h3>
                      <div>
                        <span className={classes.product_price}>
                          {item.minPrice}
                        </span>
                        <span className={classes.product_maxprice}>
                          M.R.P.:{item.maxprice}
                        </span>
                      </div>
                      {item.salesVolume && (
                        <span className={classes.sales_volume}>
                          {item.salesVolume}
                        </span>
                      )}
                      {item.dealValidUpto && (
                        <span className={classes.deal_duration}>
                          {item.dealValidUpto}
                        </span>
                      )}

                      {calcDiscountPercentage && (
                        <span className={classes.total_discount}>
                          ({Math.trunc(calcDiscountPercentage)}% off)
                        </span>
                      )}
                      <p className={classes.delivery_date}>{item.delivery}</p>
                      {item.isBestSeller && (
                        <span className={classes.best_seller}>best seller</span>
                      )}

                      {content && (
                        <span className={classes.delivery_condition}>
                          {" "}
                          {content}
                        </span>
                      )}
                    </li>
                  </Link>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
