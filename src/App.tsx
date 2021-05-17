import styles from "./App.module.scss";
import "antd/dist/antd.css";
import { QuickLink } from "./01.module/QuickLink/QuickLink";
import StoryStudent from "./01.module/StoryStudent/EmployeeOfTheMonth";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UpcomingBirthdays from "./01.module/UpcommingStudent/UpcomingBirthday";
import NewEmployees from "./01.module/NewMember/NewEmployees";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Select, Skeleton, Menu, Dropdown, Button } from "antd";
import { BaseComponent } from "./00.common/00.components/BaseComponent";
import { quickLinkService } from "./00.common/02.service/quickLinkService";
import { orderBy } from "lodash";
import { storage } from "./firebase.config";
import React from "react";
import Words600Com from "./01.module/600WordsToeic/WordsToeics600";
import GrammarCom from "./01.module/Grammar/Grammar";
import MainPage from "./admin/MainPage";
import { UploadFile } from "./00.common/00.components/UploadFile";
import MenuItem from "antd/lib/menu/MenuItem";
import { ParParrt1 } from "./01.module/Practice/Part1/Part1";
const { Option } = Select;
interface propsApp {}
interface stateApp {
  allTopMenu: any[];
  logo: string;
  flatArrTopMenu: any[];
}
export default class App extends BaseComponent<propsApp, stateApp> {
  constructor(props: propsApp) {
    super(props);
    this.state = {
      allTopMenu: [],
      logo: "",
      flatArrTopMenu: [],
    };
    this.onMount(async () => {
      await Promise.all([this.getTopMenu(), this.getImgUrl()]);
    });
  }

  async getImgUrl() {
    let [logo] = await Promise.all([
      storage.ref().child("CommonDoc/Logo/logo.png").getDownloadURL(),
    ]);
    this.setState({
      logo,
    });
  }

  renderRouter(arrTopMenu: any[]) {
    let flatArrTopMenu: { Title: string; Code: string }[] = [];

    arrTopMenu.forEach((item) => {
      flatArrTopMenu.push({ Title: item.Title, Code: item.Code });
      if (item.SubItem && item.SubItem.length > 0) {
        // lấy ra code và title của các phần tử trong subItem
        let arrSubitem = item.SubItem.map((item) => {
          return { Title: item.Title, Code: item.Code };
        });
        flatArrTopMenu = flatArrTopMenu.concat(arrSubitem);
      }
    });
    this.setState({
      flatArrTopMenu,
    });
  }
  async getTopMenu() {
    let allTopMenu = orderBy(
      await quickLinkService.getAll("TopMenu"),
      "OrderBy",
      "asc"
    );
    await this.setState({
      allTopMenu,
    });
  }

  getSubitems(arrSubitems: any[]) {
    let itemsRender: JSX.Element;
    if (arrSubitems && arrSubitems.length > 0) {
      itemsRender = (
        <Menu style={{ backgroundColor: "white", border: "solid 1px #F1F3F4" }}>
          {arrSubitems.map((item) => (
            <MenuItem>
              <Link style={{ color: "#33ABE5" }} to={`/${item.Code}`}>
                {item.Title}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      );
    } else {
      itemsRender = <div style={{ display: "none" }}></div>;
    }
    return itemsRender;
  }
  render() {
    return (
      <div>
        {this.state.allTopMenu && this.state.allTopMenu.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Router>
              {!window.location.href.includes("admin") && (
                <div className={styles.HomePageApp}>
                  <div className={styles.HomePageApp__header}>
                    <div className={styles.HomePageApp__header__left}>
                      <img
                        onClick={() => {
                          window.open("https://feed.hust.edu.vn/");
                        }}
                        className={styles.HomePageApp__header__left__img}
                        src={this.state.logo}
                      />
                      <div></div>
                      <Link
                        className={styles.HomePageApp__header__left__title}
                        style={{ color: "white" }}
                        to={`/`}
                      >
                        TOEIC SINH VIÊN HUST
                      </Link>
                      <div
                        className={styles.HomePageApp__header__left__topMenu}
                      >
                        {this.state.allTopMenu.map((item) => (
                          <Link
                            to={`/${item.Code}`}
                            className={
                              styles.HomePageApp__header__left__topMenu__item
                            }
                            style={{ zIndex: 1000 }}
                          >
                            <Dropdown
                              trigger={["hover"]}
                              overlay={this.getSubitems(item.SubItem)}
                            >
                              <div> {item.Title}</div>
                            </Dropdown>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className={styles.HomePageApp__header__right}>
                      <div
                        className={styles.HomePageApp__header__right__divider}
                      />
                      <div className={styles.HomePageApp__header__right__text}>
                        Đăng kí
                      </div>
                      <div className={styles.HomePageApp__header__right__text}>
                        Đăng nhập
                      </div>
                      <Link
                        className={styles.HomePageApp__header__right__text}
                        to={"/admin"}
                      >
                        Quản trị
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              <div
                style={{
                  marginTop: !window.location.href.includes("admin") ? 77 : 0,
                }}
              >
                <Switch>
                  <Route exact path="/">
                    <QuickLink />
                    <StoryStudent />
                    <UpcomingBirthdays />
                    <NewEmployees />
                  </Route>
                  <Route path="/ngu-phap">
                    <GrammarCom />
                  </Route>
                  <Route path="/huong-dan">
                    <div>Hướng dẫn</div>
                  </Route>
                  <Route path="/meo-thi">
                    <div
                      style={{
                        height: 800,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <UploadFile
                        type={"audio"}
                        refDocLib={"hihihi"}
                        result={(value) => {}}
                      />
                    </div>
                  </Route>
                  <Route path="/600-tu-toeic">
                    <Words600Com />
                  </Route>
                  <Route path="/de-thi">
                    <div>Mẹo thi</div>
                  </Route>
                  <Route path="/theme-detail">
                    <div>Mẹo thi</div>
                  </Route>
                  <Route path="/admin">
                    <MainPage />
                  </Route>
                  <Route path="/admin">
                    <MainPage />
                  </Route>
                  <Route  path="/part1">
                    <ParParrt1/>
                  </Route>
                </Switch>
              </div>
            </Router>
          </div>
        ) : (
          <Skeleton avatar paragraph={{ rows: 10 }} />
        )}
      </div>
    );
  }
}
