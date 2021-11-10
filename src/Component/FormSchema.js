import * as yup from "yup";

const FormSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .matches(/[a-zA-Z]/, "Your name can only contain letters."),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Your Password must be 6 characters or more")
    .matches(/[a-zA-Z]/, "Password can only contain letters"),
  serviceTerms: yup.boolean().oneOf([true], "Must accepts terms"),
});
export default FormSchema;
