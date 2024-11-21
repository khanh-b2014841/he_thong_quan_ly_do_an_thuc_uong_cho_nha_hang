import RestaurantAPI from "./index";

const url = (path) => `/nguoi-dung/${path}`;

class NguoiDung extends RestaurantAPI {
  async create(data) {
    return await this.postAPI(url("create"), data);
  }

  async login(data) {
    return await this.postAPI(url("login"), data);
  }

  async update(ma, data) {
    return await this.putAPI(url(`update/${ma}`), data);
  }

  async updateToken() {
    return await this.getAPI(url("token"));
  }

  async getOne() {
    return await this.getAPI(url("info"));
  }

  async getAll({ page = 1, limit = 6, role = null, status = null }) {
    let urlStr = url(`all?page=${page}&limit=${limit}`);
    if (role) {
      urlStr += `&role=${role}`;
    }

    if (typeof status === "boolean") {
      urlStr += `&status=${status}`;
    }

    return await this.getAPI(urlStr);
  }

  async logOut() {
    return await this.deleteAPI(url("logout"));
  }

  async lockAccount(data) {
    return await this.putAPI(url("lock"), data);
  }
}
const NguoiDungServices = new NguoiDung();
export default NguoiDungServices;
