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

import { ANSWER_PART1 } from "../../../00.common/const";
import { toeicPart3Service } from "../../../00.common/02.service/toeicPart3Service";
const { TextArea } = Input;
interface ModalToeicPart3Props {
  onSave: () => void;
}

interface ModalToeicPart3State {
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
export default class ModalToeicPart3 extends BaseComponent<
  ModalToeicPart3Props,
  ModalToeicPart3State
> {
  private initialState = {
    visible: false,
    blocking: false,
    item: undefined,
    ImgUrl: "",
    AudioUrl: "",
  };
  private formRef = React.createRef<FormInstance>();
  constructor(props: ModalToeicPart3Props) {
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

      let itemSave = {
        AudioUrl: this.state.AudioUrl,
        Level: value.Level,
        Question1: {
          Answer: value.Answer1,
          Question: value.Question1,
          SelectA: {
            Title: value.Select1A,
            Value: "1000",
          },
          SelectB: {
            Title: value.Select1B,
            Value: "0100",
          },
          SelectC: {
            Title: value.Select1C,
            Value: "0010",
          },
          SelectD: {
            Title: value.Select1D,
            Value: "0001",
          },
        },
        Question2: {
          Answer: value.Answer2,
          Question: value.Question2,
          SelectA: {
            Title: value.Select2A,
            Value: "1000",
          },
          SelectB: {
            Title: value.Select2B,
            Value: "0100",
          },
          SelectC: {
            Title: value.Select2C,
            Value: "0010",
          },
          SelectD: {
            Title: value.Select2D,
            Value: "0001",
          },
        },
        Question3: {
          Answer: value.Answer3,
          Question: value.Question3,
          SelectA: {
            Title: value.Select3A,
            Value: "1000",
          },
          SelectB: {
            Title: value.Select3B,
            Value: "0100",
          },
          SelectC: {
            Title: value.Select3C,
            Value: "0010",
          },
          SelectD: {
            Title: value.Select3D,
            Value: "0001",
          },
        },
      };
      await toeicPart3Service.save("ToeicPart3", "", itemSave);
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
        title={`Thêm mới câu hỏi part 3`}
        visible={this.state.visible}
        closable={true}
        onCancel={() => {
          this.setState({
            visible: false,
          });
        }}
        onOk={async () => {
          await this.saveItem();
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
                labelCol={{ span: 5 }}
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
                labelCol={{ span: 5 }}
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
                  refDocLib={`Pactice/ToeicPart3/Audio`}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item labelCol={{ span: 24 }} label="Câu 1">
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Câu hỏi"
                  name={"Question1"}
                  rules={[{ required: true }]}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Đáp án A"
                  name={"Select1A"}
                  rules={[{ required: true }]}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Đáp án B"
                  name={"Select1B"}
                  rules={[{ required: true }]}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Đáp án C"
                  name={"Select1C"}
                  rules={[{ required: true }]}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Đáp án D"
                  name={"Select1D"}
                  rules={[{ required: true }]}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Câu trả lời"
                  name={"Answer1"}
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder={"Chọn đáp án đúng"}
                    style={{ width: "100%", marginLeft: 10 }}
                  >
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
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                label="Câu 2"
              >
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Câu hỏi"
                  name={"Question2"}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>

                <Form.Item
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  label="Đáp án A"
                  name={"Select2A"}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  label="Đáp án B"
                  name={"Select2B"}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  label="Đáp án C"
                  name={"Select2C"}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  label="Đáp án D"
                  name={"Select2D"}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Câu trả lời"
                  name={"Answer2"}
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder={"Chọn đáp án đúng"}
                    style={{ width: "100%", marginLeft: 10 }}
                  >
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
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item labelCol={{ span: 24 }} label="Câu 3">
                <Form.Item
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  label="Câu hỏi"
                  name={"Question3"}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>

                <Form.Item
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  label="Đáp án A"
                  name={"Select3A"}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  label="Đáp án B"
                  name={"Select3B"}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  label="Đáp án C"
                  name={"Select3C"}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  label="Đáp án D"
                  name={"Select3D"}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextArea style={{ marginLeft: 10 }} />
                  </div>
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 6 }}
                  label="Câu trả lời"
                  name="Answer3"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder={"Chọn đáp án đúng"}
                    style={{ width: "100%", marginLeft: 10 }}
                  >
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
              </Form.Item>
            </Col>
            <Col span={12}>
              <div
                style={{
                  marginTop: 100,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/toeic-project.appspot.com/o/CommonDoc%2FPactice%2FToeicPart3%2FCommon%2Fadminpart3.jpg?alt=media&token=6f4fd7bf-256e-418b-8678-7a3f7d224c7a"
                  }
                />
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
