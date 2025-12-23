// store/customizationSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Input styles
  input_width: 25,
  input_height: 25,
  input_border: 'dotted',
  input_border_radius: 1,
  input_background_color: '#FFFFFF',

  // Button styles
  button_variant: 'plain',
  button_width: 25,
  button_height: 25,
  button_border: 'dotted',
  button_background_color: '#000000',
  button_text_color: '#FFFFFF',
  border_width: 1,
  border_color: '#000000',

  // Layout
  direction: 'vertical',

  // Custom CSS
  css: '',

  // UI states
  loading: false,
  error: null,
  hasChanges: false,
}

const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    // Update individual field
    updateField(state, action) {
      const { field, value } = action.payload
      state[field] = value
      state.hasChanges = true
    },

    // Update multiple fields at once
    updateMultipleFields(state, action) {
      Object.keys(action.payload).forEach((key) => {
        if (key in state) {
          state[key] = action.payload[key]
        }
      })
      state.hasChanges = true
    },

    // Load customization data (from API)
    loadCustomization(state, action) {
      Object.keys(action.payload).forEach((key) => {
        if (key in state) {
          state[key] = action.payload[key]
        }
      })
      state.hasChanges = false
    },

    // Reset to initial state
    resetCustomization() {
      return { ...initialState }
    },

    // Set loading state
    setLoading(state, action) {
      state.loading = action.payload
    },

    // Set error
    setError(state, action) {
      state.error = action.payload
    },

    // Clear changes flag after save
    clearChanges(state) {
      state.hasChanges = false
    },
  },
})

export const {
  updateField,
  updateMultipleFields,
  loadCustomization,
  resetCustomization,
  setLoading,
  setError,
  clearChanges,
} = customizationSlice.actions

export default customizationSlice.reducer
