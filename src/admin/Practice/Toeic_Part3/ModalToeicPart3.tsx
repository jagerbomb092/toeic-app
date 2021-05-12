import ReactAudioPlayer from "react-audio-player";
import styles from "./ModalWordToeic.module.scss";
import {
  Modal,
  FormInstance,
  Form,
  Row,
  Col,
  Input,
  message,
  InputNumber,
  Select,
} from "antd";

import React from "react";

import _ from "lodash";
import { BaseComponent } from "../../../00.common/00.components/BaseComponent";
import { UploadFile } from "../../../00.common/00.components/UploadFile";
import { toeicPart1Service } from "../../../00.common/02.service/toeicPart1Service";
import { ANSWER_PART1 } from "../../../00.common/const";

interface ModalToeicPart1Props {
  onSave: () => void;
}

interface ModalToeicPart1State {
  visible: boolean;
  item?: any;
  blocking: boolean;
  ImgUrl?: string;
  AudioUrl?: string;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { Option } = Select;
export default class ModalToeicPart1 extends BaseComponent<
  ModalToeicPart1Props,
  ModalToeicPart1State
> {
  private initialState = {
    visible: false,
    blocking: false,
    item: undefined,
    ImgUrl: "",
    AudioUrl: "",
  };
  private formRef = React.createRef<FormInstance>();
  constructor(props: ModalToeicPart1Props) {
    super(props);
    this.state = {
      visible: false,
      blocking: false,
      ImgUrl: "",
      AudioUrl: "",
    };
  }

  async openModal(item?: any) {
    await this.setState({
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
      value.ImgUrl = this.state.ImgUrl;
      value.AudioUrl = this.state.AudioUrl;
      value.Content = [];

      await toeicPart1Service.save("ToeicPart1", "", value);
      this.setState(this.initialState as any);

      await this.setState(this.initialState as any);
      this.formRef.current!.resetFields();
      this.props.onSave();
    } catch (error) {
      console.log("lỗi nha" + error);
    }
  }

  render() {
    let { item } = this.state;
    return (
      <Modal
        width={900}
        title={`Thêm mới câu hỏi part 1`}
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
                label="Cấp độ "
                name="Level"
                rules={[{ required: true, message: "Please input Level!" }]}
              >
                <Select defaultValue={0} style={{ width: 120 }}>
                  <Option value={1}>
                    <a style={{ color: "#007ACC" }}>Dễ</a>
                  </Option>
                  <Option value={2}>
                    <a style={{ color: "#FFDD00" }}>Trung bình</a>
                  </Option>
                  <Option value={3} style={{ color: "red" }}>
                    Khó
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 6 }}
                label="Đáp án"
                name="Answer"
                rules={[{ required: true, message: "Please input Answer!" }]}
              >
                <Select defaultValue={0} style={{ width: 120 }}>
                  <Option value={ANSWER_PART1.A.value}>
                    <a>Đáp án A</a>
                  </Option>
                  <Option value={ANSWER_PART1.B.value}>
                    <a>Đáp án B</a>
                  </Option>
                  <Option value={ANSWER_PART1.C.value}>
                    <a>Đáp án C</a>
                  </Option>
                  <Option value={ANSWER_PART1.D.value}>
                    <a>Đáp án D</a>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 15 }}>
            <Col span={10}>
              <Form.Item labelCol={{ span: 8 }} label=" Ảnh câu hỏi">
                <UploadFile
                  type={"img"}
                  result={async (values) => {
                    await this.setState({
                      ImgUrl: values[0],
                    });
                  }}
                  refDocLib={`Pactice/ToeicPart1/Img`}
                />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                labelCol={{ span: 6 }}
                label="Câu hỏi"
                rules={[{ message: "Please input title!" }]}
              >
                <UploadFile
                  type={"audio"}
                  result={async (values) => {
                    await this.setState({
                      AudioUrl: values[0],
                    });
                  }}
                  refDocLib={`Pactice/ToeicPart1/Audio`}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
