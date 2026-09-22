"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { authClient } from "@/lib/auth-client";

const OWNER_EMAIL = "admin@test1.com";

type TProduct = {
    id: number;
    name: string;
    price: number;
    description: string | null;
    imageUrl: string | null;
};

export default function Product() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<TProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [pending, setPending] = useState<TProduct[]>([]);

    const { addToCart } = useCart();
    const { data: session } = authClient.useSession();
    const isAdmin = session?.user?.email === OWNER_EMAIL;

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch("http://localhost:3000/products");
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError("Could not load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        getProducts();
    }, []);

    useEffect(() => {
        if (!isAdmin) return;
        async function fetchPending() {
            const response = await fetch("http://localhost:3000/products/pending", {
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setPending(data);
            }
        }
        fetchPending();
    }, [isAdmin]);

    async function handleApprove(id: number) {
        await fetch(`http://localhost:3000/products/${id}/approve`, {
            method: "PATCH",
            credentials: "include",
        });
        setPending((prev) => prev.filter((p) => p.id !== id));
    }

    async function handleReject(id: number) {
        await fetch(`http://localhost:3000/products/${id}/reject`, {
            method: "PATCH",
            credentials: "include",
        });
        setPending((prev) => prev.filter((p) => p.id !== id));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const response = await fetch("http://localhost:3000/products/sell-request", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                price: Number(price),
                description,
                imageUrl: imageUrl || null,
            }),
        });

        if (response.ok) {
            alert("Your item has been submitted for review!");
        }

        setName("");
        setPrice("");
        setDescription("");
        setImageUrl("");
    }

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

            {loading && (
                <p className="text-center text-blue-900 py-10">Loading products...</p>
            )}

            {error && (
                <p className="text-center text-red-600 py-10">{error}</p>
            )}

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
                    <button
                        onClick={() => addToCart({ id: 1001, name: "CT Scanner", price: 250000 })}
                        className="text-white font-semibold cursor-pointer bg-blue-900 rounded-lg shadow-2xl py-3 px-7"
                    >
                    Add to cart
                    </button>
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
                    <button
                        onClick={() => addToCart({ id: 1002, name: "Digital Blood Pressure", price: 450 })}
                        className="text-white font-semibold cursor-pointer bg-blue-900 rounded-lg shadow-2xl px-7 py-3"
                    >
                    Add to cart
                    </button>
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
                    <button
                        onClick={() => addToCart({ id: 1003, name: "UltraSound machine", price: 85000 })}
                        className="text-white font-semibold cursor-pointer bg-blue-900 rounded-lg shadow-2xl px-7 py-3"
                    >
                    Add to cart
                    </button>
                </div>
                </div>
            </div>

            {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400 text-sm">No image</span>
                        )}
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-blue-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.description}</p>
                        <p className="text-blue-900 font-semibold mt-1">{product.price} EGP</p>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-center items-center">
                            <button
                                onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
                                className="text-white font-semibold cursor-pointer bg-blue-900 rounded-lg shadow-2xl py-3 px-7"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            </div>

            {isAdmin ? (
                <div className="max-w-2xl mx-auto mt-10 mb-10">
                    <h2 className="text-xl font-bold text-blue-900 mb-4">Pending Sell Requests</h2>

                    {pending.length === 0 && (
                        <p className="text-gray-500">No pending requests.</p>
                    )}

                    <div className="flex flex-col gap-4">
                        {pending.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-2xl p-4 flex items-center gap-4"
                            >
                                <div className="flex-1">
                                    <h3 className="font-semibold text-blue-900">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                    <p className="text-blue-900 font-semibold">{item.price} EGP</p>
                                </div>
                                <button
                                    onClick={() => handleApprove(item.id)}
                                    className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(item.id)}
                                    className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
                                >
                                    Reject
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md mx-auto mt-10 mb-10">
                    <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Product image preview</span>
                    </div>

                    <div className="p-4">
                        <h3 className="font-bold text-blue-900 mb-3">Sell Your Equipment</h3>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full border rounded-lg px-4 py-2 mb-3 text-blue-900"
                            />

                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="w-full border rounded-lg px-4 py-2 mb-3 text-blue-900"
                            />

                            <textarea
                                placeholder="Description (optional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2 mb-3 text-blue-900"
                            />

                            <input
                                type="text"
                                placeholder="Image URL (optional)"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2 mb-3 text-blue-900"
                            />

                            <div className="flex justify-center items-center">
                                <button
                                    type="submit"
                                    className="text-white font-semibold cursor-pointer bg-blue-900 rounded-lg shadow-2xl py-3 px-7"
                                >
                                    Submit for Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </main>
    );
}