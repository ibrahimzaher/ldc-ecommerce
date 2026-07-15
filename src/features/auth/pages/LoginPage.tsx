import CustomCheckbox from "@/shared/components/ui/CustomCheckbox";
import CustomInput from "@/shared/components/ui/CustomInput";
import { Button } from "@/shared/components/ui/button";
import { LoginValidationSchema } from "@/shared/utils/validation";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import AuthFooter from "../layouts/AuthFooter";
import AuthHeader from "../layouts/AuthHeader";
import { useAuth } from "../hooks/useAuth";
import type { LoginRequest } from "../types/authRequest";
export const LoginPage = () => {
  const handleSubmit = (values: LoginRequest) => {
    mutateLogin.mutate(values);
  };
  const { mutateLogin } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: LoginValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section className="flex  flex-col px-4 py-6 items-center justify-center min-h-screen bg-white">
      <AuthHeader title="Sign in to your account" />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 w-full max-w-sm"
      >
        <CustomInput
          id="E-mail"
          label="E-mail"
          placeholder="E-mail"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && formik.errors.email}
        />
        <CustomInput
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && formik.errors.password}
        />
        <CustomCheckbox
          id="rememberMe"
          label="Remember me"
          checked={formik.values.rememberMe}
          onCheckedChange={(checked) =>
            formik.setFieldValue("rememberMe", checked === true)
          }
        />
        <Button
          variant="primary"
          type="submit"
          disabled={mutateLogin.isPending}
        >
          Sign in
          {mutateLogin.isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
      <AuthFooter
        link="/register"
        linkText="Sign up"
        title="Don’t have an account?"
      />
    </section>
  );
};
