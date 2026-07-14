import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
interface CustomInputProps extends React.ComponentProps<"input"> {
  label: string;
  className?: string;
  type?: string;
  error?: string | boolean | undefined;
}
export default function CustomInput({
  label,
  className,
  type,
  error,
  ...props
}: CustomInputProps) {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <Input
        type={type}
        data-slot="input"
        className={cn(
          " w-full min-w-0 h-auto rounded-[8px] border border-input bg-gray-50 px-3 py-2 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
