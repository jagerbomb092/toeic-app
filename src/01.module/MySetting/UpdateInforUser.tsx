import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import {
  Modal,
  Button,
  Avatar,
  Divider,
  Input,
  Form,
  FormInstance,
  Spin,
} from "antd";
import styles from "./UpdateInforUser.module.scss";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  WechatOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import editImg from "./img/edit.png";
import React from "react";
import { UploadFile } from "../../00.common/00.components/UploadFile";
import { userInforService } from "../../00.common/02.service/userInforService";
interface UpdateInforProps {
  inforUser: {
    photoURL: string;
    loginName: string;
    email?: string;
    phoneNumber?: string;
  };
  onUpdate: () => void;
}
interface UpdateInforState {
  modalVisible: boolean;
  edit: boolean;
  loading: boolean;
  Avatar?: string;
  chageAvatar: boolean;
  item?: any;
}

export class ModalUpdateUser extends BaseComponent<
  UpdateInforProps,
  UpdateInforState
> {
  public initialState = {
    modalVisible: false,
    edit: false,
    loading: false,
    chageAvatar: false,
  };
  private refUploadImg = React.createRef<UploadFile>();
  private formRef = React.createRef<FormInstance>();
  constructor(props: UpdateInforProps) {
    super(props);
    this.state = {
      modalVisible: false,
      edit: false,
      loading: false,
      chageAvatar: false,
    };
  }

  openItem(item?: any) {
    this.setState({
      modalVisible: true,
    });
  }

  async onclose() {
    await this.setState(this.initialState as any);
  }

  async saveItem() {
    try {
      //check xem fom đã đủ thông tin cần thiết để lưu chưa
      await this.formRef.current!.validateFields();

      await this.setState({
        loading: true,
      });
      //lấy ra dư liệu từ form
      const value = this.formRef.current!.getFieldsValue();
      value.ImgUrl = this.state.Avatar;

      //   if (this.state.item) {
      //     await userInforService.update(
      //       "ToeicPart1",
      //       this.state.item.KeyDoc,
      //       value
      //     );
      //   } else {
      //     await userInforService.save("ToeicPart1", "", value);
      //   }
      this.setState(this.initialState as any);

      await this.setState(this.initialState as any);
      this.formRef.current!.resetFields();
      this.props.onUpdate();
    } catch (error) {
      console.log("lỗi nha" + error);
      await this.setState(this.initialState as any);
    }
  }

  render() {
    let footer = [
      <Button
        onClick={() => {
          this.setState({
            edit: true,
          });
        }}
        key="submit"
        type="primary"
      >
        Chỉnh sửa
      </Button>,
    ];
    if (this.state.edit) {
      footer = [
        <Button
          onClick={() => {
            this.onclose();
          }}
          key="back"
        >
          Hủy
        </Button>,
        <Button
          onClick={() => {
            this.saveItem();
          }}
          key="submit"
          type="primary"
        >
          Cập nhật
        </Button>,
      ];
    }
    return (
      <Modal
        width={450}
        visible={this.state.modalVisible}
        onCancel={this.onclose}
        title="Thông tin cá nhân"
        footer={footer}
      >
        <Spin
          spinning={this.state.loading}
          tip={"Loading"}
          style={{ height: "100%", width: "100%" }}
        >
          <div className={styles.modalUpdateUser}>
            <div className={styles.modalUpdateUser__Avatar}>
              <Avatar
                shape="circle"
                icon={<UserOutlined />}
                size={80}
                src={
                  this.state.Avatar
                    ? this.state.Avatar
                    : this.props.inforUser.photoURL
                }
              />
              {this.state.edit && (
                <img
                  onClick={() => {
                    this.setState({
                      chageAvatar: !this.state.chageAvatar,
                    });
                  }}
                  className={styles.modalUpdateUser__Avatar__edit}
                  src={editImg}
                />
              )}
            </div>
            {this.state.edit ? (
              <Form ref={this.formRef} style={{ width: "100%", marginTop: 20 }}>
                <div style={{ marginBottom: 5 }}>
                  <Form.Item
                    className={styles.modalUpdateUser__otherInfor__title}
                    labelCol={{ span: 5 }}
                    label="Họ tên"
                    name="LoginName"
                    rules={[
                      { required: true, message: "Please input loginName!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>

                <Form.Item
                  className={styles.modalUpdateUser__otherInfor__title}
                  labelCol={{ span: 5 }}
                  label="Công việc"
                  name="JobTitle"
                  rules={[
                    { required: true, message: "Please input JobTitle!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  className={styles.modalUpdateUser__otherInfor__title}
                  labelCol={{ span: 5 }}
                  label="Địa chỉ"
                  name="Adrress"
                  rules={[{ required: true, message: "Please input Adrress!" }]}
                >
                  <Input />
                </Form.Item>

                <Divider
                  type={"horizontal"}
                  style={{ backgroundColor: "#BFBFBF", height: 1.5 }}
                />
                <div
                  className={styles.modalUpdateUser__otherInfor}
                  style={{ height: 50 }}
                >
                  <a
                    href="https://teams.microsoft.com/l/chat/0/0?users=devteam@createsimpleapps.com"
                    className={styles.modalUpdateUser__otherInfor__title}
                  >
                    <WechatOutlined
                      style={{ marginRight: 3, color: "#007ACC" }}
                    />{" "}
                    Chat cùng tôi
                  </a>
                  <Form.Item
                    name="LinkChat"
                    rules={[{ message: "Please input chat!" }]}
                  >
                    <Input style={{ width: 250 }} />
                  </Form.Item>
                </div>
                <div
                  className={styles.modalUpdateUser__otherInfor}
                  style={{ height: 50 }}
                >
                  <div className={styles.modalUpdateUser__otherInfor__title}>
                    <PhoneOutlined
                      style={{ marginRight: 3, color: "#007ACC" }}
                    />{" "}
                    Số Giới tính:
                  </div>
                  <Form.Item
                    name="Gender"
                    rules={[{ message: "Please input chat!" }]}
                  >
                    <Input style={{ width: 250 }} />
                  </Form.Item>
                </div>
                <div
                  className={styles.modalUpdateUser__otherInfor}
                  style={{ height: 50 }}
                >
                  <div className={styles.modalUpdateUser__otherInfor__title}>
                    <PhoneOutlined
                      style={{ marginRight: 3, color: "#007ACC" }}
                    />{" "}
                    Số điện thoại:
                  </div>

                  <Form.Item
                    name="Phone"
                    rules={[{ message: "Please input chat!" }]}
                  >
                    <Input style={{ width: 250 }} />
                  </Form.Item>
                </div>
                <div
                  className={styles.modalUpdateUser__otherInfor}
                  style={{ height: 50 }}
                >
                  <div className={styles.modalUpdateUser__otherInfor__title}>
                    <MailOutlined
                      style={{ marginRight: 5, color: "#007ACC" }}
                    />
                    Email:
                  </div>

                  <Form.Item
                    name="Email"
                    rules={[{ message: "Please input chat!" }]}
                  >
                    <Input style={{ width: 250 }} />
                  </Form.Item>
                </div>
                {this.state.chageAvatar && (
                  <div
                    className={styles.modalUpdateUser__otherInfor}
                    style={{ height: 100 }}
                  >
                    <div className={styles.modalUpdateUser__otherInfor__title}>
                      <CameraOutlined
                        style={{ marginRight: 5, color: "#007ACC" }}
                      />
                      Chọn ảnh đại diện:
                    </div>

                    <UploadFile
                      showImg={false}
                      onLoading={(loading) => {
                        this.setState({
                          loading: loading,
                        });
                      }}
                      ref={this.refUploadImg}
                      type={"img"}
                      result={async (values) => {
                        await this.setState({
                          Avatar: values[0],
                        });
                      }}
                      refDocLib={`UserInfor`}
                    />
                  </div>
                )}
              </Form>
            ) : (
              <>
                <div className={styles.modalUpdateUser__fullName}>
                  {this.props.inforUser.loginName}
                </div>
                <div style={{ marginBottom: 5 }}>Nhân viên văn phòng</div>
                <div>Hoàng Mai -Hà Nội</div>
                <Divider
                  type={"horizontal"}
                  style={{ backgroundColor: "#BFBFBF", height: 1.5 }}
                />
                <div className={styles.modalUpdateUser__otherInfor}>
                  <a
                    href="https://teams.microsoft.com/l/chat/0/0?users=devteam@createsimpleapps.com"
                    className={styles.modalUpdateUser__otherInfor__title}
                  >
                    <WechatOutlined
                      style={{ marginRight: 3, color: "#007ACC" }}
                    />{" "}
                    Chat cùng tôi
                  </a>
                </div>
                <div className={styles.modalUpdateUser__otherInfor}>
                  <div className={styles.modalUpdateUser__otherInfor__title}>
                    <PhoneOutlined
                      style={{ marginRight: 3, color: "#007ACC" }}
                    />{" "}
                    Số Giới tính:
                  </div>
                  <a className={styles.modalUpdateUser__otherInfor__value}>
                    nam
                  </a>
                </div>
                <div className={styles.modalUpdateUser__otherInfor}>
                  <div className={styles.modalUpdateUser__otherInfor__title}>
                    <PhoneOutlined
                      style={{ marginRight: 3, color: "#007ACC" }}
                    />{" "}
                    Số điện thoại:
                  </div>
                  <a
                    href="tel:123345"
                    className={styles.modalUpdateUser__otherInfor__value}
                  >
                    0358007171
                  </a>
                </div>
                <div className={styles.modalUpdateUser__otherInfor}>
                  <div className={styles.modalUpdateUser__otherInfor__title}>
                    <MailOutlined
                      style={{ marginRight: 5, color: "#007ACC" }}
                    />
                    Email:
                  </div>

                  <a
                    href="mailto:devteam@createsimpleapps.com"
                    className={styles.modalUpdateUser__otherInfor__value}
                  >
                    hieunt.fxp@outlook.com
                  </a>
                </div>
              </>
            )}
          </div>
        </Spin>
      </Modal>
    );
  }
}
