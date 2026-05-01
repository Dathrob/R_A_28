import {configureStore} from '@reduxjs/toolkit';
 import onlineCoursesSlice from './features/elearning/elearningSlice';
 import authReducer from './features/auth/authSlice';
export const store=configureStore({
    reducer:{
        onlineCourses:onlineCoursesSlice,
        auth:authReducer
    }
});

