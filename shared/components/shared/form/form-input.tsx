import { X } from "lucide-react";
import { Input } from "../../ui";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<Props> = ({ name, label, required, className, ...props }) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext();
    
    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onClickClear = () => setValue(name, '', { shouldValidate: true });

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">{label} {required && <span className="rext-red-500">*</span>}</p>
            )}

            <div className="relative">
                <Input className="h-12 text-md placeholder:text-gray-400" {...register(name)} {...props} />
                {value && <button onClick={onClickClear} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer">
                    <X className="h-5 w-5" />
                </button>}
            </div>

            {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}


        </div>
    );
};