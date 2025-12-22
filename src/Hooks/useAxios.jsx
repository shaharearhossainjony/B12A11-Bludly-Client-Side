import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'https://b12-a11-bludly-server-side.vercel.app'

})

const useAxios = ()=>{
    return axiosInstance
}

export default useAxios;