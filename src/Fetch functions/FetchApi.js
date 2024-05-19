import { UNSAFE_DataRouterContext } from "react-router";

export async function DealOfDay() {
  const url = "https://real-time-amazon-data.p.rapidapi.com/deals?country=IN";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9c1a57be6fmsh7c2be57b2745553p15147bjsn035b23eb3426",
      "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.status === "ERROR") {
      return result.error;
    }

    const { deals } = result.data;
    const dealItems = deals.map((items) => {
      return {
        offer: items.deal_badge,
        id: items.deal_id,
        image: items.deal_photo,
        url: items.deal_url,
        title: items.deal_title,
        maxPrice: {
          amount: items.deal_price_max?.amount,
          currency: items.deal_price_max?.currency,
        },
        minPrice: {
          amount: items.deal_price_min?.amount,
          currency: items.deal_price_min?.currency,
        },
      };
    });

    return dealItems;
  } catch (error) {
    console.error(error);
  }
}

export async function SearchAnyProduct(productname) {
  if (!productname) return;
  const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${productname}&page=1&country=IN&category_id=aps`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9c1a57be6fmsh7c2be57b2745553p15147bjsn035b23eb3426",
      "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    return {
      error: {
        message:
          "something went wrong cound not load the data,Please try again,or check your network connection.",
      },
    };
  }
  const result = await response.json();
  const totalResult = result?.data?.total_products;

  const { data } = result;

  const productList = data.products.map((item) => {
    return {
      id: item.asin,
      isPrime: item.is_prime,
      currency: item.currency,
      delivery: item.delivery,
      isAmazonChoice: item.is_amazon_choice,
      isBestSeller: item.is_best_seller,
      minPrice: item.product_price,
      maxprice: item.product_original_price,
      image: item.product_photo,
      title: item.product_title,
      salesVolume: item.sales_volume,
      totalProducts: totalResult,
    };
  });
  return { productList };
}

export async function getDetails(productId) {
  const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${productId}&country=IN`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9c1a57be6fmsh7c2be57b2745553p15147bjsn035b23eb3426",
      "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return {
        error: {
          message:
            "Could not load the product details,Please try again or check yout internet connection",
        },
      };
    }
    const result = await response.json();

    const { data } = result;

    const productPriceToNumber = data.product_price?.replace(",", "");
    const productMaxPrice = data.product_original_price
      ?.replace(",", "")
      .replace("₹", "");

    const productDeatils = {
      aboutProduct: data.about_product,
      id: data.asin,
      country: data.country,
      currency: data.currency,
      isAmazonChoice: data.is_amazon_choice,
      isBestSeller: data.is_best_seller,
      productAvailability: data.product_availability,
      productdetails: data.product_details,
      productInformation: data.product_information,
      productRating: data.product_num_ratings,
      maxPrice: +productMaxPrice,
      minPrice: +productPriceToNumber,
      image: data.product_photo,
      productImages: data.product_photos,
      productStarRating: data.product_star_rating,
      productTitle: data.product_title,
      review_aspects: data.review_aspects,
      salesVolume: data.sales_volume,
    };

    return productDeatils;
  } catch (error) {
    console.error(error);
  }
}

export async function getDealsDetails(productid) {
  const url = `https://real-time-amazon-data.p.rapidapi.com/deal-products?deal_id=${productid}&country=IN&page=1`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9c1a57be6fmsh7c2be57b2745553p15147bjsn035b23eb3426",
      "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return {
        error: {
          message:
            "something went wrong cound not load the data,Please try again,or check your network connection.",
        },
      };
    }

    const result = await response.json();
    const totalresults = result.data.products.length;

    const products = result.data.products.map((item) => {
      return {
        id: item.product_asin,
        dealValidUpto: item.deal_badge,
        minPrice: item.deal_price,
        maxprice: item.list_price,
        image: item.product_photo,
        title: item.product_title,
        totaldiscount: item.savings_percentage || "",
        totalProducts: totalresults,
        additionalInfo: item.additional_info,
      };
    });

    return { productList: products };
  } catch (error) {
    console.error(error);
  }
}
