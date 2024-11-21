import RestaurantAPI from "./index";

const url = (path) => `/chi-tiet-san-pham/${path}`;

class ChiTietSanPham extends RestaurantAPI {
  async create(data) {
    return await this.postAPI(url("create"), data);
  }

  async getOne(kho, sp) {
    return await this.getAPI(url(`info?kho=${kho}&sp=${sp}`));
  }

  async getAll({
    page = 1,
    limit = 6,
    order = null,
    by = null,
    kho = null,
    sp = null,
  }) {
    let urlStr = url(`all?page=${page}&limit=${limit}`);
    if (order) {
      urlStr += `&order=${order}`;
    }

    if (by) {
      urlStr += `&by=${by}`;
    }

    if (kho) {
      urlStr += `&kho=${kho}`;
    }

    if (sp) {
      urlStr += `&sp=${sp}`;
    }
    return await this.getAPI(urlStr);
  }

  async update(kho, sp, data) {
    return await this.putAPI(url(`update?kho=${kho}&sp=${sp}`), data);
  }

  async delete(kho, sp) {
    return await this.delete(url(`delete?kho=${kho}&sp=${sp}`));
  }
}

const ChiTietSanPhamServices = new ChiTietSanPham();
export default ChiTietSanPhamServices;
