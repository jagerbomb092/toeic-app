import { Empty, Skeleton } from "antd";
import * as _ from "lodash";
import * as React from "react";
import styles from "./NewEmployees.module.scss";
import Slider from "react-slick";

import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import { upCommingBirthdayService } from "../../00.common/02.service/upcommingBirthdayService";

interface NewEmployeesProps {}
interface NewEmployeesStates {
  firstindex?: number;
  lastIndex: number;
  loading: boolean;
  dataSource: any[];
}

export  class NewEmployees extends BaseComponent<
  NewEmployeesProps,
  NewEmployeesStates
> {
  public constructor(props: NewEmployeesProps) {
    super(props);
    this.state = {
      loading: true,
      firstindex: 0,
      lastIndex: 4,
      dataSource: [],
    };
    this.onMount(async () => {
      await this.getData();
      this.setState({
        loading: false,
      });
    });
  }

  async getData() {
    const dataSource = await upCommingBirthdayService.getAll("MemberDirectory");
    this.setState({
      dataSource,
    });
  }

  public renderAllItem() {
    let imgUser: string = require("./images/Icon.png");
    if (this.state.dataSource.length > 0) {
      const elements = this.state.dataSource.map((item, index) => {
        return (
          <div className={styles.newEmployeesSlider__slider__item}>
            {header}
            <div
              className={styles.newEmployeesSlider__slider__item__ContentInfor}
            >
              {item.Avatar ? (
                <img
                  className={
                    styles.newEmployeesSlider__slider__item__ContentInfor__Avartar
                  }
                  src={`${item.Avatar}?width=64&height=64`}
                />
              ) : (
                <img
                  src={imgUser}
                  className={
                    styles.newEmployeesSlider__slider__item__ContentInfor__Avartar
                  }
                />
              )}
              <div
                className={
                  styles.newEmployeesSlider__slider__item__ContentInfor__employeeName
                }
              >
                {item.FullName}
              </div>
              <div
                className={
                  styles.newEmployeesSlider__slider__item__ContentInfor__jobtitleEmployee
                }
              >
                Học Sinh
              </div>
              <div
                className={
                  styles.newEmployeesSlider__slider__item__ContentInfor__empMail
                }
              >
                Sinh viên năm cuối
              </div>
              <div
                className={
                  styles.newEmployeesSlider__slider__item__ContentInfor__empPhone
                }
              >
                15/12/2021
              </div>
              <div
                onClick={() => {
                  window.location.href = `MSTeams:/l/chat/0/0?users=${item?.FullName}`;
                }}
                className={
                  styles.newEmployeesSlider__slider__item__ContentInfor__msTeam
                }
              >
                {iconMSTeam}
                Gửi tin nhắn
              </div>
            </div>
          </div>
        );
      });
      return elements;
    }
  }

  public getResponsiveSlider(lengthList: number) {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
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
          lastIndex: index + 4,
        });
      },

      responsive: [
        {
          breakpoint: 500,
          settings: {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 2500,
            speed: 500,
            autoplay: false,
            nextArrow: null,
            prevArrow: null,
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
    if (lengthList >= 4) {
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

  public render(): React.ReactElement<NewEmployeesProps> {
    const settings = this.getResponsiveSlider(
      this.state.dataSource.length
    ) as any;

    return (
      <div className={styles.newEmployeesSlider}>
        <div className={styles.newEmployeesSlider__header}>
          Chào đón nhân viên mới
        </div>
        <Skeleton paragraph={{ rows: 5 }} loading={this.state.loading}>
          {this.state.dataSource && this.state.dataSource.length > 0 ? (
            <Slider {...settings} className={styles.newEmployeesSlider__slider}>
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
const header = (
  <svg
    style={{
      width: "100%",
      height: "auto",
      position: "absolute",
      top: "0px",
    }}
    width="267"
    height="123"
    viewBox="0 0 267 123"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M59.3099 5.42899C59.8056 5.42899 60.2075 5.02712 60.2075 4.53139C60.2075 4.03566 59.8056 3.63379 59.3099 3.63379C58.8142 3.63379 58.4123 4.03566 58.4123 4.53139C58.4123 5.02712 58.8142 5.42899 59.3099 5.42899Z"
      fill="black"
    />
    <path
      d="M206.898 102.795C207.393 102.795 207.795 102.393 207.795 101.898C207.795 101.402 207.393 101 206.898 101C206.402 101 206 101.402 206 101.898C206 102.393 206.402 102.795 206.898 102.795Z"
      fill="black"
    />
    <path
      d="M29.8976 104.795C30.3933 104.795 30.7952 104.393 30.7952 103.898C30.7952 103.402 30.3933 103 29.8976 103C29.4019 103 29 103.402 29 103.898C29 104.393 29.4019 104.795 29.8976 104.795Z"
      fill="#FF6F00"
    />
    <path
      d="M40.9465 86.513C41.4423 86.513 41.8441 86.1111 41.8441 85.6154C41.8441 85.1196 41.4423 84.7178 40.9465 84.7178C40.4508 84.7178 40.049 85.1196 40.049 85.6154C40.049 86.1111 40.4508 86.513 40.9465 86.513Z"
      fill="#FF6F00"
    />
    <path
      d="M243.138 108.207C243.633 108.207 244.035 107.805 244.035 107.31C244.035 106.814 243.633 106.412 243.138 106.412C242.642 106.412 242.24 106.814 242.24 107.31C242.24 107.805 242.642 108.207 243.138 108.207Z"
      fill="#FF6F00"
    />
    <path
      d="M43.7141 10.2171C44.2098 10.2171 44.6117 9.8152 44.6117 9.31947C44.6117 8.82374 44.2098 8.42188 43.7141 8.42188C43.2183 8.42188 42.8165 8.82374 42.8165 9.31947C42.8165 9.8152 43.2183 10.2171 43.7141 10.2171Z"
      fill="#FF6F00"
    />
    <path
      d="M11.8976 28.7952C12.3933 28.7952 12.7952 28.3933 12.7952 27.8976C12.7952 27.4019 12.3933 27 11.8976 27C11.4019 27 11 27.4019 11 27.8976C11 28.3933 11.4019 28.7952 11.8976 28.7952Z"
      fill="#FFA417"
    />
    <path
      d="M17.072 119.387C17.5678 119.387 17.9696 118.985 17.9696 118.489C17.9696 117.994 17.5678 117.592 17.072 117.592C16.5763 117.592 16.1744 117.994 16.1744 118.489C16.1744 118.985 16.5763 119.387 17.072 119.387Z"
      fill="#FFA417"
    />
    <path
      d="M219.91 60.4895C220.406 60.4895 220.807 60.0877 220.807 59.5919C220.807 59.0962 220.406 58.6943 219.91 58.6943C219.414 58.6943 219.012 59.0962 219.012 59.5919C219.012 60.0877 219.414 60.4895 219.91 60.4895Z"
      fill="#FFA417"
    />
    <path
      d="M265.32 55.0433C265.815 55.0433 266.217 54.6414 266.217 54.1457C266.217 53.6499 265.815 53.248 265.32 53.248C264.824 53.248 264.422 53.6499 264.422 54.1457C264.422 54.6414 264.824 55.0433 265.32 55.0433Z"
      fill="#FFA417"
    />
    <path
      d="M205.32 11.1145C205.815 11.1145 206.217 10.7127 206.217 10.2169C206.217 9.72121 205.815 9.31934 205.32 9.31934C204.824 9.31934 204.422 9.72121 204.422 10.2169C204.422 10.7127 204.824 11.1145 205.32 11.1145Z"
      fill="#FFA417"
    />
    <path
      d="M254.474 70.4895C254.969 70.4895 255.371 70.0877 255.371 69.5919C255.371 69.0962 254.969 68.6943 254.474 68.6943C253.978 68.6943 253.576 69.0962 253.576 69.5919C253.576 70.0877 253.978 70.4895 254.474 70.4895Z"
      fill="black"
    />
    <path
      d="M0.8976 95.7952C1.39333 95.7952 1.7952 95.3933 1.7952 94.8976C1.7952 94.4019 1.39333 94 0.8976 94C0.40187 94 0 94.4019 0 94.8976C0 95.3933 0.40187 95.7952 0.8976 95.7952Z"
      fill="black"
    />
    <path
      d="M73.2227 27.9812C74.462 27.9812 75.4667 26.9765 75.4667 25.7372C75.4667 24.4978 74.462 23.4932 73.2227 23.4932C71.9834 23.4932 70.9787 24.4978 70.9787 25.7372C70.9787 26.9765 71.9834 27.9812 73.2227 27.9812Z"
      fill="url(#paint0_radial)"
    />
    <path
      d="M178.242 85.2038C179.481 85.2038 180.486 84.1991 180.486 82.9598C180.486 81.7205 179.481 80.7158 178.242 80.7158C177.003 80.7158 175.998 81.7205 175.998 82.9598C175.998 84.1991 177.003 85.2038 178.242 85.2038Z"
      fill="url(#paint1_radial)"
    />
    <path
      d="M146.789 17.2478L153.259 -2.2002"
      stroke="#FFBB96"
      stroke-width="2.0544"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
    <path
      d="M130.108 16.6872L114.138 3.78418"
      stroke="#FFBB96"
      stroke-width="2.0544"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
    <path
      d="M139.196 12.4982L136.728 2.5498"
      stroke="#FFBB96"
      stroke-width="2.0544"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
    <path
      d="M79.319 80.6774C80.5583 80.6774 81.563 79.6728 81.563 78.4334C81.563 77.1941 80.5583 76.1895 79.319 76.1895C78.0796 76.1895 77.075 77.1941 77.075 78.4334C77.075 79.6728 78.0796 80.6774 79.319 80.6774Z"
      fill="url(#paint2_radial)"
    />
    <path
      d="M164.244 38.488C165.483 38.488 166.488 37.4833 166.488 36.244C166.488 35.0047 165.483 34 164.244 34C163.005 34 162 35.0047 162 36.244C162 37.4833 163.005 38.488 164.244 38.488Z"
      fill="url(#paint3_radial)"
    />
    <path
      d="M184.076 -3.06073L158.831 12.4229L161.374 9.28127L178.878 -12.3359L182.318 -6.23973L184.076 -3.06073Z"
      fill="#D9D9D9"
    />
    <path
      d="M182.805 -3.8081L157.56 11.6755L160.103 8.53391L177.606 -13.0459L181.047 -6.9871L182.805 -3.8081Z"
      fill="#FFA417"
    />
    <path
      d="M182.805 -3.8083L157.56 11.6753L160.103 8.53369L181.047 -6.9873L182.805 -3.8083Z"
      fill="#EDEDED"
    />
    <path
      d="M38.74 63.549L51.2316 63.0254L49.6234 63.6612L38.74 68.037V65.0824V63.549Z"
      fill="#D9D9D9"
    />
    <path
      d="M38.4033 63.0256L50.8949 62.502L49.3241 63.1377L38.4407 67.4762V64.559L38.4033 63.0256Z"
      fill="#FFA417"
    />
    <path
      d="M38.4033 63.0256L50.8949 62.502L49.3241 63.1377L38.4407 64.559L38.4033 63.0256Z"
      fill="#EDEDED"
    />
    <path
      d="M210.743 78.0602L202.552 73.834L203.786 73.9836L212.388 75.1804L211.304 77.0504L210.743 78.0602Z"
      fill="black"
    />
    <path
      d="M210.743 78.0602L202.552 73.834L203.786 73.9836L211.304 77.0504L210.743 78.0602Z"
      fill="black"
    />
    <path
      d="M46.1078 38.8271L52.9894 42.1183L51.9422 42.0061L44.8362 41.2207L45.659 39.65L46.1078 38.8271Z"
      fill="#D9D9D9"
    />
    <path
      d="M46.1078 38.2285L52.9894 41.5197L51.9422 41.4075L44.8362 40.6221L45.659 39.0513L46.1078 38.2285Z"
      fill="black"
    />
    <path
      d="M95.2513 -3.77051L110.174 12.4237L107.519 11.0025L89.2673 1.35329L93.1943 -2.01271L95.2513 -3.77051Z"
      fill="#D9D9D9"
    />
    <path
      d="M95.2513 -5.22949L110.174 10.9647L107.519 9.5435L89.2673 -0.105692L93.1943 -3.47169L95.2513 -5.22949Z"
      fill="#FF6F00"
    />
    <path
      d="M95.2513 -5.22949L110.174 10.9647L107.518 9.5435L93.1943 -3.47169L95.2513 -5.22949Z"
      fill="#D9D9D9"
    />
    <path
      d="M215.53 49.1497L198.887 48.4765L201.056 47.8033L216.016 43.2031L215.717 47.0927L215.53 49.1497Z"
      fill="#FF6F00"
    />
    <path
      d="M215.53 49.1498L198.887 48.4766L201.056 47.8034L215.717 47.0928L215.53 49.1498Z"
      fill="#D9D9D9"
    />
    <path
      d="M78.0847 73.8339L74.3073 73.3477L72.2503 76.564L68.4729 76.0404L66.4159 79.2568L62.6385 78.7706L60.5441 81.987L56.7667 81.4634"
      stroke="#FF5400"
      stroke-width="1.0272"
      stroke-miterlimit="10"
    />
    <path
      d="M194.436 31.6095L190.659 31.0859L188.602 34.3023L184.824 33.8161L182.73 37.0325L178.953 36.5089L176.896 39.7253L173.118 39.2391"
      stroke="#FF5400"
      stroke-width="1.0272"
      stroke-miterlimit="10"
    />
    <path
      d="M86.3127 18.5194L85.1159 15.116L81.6377 14.1062L80.4035 10.7028L76.9253 9.73037L75.6911 6.32697L72.2129 5.35457L70.9787 1.95117"
      stroke="#FFA618"
      stroke-width="1.0272"
      stroke-miterlimit="10"
    />
    <path
      d="M242.505 44.4236L242.318 40.6836L238.952 39.0379L238.728 35.3354L235.4 33.6898L235.175 29.9872L231.809 28.3416L231.585 24.6016"
      stroke="#FFA618"
      stroke-width="1.0272"
      stroke-miterlimit="10"
    />
    <path
      d="M84.3305 35.2744L86.3501 36.9948L88.5941 35.611L87.5843 38.0794L89.6039 39.7998L86.9485 39.5754L85.9387 42.0064L85.3403 39.4632L82.6849 39.2388L84.9663 37.855L84.3305 35.2744Z"
      fill="#A84900"
    />
    <path
      d="M166.611 72.4873L166.424 75.1053L168.855 76.1151L166.274 76.7509L166.087 79.4063L164.703 77.1249L162.122 77.7607L163.843 75.7411L162.459 73.4971L164.89 74.5069L166.611 72.4873Z"
      fill="#A84900"
    />
    <path
      d="M186.433 14.667L186.208 17.3224L188.677 18.3322L186.096 18.9306L185.909 21.586L184.525 19.3046L181.945 19.9404L183.665 17.9208L182.281 15.6768L184.712 16.6866L186.433 14.667Z"
      fill="#A84900"
    />
    <path
      d="M23.9653 50.627L23.7409 53.2824L26.2093 54.2922L23.6287 54.9279L23.4043 57.5459L22.0205 55.3019L19.4773 55.9003L21.1603 53.9182L19.7765 51.6368L22.2449 52.6465L23.9653 50.627Z"
      fill="#A84900"
    />
    <defs>
      <radialGradient
        id="paint0_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(73.2287 25.7392) scale(2.25581)"
      >
        <stop stop-color="white" />
        <stop offset="0.3647" stop-color="#FFFAFA" />
        <stop offset="0.8262" stop-color="#FFEDEA" />
        <stop offset="1" stop-color="#FFE7E2" />
      </radialGradient>
      <radialGradient
        id="paint1_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(178.234 82.9627) scale(2.25582)"
      >
        <stop stop-color="white" />
        <stop offset="0.3647" stop-color="#FFFAFA" />
        <stop offset="0.8262" stop-color="#FFEDEA" />
        <stop offset="1" stop-color="#FFE7E2" />
      </radialGradient>
      <radialGradient
        id="paint2_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(79.3197 78.45) scale(2.25582)"
      >
        <stop stop-color="white" />
        <stop offset="0.3647" stop-color="#FFFAFA" />
        <stop offset="0.8262" stop-color="#FFEDEA" />
        <stop offset="1" stop-color="#FFE7E2" />
      </radialGradient>
      <radialGradient
        id="paint3_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(164.254 36.2334) scale(2.25582)"
      >
        <stop stop-color="white" />
        <stop offset="0.3647" stop-color="#FFFAFA" />
        <stop offset="0.8262" stop-color="#FFEDEA" />
        <stop offset="1" stop-color="#FFE7E2" />
      </radialGradient>
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
        fill={"#FA541C"}
      />
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="3.5"
        stroke={"#FA541C"}
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
        fill={"#FA541C"}
      />
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="3.5"
        stroke={"#FA541C"}
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
const iconMSTeam = (
  <svg
    style={{ marginRight: "13px" }}
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
