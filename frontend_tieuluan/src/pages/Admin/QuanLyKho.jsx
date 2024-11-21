import React, { useCallback, useEffect, useState } from "react";
import { Table, Select, Button, Modal, Input } from "antd";
import {
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  FilterOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { convertDate, ERROR_LOG, PATH, PATH_ADMIN } from "../../utils";
import KhoServices from "../../services/Kho.Service";
import { useNotificationContext } from "../../hooks/useNotification";

const TitlelH2 = styled.h2`
  color: #231390;
  text-align: center;
`;
const TitlelH3 = styled.h3`
  color: #231390;
`;

const QuanLyKho = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [choose, setChoose] = useState();
  const { setShowNotification, setIsLoading } = useNotificationContext();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });
  const [operation, setOperation] = useState();
  const [dataKho, setDataKho] = useState([]);
  const [maKho, setMaKho] = useState();

  const columns = [
    { title: "STT", dataIndex: "index", key: "index" },
    { title: "Loại Kho", dataIndex: "Loai_Kho", key: "trangThai" },
    { title: "Thời Gian Tạo", dataIndex: "createdAt", key: "thoiGianTao" },
    { title: "Số Lượng SP", dataIndex: "SLSP", key: "SLSP" },
    { title: "Số Lượng NL", dataIndex: "SLNL", key: "SLNL" },
    {
      title: "Thao tác",
      render: (_, record) => (
        <span>
          <EditOutlined
            style={{ marginRight: 8, cursor: "pointer" }}
            onClick={() => handleDeleteKho(record.key)}
          />
          <EyeOutlined
            style={{ marginRight: 8, color: "blue", cursor: "pointer" }}
          />
          <PlusCircleOutlined
            style={{ marginRight: 8, color: "green", cursor: "pointer" }}
            title="Nhập Sản Phẩm"
            onClick={() =>
              navigate(PATH_ADMIN(PATH.CT_SP).replace(":ma", record.key))
            }
          />
          <ShoppingCartOutlined
            style={{ color: "orange", cursor: "pointer" }}
            title="Nhập Nguyên Liệu"
            onClick={() =>
              navigate(PATH_ADMIN(PATH.CT_NL).replace(":ma", record.key))
            }
          />
        </span>
      ),
    },
  ];

  const getAllKho = async ({ page, limit, type = null }) => {
    setIsLoading(true);
    try {
      const { data, status } = await KhoServices.getAll({
        page,
        limit,
        type,
      });

      if (status === 201) {
        setPagination({
          current: page ?? 1,
          pageSize: limit ?? 6,
          total: data.count,
        });

        setDataKho(
          data?.khos.map((val, i) => ({
            index: i + 1,
            key: val.Ma_Kho,
            Loai_Kho: val.Loai_Kho ? "Nhập kho" : "Xuất kho",
            createdAt: convertDate(val.createdAt),
            SLSP: val.CTSP.length,
            SLNL: val.CTNL.length,
          }))
        );
      }
    } catch (e) {
      console.log("Error: ", e);
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllKho({ page: pagination.current, limit: pagination.pageSize });
  }, [pagination.current, pagination.pageSize]);

  const handleOperationChange = (value) => {
    setOperation(value);
  };

  const getOneKho = async (ma) => {
    setIsLoading(true);
    try {
      const { data, message, status } = await KhoServices.getOne(ma);
      setShowNotification({
        isShow: true,
        message,
        status: status === 201 ? "success" : "error",
      });
      if (status === 201) {
        setNote(data.Ghi_Chu);
        setChoose(data.Loai_Kho);
      }
    } catch (err) {
      console.log("Error: ", err);
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
  };

  const showModal = async (ma = null) => {
    setMaKho(undefined);
    if (ma) {
      setMaKho(ma);
      await getOneKho(ma);
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsLoading(true);
    try {
      let status = 200;
      let message = "";
      const data = {
        Loai_Kho: choose,
        Ghi_Chu: note,
      };
      if (maKho) {
        const res = await KhoServices.update(maKho, data);
        status = res.status;
        message = res.message;
      } else {
        const res = await KhoServices.create(data);
        status = res.status;
        message = res.message;
      }
      if (status) {
        await getAllKho({
          page: pagination.current,
          limit: pagination.pageSize,
        });
      }
      setShowNotification({
        isShow: true,
        message,
        status: status === 200 ? "success" : "error",
      });
    } catch (e) {
      console.log("Error: ", e);
    }

    setIsModalVisible(false);
    setNote("");
    setChoose(undefined);
    setIsLoading(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNote("");
    setChoose(undefined);
  };

  const handleDeleteKho = async (ma) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa kho này?",
      icon: <ExclamationCircleFilled />,
      cancelText: "Hủy",
      async onOk() {
        setIsLoading(true);
        try {
          const { message, status } = await KhoServices.delete(ma);

          setShowNotification({
            isShow: true,
            message,
            status: status === 200 ? "success" : "error",
          });
        } catch (error) {
          console.error("Error deleting kho:", error);
          setShowNotification(ERROR_LOG);
        }
        setIsLoading(false);
      },
      onCancel() {},
    });
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handleFilterClick = async () => {
    if (typeof operation === "boolean") {
      await getAllKho({
        page: pagination.current,
        limit: pagination.pageSize,
        type: operation,
      });
    }
  };

  return (
    <div>
      <TitlelH2>Quản Lý Kho</TitlelH2>

      <Select
        value={operation}
        style={{ width: 200, marginRight: 10 }}
        onChange={handleOperationChange}
        placeholder="Chọn loại kho"
      >
        <Select.Option value={true}>Nhập Kho</Select.Option>
        <Select.Option value={false}>Xuất Kho</Select.Option>
      </Select>

      <Button
        icon={<FilterOutlined />}
        onClick={handleFilterClick}
        style={{ marginBottom: 20 }}
      >
        Lọc
      </Button>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 20, marginLeft: 10 }}
        onClick={() => showModal()}
      >
        Tạo kho
      </Button>
      <Modal
        title="Tạo Kho Mới"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Input
          placeholder="Nhập ghi chú cho kho mới"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Select
          showSearch
          style={{
            width: 200,
          }}
          value={choose}
          onChange={(value) => setChoose(value)}
          placeholder="Search to Select"
          options={[
            {
              value: true,
              label: "Nhập kho",
            },
            {
              value: false,
              label: "Xuất kho",
            },
          ]}
        />
      </Modal>
      <div>
        {true ? (
          <TitlelH3>Bảng Nhập Kho</TitlelH3>
        ) : (
          <TitlelH3>Bảng Xuất Kho</TitlelH3>
        )}

        <Table
          columns={columns}
          dataSource={dataKho}
          rowKey="key"
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default QuanLyKho;
