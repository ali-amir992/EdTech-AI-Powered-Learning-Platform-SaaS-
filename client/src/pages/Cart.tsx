import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, resetCart } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";
import { RootState } from "@/store/store";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51R4faMFvge4mBPBCblYjLwyl9ULVNZMNxchTiP1LF4mVSrQRcgT7NzxrAQgzrx3Ts8s5gAJdqGdiFXgo9kUrJocE00CFEIrbF8"); // Load Stripe with public key

const CartPage: React.FC = () => {
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector((state: RootState) => state.cart);
    const { token } = useSelector((state: RootState) => state.auth)

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    console.log("token is " , token);
    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;

            // Send cart items to backend
            const response = await fetch(`http://localhost:5000/api/v1/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cartItems: items }),
            });

            const { url } = await response.json();

            if (url) {
                window.location.href = url; // Redirect to Stripe Checkout
                dispatch(resetCart());
            } else {
                alert("Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {items.length === 0 ? (
                <div className="text-center">
                    <p className="text-lg text-gray-500">Your cart is empty.</p>
                    <Link to="/courses">
                        <Button className="mt-4">Browse Courses</Button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center bg-white shadow-md rounded-lg p-4"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1 ml-4">
                                    <h2 className="text-lg font-semibold">{item.title}</h2>
                                    <p className="text-gray-600">${item.price}</p>
                                </div>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleRemove(item._id)}
                                >
                                    <Trash className="w-5 h-5" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 border-t flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Total: ${totalPrice}</h2>
                        <Button onClick={handleCheckout} className="bg-blue-600">
                            Checkout
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
