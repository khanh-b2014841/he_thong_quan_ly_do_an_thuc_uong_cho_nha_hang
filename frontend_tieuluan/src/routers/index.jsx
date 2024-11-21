import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Account/Login";
import QuanLySanPham from "../pages/Admin/QuanLySanPham";
import ThongKe from "../pages/Admin/ThongKe";
import AdminLayout from "../layouts/AdminLayout";
import FormLayout from "../layouts/FormLayout";
import QuanLyNguyenLieu from "../pages/Admin/QuanLyNguyenLieu";
import QuanLyNhaSanXuat from "../pages/Admin/QuanLyNhaSanXuat";
import ThongTin from "../pages/Users/ThongTin";
import QuanLyKho from "../pages/Admin/QuanLyKho";
import QuanLySanPhamKho from "../pages/Admin/QuanLySanPhamKho";
import SanPhamKho from "../pages/Admin/SanPhamKho";
import QuanLyNguyenLieuKho from "../pages/Admin/QuanLyNguyenLieuKho";
import NguyenLieuKho from "../pages/Admin/NguyenLieuKho";
import { PATH } from "../utils";
import { useNotificationContext } from "../hooks/useNotification";
import Loading from "../components/Loading";
import CongThuc from "../pages/Admin/CongThuc";
import DanhSachNguyenLieu from "../pages/Admin/DanhSachNguyenLieu";
import ChiTietKho from "../pages/Admin/ChiTietKho";
import ChiTietSanPham from "../pages/Admin/ChiTietSanPham";
import QuanLyNguoiDung from "../pages/Admin/QuanLyNguoiDung";
import QuanLyCa from "../pages/Admin/QuanLyCa";
import QuanLyLichLamViec from "../pages/Admin/QuanLyLichLamViec";

const AppRouter = () => {
  const { isLoading } = useNotificationContext();

  return (
    <>
      {isLoading && <Loading />}
      <Routes>
        <Route path="/" element={<FormLayout />}>
          <Route path={PATH.LOGIN} element={<Login />} />
        </Route>
        <Route path={PATH.ADMIN} element={<AdminLayout />}>
          <Route index element={<ThongKe />} />
          <Route path={PATH.SAN_PHAM} element={<QuanLySanPham />} />
          <Route path={PATH.NGUYEN_LIEU} element={<QuanLyNguyenLieu />} />
          <Route path={PATH.NSX} element={<QuanLyNhaSanXuat />} />
          <Route path={PATH.INFO} element={<ThongTin />} />
          <Route path={PATH.KHO} element={<QuanLyKho />} />
          <Route path={PATH.CT_SP} element={<QuanLySanPhamKho />} />
          <Route path={PATH.CT_NL} element={<QuanLyNguyenLieuKho />} />
          <Route path={PATH.SP_KHO} element={<SanPhamKho />} />
          <Route path={PATH.NL_KHO} element={<NguyenLieuKho />} />
          <Route path={PATH.CONG_THUC} element={<CongThuc />} />
          <Route path={PATH.DS_NL} element={<DanhSachNguyenLieu />} />

          <Route path={PATH.CT_K} element={<ChiTietKho />} />
          <Route path={PATH.CTSP} element={<ChiTietSanPham />} />
          <Route path={PATH.QL_ND} element={<QuanLyNguoiDung />} />
          <Route path={PATH.QL_CA} element={<QuanLyCa />} />
          <Route path={PATH.QL_LLV} element={<QuanLyLichLamViec />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
