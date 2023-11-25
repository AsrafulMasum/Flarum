import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token")
      config.headers.authorization = `Bearer ${token}`
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        logOut()
          .then(() => {
            navigate("/logIn");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
      return Promise.reject(err);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
