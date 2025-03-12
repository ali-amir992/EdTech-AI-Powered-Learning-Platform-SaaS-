import authReducer from '@/store/slices/authSlice';
import courseReducer from '@/store/slices/courseSlice';
import cartReducer from '@/store/slices/cartSlice';
import courseBuilderReducer from '@/store/slices/courseBuilderSlice';

import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth: authReducer,
    course : courseReducer,
    cart : cartReducer,
    courseBuilder : courseBuilderReducer
    
})

export default rootReducer;
