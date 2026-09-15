"use client";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function Cart() {
    const { items, removeFromCart, updateQuantity, total } = useCart();

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            <div className="text-2xl font-bold text-blue-900 flex justify-center items-center py-10">
                Your Cart
            </div>

            {items.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    <div className="font-semibold text-blue-900 text-xl mb-4">
                        {items.length} Product{items.length > 1 ? "s" : ""}
                    </div>

                    <div className="flex flex-col gap-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg overflow-hidden shadow-2xl p-4 flex items-center gap-4"
                            >
                                <div className="flex-1">
                                    <h3 className="font-semibold text-blue-900">{item.name}</h3>
                                </div>

                                <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                                    <Minus
                                        className="w-4 h-4 cursor-pointer"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    />
                                    <span className="text-sm font-medium">{item.quantity}</span>
                                    <Plus
                                        className="w-4 h-4 cursor-pointer"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    />
                                </div>

                                <p className="font-semibold text-blue-900 w-20 text-right">
                                    {item.price * item.quantity} EGP
                                </p>

                                <Trash2
                                    className="w-5 h-5 text-red-500 cursor-pointer"
                                    onClick={() => removeFromCart(item.id)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
                            <div className="flex justify-between mb-4">
                                <span className="font-semibold text-blue-900">Total</span>
                                <span className="font-bold text-blue-900">{total} EGP</span>
                            </div>
                            <button className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}