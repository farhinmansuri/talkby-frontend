import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import  conversationSlice from './currentConversation'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'


const rootReducer = combineReducers({
    auth: authReducer,
    conversation:conversationSlice
})

const customLocalStorage = {
    getItem: (key) => {
        return Promise.resolve(localStorage.getItem(key));
    },
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, value);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    },
    removeItem: (key) => {
        return Promise.resolve(localStorage.removeItem(key));
    },
};

const persistConfigure = {
    key: "root",
    storage: customLocalStorage,
    version: 1,
    whitelist: ["auth","conversation"]
};
const persistedReducer = persistReducer(persistConfigure, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore internal redux-persist actions to prevent console warnings
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

