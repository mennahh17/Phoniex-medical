import Image from "next/image";
import { Minus, Plus } from "lucide-react";

export const metadata ={
    title : "Phoniex Medical-Cart",
} 

export default function Cart() {
return (
    <main className="max-w-6xl mx-auto px-4">
    <div className="text-2xl font-bold text-blue-900 flex justify-center items-center py-10">
        Your Cart
    </div>
    <div className="font-semibold text-blue-900 text-xl mb-4">
        2 Products
    </div>

    <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">


        <div className="bg-white rounded-lg overflow-hidden shadow-2xl p-4 flex items-center gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
            <Image
                src="/img/68e17bce70f4e6f485805a6148bf57f7.jpg"
                alt="Product name"
                fill
                className="object-cover rounded-md"
            />
            </div>
            <div className="flex-1">
            <h3 className="font-semibold text-blue-900">Product Name</h3>
            <p className="text-sm text-gray-400">Category</p>
            </div>
            <div className="flex items-center gap-2 border rounded-full px-3 py-1">
            <Minus className="w-4 h-4 cursor-pointer" />
            <span className="text-sm font-medium">1</span>
            <Plus className="w-4 h-4 cursor-pointer" />
            </div>
            <p className="font-semibold text-blue-900 w-16 text-right">$140</p>
          </div>

        </div>
      </div>
    </main>
);
}