import { Vehicle } from "@prisma/client";
import React from "react";
import { Calendar, Settings, Droplet, Cpu, Zap, User, MapPin, Gauge, CircleDotDashed } from "lucide-react";

interface Props {
    product: Vehicle;
}

export const CarInfo: React.FC<Props> = ({ product }) => {
    return (
        <div className="mt-3 grid grid-cols-7 gap-4 text-xs text-gray-500">
            <div className="flex flex-col items-center gap-1" title="Год выпуска">
                <div className="p-2 bg-gray-50 rounded-lg">
                    <Calendar size={20} />
                </div>
                <span className="font-medium">{product.year}</span>
            </div>

            <div className="flex flex-col items-center gap-1" title="Коробка передач">
                <div className="p-2 bg-gray-50 rounded-lg">
                    <Settings size={20} />
                </div>
                <span className="font-medium">{product.transmission}</span>
            </div>

            <div className="flex flex-col items-center gap-1" title="Тип топлива">
                <div className="p-2 bg-gray-50 rounded-lg">
                    <Droplet size={20} />
                </div>
                <span className="font-medium">{product.fuelType}</span>
            </div>

            {product.engineSize != 0 && (<div className="flex flex-col items-center gap-1" title="Объем двигателя">
                <div className="p-2 bg-gray-50 rounded-lg">
                    <Cpu size={20} />
                </div>
                <span className="font-medium">{product.engineSize} л</span>
            </div>)}

            <div className="flex flex-col items-center gap-1" title="Мощность двигателя">
                <div className="p-2 bg-gray-50 rounded-lg">
                    <Gauge size={20} />
                </div>
                <span className="font-medium">{product.horsepower} л.с.</span>
            </div>

            <div className="flex flex-col items-center gap-1" title="Количество мест">
                <div className="p-2 bg-gray-50 rounded-lg">
                    <User size={20} />
                </div>
                <span className="font-medium">{product.seats}</span>
            </div>

            <div className="flex flex-col items-center gap-1" title="Привод">
                <div className="p-2 bg-gray-50 rounded-lg">
                    <CircleDotDashed size={20} />
                </div>
                <span className="font-medium">{product.driveType}</span>
            </div>
        </div>
    );
};