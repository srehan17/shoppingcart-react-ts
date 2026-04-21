import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};