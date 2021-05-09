import { BaseComponent } from "../../00.common/00.components/BaseComponent";
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
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import { RcFile } from "antd/lib/upload";
import { UploadFile } from "../../00.common/00.components/UploadFile";
import { values } from "lodash";
import _ from "lodash";
import { database, firestore } from "../../firebase.config";
import { words600Service } from "../../00.common/02.service/words600Service";
import { WordToeic } from "../../00.common/01.model/WordToeic";

interface ModalThemeProps {
  onSave: () => void;
}

interface ModalThemeState {
  visible: boolean;
  item?: any;
  blocking: boolean;
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
    blocking: false,
    item: undefined,
    imgBannerUrl: "",
  };
  private formRef = React.createRef<FormInstance>();
  constructor(props: ModalThemeProps) {
    super(props);
    this.state = {
      visible: false,
      blocking: false,
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
      value.ImgBanner = this.state.imgBannerUrl;
      value.Content = [];
      await words600Service.saveDocWithId(
        "600WordsToeic",
        this.state.idDoc as string,
        value as any
      );
      this.setState(this.initialState as any);

      this.formRef.current!.resetFields();
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
        title={`Thêm mới chủ đề `}
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
                label="Tên chủ đề "
                name="Title"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 6 }}
                label="Thứ tự"
                name="OrderBy"
                rules={[{ required: true, message: "Please input orderBy!" }]}
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
                rules={[{ required: true, message: "Please input content!" }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 6 }}
                label="Id Document"
                rules={[
                  { required: true, message: "Please input id document!" },
                ]}
              >
                <Input
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
                rules={[{ message: "Please input title!" }]}
              >
                <UploadFile
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
      </Modal>
    );
  }
}
