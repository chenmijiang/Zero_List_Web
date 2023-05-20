import { configureStore } from '@reduxjs/toolkit'

import demoReducer from './demo.slice'

let store = configureStore({
  preloadedState: {},
  reducer: {
    demoReducer
  },
  devTools: process.env.NODE_ENV === 'production' ? false : true
})

export { store }
