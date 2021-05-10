import { BaseComponent } from "../00.common/00.components/BaseComponent";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  BookOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import React from "react";
import List600WordsToeic from "./600WordToeic/List600WordToeic";
import ListTheme from "./600WordToeic/ListTheme";
import { LIST_COMPONET_ADMIN } from "../00.common/const";
import ListToeicPart1 from "./Practice/Toeic_Part1/ListItemPart1";



const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
interface MainPageProps {}
interface MainPageState {
  element: JSX.Element;
}

export default class MainPage extends BaseComponent<
  MainPageProps,
  MainPageState
> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {
      element: <List600WordsToeic />,
    };
  }

  renderContent(keyContent: string) {
    let element: JSX.Element = <div></div>;
    if (keyContent == LIST_COMPONET_ADMIN.LIST_THEME_6000WORDS) {
      element = <ListTheme />;
    } else if (keyContent == LIST_COMPONET_ADMIN.LIST_600WORDS) {
      element = <List600WordsToeic />;
    }else if(keyContent==LIST_COMPONET_ADMIN.PART_1){
      element = <ListToeicPart1 />;
    }
    this.setState({
      element,
    });
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
              onClick={(e) => {
                this.renderContent(e.key as string);
              }}
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key={LIST_COMPONET_ADMIN.LIST_600WORDS} icon={<BookOutlined />} title="600 từ toeic ">
                <Menu.Item key={LIST_COMPONET_ADMIN.LIST_600WORDS}>
                  Danh sách
                </Menu.Item>
                <Menu.Item key={LIST_COMPONET_ADMIN.LIST_THEME_6000WORDS}>
                  Chủ đề
                </Menu.Item>
              </SubMenu>
              <SubMenu key={LIST_COMPONET_ADMIN.PART_1} icon={<LaptopOutlined />} title="Luyện tập">
                <Menu.Item key={LIST_COMPONET_ADMIN.PART_1}>
                  Toeic Part 1
                </Menu.Item>
                <Menu.Item key={LIST_COMPONET_ADMIN.PART_2}>
                  Toeic Part 2
                </Menu.Item>
                <Menu.Item key={LIST_COMPONET_ADMIN.PART_3}>
                  Toeic Part 3
                </Menu.Item>
                <Menu.Item key={LIST_COMPONET_ADMIN.PART_4}>
                  Toeic Part 4
                </Menu.Item>
                <Menu.Item key={LIST_COMPONET_ADMIN.PART_5}>
                  Toeic Part 5
                </Menu.Item>
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
              {this.state.element}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
