import { createContext, useReducer } from "react";
import {
  getDetails,
  getDealsDetails,
  SearchAnyProduct,
} from "../Fetch functions/FetchApi";
import { json } from "react-router";

export const ProductDetailsContext = createContext({
  cartItems: [],
  itemName: "",
  productList: undefined,
  isLoading: true,
  productDetails: [],
  openModel: () => {},
  fetchProduct: () => {},
  getProductDetails: () => {},
  productName: () => {},
  todaysDeal: () => {},
  getSelectedProductSummary: () => {},
  AddItemsTocart: () => {},
});

function productListReducer(state, action) {
  if (action.type === "clear") {
    return {
      ...state,
      itemName: "",
      ProductList: null,
      productDetails: [],
    };
  }
  if (action.type === "recommended-product") {
    return {
      ...state,
      itemName: action.payload.productName,
      ProductList: action.payload.data,
    };
  }

  if (action.type === "todays-deal") {
    return {
      ...state,
      itemName: "",
      ProductList: action.payload,
    };
  }

  if (action.type === "selected-poduct-details") {
    return {
      ...state,
      productDetails: action.payload,
    };
  }

  if (action.type === "Add-to-cart") {
    state.cartItems.push({
      title: action.payload.title || action.payload.productTitle,
      id: action.payload.id,
      image: action.payload.image,
      price: action.payload.minPrice,
      quantity: 1,
    });

    localStorage.setItem("product", JSON.stringify(state.cartItems));

    return {
      ...state,
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [productListState, productListDispatch] = useReducer(
    productListReducer,
    {
      isModelOpen: false,
      cartItems: [],
      itemName: "",
      ProductList: null,
      productDetails: [],
    }
  );

  function clearLoadedData() {
    const isOpen = false;
    productListDispatch({
      type: "clear",
      payload: isOpen,
    });
  }

  async function getTargetValue(event) {
    // clearLoadedData();
    const productName = event.target.innerHTML;
    const data = await SearchAnyProduct(productName);
    productListDispatch({
      type: "recommended-product",
      payload: { data, productName },
    });
  }

  async function getTodaysDealData(dealid) {
    // clearLoadedData();
    const data = await getDealsDetails(dealid);
    productListDispatch({
      type: "todays-deal",
      payload: data,
    });
  }

  async function getSelectedProductDetails(productid) {
    clearLoadedData();
    const data = await getDetails(productid);
    productListDispatch({
      type: "selected-poduct-details",
      payload: data,
    });
  }

  function AddToCart(product) {
    productListDispatch({
      type: "Add-to-cart",
      payload: product,
    });
  }

  const contextValue = {
    isModelOpen: productListState.isModelOpen,
    cartItems: productListState.cartItems,
    productDetails: productListState.productDetails,
    itemName: productListState.itemName,
    productList: productListState.ProductList,
    getProductDetails: getDetails,
    productName: getTargetValue,
    todaysDeal: getTodaysDealData,
    getSelectedProductSummary: getSelectedProductDetails,
    AddItemsTocart: AddToCart,
  };

  return (
    <ProductDetailsContext.Provider value={contextValue}>
      {children}
    </ProductDetailsContext.Provider>
  );
}
