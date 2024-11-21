import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const DATEFORMAT = "DD/MM/YYYY";
export const DATEFORMAT_FULL = "DD/MM/YYYY HH:mm";

export const convertDate = (time, format = DATEFORMAT) =>
  dayjs.utc(time).local().format(format);

export const formatCurrency = (num) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(num)
    .replace("₫", "VNĐ");
};

export const PATH = {
  LOGIN: "/login",
  ADMIN: "/",
  SAN_PHAM: "san-pham",
  NGUYEN_LIEU: "nguyen-lieu",
  CT_NL: "ct-nl/:ma",
  CT_SP: "ct-sp/:ma",
  NL_KHO: "nl-kho/:ma",
  KHO: "kho",
  NSX: "nsx",
  SP_KHO: "sp-kho/:ma",
  CONG_THUC: "cong-thuc/:ma",
  SP_NL: "sp-nl/:ma",
  LICH_LV: "lich-lv",
  DGL: "dgl/:ma",
  CA: "ca",
  NGAY: "ngay",
  INFO: "info/:ma",

  //////////////////tu them de code giao dien:
  DS_NL: "ds_nl", //ds nguyen lieu
  CT_K: "ct-k", // chi tiet kho
  CTSP: "ctsp",
  QL_ND: "ql-nd", // quản lý người dùng
  QL_CA: "ql-ca", //quản lý ca
  QL_LLV: "ql-llv", //quản lý lịch làm việc
};

export const PATH_ADMIN = (path) => `${PATH.ADMIN}${path}`;

export const ENV = {
  BE_HOST: "http://localhost:5000",
};

export const convertUrl = (url, host = ENV.BE_HOST) =>
  `${host}\\${url}`.replace(/\\/g, "/");

export const getNameImage = (url, host = ENV.BE_HOST) => {
  const urlImages = convertUrl(url, host).split("/");
  return urlImages[urlImages.length - 1];
};

export const ERROR_LOG = {
  isShow: true,
  message: "Có lỗi xảy ra, vui lòng thử lại!",
  status: "error",
};
