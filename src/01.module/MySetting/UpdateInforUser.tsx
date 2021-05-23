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
  DatePicker,
  Select,
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
import moment from "moment";
import { firestore } from "../../firebase.config";
import { MemberInfor } from "../../00.common/01.model/MemberInfor";
interface UpdateInforProps {
  onUpdate: () => void;
}
interface UpdateInforState {
  modalVisible: boolean;
  edit: boolean;
  loading: boolean;
  Avatar?: string;
  chageAvatar: boolean;
  item: MemberInfor;
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
      item: {} as any,
    };
  }

  openItem(item: MemberInfor) {
    this.setState({
      item,
      Avatar: item.PhotoUrl,
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
      if (this.state.Avatar) {
        value.Avatar = this.state.Avatar;
      }
      value.DateOfBirth = {
        nanoseconds: 0,
        seconds: (value.DateOfBirth as moment.Moment).format("x"),
      };

      if (this.state.item.KeyDoc) {
        await userInforService.update(
          "MemberDirectory",
          this.state.item.KeyDoc,
          value
        );
      } else {
        let result = await userInforService.getItemByQuery<MemberInfor>(
          "MemberDirectory",
          "Uid",
          "==",
          this.state.item.Uid
        );
        await userInforService.update(
          "MemberDirectory",
          result[0].KeyDoc as string,
          value
        );
      }

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
        onCancel={() => {
          this.onclose();
        }}
        title="Thông tin cá nhân"
        footer={footer}
      >
        {this.state.modalVisible && (
          <Spin
            spinning={this.state.loading}
            tip={"Loading"}
            style={{ height: "100%", width: "100%" }}
          >
            <div className={styles.modalUpdateUser}>
              <div className={styles.modalUpdateUser__Avatar}>
                {this.state.Avatar ? (
                  <Avatar
                    shape="circle"
                    icon={<UserOutlined />}
                    size={80}
                    src={this.state.Avatar ? this.state.Avatar : ""}
                  />
                ) : (
                  <Avatar shape="circle" icon={<UserOutlined />} size={80} />
                )}
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
                <Form
                  ref={this.formRef}
                  style={{ width: "100%", marginTop: 20 }}
                >
                  <div style={{ marginBottom: 5 }}>
                    <Form.Item
                      className={styles.modalUpdateUser__otherInfor__title}
                      labelCol={{ span: 5 }}
                      label="Họ tên"
                      name="FullName"
                      rules={[
                        {
                          required: true,
                          message: "Thiếu thông tin loginName!",
                        },
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
                      { required: true, message: "Thiếu thông tin JobTitle!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    className={styles.modalUpdateUser__otherInfor__title}
                    labelCol={{ span: 5 }}
                    label="Ngày sinh"
                    name="DateOfBirth"
                    initialValue={moment()}
                    rules={[
                      { required: true, message: "Thiếu thông tin Ngày sinh!" },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    className={styles.modalUpdateUser__otherInfor__title}
                    labelCol={{ span: 5 }}
                    label="Giới tính"
                    name="Sex"
                    rules={[
                      { required: true, message: "Thiếu thông tin Ngày sinh!" },
                    ]}
                  >
                    <Select
                      placeholder={"Chọn giới tính"}
                      style={{ width: 150 }}
                    >
                      <Select.Option
                        style={{ backgroundColor: "#33ABE5", color: "white" }}
                        value="Male"
                      >
                        Nam
                      </Select.Option>
                      <Select.Option
                        style={{ backgroundColor: "pink", color: "white" }}
                        value="Female"
                      >
                        Nữ
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Divider
                    type={"horizontal"}
                    style={{ backgroundColor: "#BFBFBF", height: 1.5 }}
                  />
                  <div
                    className={styles.modalUpdateUser__otherInfor}
                    style={{ height: 50 }}
                  >
                    <div className={styles.modalUpdateUser__otherInfor__title}>
                      <MailOutlined
                        style={{ marginRight: 5, color: "#007ACC" }}
                      />
                      Địa chỉ:
                    </div>

                    <Form.Item name="Address">
                      <Input style={{ width: 250 }} />
                    </Form.Item>
                  </div>
                  <div
                    className={styles.modalUpdateUser__otherInfor}
                    style={{ height: 50 }}
                  >
                    <a className={styles.modalUpdateUser__otherInfor__title}>
                      <WechatOutlined
                        style={{ marginRight: 3, color: "#007ACC" }}
                      />{" "}
                      Bí danh
                    </a>
                    <Form.Item name="Alias">
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
                      name="PhoneNumber"
                      rules={[{ message: "Thiếu thông tin số điện thoại!" }]}
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
                      rules={[{ message: "Thiếu thông tin chat!" }]}
                    >
                      <Input style={{ width: 250 }} />
                    </Form.Item>
                  </div>

                  {this.state.chageAvatar && (
                    <div
                      className={styles.modalUpdateUser__otherInfor}
                      style={{ height: 100 }}
                    >
                      <div
                        className={styles.modalUpdateUser__otherInfor__title}
                      >
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
                    {this.state.item.LoginName}
                  </div>
                  <div style={{ marginBottom: 5 }}>
                    {this.state.item.JobTitle ? this.state.item.JobTitle : ""}
                  </div>
                  <div>
                    {this.state.item.Address ? this.state.item.Address : ""}
                  </div>
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
                      Tên khác:
                    </div>
                    <a className={styles.modalUpdateUser__otherInfor__value}>
                      {this.state.item.Alias ? this.state.item.Alias : ""}
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
                      {this.state.item.Sex ? this.state.item.Sex : ""}
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
                      {this.state.item.PhoneNumber
                        ? this.state.item.PhoneNumber
                        : ""}
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
                      {this.state.item.Email ? this.state.item.Email : ""}
                    </a>
                  </div>
                </>
              )}
            </div>
          </Spin>
        )}
      </Modal>
    );
  }
}
