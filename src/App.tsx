import styles from "./App.module.scss";
import "antd/dist/antd.css";
import { QuickLink } from "./01.module/QuickLink/QuickLink";
import StoryStudent from "./01.module/StoryStudent/EmployeeOfTheMonth";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UpcomingBirthdays from "./01.module/UpcommingStudent/UpcomingBirthday";
import NewEmployees from "./01.module/NewMember/NewEmployees";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Skeleton } from "antd";
import { BaseComponent } from "./00.common/00.components/BaseComponent";
import { quickLinkService } from "./00.common/02.service/quickLinkService";
import { orderBy } from "lodash";
import { storage } from "./firebase.config";
import React from "react";
import Words600Com from "./01.module/600WordsToeic/WordsToeics600";
import GrammarCom from "./01.module/Grammar/Grammar";
import MainPage from "./admin/MainPage";
import { UploadFile } from "./00.common/00.components/UploadFile";
interface propsApp {}
interface stateApp {
  allTopMenu: any[];
  logo: string;
}
export default class App extends BaseComponent<propsApp, stateApp> {
  constructor(props: propsApp) {
    super(props);
    this.state = {
      allTopMenu: [],
      logo: "",
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
                          <div
                            className={
                              styles.HomePageApp__header__left__topMenu__item
                            }
                          >
                            <Link
                              style={{ color: "white" }}
                              to={`/${item.Code}`}
                            >
                              {item.Title}
                            </Link>
                          </div>
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
