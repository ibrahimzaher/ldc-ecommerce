import type { ProductRequest } from "@/features/ecommerce/types/product.types";
import CustomInput from "@/shared/components/ui/CustomInput";
import { Button } from "@/shared/components/ui/button";
import { useFormik } from "formik";
import { Image, Loader2, X } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

const CLOUD_NAME = "t7lixkcl";
const UPLOAD_PRESET = "s1ex8q6u";

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number()
    .min(20, "Amount must be at least 20")
    .required("Amount is required"),
  type: Yup.string().required("Product type is required"),
  stockQuantity: Yup.number()
    .integer("Must be a whole number")
    .min(10, "Stock quantity must be at least 10")
    .required("Stock quantity is required"),
  status: Yup.string().required("Status is required"),
  productImages: Yup.array()
    .of(
      Yup.object({
        productImageId: Yup.string().required(),
        url: Yup.string().required("Image URL or file is required"),
      }),
    )
    .min(1, "At least one image is required"),
});

interface ProductFormProps {
  initialValues?: ProductRequest;
  onSubmit: (values: ProductRequest) => void;
  isPending: boolean;
  submitButtonText?: string;
  title?: string;
}

const defaultInitialValues: ProductRequest = {
  name: "",
  description: "",
  amount: 0,
  type: "",
  stockQuantity: 0,
  status: "InStock",
  productImages: [],
};

export const ProductForm = ({
  initialValues = defaultInitialValues,
  onSubmit,
  isPending,
  submitButtonText = "Add Product",
  title = "Product Details",
}: ProductFormProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const formik = useFormik<ProductRequest>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.secure_url) {
        const newImage = {
          productImageId: crypto.randomUUID(),
          url: data.secure_url,
        };

        const updatedImages = [...formik.values.productImages, newImage];

        await formik.setFieldValue("productImages", updatedImages, true);

        formik.setFieldTouched("productImages", true, false);
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async (indexToRemove: number) => {
    const updated = formik.values.productImages.filter(
      (_, idx) => idx !== indexToRemove,
    );

    await formik.setFieldValue("productImages", updated, true);
    formik.setFieldTouched("productImages", true, false);
  };

  const imageError =
    (formik.touched.productImages || formik.submitCount > 0) &&
    (typeof formik.errors.productImages === "string"
      ? formik.errors.productImages
      : null);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-6 space-y-6 bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

      <CustomInput
        label="Product Name"
        id="name"
        placeholder="Type product name here. . ."
        {...formik.getFieldProps("name")}
        error={formik.touched.name && formik.errors.name}
      />

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Type product description here. . ."
          {...formik.getFieldProps("description")}
          className="w-full p-3 rounded-lg border bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-xs text-red-500 mt-1">
            {formik.errors.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CustomInput
          label="Amount"
          id="amount"
          type="number"
          step="0.1"
          placeholder="0.01"
          {...formik.getFieldProps("amount")}
          error={formik.touched.amount && formik.errors.amount}
        />

        <CustomInput
          label="Stock Quantity"
          id="stockQuantity"
          type="number"
          placeholder="0"
          {...formik.getFieldProps("stockQuantity")}
          error={formik.touched.stockQuantity && formik.errors.stockQuantity}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <CustomInput
            label="Category"
            id="type"
            type="text"
            placeholder="choose category..."
            {...formik.getFieldProps("type")}
            error={formik.touched.type && formik.errors.type}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Status
          </label>
          <select
            {...formik.getFieldProps("status")}
            className="w-full p-2.5 border bg-gray-50 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="InStock">InStock</option>
            <option value="OutOfStock">OutOfStock</option>
          </select>
          {formik.touched.status && formik.errors.status && (
            <p className="text-xs text-red-500 mt-1">{formik.errors.status}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-500">
          Product Images
        </label>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (!isUploading) handleFileUpload(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed rounded-xl p-8 text-center bg-gray-50/50 flex flex-col items-center justify-center space-y-3 transition ${
            imageError
              ? "border-red-400 bg-red-50/20"
              : isUploading
                ? "border-indigo-400 bg-indigo-50/30 cursor-not-allowed"
                : "border-gray-200 hover:border-indigo-300"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
              <p className="text-xs font-semibold text-indigo-600 animate-pulse">
                Uploading image to Cloudinary...
              </p>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                <Image className="w-5 h-5" />
              </div>

              <p className="text-xs text-gray-500 font-medium">
                Drag and drop image here, or click add image
              </p>

              <label className="cursor-pointer px-4 py-2 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-lg hover:bg-indigo-200 transition">
                Add Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  disabled={isUploading}
                />
              </label>
            </>
          )}
        </div>

        {imageError && (
          <p className="text-xs text-red-500 mt-1 font-medium">{imageError}</p>
        )}

        {formik.values.productImages.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-3">
            {formik.values.productImages.map((img, idx) => (
              <div
                key={img.productImageId}
                className="relative w-20 h-20 group border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={img.url}
                  alt={`Product ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  disabled={isUploading}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-90 hover:opacity-100 transition shadow disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isPending || isUploading}>
          {submitButtonText}{" "}
          {isPending || isUploading ? (
            <Loader2 className="w-4 h-4 ml-2 animate-spin" />
          ) : null}
        </Button>
      </div>
    </form>
  );
};
