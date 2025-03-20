import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface ICartItem {
    _id: string;
    title: string;
    price: number;
    thumbnail: string; // Store only the thumbnail URL, not File
}
interface CartState {
    items: ICartItem[];
    totalPrice: number;
}


const loadCartFromLocalStorage = (): CartState => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : { items: [], totalPrice: 0 };
};


const saveCartToLocalStorage = (state: CartState) => {
    localStorage.setItem("cart", JSON.stringify({
        items: state.items,
        totalPrice: state.totalPrice
    }));
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const course = action.payload;
            const index = state.items.findIndex((item) => item._id === course._id);
        
            if (index >= 0) {
                toast.error("Course already in cart");
                return;
            }
        
            state.items.push(course);
            state.totalPrice += course.price;
            saveCartToLocalStorage(state);
            toast.success("Course added to cart");
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            const courseId = action.payload;
            const index = state.items.findIndex((item) => item._id === courseId);
        
            if (index >= 0) {
                state.totalPrice -= state.items[index].price;
                state.items.splice(index, 1);
                saveCartToLocalStorage(state);
                toast.success("Course removed from cart");
            }
        },

        resetCart: (state) => {
            state.items = []
            state.totalPrice = 0;
            localStorage.removeItem("cart");
        }
    }
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer