import classes from "./SearchedResult.module.css";
import { SearchAnyProduct } from "../Fetch functions/FetchApi";
import { ProductDetailsContext } from "../Store/ContexrStore";

import { useContext } from "react";
import { Link, useActionData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function SearchResults() {
  const context = useContext(ProductDetailsContext);
  const inputValue = useActionData();

  const { data: productItems, isLoading } = useQuery({
    queryKey: ["Search-result"],
    queryFn: () => SearchAnyProduct(inputValue),
  });

  return (
    <>
      {isLoading && <span className="loading_text">Loading</span>}
      {!productItems && !isLoading && (
        <span className="loading_text">Search for a product</span>
      )}
      {productItems?.length !== 0 && productItems?.error && (
        <span className="loading_text">{productItems.error.message}</span>
      )}
      {productItems &&
        productItems?.length !== 0 &&
        !isLoading &&
        !productItems?.error && (
          <div className={classes.search_result_container}>
            <div className={classes.search_result_category}>
              {/* <div className={classes.category_name}>
                <div className={classes.category_sponsered}>
                  <span className={classes.category_sponsered_icon}>
                    <i class="fa-solid fa-circle-exclamation"></i>
                  </span>
                  <span className={classes.sponser_text}>sponsered</span>
                </div>
                <span className={classes.sponser}>
                  <img
                    alt=""
                    className={classes.sponser_image}
                    src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/c2cb9fe4-5dc1-4e27-9415-1d6976feaa3c.gif"
                  />
                </span>
              </div> */}
            </div>
            <div className={classes.all_fetched_product}>
              <h2>Results</h2>
              <div className={classes.fetched_products}>
                <ul className={classes.fetched_productList}>
                  {productItems?.productList?.map((item) => (
                    <Link to={`../productDetails/${item.id}`} key={item.id}>
                      <li
                        onClick={() =>
                          context.getSelectedProductSummary(item.id)
                        }
                        className={classes.fetched_product_item}
                      >
                        <div className={classes.image_container}>
                          <span className={classes.product_image_wrapper}>
                            <img
                              className={classes.product_image}
                              src={item.image}
                              alt="productimage"
                            />
                          </span>
                        </div>

                        <div className={classes.product_overview}>
                          <p className={classes.product_item_title}>
                            {item.title ? item.title : ""}
                          </p>
                          <span className={classes.product_item_volume}>
                            {item.salesVolume ? item.salesVolume : ""}
                          </span>
                          <span className={classes.product_item_duration}>
                            Limited Time Deal
                          </span>
                          <span className={classes.product_min_price}>
                            {item.minPrice}
                          </span>
                          <span className={classes.product_max_price}>
                            {item.maxprice}
                          </span>
                          <span className={classes.product_delivey_date}>
                            {item.delivery}
                          </span>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const inputValue = formData.get("value");

  return inputValue;
}
