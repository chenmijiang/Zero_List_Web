import { createSlice } from '@reduxjs/toolkit'

const demoSlice = createSlice({
  name: 'demo',
  initialState: {},
  reducers: {
    demoReducer: (state, action) => {}
  }
})

export default demoSlice.reducer
export const { demoReducer } = demoSlice.actions
