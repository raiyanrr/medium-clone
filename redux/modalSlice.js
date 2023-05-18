import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    signUpModal: false,
    signInModal: false

}

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
        state.signUpModal = true 
    },
    closeSignupModal: (state) => {
        state.signUpModal = false
    },
    openSignInModal: (state) => {
        state.signInModal = true 
    },
    closeSignInModal: (state) => {
        state.signInModal = false
    }
  }
});

export const {openSignUpModal, closeSignupModal, openSignInModal, closeSignInModal} = modalSlice.actions

export default modalSlice.reducer