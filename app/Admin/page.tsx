"use client";
import { useState, useEffect } from "react";

type TProduct = {
    id: number;
    name: string;
    price: number;
    description: string | null;
    imageUrl: string | null;
    status: string;
};

export default function AdminPage() {
    const [pending, setPending] = useState<TProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    async function fetchPending() {
        try {
            const response = await fetch("http://localhost:3000/products/pending", {
                credentials: "include",
            });
            if (!response.ok) throw new Error("Not authorized or failed to fetch");
            const data = await response.json();
            setPending(data);
        } catch (err) {
            setError("You are not authorized to view this page, or something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPending();
    }, []);

    async function handleApprove(id: number) {
        await fetch(`http://localhost:3000/products/${id}/approve`, {
            method: "PATCH",
            credentials: "include",
        });
        fetchPending();
    }

    async function handleReject(id: number) {
        await fetch(`http://localhost:3000/products/${id}/reject`, {
            method: "PATCH",
            credentials: "include",
        });
        fetchPending();
    }

    async function handleAddProduct(e: React.FormEvent) {
        e.preventDefault();

        const response = await fetch("http://localhost:3000/products", {
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
            alert("Product added successfully!");
        } else {
            alert("Failed to add product. You may not be authorized.");
        }

        setName("");
        setPrice("");
        setDescription("");
        setImageUrl("");
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold text-blue-900 mb-8">Admin Dashboard</h1>

            {/* Add Product Form */}
            <div className="bg-white rounded-xl shadow-2xl p-6 mb-10">
                <h2 className="text-xl font-bold text-blue-900 mb-4">Add New Product</h2>
                <form onSubmit={handleAddProduct}>
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
                    <button
                        type="submit"
                        className="bg-blue-900 text-white font-semibold py-3 rounded-lg w-full"
                    >
                        Add Product
                    </button>
                </form>
            </div>

            {/* Pending Sell Requests */}
            <div>
                <h2 className="text-xl font-bold text-blue-900 mb-4">Pending Sell Requests</h2>

                {loading && <p className="text-blue-900">Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}

                {!loading && !error && pending.length === 0 && (
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
        </main>
    );
}