// store/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import customizationReducer from './customizationSlice'
import translationReducer from './translationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customization: customizationReducer,
    translation: translationReducer,
  },
})

export default store
