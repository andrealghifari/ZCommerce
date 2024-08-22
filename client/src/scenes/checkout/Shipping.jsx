import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  // console.log("🚀 ~ setFieldValue:", setFieldValue)
  // console.log("🚀 ~ handleChange:", handleChange)
  // console.log("🚀 ~ handleBlur:", handleBlur)
  // console.log("🚀 ~ touched:", touched)
  // console.log("🚀 ~ errors:", errors)
  // console.log("🚀 ~ values:", values)
  return (
    <Box margin="30px auto">
      {/* BILLING FORM */}
      <Box>
        <Typography mb="15px" fontSize="15px">
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

      <Box mb="20px">
        <FormControlLabel
          label="Same as Shipping Address"
          control={
            <Checkbox
              defaultChecked
              value={(values.shippingAddress.isSameAddress)}
              onChange={() =>
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  !values.shippingAddress.isSameAddress
                )
              }
            />
          }
        ></FormControlLabel>
      </Box>

      {/* SHIPPING FORM */}
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography mb="15px" fontSize="15px">
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
