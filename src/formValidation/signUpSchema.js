import * as yup from "yup";

export default yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .min(6, "name must be 6 character"),
  
  username: yup
    .string()
    .required("username is required")
    .min(6, "username must be 6 character"),
  
  password: yup
    .string()
    .required("password is required")
    .min(6, "password must be 6 character"),
    
  email: yup
    .string()
    .email()
    .required("email is required") 
});
