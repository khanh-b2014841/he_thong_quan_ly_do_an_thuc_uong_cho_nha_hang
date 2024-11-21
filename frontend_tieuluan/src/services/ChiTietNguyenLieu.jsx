import RestaurantAPI from "./index";

const url = (path) => `/chi-tiet-nguyen-lieu/${path}`;

class ChiTietNguyenLieu extends RestaurantAPI {
  async create(data) {
    return await this.postAPI(url("create"), data);
  }

  async getOne(kho, nl) {
    return await this.getAPI(url(`info?kho=${kho}&nl=${nl}`));
  }

  async getAll({
    page = null,
    limit = 6,
    order = null,
    by = null,
    kho = null,
    nl = null,
  }) {
    let urlStr = url(`all?`);
    if (!isNaN(+page)) {
      urlStr += `page=${page}&limit=${limit}`;
    }

    if (order) {
      urlStr += `&order=${order}`;
    }

    if (by) {
      urlStr += `&by=${by}`;
    }

    if (kho) {
      urlStr += `&kho=${kho}`;
    }

    if (nl) {
      urlStr += `&nl=${nl}`;
    }
    return await this.getAPI(urlStr);
  }

  async update(kho, nl, data) {
    return await this.putAPI(url(`update?kho=${kho}&nl=${nl}`), data);
  }

  async delete(kho, nl) {
    return await this.deleteAPI(url(`delete?kho=${kho}&nl=${nl}`));
  }
}

const ChiTietNguyenLieuServices = new ChiTietNguyenLieu();
export default ChiTietNguyenLieuServices;
