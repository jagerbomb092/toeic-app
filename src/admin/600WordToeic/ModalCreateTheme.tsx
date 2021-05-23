// eslint-disable-next-line
import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, FormInstance, Form, Row, Col, Input, Spin, Button } from "antd";

import React from "react";

import { UploadFile } from "../../00.common/00.components/UploadFile";

import _, { pick } from "lodash";

import { words600Service } from "../../00.common/02.service/words600Service";
import { storage } from "../../firebase.config";

interface ModalThemeProps {
  onSave: () => void;
}

interface ModalThemeState {
  visible: boolean;
  item?: any;
  loading: boolean;
  imgBannerUrl?: string;
  idDoc?: string;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default class ModalTheme extends BaseComponent<
  ModalThemeProps,
  ModalThemeState
> {
  private initialState = {
    visible: false,
    loading: false,
    item: undefined,
    imgBannerUrl: "",
  };
  private refUploadImg = React.createRef<UploadFile>();
  private formRef = React.createRef<FormInstance>();
  constructor(props: ModalThemeProps) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      item: undefined,
    };
  }

  async openModal(item?: any) {
    await this.setState({
      visible: true,
      loading: true,
    });
    if (item) {
      await this.setState({
        item,
        imgBannerUrl: item.ImgBanner,
        idDoc: item.KeyDoc,
      });
      let formControlValues = pick(item, ["OrderBy", "Title", "Title_VN"]);
      this.formRef.current!.setFieldsValue(formControlValues);
      this.refUploadImg.current?.getSourceFromForm(item.ImgBanner);
    }
    await this.setState({
      loading: false,
    });
  }

  async delete(item) {
    this.setState({
      loading: true,
    });

    await words600Service.delete("600WordsToeic", item.KeyDoc);

    storage.refFromURL(this.state.item.ImgBanner).delete();
    this.props.onSave();
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
      value.ImgBanner = this.state.imgBannerUrl;
      value.Content = [];
      if (this.state.item) {
        await words600Service.update(
          "600WordsToeic",
          this.state.idDoc as string,
          value as any
        );
      } else {
        await words600Service.saveDocWithId(
          "600WordsToeic",
          this.state.idDoc as string,
          value as any
        );
      }

      this.setState(this.initialState as any);

      this.formRef.current!.resetFields();
      await this.setState(this.initialState as any);
      this.formRef.current!.resetFields();
      this.props.onSave();
    } catch (error) {
      console.log("lỗi nha" + error);
    }
  }

  confirm(item) {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc xóa câu hỏi này không?",
      okText: "Xác nhận",
      cancelText: "Xóa",
      onOk: () => {
        this.delete(item);
      },
    });
  }
  render() {
    let { item } = this.state;
    let footer = [
      <Button
        onClick={() => {
          this.setState(this.initialState as any);
        }}
        type={"default"}
      >
        Đóng
      </Button>,
      <Button
        onClick={async () => {
          await this.saveItem();
        }}
        type={"primary"}
      >
        Lưu
      </Button>,
    ];
    if (this.state.item) {
      footer.splice(
        0,
        0,
        <Button
          onClick={() => {
            this.confirm(this.state.item);
          }}
          type="primary"
          danger
        >
          Xóa
        </Button>
      );
    }
    return (
      <Modal
        width={900}
        title={`Thêm mới chủ đề `}
        visible={this.state.visible}
        closable={true}
        onCancel={() => {
          this.setState(this.initialState);
        }}
        footer={footer}
        onOk={async () => {
          this.saveItem();
        }}
      >
        <Spin
          spinning={this.state.loading}
          tip={"Loading"}
          style={{ height: "100%", width: "100%" }}
        >
          <Form
            ref={this.formRef}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={() => {}}
            onFinishFailed={() => {}}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Tên chủ đề "
                  name="Title"
                  rules={[{ required: true, message: "Thiếu thông tin title!" }]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Thứ tự"
                  name="OrderBy"
                  rules={[{ required: true, message: "Thiếu thông tin orderBy!" }]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Dịch nghĩa"
                  name="Title_VN"
                  rules={[{ required: true, message: "Thiếu thông tin content!" }]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Id Document"
                  rules={[
                    { required: true, message: "Thiếu thông tin id document!" },
                  ]}
                >
                  <Input
                    disabled={this.state.item ? true : false}
                    value={this.state.idDoc}
                    onChange={(e) => {
                      this.setState({
                        idDoc: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 15 }}>
              <Col span={10}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  label=" Ảnh biểu tượng"
                  name="ImgBanner"
                  rules={[{ message: "Thiếu thông tin title!" }]}
                >
                  <UploadFile
                    ref={this.refUploadImg}
                    onLoading={(loading) => {
                      this.setState({
                        loading,
                      });
                    }}
                    type={"img"}
                    result={async (values) => {
                      await this.setState({
                        imgBannerUrl: values[0],
                      });
                    }}
                    refDocLib={`600wordsToeics/Content/${this.state.idDoc}`}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    );
  }
}
