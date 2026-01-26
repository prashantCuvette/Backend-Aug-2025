import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         console.log(error);
//         const originalRequest = error.config;
//         console.log(originalRequest);

//         if (
//             error.response?.status === 401 &&
//             !originalRequest._retry
//         ) {
//             originalRequest._retry = true;

//             try {
//                 await axiosInstance.post("/users/refresh-token");
//                 return axiosInstance(originalRequest);
//             } catch (err) {
//                 return Promise.reject(err);
//             }
//         }

//         return Promise.reject(error);
//     }
// );