// store/translationSlice.js
import { createSlice } from '@reduxjs/toolkit'

const translationSlice = createSlice({
  name: 'translation',
  initialState: {
    currentLocale: 'en', // locale mặc định
    translations: {
      'Discount box placeholder text': 'Discount code',
      'Button text': 'Apply',
    },
    loading: false,
  },
  reducers: {
    setLocale: (state, action) => {
      state.currentLocale = action.payload
    },
    setTranslations: (state, action) => {
      state.translations = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setLocale, setTranslations, setLoading } =
  translationSlice.actions
export default translationSlice.reducer
