import "./App.less";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { getRouteName, config as routeConfig } from "@/router/index.tsx";
import React, { useState, useEffect, Suspense } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Avatar,
  Flex,
  Col,
} from "antd";
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function App() {
  const navigate = useNavigate();
  let location = useLocation();

  const [openKeys, setOpenKeys] = useState<any>([""]);
  const [selectedKeys, setSelectedKeys] = useState<any>([""]);

  useEffect(() => {
    let routes = location.pathname.split("/").filter((i) => i);
    if (routes.length === 2) {
      setOpenKeys([routes[0]]);
      setSelectedKeys([routes[1]]);
    } else if (routes.length === 1) {
      setSelectedKeys([routes[0]]);
    }
  }, [location]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = routeConfig.map((item: any) => {
    return getItem(
      item.name,
      item.path,
      item.icon,
      item.children.map((cItem: any) => getItem(cItem.name, cItem.path))
    );
  });

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          mode="inline"
          items={items}
          onClick={(e) => {
            let path = e.keyPath.reverse().join("/");
            navigate(path);
            setSelectedKeys([e.key]);
          }}
          onOpenChange={(openKeys) => {
            setOpenKeys([openKeys[1]]);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex justify="space-between" align="center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Col className="avatar-group">
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1677ff" }}
              />
              <Col style={{ lineHeight: 1, marginTop: '5px' }}>@adrablezzz</Col>
            </Col>
          </Flex>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {getRouteName(location.pathname).map((item: any, index: any) => {
              return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
            })}
          </Breadcrumb>
          <div
            style={{
              padding: 12,
              minHeight: 280,
              height: "calc(100vh - 140px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Suspense fallback={<div>loading...</div>}>
              <Outlet></Outlet>
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
