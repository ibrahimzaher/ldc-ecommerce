import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
interface CustomCheckboxProps extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  label?: string;
  className?: string;
}
export default function CustomCheckbox({ label, className, ...props }: CustomCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
        <Checkbox
            data-slot="checkbox"
            className={cn(
                "h-4 w-4 rounded border-gray-300 text-primary-900 focus:ring-primary-900 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
        {label && (
            <label htmlFor={props.id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
        )}
    </div>
  );
}