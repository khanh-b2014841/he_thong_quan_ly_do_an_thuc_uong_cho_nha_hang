import api from "../configs/api";

class RestaurantAPI {
  config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  async getAPI(url) {
    try {
      const res = await api.get(url);
      return {
        data: res?.data?.data,
        message: res?.data?.message,
        status: res.status,
      };
    } catch (err) {
      if (err.response) {
        return {
          status: err.response.status,
          message: err.response.data?.message,
          data: err.response.data?.data,
        };
      }

      throw new Error(err.message || "An unknown error occurred");
    }
  }
  async putAPI(url, data, isConfig = false) {
    try {
      const res = await api.put(url, data, isConfig ? this.config : {});
      return {
        data: res?.data?.data,
        message: res?.data?.message,
        status: res.status,
      };
    } catch (err) {
      if (err.response) {
        return {
          status: err.response.status,
          message: err.response.data?.message,
          data: err.response.data?.data,
        };
      }

      throw new Error(err.message || "An unknown error occurred");
    }
  }
  async postAPI(url, data, isConfig = false) {
    try {
      const res = await api.post(url, data, isConfig ? this.config : {});
      return {
        data: res?.data?.data,
        message: res?.data?.message,
        status: res.status,
      };
    } catch (err) {
      if (err.response) {
        return {
          status: err.response.status,
          message: err.response.data?.message,
          data: err.response.data?.data,
        };
      }

      throw new Error(err.message || "An unknown error occurred");
    }
  }
  async deleteAPI(url) {
    try {
      const res = await api.delete(url);
      return {
        data: res?.data?.data,
        message: res?.data?.message,
        status: res.status,
      };
    } catch (err) {
      if (err.response) {
        return {
          status: err.response.status,
          message: err.response.data?.message,
          data: err.response.data?.data,
        };
      }

      throw new Error(err.message || "An unknown error occurred");
    }
  }
}
export default RestaurantAPI;
