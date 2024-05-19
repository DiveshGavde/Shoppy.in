import { Link } from "react-router-dom";

import { productList3 } from "../SuggestedProductList.js/SuggestedProduct";
import { ProductDetailsContext } from "../Store/ContexrStore";
import { useContext } from "react";
export default function BestSeller() {
  const contextValue = useContext(ProductDetailsContext);
  return (
    <div className="grid_container">
      <span id="span">Best seller | shop now</span>
      <div className="suggested_product">
        {productList3.map((item) => (
          <div key={item.title} className="view_suggested_product">
            <Link to={item.title}>
              <figure>
                <img
                  alt="productimage"
                  className="suggested_product_image"
                  src={item.image}
                />
              </figure>
              <span
                onClick={contextValue.productName}
                className="product_category"
              >
                {" "}
                {item.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
