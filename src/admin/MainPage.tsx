import { BaseComponent } from "../00.common/00.components/BaseComponent";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  BookOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import React from "react";
import List600WordsToeic from "./600WordToeic/List600WordToeic";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
interface MainPageProps {}
interface MainPageState {}

export default class MainPage extends BaseComponent<
  MainPageProps,
  MainPageState
> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Layout>
        <Header className="header" style={{ backgroundColor: "#33ABE5" }}>
          <div
            style={{
              float: "right",
            }}
          />
          <Menu
            style={{ backgroundColor: "#33ABE5" }}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<BookOutlined />} title="600 từ toeic ">
                <Menu.Item key="1">Danh sách</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                backgroundColor: "#fff",
              }}
            >
              <List600WordsToeic />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
