import CustomCheckbox from "@/components/CustomCheckbox";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";

export default function RegisterPage() {
  return (
    <section className="flex  flex-col items-center px-4 py-6 justify-center min-h-screen bg-white">
      <AuthHeader title="Join Our Community" />
      <form className="flex flex-col gap-6 w-full max-w-sm">
        <CustomInput type="text" id="name" label="Name" placeholder="Name" />
        <CustomInput id="E-mail" label="E-mail" placeholder="E-mail" />
        <div className="flex flex-row gap-6">
          <CustomInput
            id="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <CustomInput
            id="confirm-password"
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
          />
        </div>
        <div className="flex flex-row gap-6">
          <CustomInput id="address" label="Address" placeholder="Address" />
          <CustomInput id="phone" label="Phone" placeholder="Phone" />
        </div>
        <NativeSelect className="w-full bg-gray-50">
          <NativeSelectOption value="Active">Active</NativeSelectOption>
          <NativeSelectOption value="InActive">InActive</NativeSelectOption>
        </NativeSelect>

        <CustomCheckbox id="remember" label="Remember me" />
        <Button variant="primary" type="button">
          Sign up
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
