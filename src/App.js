import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./Routes/Header";
import HomePage from "./Routes/HomePage";
import ProductDetails from "./Routes/ProductDetails";
import CartContextProvider from "./Store/ContexrStore";
import Error from "./Routes/Error";
import ProductSummary from "./Routes/AllProductSummary";
import SearchResults, {
  action as searchAction,
} from "./Routes/SearcedhResults";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      errorElement: <Error />,

      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: ":productList",
          element: <ProductDetails />,
        },
        {
          path: "searchresults",
          element: <SearchResults />,
          action: searchAction,
        },
        {
          path: "productDetails/:productid",
          element: <ProductSummary />,
        },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <RouterProvider router={route} />
        </CartContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
