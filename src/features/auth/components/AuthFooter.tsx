import { Link } from "react-router-dom";

export default function AuthFooter({
  title,
  link,
  linkText,
}: {
  title: string;
  link: string;
  linkText: string;
}) {
  return (
    <footer className="text-sm font-medium text-center text-gray-800">
      {title}
      <Link to={link} className="text-primary font-medium hover:underline ms-2">
        {linkText}
      </Link>
    </footer>
  );
}
