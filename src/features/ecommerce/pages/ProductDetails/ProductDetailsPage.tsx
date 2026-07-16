import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Product Details Page</h1>
      <p className="text-lg">Product ID: {id}</p>
    </div>
  );
}
