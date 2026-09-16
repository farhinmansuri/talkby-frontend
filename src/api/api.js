import axios from "axios";

//export const BACKEND_BASE_URL="http://localhost:5000"
export const BACKEND_BASE_URL=import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: BACKEND_BASE_URL+"/api",
    headers: {
        "Content-Type": 'application/json',
    }
})


// api.interceptors.request.use(
//     (config) => {
//         const user = store.getState().auth.user;
//         if (user) {
//             const token = user.token;
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`
//             }
//         }

//         return config;

//     },
//     (error) => Promise.reject(error)
// )


export default api;