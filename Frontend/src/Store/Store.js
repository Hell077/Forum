import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // Пустой catch блок, чтобы игнорировать ошибки
    }
};

const persistedState = loadState();

const store = configureStore({
    reducer: {
        login: loginReducer,
    },
    preloadedState: persistedState || {
        login: { login: '' } // Устанавливаем начальное состояние пустым
    }
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
