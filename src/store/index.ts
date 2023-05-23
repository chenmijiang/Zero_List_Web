import { configureStore } from '@reduxjs/toolkit'

import userReducer from '@/store/user.slice'

let store = configureStore({
  preloadedState: {},
  reducer: {
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export { store }
