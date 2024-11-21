import RestaurantAPI from "./index";

const url = (path) => `/nguyen-lieu/${path}`;

class NguyenLieu extends RestaurantAPI {
  async create(data) {
    return await this.postAPI(url("create"), data, true);
  }

  async getOne(ma) {
    return await this.getAPI(url(`info/${ma}`));
  }

  async getAll({ page, limit, name = null, nsx = null }) {
    let urlStr = url(`all?page=${page}&limit=${limit}`);
    if (name) {
      urlStr += `&name=${name}`;
    }

    if (nsx) {
      urlStr += `&nsx=${nsx}`;
    }
    return await this.getAPI(urlStr);
  }

  async update(ma, data) {
    return await this.putAPI(url(`update/${ma}`), data, true);
  }

  async delete(ma) {
    return await this.delete(url(`delete/${ma}`));
  }
}

const NguyenLieuServices = new NguyenLieu();
export default NguyenLieuServices;
