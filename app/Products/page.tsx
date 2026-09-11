"use client";
import Image from "next/image";
import Link from "next/link";
import { useState , useEffect } from "react";

async function getProducts () {
    const response = await fetch ("http://192.168.0.108:3000/api/products");

    return response.json();
}

type TProduct = {
    id: number;
    name: string;
};

export default function Product() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<TProduct[]>([]);

    useEffect(() => {
        async function getProducts() {
            const response = await fetch("http://192.168.0.108:3000/api/products");
            const data = await response.json();
            setProducts(data);
        }
        getProducts();
    }, []);

    return(
        <main>
            <div className ="font-bold text-2xl text-blue-900 flex justify-center items-center py-10  font-bad-script">
                Find the Equipment That Fits Your Needs
            </div>

            <div className=" flex items-center px-60 py-10 pt-3 gap-3">
                <Link href="/Category">
            <div className="text-blue-900 font-bold text-xl  "> 
                Category
            </div>
            </Link>
            <div className="rounded-xl bg-white px-6 py-2 w-80">
                <input
                type="text"
                placeholder="Search by category"
                value={searchTerm}
                onChange={(e) =>setSearchTerm(e.target.value)}
                className="outline-none w-full text-blue-900"
                />
                
            </div>
            </div>

            <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-6  max-w-6xl mx-auto px-4 py-5">

            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="relative h-48 w-full">
            <Image 
            src="/img/bdc0903ba856a5929d24d284cc18ddfa.jpg"
            alt="CT Scanner"
            fill
            className="object-cover"
            />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-blue-900">CT Scanner</h3>
                <p className="text-sm text-gray-500"></p>

            </div>
            <div className="p-4">
                    <div className="flex justify-center items-center"> 
                    <Link href="/Cart">
                    <div className="bg-white p-5">
                    <button className="text-white font-semibold cursor-pointer bg-blue-900 rounded-lg shadow-2xl py-3 px-7">
                    Add to cart
                    </button>
                    </div>
                    </Link>
            </div>
            </div>
            </div>

            <div className="bg-white rounded-xl shadow-2xl overflow-hidden" >
            <div className="relative w-full h-48">
            <Image
            src="/img/68e17bce70f4e6f485805a6148bf57f7.jpg"
            alt=""
            fill
            className="object-cover"
            />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-blue-900">Digital Blood Pressure</h3>
            
            </div>
            <div className="p-4">
                    <div className="flex justify-center items-center"> 
                    <Link href="/Cart">
                    <div className="bg-white p-5">
                    <button className="text-white font-semibold cursor-pointer bg-blue-900 rounded-lg shadow-2xl px-7 py-3">
                    Add to cart
                    </button>
                    </div>
                    </Link>
                    
                </div>
            </div>
            </div>

            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="relative w-full h-48">
                    <Image
                    src="/img/57690094b714861e28852743daf134e3.jpg" 
                    alt="UltraSound machine"
                    fill
                    className="object-cover"
                    />
                </div>
                <div className="p-4">
                <h3 className="font-bold text-blue-900 cursor-pointer">UltraSound machine</h3>
                </div>
                <div className="p-4">
                    <div className="flex justify-center items-center"> 
                    <Link href="/Cart">
                    <div className="bg-white p-5">
                    <button className="text-white font-semibold cursor-pointer bg-blue-900 rounded-lg shadow-2xl px-7 py-3">
                    Add to cart
                    </button>
                    </div>
                    </Link>
                </div>
                </div>
            </div>
            </div>

            <div>
                <h1>products:</h1>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            </div>

        </main>
    );
}