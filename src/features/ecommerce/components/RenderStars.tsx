import { Star, StarHalf } from "lucide-react";

export const renderStars = (rating = 4.5) => {
  const totalStars = 5;
  const fullStarsCount = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5 text-[#FFC107]">
        {" "}
        {Array.from({ length: totalStars }).map((_, index) => {
          const starNumber = index + 1;

          if (starNumber <= fullStarsCount) {
            return (
              <Star
                key={index}
                className="h-4 w-4 fill-current stroke-current"
              />
            );
          } else if (starNumber === fullStarsCount + 1 && hasHalfStar) {
            return (
              <StarHalf
                key={index}
                className="h-4 w-4 fill-current stroke-current"
              />
            );
          } else {
            return (
              <Star
                key={index}
                className="h-4 w-4 text-gray-200 fill-gray-100 stroke-gray-300"
              />
            );
          }
        })}
      </div>

      <span className="text-black text-xs font-medium ml-1.5 mt-0.5">
        {rating}
        <span className="text-gray-400 font-normal">/5</span>
      </span>
    </div>
  );
};
