import * as yup from "yup";

export default yup.object().shape({
    classname: yup
    .string()
    .required("class name is required")
    .min(6, "class name must be 6 character"),
  
    classcost: yup
    .string(),

    address: yup
    .string()
    .required("address is required")
    .min(5, "address must be 5 characters"),

    classsize: yup
    .string()
    .required("class size is required")
    .min(1, "class size must be 1 character"),

    classlength: yup
    .string()
    .required("class length is required")
    .min(1, "class length must be 1 character"),

    start: yup
    .string()
    .required("start time is required")
    .min(3, "start time must be 4 character"),
    
    classtype: yup
    .string()
    .oneOf(["yoga", "boxing", "weights","cardio","medetation"], "class type is required"),

    classlevel: yup
    .string(),

    sunday: yup.boolean(),
    monday: yup.boolean(),
    tuesday: yup.boolean(),
    wednesday: yup.boolean(),
    thursday: yup.boolean(),
    friday: yup.boolean(),
    saturday: yup.boolean(),
});