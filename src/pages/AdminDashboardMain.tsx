import React, { useState } from "react";
import { Layout, Menu, Button, Avatar } from "antd";
import {
  AppstoreOutlined,
  TagsOutlined,
  TeamOutlined,
  InboxOutlined,
  ExportOutlined,
  MessageOutlined,
  DashboardOutlined,
  LogoutOutlined,
  HistoryOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { outAdmin } from "../redux/slices/adminSlice";

const { Content, Sider } = Layout;

const AdminDashboardMain: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(outAdmin());
    navigate("/");
  };

  const menuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Обзор</Link>,
    },
    {
      key: "/admin/inventory",
      icon: <AppstoreOutlined />,
      label: <Link to="/admin/inventory">Запасы</Link>,
    },
    {
      key: "/admin/categories",
      icon: <TagsOutlined />,
      label: <Link to="/admin/categories">Категории</Link>,
    },
    {
      key: "/admin/suppliers",
      icon: <TeamOutlined />,
      label: <Link to="/admin/suppliers">Поставщики</Link>,
    },
    {
      key: "/admin/receipts",
      icon: <InboxOutlined />,
      label: <Link to="/admin/receipts">Поступления</Link>,
    },
    {
      key: "/admin/write-offs",
      icon: <ExportOutlined />,
      label: <Link to="/admin/write-offs">Списания</Link>,
    },
    {
      key: "/admin/operations-history",
      icon: <HistoryOutlined />,
      label: <Link to="/admin/operations-history">Операции</Link>,
    },
    {
      key: "/admin/feedback",
      icon: <MessageOutlined />,
      label: <Link to="/admin/feedback">Сообщения</Link>,
    },
  ];

  return (
    <Layout
      style={{
        height: "auto",
        background: "linear-gradient(180deg, #f8fbff 0%, #f4f7fb 100%)",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={290}
        collapsedWidth={92}
        theme="light"
        style={{
          background: "#ffffff",
          borderRight: "1px solid #e2e8f0",
          padding: "20px 0px 16px",
          position: "sticky",
          top: 0,
          height: "100vh",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: collapsed ? 0 : 14,
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? "8px 10px 18px" : "8px 16px 18px",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              minWidth: 46,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.16), rgba(59,130,246,0.16))",
              border: "1px solid #bae6fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0369a1",
              fontWeight: 700,
              fontSize: 16,
              boxShadow: "0 8px 24px rgba(14, 165, 233, 0.08)",
            }}
          >
            SV
          </div>

          {!collapsed && (
            <a href="/" style={{ textDecoration: "none" }}>
              <div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#0f172a",
                    lineHeight: 1.2,
                  }}
                >
                  Stock Vision
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                    marginTop: 3,
                  }}
                >
                  Мониторинг складских запасов
                </div>
              </div>
            </a>
          )}
        </div>

        {!collapsed && (
          <div
            style={{
              margin: "4px 14px 14px",
              padding: "14px",
              borderRadius: 20,
              background:
                "linear-gradient(180deg, rgba(240,249,255,1) 0%, rgba(248,250,252,1) 100%)",
              border: "1px solid #e0f2fe",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#0284c7",
              }}
            >
              Рабочая область
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 14,
                lineHeight: 1.6,
                color: "#475569",
              }}
            >
              Контроль запасов, отслеживание операций и централизованное
              управление складскими данными.
            </div>
          </div>
        )}

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          theme="light"
          style={{
            border: "none",
            background: "transparent",
            fontSize: 14,
          }}
        />

        <div style={{ marginTop: "auto", paddingTop: 16 }}>

          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            block
            danger
            size="large"
            style={{
              width: "calc(100% - 28px)",
              borderRadius: 14,
              height: 44,
              margin: "0 14px",
            }}
          >
            {!collapsed && "Выйти"}
          </Button>
        </div>
      </Sider>

      <Layout style={{ background: "transparent" }}>
        <Content
          style={{
            padding: "22px",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 18,
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 24,
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  Admin workspace
                </div>
                <h1
                  style={{
                    margin: "6px 0 0",
                    fontSize: 24,
                    lineHeight: 1.2,
                    color: "#0f172a",
                    fontWeight: 700,
                  }}
                >
                  Система мониторинга и управления запасами
                </h1>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 14,
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#475569",
                  }}
                >
                  <BellOutlined />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 8px 6px 6px",
                    borderRadius: 16,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "#e0f2fe",
                      color: "#0369a1",
                      fontWeight: 700,
                    }}
                  >
                    A
                  </Avatar>
                  <div style={{ lineHeight: 1.2 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      Администратор
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        marginTop: 2,
                      }}
                    >
                      Доступ к панели
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                minHeight: "calc(100vh - 80px)",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 28,
                padding: 24,
                boxShadow: "0 14px 40px rgba(15, 23, 42, 0.05)",
              }}
            >
              <Outlet />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardMain;
