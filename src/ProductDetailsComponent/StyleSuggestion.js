import { Link } from "react-router-dom";

import { productList2 } from "../SuggestedProductList.js/SuggestedProduct";
import { ProductDetailsContext } from "../Store/ContexrStore";
import { useContext } from "react";
export default function StyleSuggestion() {
  const contextValue = useContext(ProductDetailsContext);
  return (
    <div className="grid_container">
      <span id="span">Get the best style for you | shop now</span>
      <div className="suggested_product">
        {productList2.map((item) => (
          <div key={item.title} className="view_suggested_product">
            <Link to={item.title}>
              <figure>
                <img
                  alt="product-image"
                  className="suggested_product_image"
                  src={item.image}
                />
              </figure>
              <span
                onClick={contextValue.productName}
                className="product_category"
              >
                {item.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
