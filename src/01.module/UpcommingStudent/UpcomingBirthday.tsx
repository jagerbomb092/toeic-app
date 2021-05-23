import { Empty, Skeleton } from "antd";
import * as _ from "lodash";
import * as moment from "moment";
import * as React from "react";
import Slider from "react-slick";

import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import { MemberInfor } from "../../00.common/01.model/MemberInfor";
import { upCommingBirthdayService } from "../../00.common/02.service/upcommingBirthdayService";

import styles from "./UpcomingBirthday.module.scss";

interface UpcomingBirthdaysProps {}
interface UpcomingBirthdaysStates {
  color?: string;
  enable?: boolean;
  isHover: boolean;
  key?: number;
  firstindex?: number;
  lastIndex: number;
  loading: boolean;
  dataSource: MemberInfor[];
}

export  class UpcomingBirthdays extends BaseComponent<
  UpcomingBirthdaysProps,
  UpcomingBirthdaysStates
> {
  public constructor(props: UpcomingBirthdaysProps) {
    super(props);
    this.state = {
      isHover: false,
      firstindex: 0,
      lastIndex: 3,
      loading: true,
      dataSource: [],
    };
    this.onMount(async () => {
      await this.getData();
      this.setState({
        loading: false,
      });
    });
  }

  protected mouseEnter = (index?: number) => {
    this.setState({ isHover: true, key: index });
  };

  protected mouseLeave = (index?: number) => {
    this.setState({ isHover: false, key: undefined });
  };

  async getData() {
    const dataSource = await upCommingBirthdayService.getAll<MemberInfor>("MemberDirectory");
    this.setState({
      dataSource,
    });
  }

  public renderAllItem(): React.ReactNode {
    if (this.state.dataSource.length > 0) {
      const elements = this.state.dataSource.map((item, index) => {
        let imgUser: string = require("./images/Icon.png");
        return (
          <div
            onMouseEnter={() => {
              this.mouseEnter(index);
            }}
            onMouseLeave={() => {
              this.mouseLeave(index);
            }}
            key={index}
          >
            {this.state.isHover && this.state.key == index ? (
              <div
                className={styles.upcomingBirthdaysSlider__slider__itemHover}
              >
                {item.PhotoUrl ? (
                  <img
                    src={`${item.PhotoUrl}?width=48&height=48`}
                    className={
                      styles.upcomingBirthdaysSlider__slider__itemHover__avartar
                    }
                  />
                ) : item.Sex === "Male" ? (
                  <img
                    className={
                      styles.upcomingBirthdaysSlider__slider__itemHover__avartar
                    }
                    src={imgUser}
                  />
                ) : (
                  <img
                    className={
                      styles.upcomingBirthdaysSlider__slider__itemHover__avartar
                    }
                    src={imgUser}
                  />
                )}
                <div
                  className={
                    styles.upcomingBirthdaysSlider__slider__itemHover__name
                  }
                >
                  {item.LoginName}
                </div>
                <div
                  className={
                    styles.upcomingBirthdaysSlider__slider__itemHover__jobTitle
                  }
                >
                  {item.JobTitle}
                </div>
                <div
                  className={
                    styles.upcomingBirthdaysSlider__slider__itemHover__email
                  }
                >
                  {item.Email}
                </div>
                <div
                  className={
                    styles.upcomingBirthdaysSlider__slider__itemHover__workPhone
                  }
                >
                  {item.PhoneNumber}
                </div>
                <div
                  onClick={() => {
                    window.location.href = `MSTeams:/l/chat/0/0?users=${item?.LoginName}`;
                  }}
                  className={
                    styles.upcomingBirthdaysSlider__slider__itemHover__msTeam
                  }
                >
                  {iconMSTeam}
                  Gửi tin nhắn
                </div>
              </div>
            ) : (
              <div className={styles.upcomingBirthdaysSlider__slider__item}>
                <div
                  className={
                    styles.upcomingBirthdaysSlider__slider__item__message
                  }
                >
                  {_.get(item, "Wish")}
                </div>
                <div
                  className={
                    styles.upcomingBirthdaysSlider__slider__item__inforUser
                  }
                >
                  {item.PhotoUrl ? (
                    <img
                      src={item.PhotoUrl}
                      height="48px"
                      width="48px"
                      className={
                        styles.upcomingBirthdaysSlider__slider__item__inforUser__avartar
                      }
                    />
                  ) : item.Sex === "Female" ? (
                    <img
                      height="48px"
                      width="48px"
                      className={
                        styles.upcomingBirthdaysSlider__slider__item__inforUser__avartar
                      }
                      src={imgUser}
                    />
                  ) : (
                    <img
                      height="48px"
                      width="48px"
                      className={
                        styles.upcomingBirthdaysSlider__slider__item__inforUser__avartar
                      }
                      src={imgUser}
                    />
                  )}
                  <div
                    className={
                      styles.upcomingBirthdaysSlider__slider__item__inforUser__title
                    }
                  >
                    <div
                      className={
                        styles.upcomingBirthdaysSlider__slider__item__inforUser__title__content1
                      }
                    >
                      {item.LoginName}
                    </div>
                    <div
                      className={
                        styles.upcomingBirthdaysSlider__slider__item__inforUser__title__content2
                      }
                    >
                      Sinh viên
                    </div>

                    <div
                      className={
                        styles.upcomingBirthdaysSlider__slider__item__inforUser__title__content2
                      }
                    >
                      Nhân viên văn phòng
                    </div>
                  </div>
                </div>
                <div
                  className={
                    styles.upcomingBirthdaysSlider__slider__item__footer
                  }
                >
                  {iconFooter}
                </div>

                <div
                  className={
                    styles.upcomingBirthdaysSlider__slider__item__dateOfBirth
                  }
                >
                  <span
                    className={
                      styles.upcomingBirthdaysSlider__slider__item__dateOfBirth__day
                    }
                  >
                    12
                  </span>
                  <span
                    className={
                      styles.upcomingBirthdaysSlider__slider__item__dateOfBirth__dotted
                    }
                  >
                    .
                  </span>
                  <span
                    className={
                      styles.upcomingBirthdaysSlider__slider__item__dateOfBirth__month
                    }
                  >
                    13
                  </span>
                  {item.DateOfBirth && (
                    <span>
                      <span
                        className={
                          styles.upcomingBirthdaysSlider__slider__item__dateOfBirth__dotted
                        }
                      >
                        .
                      </span>
                      <span
                        className={
                          styles.upcomingBirthdaysSlider__slider__item__dateOfBirth__day
                        }
                      >
                        2021
                      </span>
                    </span>
                  )}
                </div>

                <div
                  className={styles.upcomingBirthdaysSlider__slider__item__elip}
                >
                  {iconElip}
                </div>
              </div>
            )}
          </div>
        );
      });
      return elements;
    } else {
      return (
        <div style={{ width: `100%`, marginTop: 25 }}>
          <Empty />
        </div>
      );
    }
  }

  public getResponsiveSlider(lengthList: number) {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplaySpeed: 2500,
      autoplay: false,
      nextArrow:
        this.state.lastIndex == this.state.dataSource.length ? (
          <SampleNextArrow />
        ) : (
          <SampleNextArrowHighLight />
        ),
      prevArrow:
        this.state.firstindex == 0 ? (
          <SamplePrevArrow />
        ) : (
          <SamplePrevArrowHighLight />
        ),
      swipe: false,
      afterChange: (index: number) => {
        this.setState({
          firstindex: index,
          lastIndex: index + 3,
        });
      },
      responsive: [
        {
          breakpoint: 600,
          settings: {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 2500,
            speed: 500,
            autoplay: false,
          },
        },
        {
          breakpoint: 850,
          settings: {
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplaySpeed: 2500,
            speed: 500,
            autoplay: false,
          },
        },
        {
          breakpoint: 1025,
          settings: {
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplaySpeed: 2500,
            speed: 500,
            autoplay: false,
          },
        },
      ],
    };
    if (lengthList >= 3) {
      for (let i = 0; i < settings.responsive.length; i++) {
        settings.responsive[i].settings.autoplay = true;
        settings.responsive[i].settings.infinite = true;
      }
      return settings;
    } else {
      for (let i = 0; i < lengthList; i++) {
        settings.responsive[i].settings.autoplay = true;
        settings.responsive[i].settings.infinite = true;
      }
      return settings;
    }
  }

  public render(): React.ReactElement<UpcomingBirthdaysProps> {
    const settings = this.getResponsiveSlider(this.state.dataSource.length);

    return (
      <div className={styles.upcomingBirthdaysSlider}>
        <div className={styles.upcomingBirthdaysSlider__header}>
          Sinh nhật trong tháng
        </div>
        <Skeleton paragraph={{ rows: 5 }} loading={this.state.loading}>
          {this.state.dataSource && this.state.dataSource.length > 0 ? (
            <Slider
              {...settings}
              className={styles.upcomingBirthdaysSlider__slider}
            >
              {this.renderAllItem()}
            </Slider>
          ) : (
            <Empty
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
              description={"Chưa có dữ liệu "}
            />
          )}
        </Skeleton>
      </div>
    );
  }
}
const iconMSTeam = (
  <svg
    className={
      styles.upcomingBirthdaysSlider__slider__itemHover__msTeam__iconMSTeam
    }
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5625 4.875C15.3901 4.875 15.2195 4.90895 15.0602 4.97491C14.901 5.04087 14.7563 5.13755 14.6344 5.25942C14.5125 5.3813 14.4159 5.52599 14.3499 5.68523C14.2839 5.84447 14.25 6.01514 14.25 6.1875C14.25 6.35986 14.2839 6.53053 14.3499 6.68977C14.4159 6.84901 14.5125 6.9937 14.6344 7.11558C14.7563 7.23745 14.901 7.33413 15.0602 7.40009C15.2195 7.46605 15.3901 7.5 15.5625 7.5C15.7349 7.5 15.9055 7.46605 16.0648 7.40009C16.224 7.33413 16.3687 7.23745 16.4906 7.11558C16.6125 6.9937 16.7091 6.84901 16.7751 6.68977C16.8411 6.53053 16.875 6.35986 16.875 6.1875C16.875 6.01514 16.8411 5.84447 16.7751 5.68523C16.7091 5.52599 16.6125 5.3813 16.4906 5.25942C16.3687 5.13755 16.224 5.04087 16.0648 4.97491C15.9055 4.90895 15.7349 4.875 15.5625 4.875ZM1.5 15L10.125 16.5V1.5L1.5 3V15Z"
      fill="#5C6BC0"
    />
    <path
      d="M7.875 6.10156V7.12531L6.37875 7.19281L6.37125 11.6403L5.25375 11.6066V7.23406L3.75 7.29406V6.35281L7.875 6.10156Z"
      fill="white"
    />
    <path
      d="M13.5 5.25C13.5 6.07875 12.8288 6.75 12 6.75C11.55 6.75 11.1488 6.55125 10.875 6.24V4.26C11.1488 3.94875 11.55 3.75 12 3.75C12.8288 3.75 13.5 4.42125 13.5 5.25ZM14.25 8.625V12.75C14.25 12.75 14.8376 12.75 15.5625 12.75C16.2232 12.75 16.7644 12.2603 16.8563 11.625H16.875V8.625H14.25ZM10.875 7.5V13.875C10.875 13.875 11.4626 13.875 12.1875 13.875C12.8483 13.875 13.3894 13.3853 13.4813 12.75H13.5V7.5H10.875Z"
      fill="#5C6BC0"
    />
  </svg>
);
const iconFooter = (
  <svg
    className={styles.upcomingBirthdaysSlider__slider__item__footerIcon}
    width="372"
    height="26"
    viewBox="0 0 372 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="33.2267" cy="15.5727" r="4.44768" fill="#FED150" />
    <circle
      cx="209.917"
      cy="23.3972"
      r="1.99472"
      transform="rotate(173.197 209.917 23.3972)"
      fill="#FFA940"
    />
    <circle
      cx="317.217"
      cy="21.2166"
      r="1.99472"
      transform="rotate(173.197 317.217 21.2166)"
      fill="#FFA940"
    />
    <circle
      cx="130.93"
      cy="15.5339"
      r="2.81816"
      transform="rotate(-60.9464 130.93 15.5339)"
      fill="#FFD666"
    />
    <circle
      cx="247.832"
      cy="17.8318"
      r="2.81816"
      transform="rotate(-60.9464 247.832 17.8318)"
      fill="#FFD666"
    />
    <circle cx="12.4591" cy="4.49145" r="3.05395" fill="#FFA940" />
    <circle
      cx="52.4504"
      cy="7.76051"
      r="1.96314"
      transform="rotate(125.857 52.4504 7.76051)"
      fill="#FFA940"
    />
    <circle cx="159.159" cy="11.5627" r="3.05395" fill="#FA8C16" />
    <path
      d="M370.794 6.99979L371.686 14.4736L364 7.81034L370.794 6.99979Z"
      fill="#FFBB96"
    />
    <path
      d="M70.3041 0.596566L75.4453 0.0693359L70.7834 5.27043L70.3041 0.596566Z"
      fill="#FFC069"
    />
    <path
      d="M6.65307 16.9627L4.06885 21.4385L2.58421 14.6134L6.65307 16.9627Z"
      fill="#FFC069"
    />
    <path d="M79.8837 22.344V17.1758L84.582 22.344H79.8837Z" fill="#FFC069" />
    <rect
      x="105.523"
      y="19.3906"
      width="14.3694"
      height="1.36852"
      transform="rotate(-35.1173 105.523 19.3906)"
      fill="#FFD591"
    />
    <rect
      x="345.265"
      y="14.5225"
      width="9.8666"
      height="0.939676"
      transform="rotate(123.764 345.265 14.5225)"
      fill="#FA8C16"
    />
    <rect
      x="177.139"
      y="16.3574"
      width="9.8666"
      height="0.939676"
      transform="rotate(6.377 177.139 16.3574)"
      fill="#FF9C6E"
    />
    <rect
      x="284.667"
      y="17.5303"
      width="9.8666"
      height="0.939676"
      transform="rotate(24.6463 284.667 17.5303)"
      fill="#FF9C6E"
    />
  </svg>
);
const iconElip = (
  <svg
    className={styles.upcomingBirthdaysSlider__slider__item__styleElipIcon}
    width="144"
    height="172"
    viewBox="0 0 144 172"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="141" cy="141" r="141" fill="#FFF6EF" />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="141"
        y1="0"
        x2="63.0959"
        y2="191.863"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFF2E8" />
        <stop offset="1" stop-color="#FFF2E8" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
function SampleNextArrowHighLight(props: any) {
  const { className, style, onClick, index } = props;
  return (
    <svg
      className={className}
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" />
      <path
        d="M8.65625 5.81641L8.10938 6.33594C8 6.47266 8 6.69141 8.10938 6.80078L13.0586 11.75L8.10938 16.7266C8 16.8359 8 17.0547 8.10938 17.1914L8.65625 17.7109C8.79297 17.8477 8.98438 17.8477 9.12109 17.7109L14.8633 11.9961C14.9727 11.8594 14.9727 11.668 14.8633 11.5312L9.12109 5.81641C8.98438 5.67969 8.79297 5.67969 8.65625 5.81641Z"
        fill={"#33abe5"}
      />
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="3.5"
        stroke={"#33abe5"}
      />
    </svg>
  );
}

function SamplePrevArrowHighLight(props: any) {
  const { className, style, onClick } = props;
  return (
    <svg
      className={className}
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" />
      <path
        d="M14.3164 17.7109L14.8633 17.1914C14.9727 17.0547 14.9727 16.8359 14.8633 16.7266L9.91406 11.75L14.8633 6.80078C14.9727 6.69141 14.9727 6.47266 14.8633 6.33594L14.3164 5.81641C14.1797 5.67969 13.9883 5.67969 13.8516 5.81641L8.10938 11.5312C8 11.668 8 11.8594 8.10938 11.9961L13.8516 17.7109C13.9883 17.8477 14.1797 17.8477 14.3164 17.7109Z"
        fill={"#33abe5"}
      />
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="3.5"
        stroke={"#33abe5"}
      />
    </svg>
  );
}
function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <svg
      className={className}
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" />
      <path
        d="M8.65625 5.81641L8.10938 6.33594C8 6.47266 8 6.69141 8.10938 6.80078L13.0586 11.75L8.10938 16.7266C8 16.8359 8 17.0547 8.10938 17.1914L8.65625 17.7109C8.79297 17.8477 8.98438 17.8477 9.12109 17.7109L14.8633 11.9961C14.9727 11.8594 14.9727 11.668 14.8633 11.5312L9.12109 5.81641C8.98438 5.67969 8.79297 5.67969 8.65625 5.81641Z"
        fill={"#BFBFBF"}
      />
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="3.5"
        stroke={"#BFBFBF"}
      />
    </svg>
  );
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <svg
      className={className}
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" />
      <path
        d="M14.3164 17.7109L14.8633 17.1914C14.9727 17.0547 14.9727 16.8359 14.8633 16.7266L9.91406 11.75L14.8633 6.80078C14.9727 6.69141 14.9727 6.47266 14.8633 6.33594L14.3164 5.81641C14.1797 5.67969 13.9883 5.67969 13.8516 5.81641L8.10938 11.5312C8 11.668 8 11.8594 8.10938 11.9961L13.8516 17.7109C13.9883 17.8477 14.1797 17.8477 14.3164 17.7109Z"
        fill={"#BFBFBF"}
      />
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="3.5"
        stroke={"#BFBFBF"}
      />
    </svg>
  );
}
