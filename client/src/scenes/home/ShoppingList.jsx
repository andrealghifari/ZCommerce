import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import { setItems } from "../../state";
import Item from "../../components/Item";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  console.log("🚀 items:", items);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const handleChange = (event, newVal) => {
    setValue(newVal);
  };
  const topRated = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  const bestSellers = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );
  const newArrivals = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );

  //   item category

  async function getItems() {
    const dataItems = await fetch(
      `http://localhost:1337/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    const dataItemsJson = await dataItems.json();
    dispatch(setItems(dataItemsJson.data));
  }
  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box width="80%" margin={"80px auto"}>
      <Typography variant={isNonMobile ? "h2" : "h3"} textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: {display : isNonMobile ? "block" : "none"} }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value={"all"}></Tab>
        <Tab label="NEW ARRIVALS" value={"newArrivals"}></Tab>
        <Tab label="BEST SELLERS" value={"bestSellers"}></Tab>
        <Tab label="TOP RATED" value={"topRated"}></Tab>
      </Tabs>

      {/* This box below will set up list of image that 
            automatically grid the images and make em responsive
         */}
      <Box
        m="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {/* {value === "all" &&
          items.map((item) => {
            console.log(`${item.attributes.name} - ${item.id}`);
          })} */}
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        {value === "newArrivals" && newArrivals.map((item) => (
            <Item item={item} key={`${item.name} - `}></Item>
        ))}
        {value === "bestSellers" && bestSellers.map((item) => (
            <Item item={item} key={`${item.name} - `}></Item>
        ))}
        {value === "topRated" && topRated.map((item) => (
            <Item item={item} key={`${item.name} - `}></Item>
        ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
