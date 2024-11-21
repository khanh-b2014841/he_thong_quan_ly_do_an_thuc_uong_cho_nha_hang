import RestaurantAPI from "./index";

const url = (path) => `/cong-thuc/${path}`;

class CongThuc extends RestaurantAPI {
  async create(data) {
    return await this.postAPI(url("create"), data);
  }

  async getOne(sp, nl) {
    return await this.getAPI(url(`info?sp=${sp}&nl=${nl}`));
  }

  async getAll({ page = 1, limit = 6, nl, sp }) {
    let urlStr = url(`all?page=${page}&limit=${limit}`);
    if (nl) {
      urlStr += `&nl=${nl}`;
    }

    if (sp) {
      urlStr += `&sp=${sp}`;
    }
    return await this.getAPI(urlStr);
  }

  async update(sp, nl, data) {
    return await this.putAPI(url(`update?sp=${sp}&nl=${nl}`), data);
  }

  async delete(sp, nl) {
    return await this.delete(url(`delete?sp=${sp}&nl=${nl}`));
  }
}

const CongThucServices = new CongThuc();
export default CongThucServices;
