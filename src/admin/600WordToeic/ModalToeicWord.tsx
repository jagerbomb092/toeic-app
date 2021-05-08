import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import ReactAudioPlayer from "react-audio-player";
import styles from "./ModalWordToeic.module.scss";
import { Modal, FormInstance, Form, Row, Col, Input, message } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import { RcFile } from "antd/lib/upload";
import { UploadFile } from "../../00.common/00.components/UploadFile";
import { values } from "lodash";
import _ from "lodash";
import { database, firestore } from "../../firebase.config";
import { words600Service } from "../../00.common/02.service/words600Service";
import { WordToeic } from "../../00.common/01.model/WordToeic";

interface ModalWordToeiclModalProps {
  onSave: () => void;
}

interface ModalWordToeiclModalState {
  visible: boolean;
  selectedTheme?: { Title: string; value: string };
  item: any;
  blocking: boolean;
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
    item: {} as any,
    blocking: false,
    imgUrl: undefined,
    audioUrl: undefined,
  };
  private formRef = React.createRef<FormInstance>();
  constructor(props: ModalWordToeiclModalProps) {
    super(props);
    this.state = {
      visible: false,
      selectedTheme: undefined,
      item: {} as any,
      blocking: false,
    };
  }

  async openModal(selectedTheme: { Title: string; value: string }, item?: any) {
    await this.setState({
      selectedTheme: selectedTheme,
      visible: true,
      item,
    });
  }

  async saveItem() {
    try {
      //check xem fom đã đủ thông tin cần thiết để lưu chưa
      await this.formRef.current!.validateFields();

      await this.setState({
        blocking: true,
      });
      //lấy ra dư liệu từ form
      const value = this.formRef.current!.getFieldsValue();
      value.LinkAudio = this.state.audioUrl;
      value.ImgItem = this.state.imgUrl;
      await words600Service.updateContent(
        "600WordsToeic",
        this.state.selectedTheme?.value as string,
        value as any
      );
      // upfile len docLib
      try {
      } catch (error) {
        message.error("save item fail!");
      }
      this.formRef.current!.resetFields();
      await this.setState(this.initialState as any);
      this.formRef.current!.resetFields();
      this.props.onSave();
    } catch (error) {
      console.log("lỗi nha");
    }
  }

  render() {
    let { item } = this.state;
    return (
      <Modal
        width={900}
        title={`Thêm mới từ vựng với chủ đề ${this.state.selectedTheme?.Title}`}
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
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input style={{ width: 242 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 6 }}
                label="Phiên âm"
                name="Spelling"
                rules={[{ required: true, message: "Please input title!" }]}
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
                rules={[{ required: true, message: "Please input title!" }]}
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
                rules={[{ required: true, message: "Please input title!" }]}
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
                rules={[{ required: true, message: "Please input title!" }]}
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
                rules={[{ required: true, message: "Please input title!" }]}
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
                rules={[{ message: "Please input title!" }]}
              >
                <UploadFile
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
                rules={[{ message: "Please input title!" }]}
              >
                <UploadFile
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
      </Modal>
    );
  }
}
