import * as yup from "yup";

export default yup.object().shape({
  username: yup
    .string()
    .required("username is required")
    .min(6, "username must be 6 character"),
  
  password: yup
    .string()
    .required("password is required")
    .min(6, "password must be 6 character"),
});