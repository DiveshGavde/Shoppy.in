import { getUserLocation } from "../HeaderComponents/GetusersLocation";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import classes from "./Header.module.css";
import SearchInput from "../HeaderComponents/SearchInput";
import Login from "../HeaderComponents/Login";
import Cart from "../HeaderComponents/Cart";
import CartModel from "../ProductDetailsComponent/CartModel";
export default function Header() {
  const [location, setLocation] = useState();

  useEffect(() => {
    async function getLocation() {
      try {
        const data = await getUserLocation();
        setLocation(data);
      } catch (error) {
        setLocation(error);
      }
    }
    getLocation();
  }, []);

  return (
    <>
      <header>
        <div className={classes.header}>
          <div className={classes.brandname}>
            <h2>Shoppy</h2>
            <h2 id={classes.h2}>.in</h2>
          </div>
          <div className={classes.user_location}>
            <i
              className={`fa-solid fa-location-dot ${classes.location_icon}`}
            ></i>
            <p>{!location && "fetching location"}</p>
            <p>
              {location?.message
                ? "Allow Execess to get your current location"
                : `Delivering to ${location?.city} ${location?.postcode} `}
            </p>
          </div>
          <SearchInput />
          <Login />
          <Cart />
        </div>
      </header>
      <Outlet />
    </>
  );
}
