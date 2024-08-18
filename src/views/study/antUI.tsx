import { useState, useRef, useEffect } from "react";
import {
  Space,
  Button,
  Col,
  Modal,
  Row,
  Table,
  Form,
  Input,
  message,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export default function StudyPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const [tableLoading, setTableLoading] = useState(false);
  const refreshData = () => {
    setTableLoading(true);
    setTimeout(() => {
      setTableLoading(false);
    }, 1000);
  };

  const dataSource = Array.from({ length: 50 }, (_, i) => {
    return {
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    };
  });

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection: any = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      console.log("selectedRowKeys changed: ", newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // 弹框
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (isModal) {
      formRef.current.resetFields();

      isEdit &&
        formRef.current.setFieldsValue({
          username: "张三",
          age: "18",
          address: "北京",
        });
    }
  }, [isModal]);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const valid = await formRef.current.validateFields();
      if (valid) {
        console.log(valid);
        setIsModal(false);
        messageApi.success("提交成功");
        setConfirmLoading(false);
        refreshData();
      }
    } catch (err) {
      messageApi.error("请检查信息");
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setIsModal(false);
  };
  // 表单
  type FieldType = {
    username?: string;
    age?: string;
    address?: string;
  };
  const formRef = useRef<any>();

  return (
    <>
      {contextHolder}
      <Row align={"middle"} style={{ height: 40 }}>
        <Col span={12}>
          <Space>
            <Button size="small" onClick={() => setIsModal(true)}>
              新增
            </Button>
            <Button
              size="small"
              onClick={() => {
                console.log(selectedRowKeys);
                console.log(
                  dataSource.filter((item) =>
                    selectedRowKeys.includes(item.key)
                  )
                );
                setSelectedRowKeys([])
                refreshData()
              }}
            >
              删除
            </Button>
          </Space>
        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            size="small"
            icon={<ReloadOutlined style={{ fontSize: "12px" }} />}
            onClick={refreshData}
          ></Button>
        </Col>
      </Row>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        size="small"
        loading={tableLoading}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 300 }}
        rowSelection={rowSelection}
      />
      <Modal
        title="新增个人信息"
        open={isModal}
        okText="确认"
        cancelText="取消"
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          ref={formRef}
          name="userInfo"
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="姓名"
            name="username"
            rules={[{ required: true, message: "请填写姓名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="年龄"
            name="age"
            rules={[{ required: true, message: "请填写年龄" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="住址"
            name="address"
            rules={[{ required: true, message: "请填写住址" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
