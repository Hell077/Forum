import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: '',
    authorId: '',
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLogin(state, action) {
            state.login = action.payload;
        },
        setAuthorId(state, action) {
            state.authorId = action.payload;
        },
    },
});

export const { setLogin, setAuthorId } = loginSlice.actions;
export default loginSlice.reducer;
