import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
    className?: string;
    src: string;
}

export const ProductImage: React.FC<Props> = ({ className, src }) => {
    return (
        <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
            <img
                src={src}
                alt="Logo"
                className={cn("relative left-2 top-2 transition-all z-10 duration-300",className)}
            />
        </div>
    );
};