import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
