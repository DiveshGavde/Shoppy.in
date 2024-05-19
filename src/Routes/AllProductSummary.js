import classes from "./AllProductSummary.module.css";
import { ProductDetailsContext } from "../Store/ContexrStore";
import ProductCartModel from "../ProductDetailsComponent/ProductCartModel";

import { useContext, useState } from "react";
import CartModel from "../ProductDetailsComponent/CartModel";
export default function ProductSummary() {
  const context = useContext(ProductDetailsContext);

  const calcPercentage =
    (context.productDetails.minPrice / context.productDetails.maxPrice) * 100;

  const discount = 100 - Math.round(calcPercentage);

  const [mainImage, setmainImage] = useState(
    context.productDetails?.productImages?.[0]
  );

  let getKeys;
  let getValues;

  if (
    context.productDetails?.productdetails !== null &&
    undefined &&
    context.productDetails?.length !== 0
  ) {
    getKeys = Object.keys(context.productDetails.productdetails) || "";
    getValues = Object.values(context.productDetails.productdetails) || "";
  }

  function updateMainImage(image) {
    setmainImage(image);
  }

  return (
    <div className={classes.product_summary_container}>
      {context.productDetails?.length === 0 && (
        <span className="loading_text">Loading data...</span>
      )}
      {context.productDetails?.error && (
        <span className="loading_text">
          {context.productDetails?.error.message}
        </span>
      )}
      {context.productDetails &&
        context.productDetails?.length !== 0 &&
        !context.productDetails?.error && (
          <div className={classes.product_image_wrapper}>
            <div className={classes.all_item_images}>
              <figure className={classes.all_product_images}>
                {context.productDetails?.productImages?.map(
                  (curImage, index) => (
                    <img
                      key={index * 2.5}
                      onClick={() => {
                        updateMainImage(curImage);
                      }}
                      className={classes.all_images}
                      src={curImage}
                      alt="productOptimage"
                    />
                  )
                )}
              </figure>
            </div>
            <div className={classes.product_summary}>
              <figure className={classes.main_image}>
                <img
                  className={classes.product_main_image}
                  src={mainImage ?? context.productDetails.image}
                  alt="productimage"
                />
              </figure>
              <div className={classes.about_product}>
                <span className={classes.product_title}>
                  {context.productDetails.productTitle}
                </span>
                <span className={classes.total_ratings}>
                  {context.productDetails.productRating ?? 0} ratings
                </span>
                <span className={classes.sales_volume}>
                  {context.productDetails.salesVolume ?? ""}
                </span>
                {context.productDetails.isAmazonChoice === true && (
                  <span>Amazon Choice</span>
                )}

                <span className={classes.total_discount}>{discount}% off</span>
                <span className={classes.product_minprice}>
                  ₹{context.productDetails.minPrice}
                </span>
                <span className={classes.product_maxprice ?? ""}>
                  M.R.P {context.productDetails.maxPrice ?? ""}
                </span>
                <span className={classes.taxes}>Inclusive of all taxes</span>
                <div className={classes.product_delivery_details}>
                  <ul className={classes.product_delivery_list}>
                    <li>
                      <span className={classes.product_replacement}>
                        <i
                          className={` ${classes.product_icons} fa-solid fa-rotate-left`}
                        ></i>
                      </span>
                      <span className={classes.product_other}>
                        7 days replacement
                      </span>
                    </li>
                    <li>
                      <span className={classes.product_replacement}>
                        <i
                          className={`${classes.product_icons} fa-solid fa-truck`}
                        ></i>
                        <span className={classes.product_other}>
                          free delivery
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className={classes.product_replacement}>
                        <i
                          className={`${classes.product_icons} fa-brands fa-amazon-pay`}
                        ></i>
                        <span className={classes.product_other}>
                          Pay on Delivery
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className={classes.product_replacement}>
                        <i
                          className={`${classes.product_icons} fa-solid fa-trophy`}
                        ></i>
                        <span className={classes.product_other}>Top Brand</span>
                      </span>
                    </li>
                  </ul>
                  <div className={classes.model_name}>
                    <ul className={classes.product_model_list}>
                      <div>
                        {getKeys?.map((curEl, index) => (
                          <li
                            key={index}
                            className={classes.about_product_brand}
                          >
                            <span>{curEl}</span>
                          </li>
                        ))}
                      </div>
                      <div>
                        {getValues?.map((curEl, index) => (
                          <li
                            key={index * 100}
                            className={classes.product_brandname_oth}
                          >
                            <span>{curEl}</span>
                          </li>
                        ))}
                      </div>
                    </ul>
                  </div>
                  <div className={classes.full_product_description}>
                    <h3>About this item</h3>
                    <ul className={classes.product_description_list}>
                      {context.productDetails.aboutProduct?.map(
                        (curEl, index) => (
                          <li
                            key={index * 48}
                            className={classes.product_description_point}
                          >
                            <span>{curEl}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <ProductCartModel itemDetails={context.productDetails} />
            </div>
          </div>
        )}
    </div>
  );
}
