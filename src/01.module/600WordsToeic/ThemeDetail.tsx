import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import ReactAudioPlayer from "react-audio-player";
import styles from "./ThemeDetail.module.scss";
import { message, Modal, Spin } from "antd";
import { ContentItem } from "../../00.common/01.model/600WordsToeic";

import { FavComponent } from "../../00.common/00.components/FavoriteComponent";
import { MemberInfor } from "../../00.common/01.model/MemberInfor";
import { myNoteWordService } from "../../00.common/02.service/myNoteWordService";
import { MyNoteWord } from "../../00.common/01.model/MyNoteWord";

interface ThemeDetailModalProps {
  currentUser: MemberInfor;
}

interface ThemeDetailModalState {
  visible: boolean;
  item: any;
  loading: boolean;
  myNoteWord: MyNoteWord;
  arrMyNoteWordTitle: string[];
}

export default class ThemeDetailModalCom extends BaseComponent<
  ThemeDetailModalProps,
  ThemeDetailModalState
> {
  constructor(props: ThemeDetailModalProps) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      item: {} as ContentItem,
      myNoteWord: undefined as any,
      arrMyNoteWordTitle: [],
    };
    this.onMount(() => {});
  }

  async getMyNoteWord() {
    let myNoteWord = (await myNoteWordService.getItemByDocId<MyNoteWord>(
      "MyNoteWord",
      this.props.currentUser.Uid
    )) as MyNoteWord;
    let arrMyNoteWordTitle: string[] = [];
    if (myNoteWord) {
      arrMyNoteWordTitle = myNoteWord.Content.map((item) => {
        return item.Title;
      });
    }
    this.setState({
      myNoteWord,
      arrMyNoteWordTitle,
    });
  }

  async openModal(item: any) {
    await this.getMyNoteWord();
    await this.setState({
      visible: true,
      item,
    });
  }

  async saveNoteWord(item: ContentItem) {
    this.setState({
      loading: true,
    });
    try {
      if (this.state.myNoteWord && this.state.myNoteWord.Content.length > 0) {
        this.state.myNoteWord.Content.push({
          ...item,
          Id: this.state.myNoteWord.Content.length + 1,
        });
        let newData: MyNoteWord = {
          ...this.state.myNoteWord,
          Content: this.state.myNoteWord.Content,
        };
        await myNoteWordService.update<MyNoteWord>(
          "MyNoteWord",
          this.props.currentUser.Uid,
          newData
        );
      } else {
        await myNoteWordService.save<MyNoteWord>(
          "MyNoteWord",
          this.props.currentUser.Uid,
          {
            LoginName: this.props.currentUser.LoginName,
            Content: [
              {
                ...item,
                Id: 1,
              },
            ],
          }
        );
      }
      await this.getMyNoteWord();

      message.success("Đã lưu từ vựng vào danh sách");
    } catch (error) {
      message.error("Đã có lỗi xảy ra");
      console.log(error);
    }
    this.setState({
      loading: false,
    });
  }

  async unsaveNoteWord(item: ContentItem) {
    this.setState({
      loading: true,
    });
    let newContent = this.state.myNoteWord.Content.filter((itemContent) => {
      return itemContent.Title !== item.Title;
    });
    newContent = newContent.map((item, index) => {
      return {
        ...item,
        Id: index + 1,
      };
    });
    let newData: MyNoteWord = {
      ...this.state.myNoteWord,
      Content: newContent,
    };

    await myNoteWordService.update<MyNoteWord>(
      "MyNoteWord",
      this.props.currentUser.Uid,
      newData
    );
    await this.getMyNoteWord();

    this.setState({
      loading: false,
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
        <Spin spinning={this.state.loading}>
          <div className={styles.themeDetail}>
            <div className={styles.themeDetail__titleIntroduce}>
              Bài 1: Contracts - Hợp Đồng
            </div>

            {this.state.item.Content &&
              this.state.item.Content.length > 0 &&
              (this.state.item.Content as any[]).map(
                (item: ContentItem, index) => (
                  <div className={styles.themeDetail__item}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className={styles.themeDetail__item__index}>
                        {index + 1}
                      </div>
                      <img
                        className={styles.themeDetail__item__img}
                        src={item.ImgItem}
                      />
                      <div className={styles.themeDetail__item__infor}>
                        <div>
                          <span
                            className={styles.themeDetail__item__infor__title}
                          >
                            {item.Title}:
                          </span>
                          <span
                            className={
                              styles.themeDetail__item__infor__spelling
                            }
                          >
                            {item.Spelling}
                          </span>
                        </div>
                        <div>
                          <span
                            className={styles.themeDetail__item__infor__bold}
                          >
                            Giải thích:
                          </span>
                          <span>{item.Example}</span>
                        </div>
                        <div>
                          <span
                            className={styles.themeDetail__item__infor__bold}
                          >
                            Từ loại:
                          </span>
                          <span>{item.Category}</span>
                        </div>
                        <div>
                          <span
                            className={styles.themeDetail__item__infor__bold}
                          >
                            Ví dụ:
                          </span>
                          <span>{item.Explain}</span>
                        </div>
                        <div>
                          <span
                            className={styles.themeDetail__item__infor__bold}
                          >
                            {item.Translate}
                          </span>
                        </div>

                        <ReactAudioPlayer
                          src={item.LinkAudio}
                          autoPlay={false}
                          controls
                        />
                      </div>
                    </div>
                    <FavComponent
                      isFav={this.state.arrMyNoteWordTitle.includes(item.Title)}
                      onFav={async () => {
                        await this.saveNoteWord(item);
                      }}
                      onUnFav={() => {
                        this.unsaveNoteWord(item);
                      }}
                    />
                  </div>
                )
              )}
          </div>
        </Spin>
      </Modal>
    );
  }
}
