import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Tab, Tabs } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import Item from "../../components/Item";
import api from "../../services/api";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState({});
  const [items, setItems] = useState([]);
  const [checkImg, setCheckImg] = useState("");

  // FUNCTIONS
  //fn handleChange to control value of tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getItem = async () => {
    const dataItem = await api
      .get(`/api/items/${id}?populate=image`)
      .then((response) => {
        console.log(response.data.data);
        setItem(response.data.data);
        setCheckImg(
          response.data.data.attributes?.image?.data?.attributes?.formats
            ?.medium?.url
        );
      })
      .catch((error) => console.error(error));
  };
  const getItems = async () => {
    const dataItems = await api
      .get(`/api/items?populate=image`)
      .then((response) => {
        // console.log(response.data.data);
        setItems(response.data.data);
      })
      .catch((error) => console.error(error));
  };

  // function to handle rich text content
  const getTextContent = (richText) => {
    return richText?.map((paragraph, index) =>
      paragraph.children.map((child, idx) => (
        <span key={`${index}-${idx}`}>{child.text}</span>
      ))
    );
  };

  //function to generate 4 random numbs for related products items
  const getRandomIndices = (max, count) => {
    const indices = new Set();
    while (indices < count) {
      const randomIndex = Math.floor(Math.random() * max);
      indices.add(randomIndex);
    }

    return [...indices];
  };
  const randomIndices = getRandomIndices(items.length, 4);
  const randomItems = randomIndices.map((index) => items[index]);
  useEffect(() => {
    getItem();
    getItems();
  }, [id]);

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMG DISPLAY */}
        {checkImg && (
          <Box flex="1 1 40%" mb="40px">
            <img
              src={`http://localhost:1337${checkImg}`}
              alt={item?.attributes?.name}
              width="100%"
              height="100%"
              style={{ objectFit: "contain" }}
            />
          </Box>
        )}

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>
          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>${item?.attributes?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {getTextContent(item?.attributes?.shortDescription)}
            </Typography>
          </Box>

          {/* COUNTER AND BUTTON */}
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[500]}`}
              mr="20px"
              padding="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>

          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlined />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            {item?.attributes?.category && (
              <Typography m="20px 0">
                Category :{" "}
                {item?.attributes?.category
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="" />
        </Tabs>
      </Box>

      <Box display="flex" flex="wrap" gap="15px">
        {value === "description" && (
          <div>{getTextContent(item?.attributes?.longDescription)}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>

        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {randomItems.map((item, index) => (
            <Item
              key={`${item?.attributes?.name} - ${index}`}
              item={item}
              width="200px"
              height="300px"
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
