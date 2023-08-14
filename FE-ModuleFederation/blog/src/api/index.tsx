import Axios, { AxiosRequestConfig } from "axios";
import { useNotificationStore } from "@dafcoe/vue-notification";

const configInterceptor = () => {
  const axios = Axios.create({
    baseURL: `http://localhost:5300/api/rest`,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = localStorage.getItem("token") || null;
      if (token) {
        Object.assign(config.headers || {}, { Authorization: `Bearer ${token}` });
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      if (res.data?.errors) {
        const { setNotification } = useNotificationStore();
        setNotification({
          message: "Can't load Blog section",
          duration: 10000,
          type: "alert",
        });
      } else return res.data;
    },
    (error) => {
      const { setNotification } = useNotificationStore();
      setNotification({
        message: "Can't load Blog section",
        duration: 10000,
        type: "alert",
      });
      return Promise.reject(error);
    }
  );

  return axios;
};

export const axiosConfig = configInterceptor();

const ENDPOINT = {
  ALL_POST: "getAllPost",
  CATEGORIES: "post/categories",
  SEARCH_POST: "searchPost",
  POST_DETAIL: "getPostDetail",
};

const BlogService = {
  getPosts: async (data: any) => {
    return axiosConfig
      .get(`${ENDPOINT.ALL_POST}/${data.limit}/${data.offset}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getCategories: async () => {
    const response = axiosConfig
      .get(ENDPOINT.CATEGORIES)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  },
  searchPost: async (params: any) => {
    const response = axiosConfig
      .post(ENDPOINT.SEARCH_POST, {
        search: params.value,
        limit: params.limit,
        offset: params.offset,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  },
  getPostDetail: async (id: string) => {
    const response = axiosConfig
      .get(`${ENDPOINT.POST_DETAIL}/${id}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    return response;
  },
};

export { BlogService };
export default axiosConfig;
