import { BaseComponent } from "../../00.common/00.components/BaseComponent";

import {
  Modal,
  FormInstance,
  Form,
  Row,
  Col,
  Input,
  message,
  Button,
  Spin,
} from "antd";

import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { UploadFile } from "../../00.common/00.components/UploadFile";

import _, { pick } from "lodash";

import { words600Service } from "../../00.common/02.service/words600Service";
import { storage } from "../../firebase.config";

interface ModalWordToeiclModalProps {
  onSave: (value) => void;
}

interface ModalWordToeiclModalState {
  visible: boolean;
  selectedTheme?: { Title: string; value: string };
  item: any;
  loading: boolean;
  imgUrl?: string;
  audioUrl?: string;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default class ModalWordToeic extends BaseComponent<
  ModalWordToeiclModalProps,
  ModalWordToeiclModalState
> {
  private initialState = {
    visible: false,
    selectedTheme: "",
    item: undefined,
    loading: false,
    imgUrl: undefined,
    audioUrl: undefined,
  };
  private formRef = React.createRef<FormInstance>();
  private refUploadImg = React.createRef<UploadFile>();
  private refUploadAudio = React.createRef<UploadFile>();
  constructor(props: ModalWordToeiclModalProps) {
    super(props);
    this.state = {
      visible: false,
      selectedTheme: undefined,
      item: undefined,
      loading: false,
    };
  }

  async openModal(selectedTheme: { Title: string; value: string }, item?: any) {
    await this.setState({
      selectedTheme: selectedTheme,
      visible: true,
    });

    if (item) {
      await this.setState({
        item,
        audioUrl: item.LinkAudio,
        imgUrl: item.ImgItem,
      });
      let formControlValues = pick(item, [
        "Category",
        "Example",
        "Explain",
        "Spelling",
        "Title",
        "Translate",
      ]);
      this.formRef.current!.setFieldsValue(formControlValues);
      this.refUploadImg.current?.getSourceFromForm(item.ImgItem);
      this.refUploadAudio.current?.getSourceFromForm(item.LinkAudio);
    }
  }

  async delete(item) {
    this.setState({
      loading: true,
    });

    await words600Service.deleteContentItem(
      "600WordsToeic",
      this.state.selectedTheme?.value as string,
      this.state.item.Id
    );
    await this.props.onSave(this.state.selectedTheme?.value);
    this.formRef.current!.resetFields();
    this.setState(this.initialState as any);
  }

  confirm(item) {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc xóa câu hỏi này không?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        this.delete(item);
      },
    });
  }

  async saveItem() {
    if (!this.state.audioUrl) {
      message.error("bạn chưa tải phát âm");
      return;
    }
    if (!this.state.imgUrl) {
      message.error("bạn chưa tải ảnh lên");
      return;
    }
    try {
      //check xem fom đã đủ thông tin cần thiết để lưu chưa
      await this.formRef.current!.validateFields();

      await this.setState({
        loading: true,
      });
      //lấy ra dư liệu từ form
      const value = this.formRef.current!.getFieldsValue();
      value.LinkAudio = this.state.audioUrl;
      value.ImgItem = this.state.imgUrl;
      if (this.state.item) {
        await words600Service.updateContent(
          "600WordsToeic",
          this.state.selectedTheme?.value as string,
          value as any,
          this.state.item.Id
        );
      } else {
        await words600Service.updateContent(
          "600WordsToeic",
          this.state.selectedTheme?.value as string,
          value as any
        );
      }

      try {
      } catch (error) {
        message.error("save item fail!");
      }
      await this.props.onSave(this.state.selectedTheme?.value);
      this.formRef.current!.resetFields();
      await this.setState(this.initialState as any);
    } catch (error) {
      console.log("lỗi nha");
    }
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
        title={`${
          this.state.item ? "Chỉnh sửa" : "Thêm mới"
        } từ vựng với chủ đề ${this.state.selectedTheme?.Title}`}
        visible={this.state.visible}
        closable={true}
        onCancel={() => {
          this.setState({
            visible: false,
          });
        }}
        onOk={async () => {
          this.saveItem();
        }}
        footer={footer}
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
                  label="Tên "
                  name="Title"
                  rules={[{ required: true, message: "Thiếu thông tin title!" }]}
                >
                  <Input style={{ width: 242 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Phiên âm"
                  name="Spelling"
                  rules={[{ required: true, message: "Thiếu thông tin title!" }]}
                >
                  <Input style={{ width: 242 }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 3 }}
                  label="Giải thích"
                  name="Explain"
                  rules={[{ required: true, message: "Thiếu thông tin title!" }]}
                >
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 3 }}
                  label="Thể loại"
                  name="Category"
                  rules={[{ required: true, message: "Thiếu thông tin title!" }]}
                >
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 3 }}
                  label="Ví dụ"
                  name="Example"
                  rules={[{ required: true, message: "Thiếu thông tin title!" }]}
                >
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 3 }}
                  label="Dịch nghĩa"
                  name="Translate"
                  rules={[{ required: true, message: "Thiếu thông tin title!" }]}
                >
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 15 }}>
              <Col span={10}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  label=" Ảnh biểu tượng"
                  name="ImgItem"
                  rules={[{ message: "Thiếu thông tin title!" }]}
                >
                  <UploadFile
                    onLoading={(loading) => {
                      this.setState({
                        loading,
                      });
                    }}
                    ref={this.refUploadImg}
                    type={"img"}
                    result={async (values) => {
                      await this.setState({
                        imgUrl: values[0],
                      });
                    }}
                    refDocLib={`600wordsToeics/Content/${this.state.selectedTheme?.value}`}
                  />
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Phát âm"
                  name="LinkAudio"
                  rules={[{ message: "Thiếu thông tin title!" }]}
                >
                  <UploadFile
                    onLoading={(loading) => {
                      this.setState({
                        loading,
                      });
                    }}
                    ref={this.refUploadAudio}
                    type={"audio"}
                    result={async (values) => {
                      await this.setState({
                        audioUrl: values[0],
                      });
                    }}
                    refDocLib={`600wordsToeics/Content/${this.state.selectedTheme?.value}/Audio`}
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
