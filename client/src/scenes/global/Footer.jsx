import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="80px" padding={"40px 0"} backgroundColor={neutral.light}>
      <Box
        width="80%"
        display="flex"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px,40px)"
        justifyContent="space-between"
        margin="auto"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography variant="h4" color={shades.secondary[500]} mb="30px" letterSpacing="2px">
            Z-Commerce
          </Typography>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            ratione eveniet laudantium illum doloremque quidem reiciendis nisi
            voluptates at, fuga provident suscipit quis asperiores impedit,
            maxime perspiciatis. Deleniti, porro voluptatem!
          </div>
        </Box>
        <Box>
          <Typography fontWeight="bold" variant="h4" mb="30px" sx={{textDecoration : "underline"}}>About Us</Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold" variant="h4" mb="30px" sx={{textDecoration : "underline"}}>Customer Care</Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold" variant="h4" mb="30px" sx={{textDecoration : "underline"}}>Contact Us</Typography>
          <Typography mb="30px">
            50 north Whatever Blvd, Washington, DC 10501
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: zcommerce@gmail.com
          </Typography>
          <Typography mb="30px">(222)333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
