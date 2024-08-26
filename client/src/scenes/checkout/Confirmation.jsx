import { Alert, AlertTitle, Box } from "@mui/material";

const Confirmation = () => {
  return (
    <Box margin="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order -{" "}
        <strong>We'll be shipping and delivering to you right away!</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;
