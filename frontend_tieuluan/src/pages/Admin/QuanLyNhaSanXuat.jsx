import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Input, Form, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import styled from "styled-components";
import { useNotificationContext } from "../../hooks/useNotification";
import NhaSanXuatServices from "../../services/NhaSanXuat.Service";
import { convertDate, ERROR_LOG } from "../../utils";

const TitlelH2 = styled.h2`
  color: #231390;
  text-align: center;
`;
const StyledFormItem = styled(Form.Item)`
  margin-bottom: 16px;
`;

const QuanLyNhaSanXuat = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setShowNotification, setIsLoading } = useNotificationContext();
  const [form] = Form.useForm();
  const [maNSX, setMaNSX] = useState(undefined);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });

  const getAllNSX = async ({ page = 1, limit = 6, name = null }) => {
    setIsLoading(true);
    try {
      const { data, status } = await NhaSanXuatServices.getAll({
        page,
        limit,
        name,
      });

      if (status === 201) {
        setPagination({
          current: page ?? 1,
          pageSize: limit ?? 6,
          total: data.count,
        });
        setDataSource(
          data.nhaSanXuats.map((item, i) => ({
            key: item.Ma_NSX,
            Ten_NSX: item.Ten_NSX,
            createdAt: convertDate(item.createdAt),
            index: i + 1,
            total: item.Nguyen_Lieus?.length,
          }))
        );
      }
    } catch (error) {
      console.log("Không thể lấy danh sách nsx!");
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllNSX({ page: pagination.current, limit: pagination.pageSize });
  }, [pagination.current, pagination.pageSize]);

  const handleShowModal = async (ma = null) => {
    setMaNSX(undefined);
    if (ma) {
      setMaNSX(ma);
      await getOneNSX(ma);
    }
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    setIsLoading(true);
    try {
      let status = 200;
      let message = "";
      if (maNSX) {
        const res = await NhaSanXuatServices.update(maNSX, {
          Ten_NSX: values.Ten_NSX,
        });
        status = res.status;
        message = res.message;
      } else {
        const res = await NhaSanXuatServices.create({
          Ten_NSX: values.Ten_NSX,
        });
        status = res.status;
        message = res.message;
      }
      if (status) {
        await getAllNSX({
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
      setShowNotification(ERROR_LOG);
    }

    setIsModalVisible(false);
    form.resetFields();
    setIsLoading(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const getOneNSX = async (ma) => {
    setIsLoading(true);
    try {
      const { data, message, status } = await NhaSanXuatServices.getOne(ma);
      setShowNotification({
        isShow: true,
        message,
        status: status === 201 ? "success" : "error",
      });
      if (status === 201) {
        form.setFieldsValue({
          Ten_SP: data.Ten_SP,
          Gia: data.Gia,
          Mo_Ta: data.Mo_Ta,
        });
      }
    } catch (err) {
      console.log("Error: ", err);
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
  };

  const handleDeleteNSX = async (ma) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa nsx này?",
      icon: <ExclamationCircleFilled />,
      cancelText: "Hủy",
      async onOk() {
        setIsLoading(true);
        try {
          const { message, status } = await NhaSanXuatServices.delete(ma);

          setShowNotification({
            isShow: true,
            message,
            status: status === 200 ? "success" : "error",
          });
          if (status === 200) {
            await getAllNSX({
              page: pagination.current,
              limit: pagination.pageSize,
            });
          }
        } catch (error) {
          console.error("Error deleting nsx:", error);
          setShowNotification((prev) => ({
            ...prev,
            isShow: true,
          }));
        }
        setIsLoading(false);
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "index",
      render: (text) => <span>{text}</span>,
    },
    { title: "Tên nhà sản xuất", dataIndex: "Ten_NSX" },
    { title: "Ngày tạo", dataIndex: "createdAt" },
    { title: "SLNL", dataIndex: "total" },
    {
      title: "Thao tác",
      render: (_, record) => (
        <span>
          <EditOutlined
            style={{ marginRight: 8, cursor: "pointer" }}
            onClick={() => handleShowModal(record.key)}
          />
          <DeleteOutlined
            style={{ marginRight: 8, color: "red", cursor: "pointer" }}
            onClick={() => handleDeleteNSX(record.key)}
          />
        </span>
      ),
    },
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  return (
    <div style={{ padding: "20px" }}>
      <TitlelH2>Quản Lý Nhà Sản Xuất</TitlelH2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleShowModal()}
        style={{
          marginBottom: "10px",
          backgroundColor: "#4CAF50",
          borderColor: "#4CAF50",
        }}
      >
        Thêm Nhà Sản Xuất
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title={maNSX ? "Chỉnh sửa nhà sản xuất" : "Thêm nhà sản xuất"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleOk}>
          <StyledFormItem
            label="Tên nhà sản xuất"
            name="Ten_NSX"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhà sản xuất!" },
            ]}
          >
            <Input />
          </StyledFormItem>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {maNSX ? "Cập nhật nhà sản xuất" : "Thêm nhà sản xuất"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLyNhaSanXuat;
