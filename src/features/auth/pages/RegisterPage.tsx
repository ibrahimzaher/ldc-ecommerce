import CustomCheckbox from "@/shared/components/ui/CustomCheckbox";
import CustomInput from "@/shared/components/ui/CustomInput";
import { Button } from "@/shared/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/shared/components/ui/native-select";
import { RegisterValidationSchema } from "@/shared/utils/validation";
import { useFormik } from "formik";
import AuthFooter from "../layouts/AuthFooter";
import AuthHeader from "../layouts/AuthHeader";
import { useAuth } from "../hooks/useAuth";
import type { RegisterRequest } from "../types/authRequest";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const handleSubmit = (values: RegisterRequest) => {
    mutateRegister.mutate(values);
  };
  const { mutateRegister } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
      status: "Active",
      rememberMe: false,
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section className="flex  flex-col items-center px-4 py-6 justify-center min-h-screen bg-white">
      <AuthHeader title="Join Our Community" />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 w-full max-w-sm"
      >
        <CustomInput
          type="text"
          id="name"
          label="Name"
          placeholder="Name"
          {...formik.getFieldProps("name")}
          error={formik.touched.name && formik.errors.name}
        />
        <CustomInput
          id="E-mail"
          label="E-mail"
          placeholder="E-mail"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && formik.errors.email}
        />
        <div className="flex flex-row gap-6">
          <CustomInput
            id="password"
            label="Password"
            placeholder="Password"
            type="password"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && formik.errors.password}
          />
          <CustomInput
            id="confirm-password"
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            {...formik.getFieldProps("confirmPassword")}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </div>
        <div className="flex flex-row gap-6">
          <CustomInput
            id="address"
            label="Address"
            placeholder="Address"
            {...formik.getFieldProps("address")}
            error={formik.touched.address && formik.errors.address}
          />
        </div>
        <CustomInput
          id="phone"
          label="Phone"
          placeholder="Phone"
          {...formik.getFieldProps("phone")}
          error={formik.touched.phone && formik.errors.phone}
        />
        <NativeSelect
          className="w-full bg-gray-50"
          {...formik.getFieldProps("status")}
        >
          <NativeSelectOption value="Active">Active</NativeSelectOption>
          <NativeSelectOption value="InActive">InActive</NativeSelectOption>
        </NativeSelect>

        <CustomCheckbox
          id="remember"
          label="Remember me"
          checked={formik.values.rememberMe}
          onCheckedChange={(checked) =>
            formik.setFieldValue("rememberMe", checked)
          }
        />
        <Button
          variant="primary"
          type="submit"
          disabled={mutateRegister.isPending}
        >
          Sign up{" "}
          {mutateRegister.isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
      <AuthFooter
        link="/login"
        linkText="Sign in"
        title="Already have an account?"
      />
    </section>
  );
}
