import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup"; //validation library for form
import { shades } from "../../theme";
import Shipping from "./Shipping";
import Payment from "./Payment";
import api, { apiBackend } from "../../services/api";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51PqdxF04wOZ1AoiC7zshGao3jaq2BYcqCL0jz8gzEEtFR78aChghcTRzhDgUx9Ii0BKkY1V9sJIGtK6DractCTBb00ZGPhBMad"
);
const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [validate, setValidate] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // copies billing address into shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
      // apiBackend
      //   .post("/api/validate/checkout", {
      //     valueBilling: values?.billingAddress,
      //     valueShipping: values?.shippingAddress,
      //   })
      //   .then((response) => console.log(response))
      //   .catch((error) => {
      //     console.error(error);
      //     setValidate(error.response.data.errror);
      //   });
    }
    console.log(`values in handleFormSubmit : `, values);
    if (isSecondStep) {
      // apiBackend
      //   .post("/api/validate/checkout", {
      //     valueBilling: values?.billingAddress,
      //     valueShipping: values?.shippingAddress,
      //     email: values?.email,
      //     phoneNumber: values?.phoneNumber,
      //   })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     setValidate(error.response.data.errror);
      //   });
      makePayment(values);
    }
    actions.setTouched({});
  };
  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      data: {
        userName: [
          values.billingAddress.firstName,
          values.billingAddress.lastName,
        ].join(" "),
        email: values.email,
        products: cart.map(({ id, count }) => ({
          id,
          count,
        })),
      },
    };

    console.log(`Request Body value`, requestBody);

    await api
      .post(`/api/orders`, requestBody)
      .then((response) => {
        console.log(`hit api orders result : `, response);

        const sessionId = response.data.id;
        stripe.redirectToCheckout({
          sessionId: sessionId,
        });
      })
      .catch((error) => console.error(error));
  }

  return (
    <Box width="80%" margin="80px auto">
      <Stepper activeStep={activeStep} sx={{ margin: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>

      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          // validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="15px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {isFirstStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street: yup.string().required("required"),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required(),
        //otherwise: yup.string().notRequired(),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required(),
        //otherwise: yup.string().notRequired(),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required(),
        //otherwise: yup.string().notRequired(),
      }),
      street: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required(),
        //otherwise: yup.string().notRequired(),
      }),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required(),
        //otherwise: yup.string().notRequired(),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required(),
        //otherwise: yup.string().notRequired(),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

// const getCheckoutSchema = (step) => {
//   console.log(step)
//   switch (step) {
//     case 0:
//       return yup.object().shape({
//         billingAddress: yup.object().shape({
//           firstName: yup.string().required("required"),
//           lastName: yup.string().required("required"),
//           country: yup.string().required("required"),
//           street: yup.string().required("required"),
//           city: yup.string().required("required"),
//           state: yup.string().required("required"),
//           zipCode: yup.string().required("required"),
//         }),
//         shippingAddress: yup.object().shape({
//           isSameAddress: yup.boolean(),
//           firstName: yup.string().when("isSameAddress", {
//             is: false,
//             then: yup.string().required(),
//             //otherwise: yup.string().notRequired(),
//           }),
//           lastName: yup.string().when("isSameAddress", {
//             is: false,
//             then: yup.string().required(),
//             //otherwise: yup.string().notRequired(),
//           }),
//           country: yup.string().when("isSameAddress", {
//             is: false,
//             then: yup.string().required(),
//             //otherwise: yup.string().notRequired(),
//           }),
//           street: yup.string().when("isSameAddress", {
//             is: false,
//             then: yup.string().required(),
//             //otherwise: yup.string().notRequired(),
//           }),
//           city: yup.string().when("isSameAddress", {
//             is: false,
//             then: yup.string().required(),
//             //otherwise: yup.string().notRequired(),
//           }),
//           zipCode: yup.string().when("isSameAddress", {
//             is: false,
//             then: yup.string().required(),
//             //otherwise: yup.string().notRequired(),
//           }),
//         }),
//       });
//     case 1:
//       return yup.object().shape({
//         email: yup.string().required("required"),
//         phoneNumber: yup.string().required("required"),
//       });
//     default:
//       return yup.object();
//   }
// };

export default Checkout;
