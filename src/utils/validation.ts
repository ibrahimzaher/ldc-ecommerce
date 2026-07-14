import * as Yup from "yup";
export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email address"),

  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export const RegisterValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must not exceed 50 characters"),
  address: Yup.string()
    .trim()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must not exceed 100 characters"),
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phone: Yup.string()
    .trim()
    .required("Phone number is required")
    .matches(
      /^\+?\d{11,14}$/,
      "Phone number must be between 11 and 14 digits, with an optional '+' sign at the beginning",
    ),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character",
    ),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
