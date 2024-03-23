import axios from "axios";

export const axiosApi = () => {
  axios.create({
    baseURL: `${REACT_APP_BACKEND_URL}/api/`,
  });
};
