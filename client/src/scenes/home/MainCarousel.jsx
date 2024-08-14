import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

// import all images from asset folder
const importAll = (r) => {
  return r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});
};

const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpeg|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <div>
      <Carousel
        style={{ backgroundColor: "red" }}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        autoPlay
        interval={3000}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              color: "white",
              padding: "5px",
              zIndex: "10",
            }}
          >
            <NavigateBeforeIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              color: "white",
              padding: "5px",
              zIndex: "10",
            }}
          >
            <NavigateNextIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        )}
      >
        {Object.values(heroTextureImports).map((texture, index) => {
          return (
            <Box key={`carousel-image-${index}`}>
              <img
                src={texture}
                alt={`carousel-${index}`}
                style={{
                  width: "100%",
                  height: "700px",
                  objectFit: "cover",
                  backgroundAttachment: "fixed",
                }}
              />
              <Box
                color="white"
                padding="20px"
                borderRadius="1px"
                textAlign="left"
                backgroundColor="rgba(0,0,0,0.4)"
                position="absolute"
                top="46%"
                left={isNonMobile ? "10%" : "0"}
                right={isNonMobile ? undefined : "0"}
                margin={isNonMobile ? undefined : "0 auto"}
                maxWidth={isNonMobile ? undefined : "240px"}
              >
                <Typography color={shades.secondary[200]}>
                  --NEW ITEMS
                </Typography>
                <Typography variant="h1">Summer Sale</Typography>
                <Typography
                  fontWeight={"bold"}
                  color={shades.secondary[300]}
                  sx={{
                    textDecoration: "underline",
                  }}
                >
                  Discover More
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MainCarousel;
