import RestaurantAPI from "./index";

const url = (path) => `/kho/${path}`;

class Kho extends RestaurantAPI {
  async create(data) {
    return await this.postAPI(url("create"), data);
  }

  async getOne(ma) {
    return await this.getAPI(url(`info/${ma}`));
  }

  async getAll({ page, limit, type = null }) {
    let urlStr = url(`all?page=${page}&limit=${limit}`);
    if (type) {
      urlStr += `&type=${type}`;
    }

    return await this.getAPI(urlStr);
  }

  async update(ma, data) {
    return await this.putAPI(url(`update/${ma}`), data);
  }

  async delete(ma) {
    return await this.deleteAPI(url(`delete/${ma}`));
  }
}

const KhoServices = new Kho();
export default KhoServices;
