import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import ReactAudioPlayer from "react-audio-player";
import styles from "./ModalWordToeic.module.scss";
import { Modal, Button } from "antd";
interface ModalWordToeiclModalProps {}

interface ModalWordToeiclModalState {
  visible: boolean;
  item: any;
}

export default class ModalWordToeic extends BaseComponent<
  ModalWordToeiclModalProps,
  ModalWordToeiclModalState
> {
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
        width={1000}
        title={item.Title}
        visible={this.state.visible}
        closable={true}
        onCancel={() => {
          this.setState({
            visible: false,
          });
        }}
      >
       <div>hihiihi</div>
     
      </Modal>
    );
  }
}
