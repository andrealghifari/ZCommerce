import { Route, Routes } from "react-router-dom";
import Home from "../scenes/home/Home";
import ItemDetails from "../scenes/itemDetails/ItemDetails";
import Checkout from "../scenes/checkout/Checkout";
import Confirmation from "../scenes/checkout/Confirmation";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="item/:id" element={<ItemDetails/>}></Route>
      <Route path="checkout" element={<Checkout/>}></Route>
      <Route path="checkout/success" element={<Confirmation/>}></Route>
    </Routes>
  );
};

export default AppRoutes;
