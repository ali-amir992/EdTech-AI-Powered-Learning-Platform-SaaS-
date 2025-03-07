import authReducer from '@/store/slices/authSlice';
import courseReducer from '@/store/slices/courseSlice';
import cartReducer from '@/store/slices/cartSlice';

import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth: authReducer,
    course : courseReducer,
    cart : cartReducer,
    
})

export default rootReducer;
