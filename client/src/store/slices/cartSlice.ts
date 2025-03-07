import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse } from "@/types";
import toast from "react-hot-toast";

interface CartState {
    items: ICourse[];
    totalPrice: number;
}



const loadCartFromLocalStorage = (): CartState => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : { items: [], totalPrice: 0 };
};



const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICourse>) => {
            const course = action.payload

            const index = state.items.findIndex((item) => item._id === course._id)
            console.log("Course added", index, course)

            if (index >= 0) {
                //if the course is already in the cart, do not modifify the quantity
                toast.error("Course already in cart")
                return
            }
            //If the course is note in the cart, add it to the cart
            state.items.push(course)

            state.totalPrice += course.price;

            toast.success("Course aded to the cart")
            localStorage.setItem("cart", JSON.stringify(state));
        },

        removeFromCart: (state, action) => {

            const courseId = action.payload
            console.log("removed", action.payload, state.items.findIndex((item) => item._id === courseId))
            const index = state.items.findIndex((item) => item._id === courseId)
            if (index >= 0) {
                //if the course is found in the items, remove it

                state.totalPrice -= state.items[index].price
                state.items.splice(index, 1)

                localStorage.setItem("cart", JSON.stringify(state));

                toast.success("couse removed from cart")

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