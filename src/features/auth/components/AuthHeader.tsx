import logo from "@/assets/images/logo.png";
export default function AuthHeader({ title }: { title: string }) {
  return (
    <>
      <img src={logo} className="w-40 h-11.25" alt="Logo" />
      <h1 className="text-2xl leading-8 pt-6 pb-10 font-bold text-primary-900">
        {title}
      </h1>
    </>
  );
}
