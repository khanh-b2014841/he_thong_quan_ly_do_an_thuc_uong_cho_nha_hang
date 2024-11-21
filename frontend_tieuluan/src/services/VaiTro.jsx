import RestaurantAPI from "./index";

const url = (path) => `/vai-tro/${path}`;

class VaiTro extends RestaurantAPI {
  async create(data) {
    return await this.postAPI(url("create"), data);
  }

  async update(ma, data) {
    return await this.putAPI(url(`update/${ma}`), data);
  }

  async getOne({ ma, key }) {
    const urlStr = (name, data) => url(`info-${name}/${data}`);
    let params = "";
    if (ma) {
      params = urlStr("ma", ma);
    }

    if (key) {
      params = urlStr("key", key);
    }

    return await this.getAPI(params);
  }

  async getAll() {
    return await this.getAPI(url("all"));
  }

  async delete(ma) {
    return await this.deleteAPI(url(`/delete/${ma}`));
  }
}

const VaiTroServices = new VaiTro();
export default VaiTroServices;
