import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    uid: null,
    name: null,
    photoUrl: null

}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
        state.username = action.payload.username,
        state.uid = action.payload.uid,
        state.name = action.payload.name,
        state.photoUrl = action.payload.photoUrl
    },
    signOutUser: (state) => {
        state.uid = null,
        state.name = null,
        state.photoUrl = null
    }
  }
});

export const {signInUser, signOutUser} = userSlice.actions

export default userSlice.reducer