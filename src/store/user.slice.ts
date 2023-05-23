import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: -1,
    name: '',
    email: ''
  },
  reducers: {
    setUser: (state, action) => {
      const { id, name, email } = action.payload
      state.id = id
      state.name = name
      state.email = email
    }
  }
})

export default userSlice.reducer
export const { setUser } = userSlice.actions
