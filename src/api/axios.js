import axios from "axios";

// export async function sendUserData(userData, endPoint) {
//   const response = await axios.post(
//     `${import.meta.env.VITE_BASE_URL}${endPoint}`,
//     userData,
//   );
//   return response;
// }

export const axiosInterceptor = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
axiosInterceptor.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) config.headers.Authorization =`Bearer ${localStorage.getItem("token")}` ;
  
  return config;
});
