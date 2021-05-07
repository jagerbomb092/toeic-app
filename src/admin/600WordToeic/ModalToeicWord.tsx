import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import ReactAudioPlayer from "react-audio-player";
import styles from "./ModalWordToeic.module.scss";
import {
  Modal,
  Button,
  FormInstance,
  Form,
  Row,
  Col,
  Input,
  Upload,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import { RcFile } from "antd/lib/upload";
interface ModalWordToeiclModalProps {}

interface ModalWordToeiclModalState {
  visible: boolean;
  item: any;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layoutSaveAndClose = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const colLable8 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const colLable4 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
export default class ModalWordToeic extends BaseComponent<
  ModalWordToeiclModalProps,
  ModalWordToeiclModalState
> {
  private formRef = React.createRef<FormInstance>();
  constructor(props: ModalWordToeiclModalState) {
    super(props);
    this.state = {
      visible: false,
      item: {} as any,
    };
  }

  async openModal(item?: any) {
    await this.setState({
      visible: true,
      item,
    });
  }

  render() {
    let { item } = this.state;
    return (
      <Modal
        width={800}
        title={item.Title}
        visible={this.state.visible}
        closable={true}
        onCancel={() => {
          this.setState({
            visible: false,
          });
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
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 16 }}
                label="Tên "
                name="Title"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 16 }}
                label="Phiên âm"
                name="Title"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 16 }}
                label="Giải thích"
                name="Explain"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 16 }}
                label="Ví dụ"
                name="Example"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 16 }}
                label="Dịch nghĩa"
                name="Translate"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 16 }}
                label=" ảnh biểu tượng"
                name="ImgItem"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Upload listType="picture">
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 16 }}
                label="âm thanh phát âm"
                name="LinkAudio"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Upload
                  beforeUpload={(file: RcFile, FileList: RcFile[]) => {
                    console.log(file);
                    return true;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
