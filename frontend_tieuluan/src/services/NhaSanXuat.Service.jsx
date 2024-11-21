import RestaurantAPI from "./index";

const url = (path) => `/nha-san-xuat/${path}`;

class NhaSanXuat extends RestaurantAPI {
  async create(data) {
    return await this.postAPI(url("create"), data);
  }

  async getOne(ma) {
    return await this.getOne(url(`info/${ma}`));
  }

  async getAll({ page = null, limit = 6, name = null }) {
    let urlStr = url(`all?`);
    if (!isNaN(+page)) {
      urlStr += `page=${page}&limit=${limit}`;
    }

    if (name) {
      urlStr += `&name=${name}`;
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

const NhaSanXuatServices = new NhaSanXuat();
export default NhaSanXuatServices;
