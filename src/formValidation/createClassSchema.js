import * as yup from "yup";

export default yup.object().shape({
    classname: yup
    .string()
    .required("class name is required")
    .min(6, "class name must be 6 character"),
  
    classdescription: yup
    .string()
    .required("class description is required")
    .min(10, "classdescription must be 10 character"),
  
    classcost: yup
    .string()
    .required("class cost is required")
    .min(1, "class cost must be 1 character"),
    
    classequipment: yup
    .string(),

    address: yup
    .string()
    .required("address is required")
    .min(6, "address must be 6 character"),

    classsize: yup
    .string()
    .required("class size is required")
    .min(1, "class size must be 1 character"),

    classlength: yup
    .string()
    .required("class length is required")
    .min(1, "class length must be 1 character"),

    arrivetime: yup
    .string()
    .required("arrive time is required")
    .min(3, "arrive time must be 4 character"),

    whattoknow: yup
    .string(),

    start: yup
    .string()
    .required("start time is required")
    .min(3, "start time must be 4 character"),
    
    classtype: yup
    .string()
    .oneOf(["yoga", "boxing", "weights"], "class type is required"),

    classlevel: yup
    .string()
    .oneOf(["easy", "medium", "hard"], "class level is required"),

    sunday: yup.boolean(),
    monday: yup.boolean(),
    tuesday: yup.boolean(),
    wednesday: yup.boolean(),
    thursday: yup.boolean(),
    friday: yup.boolean(),
    saturday: yup.boolean(),
});