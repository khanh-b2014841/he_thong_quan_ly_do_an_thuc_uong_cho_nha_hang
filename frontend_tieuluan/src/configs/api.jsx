import axios from "axios";
import store from "../store";
import { actions } from "../store/accountSlice";
import NguoiDungServices from "../services/NguoiDung.Service";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.account.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra xem error.response có tồn tại hay không
    if (!error.response) {
      store.dispatch(actions.LogOut());
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu là đã thử lại một lần
      try {
        const { data } = await NguoiDungServices.updateToken();

        if (!Array.isArray(data) && data?.token) {
          // Cập nhật accessToken mới vào Redux
          store.dispatch(actions.setToken(data.token));

          // Cập nhật token vào headers của yêu cầu ban đầu và gửi lại request
          originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
        }

        window.location.href = "/login";
        store.dispatch(actions.LogOut());
        return axios(originalRequest);
      } catch (refreshError) {
        // Nếu refreshToken cũng hết hạn, xóa thông tin xác thực và yêu cầu đăng nhập lại
        window.location.href = "/login";
        store.dispatch(actions.LogOut());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
