import CustomCheckbox from "@/components/CustomCheckbox";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";
export const LoginPage = () => {
  return (
    <section className="flex  flex-col px-4 py-6 items-center justify-center min-h-screen bg-white">
      <AuthHeader title="Sign in to your account" />
      <form className="flex flex-col gap-6 w-full max-w-sm">
        <CustomInput id="E-mail" label="E-mail" placeholder="E-mail" />
        <CustomInput
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
        <CustomCheckbox id="remember" label="Remember me" />
        <Button variant="primary" type="button">
          Sign in
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
