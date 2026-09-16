import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user: null,
    isAuthenticated: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user } = action.payload
            state.user = user
            state.isAuthenticated = true
        },
        setLogout: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
})
export const {setCredentials,setLogout}=authSlice.actions
export default authSlice.reducer