import {configureStore} from '@reduxjs/toolkit'
import adminReducer from './slices/adminSlice'
export const store = new configureStore({
  reducer: {
    admin: adminReducer,
  },
});