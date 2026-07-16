import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Button } from "@/shared/components/ui/button";
import { Slider } from "@/shared/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface ProductFiltersProps {
  onApplyFilters?: (priceRange: [number, number]) => void;
  onCloseMobile?: () => void;
}

export function ProductFilters({
  onApplyFilters,
  onCloseMobile,
}: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters(priceRange);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-between items-center border-b pb-4">
        <h3 className="font-bold text-xl text-black">Filters</h3>
        <SlidersHorizontal className="h-5 w-5 text-gray-400 cursor-pointer hidden md:block" />
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="price"
        className="w-full"
      >
        <AccordionItem value="price" className="border-b-0 ">
          <AccordionTrigger className="hover:no-underline py-1 font-bold text-lg text-black">
            Price
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-1">
            <div className="px-2">
              <Slider
                defaultValue={[0, 500]}
                min={0}
                max={2000}
                step={10}
                value={priceRange}
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
                className="my-4"
              />
              <div className="flex justify-between text-sm font-bold text-black">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        variant="primary"
        className="rounded-full py-4"
        onClick={handleApply}
      >
        Apply Filter
      </Button>
    </div>
  );
}
