import authReducer from '@/store/slices/authSlice';
import courseReducer from '@/store/slices/courseSlice';

import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth: authReducer,
    course : courseReducer
    
})

export default rootReducer;
