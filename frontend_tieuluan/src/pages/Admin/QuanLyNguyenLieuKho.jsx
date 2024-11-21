import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Input, Space, Select, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  ArrowLeftOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useNotificationContext } from "../../hooks/useNotification";
import ChiTietNguyenLieuServices from "../../services/ChiTietNguyenLieu";
import {
  convertDate,
  ERROR_LOG,
  formatCurrency,
  PATH,
  PATH_ADMIN,
} from "../../utils";

const TitlelH2 = styled.h2`
  color: #231390;
  text-align: center;
`;

const { Option } = Select;

// Styled components for styling
const Container = styled.div``;

const FilterContainer = styled(Space)`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const StyledSearchInput = styled(Input)`
  width: 200px;
  border-radius: 8px;
  padding: 4px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #d9d9d9;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 8px rgba(64, 169, 255, 0.6);
  }

  .ant-input-suffix {
    color: #1890ff;
    font-size: 18px;
  }
`;

const StyledSearchIcon = styled(SearchOutlined)`
  color: #1890ff;
  font-size: 18px;
  cursor: pointer;
`;

const StyledPriceSelect = styled(Select)`
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #d9d9d9;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 8px rgba(64, 169, 255, 0.6);
  }
`;

const QuanLyNguyenLieuKho = () => {
  const navigate = useNavigate();
  const { setShowNotification, setIsLoading } = useNotificationContext();
  const { ma } = useParams();
  const [dataPro, setDataPro] = useState([]);
  const [searchName, setSearchName] = useState(undefined);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });

  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "Tên Nguyên liệu", dataIndex: "name", key: "name" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    { title: "Khối lượng", dataIndex: "total", key: "total" },
    { title: "Ngày sản xuất", dataIndex: "Ngay_SX", key: "Ngay_SX" },
    { title: "Ngày hết hạn", dataIndex: "Ngay_HH", key: "Ngay_HH" },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue", cursor: "pointer" }}
            title="Sửa"
          />
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            title="Xóa"
            onClick={() => handleDeleteNL(record.ma_NL)}
          />
          <EyeOutlined
            style={{ color: "green", cursor: "pointer" }}
            title="Xem chi tiết"
          />
        </Space>
      ),
    },
  ];

  const getAllNLByKhoId = async ({
    page = 1,
    limit = 6,
    order = null,
    by = null,
    kho = null,
  }) => {
    setIsLoading(true);
    try {
      const { status, data } = await ChiTietNguyenLieuServices.getAll({
        page,
        limit,
        order,
        by,
        kho,
      });

      if (status === 201) {
        setPagination({
          current: page ?? 1,
          pageSize: limit ?? 6,
          total: data.count,
        });

        setDataPro(
          data?.chiTietNguyenLieus.map((val, i) => {
            const price = formatCurrency(
              val?.Kho?.Loai_Kho ? val.Gia_Nhap : val.Gia_Xuat
            );
            return {
              key: i + 1,
              name: val?.Nguyen_Lieu?.Ten_NL,
              price,
              total: val.Khoi_Luong,
              Ngay_SX: convertDate(val.Ngay_SX),
              Ngay_HH: convertDate(val.Ngay_HH),
              ma_NL: val.Ma_NL,
            };
          })
        );
      }
    } catch (e) {
      console.log("Error: ", e);
      setShowNotification(ERROR_LOG);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (ma) {
      getAllNLByKhoId({
        page: pagination.current,
        limit: pagination.pageSize,
        kho: ma,
      });
    }
  }, [ma, pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handleDeleteNL = async (maNL) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      icon: <ExclamationCircleFilled />,
      cancelText: "Hủy",
      async onOk() {
        setIsLoading(true);
        try {
          const { message, status } = await ChiTietNguyenLieuServices.delete(
            ma,
            maNL
          );

          setShowNotification({
            isShow: true,
            message,
            status: status === 200 ? "success" : "error",
          });
        } catch (error) {
          console.error("Error deleting NL:", error);
          setShowNotification(ERROR_LOG);
        }
        setIsLoading(false);
      },
      onCancel() {},
    });
  };

  return (
    <Container>
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ border: "none" }}
      ></Button>
      <TitlelH2>Quản Lý Nguyên Liệu Kho</TitlelH2>

      <FilterContainer>
        <StyledSearchInput
          placeholder="Lọc theo tên"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          suffix={<StyledSearchIcon />}
        />
        <StyledPriceSelect defaultValue="">
          <Option value="">Lọc theo giá</Option>
          <Option value="asc">Sắp xếp theo giá (Tăng dần)</Option>
          <Option value="desc">Sắp xếp theo giá (Giảm dần)</Option>
        </StyledPriceSelect>
        <Button
          type="primary"
          icon={<FilterOutlined />}
          onClick={() => console.log("Lọc nguyên liệu")}
        >
          Lọc
        </Button>
      </FilterContainer>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 20 }}
        onClick={() => navigate(PATH_ADMIN(PATH.NL_KHO).replace(":ma", ma))}
      >
        Thêm nguyên liệu vào kho
      </Button>

      <Table
        columns={columns}
        dataSource={dataPro}
        rowKey="key"
        pagination={pagination}
        onChange={handleTableChange}
      />
    </Container>
  );
};

export default QuanLyNguyenLieuKho;
