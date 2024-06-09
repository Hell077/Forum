import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: ''
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLogin(state, action) {
            state.login = action.payload;
        },
        clearLogin(state) {
            state.login = '';
        }
    }
});

export const { setLogin, clearLogin } = loginSlice.actions;
export default loginSlice.reducer;