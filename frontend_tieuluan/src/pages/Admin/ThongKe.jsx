import React, { useEffect, useState } from "react";
import { useNotificationContext } from "../../hooks/useNotification";
import NguoiDungServices from "../../services/NguoiDung.Service";
import SanPhamServices from "../../services/SanPham.Service";
import NguyenLieuServices from "../../services/NguyenLieu.Service";
import KhoServices from "../../services/Kho.Service";

const ThongKe = () => {
  const { setIsLoading } = useNotificationContext();
  const [NDTotal, setNDTotal] = useState(0);
  const [SPTotal, setSPTotal] = useState(0);
  const [NLTotal, setNLTotal] = useState(0);
  const [khoTotal, setKhoTotal] = useState(0);

  const getCountND = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await NguoiDungServices.getAll({});
      if (status === 201) {
        setNDTotal(data.count);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const getCountSP = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await SanPhamServices.getAll({
        page: 1,
        limit: 6,
      });
      if (status === 201) {
        setSPTotal(data.count);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const getCountNL = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await NguyenLieuServices.getAll({
        page: 1,
        limit: 6,
      });
      if (status === 201) {
        setNLTotal(data.count);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const getCountKho = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await KhoServices.getAll({ page: 1, limit: 6 });
      if (status === 201) {
        setKhoTotal(data.khos.length);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCountSP();
    getCountKho();
    getCountND();
    getCountNL();
  }, []);

  return (
    <div>{`ND: ${NDTotal} - SP: ${SPTotal} - NL: ${NLTotal} - Kho: ${khoTotal}`}</div>
  );
};

export default ThongKe;
