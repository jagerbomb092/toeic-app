// eslint-disable-next-line
import styles from "./HomePageApp.module.scss";
import { orderBy } from "lodash";
import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import { quickLinkService } from "../../00.common/02.service/quickLinkService";
import { storage } from "../../firebase.config";
import StoryStudent from "./StoryStudent/EmployeeOfTheMonth";
interface staeHomepage {
  logo: string;
  img1: string;
  img2: string;
  img3_viewImg: string;
  allQuickLink: any[];
}

interface propsHomePage {}

export class HomePageAppp extends BaseComponent<propsHomePage, staeHomepage> {
  constructor(props: propsHomePage) {
    super(props);
    this.state = {
      logo: "",
      img1: "",
      img2: "",
      img3_viewImg: "",
      allQuickLink: [],
    };
    this.onMount(async () => {
      await this.getListQuickLink();
    });
  }

  async getListQuickLink() {
    let allQuickLink = orderBy(
      await quickLinkService.getAll("QuickLink"),
      "Order",
      "asc"
    );

    this.setState({
      allQuickLink,
    });
  }
  async componentWillMount() {
    await this.getImgUrl();
  }
  async getImgUrl() {
    let [logo, img1, img2, img3_viewImg] = await Promise.all([
      storage.ref().child("CommonDoc/Logo/logo.png").getDownloadURL(),
      storage.ref().child("CommonDoc/ImgHomePage/img1.png").getDownloadURL(),
      storage.ref().child("CommonDoc/ImgHomePage/img2.png").getDownloadURL(),
      storage
        .ref()
        .child("CommonDoc/ImgHomePage/img3_viewImg.png")
        .getDownloadURL(),
    ]);

    this.setState({
      logo,
      img1,
      img2,
      img3_viewImg,
    });
  }
  render() {
    return (
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
            <div className={styles.HomePageApp__header__left__title}>
              TOEIC SINH VIÊN HUST
            </div>
          </div>
          <div className={styles.HomePageApp__header__right}>
            <div className={styles.HomePageApp__header__right__divider} />
            <div className={styles.HomePageApp__header__right__text}>
              Đăng kí
            </div>
            <div className={styles.HomePageApp__header__right__text}>
              Đăng nhập
            </div>
          </div>
        </div>
        <div
          className={styles.HomePageApp__block1}
          style={{ backgroundImage: `url(${this.state.img2})` }}
        >
          <div className={styles.HomePageApp__block1__infor}>
            <div className={styles.HomePageApp__block1__infor__introText}>
              Đề luyện tập TOEIC phong phú
            </div>
            <div
              className={styles.HomePageApp__block1__infor__img3_viewImg}
              style={{ backgroundImage: `url(${this.state.img3_viewImg})` }}
            >
              <div
                className={
                  styles.HomePageApp__block1__infor__img3_viewImg__text
                }
              >
                50+ đề thi thử TOEIC và 7000+ đề luyện tập cho bạn tha hồ luyện
                thi
              </div>
            </div>
          </div>
          <img
            src={this.state.img1}
            className={styles.HomePageApp__block1__img1}
          />
          <div className={styles.HomePageApp__block1__infor}>
            <div className={styles.HomePageApp__block1__infor__introText}>
              Đáp án có GIẢI THÍCH cặn kẽ
            </div>
            <div
              className={styles.HomePageApp__block1__infor__img3_viewImg}
              style={{ backgroundImage: `url(${this.state.img3_viewImg})` }}
            >
              <div
                className={
                  styles.HomePageApp__block1__infor__img3_viewImg__text
                }
              >
                Giúp bạn hiểu rõ vì sao đáp án này thì đúng còn đáp án kia thì
                sai
              </div>
            </div>
          </div>
        </div>
        <div className={styles.HomePageApp__block2}>
          <div className={styles.HomePageApp__block2__title}>
            Tiếng Anh Mỗi Ngày có tất cả mọi thứ bạn cần để luyện thi TOEIC hiệu
            quả
          </div>
          <div className={styles.HomePageApp__block2__content}>
            {this.state.allQuickLink.slice(0, 4).map((item, key) => (
              <div
                key={key}
                className={styles.HomePageApp__block2__content__img3_viewImg}
                style={{ backgroundImage: `url(${this.state.img3_viewImg})` }}
              >
                <img
                  src={item.ImgUrl}
                  className={
                    styles.HomePageApp__block2__content__img3_viewImg__img
                  }
                />
              </div>
            ))}
          </div>
          <div className={styles.HomePageApp__block2__content}>
            {this.state.allQuickLink.slice(4, 8).map((item, key) => (
              <div>
                <div
                  key={key}
                  className={styles.HomePageApp__block2__content__img3_viewImg}
                  style={{ backgroundImage: `url(${this.state.img3_viewImg})` }}
                >
                  <img
                    src={item.ImgUrl}
                    className={
                      styles.HomePageApp__block2__content__img3_viewImg__img
                    }
                  />
                </div>
                <div className={styles.HomePageApp__block2__content__title}>
                  {" "}
                  {item.Title}
                </div>
              </div>
            ))}
          </div>
        </div>
        <StoryStudent />
      </div>
    );
  }
}
