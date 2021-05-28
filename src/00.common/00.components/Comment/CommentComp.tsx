import { Avatar, Input, Timeline } from "antd";
import { BaseComponent } from "../BaseComponent";
import styles from "./Comment.module.scss";
export interface CommentState {}
export interface CommentProps {}
const { TextArea } = Input;
export class CommentComp extends BaseComponent<CommentProps, CommentState> {
  constructor(props: CommentProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.Comment}>
        <div className={styles.Comment__input}>
          -
          <Avatar
            size={50}
            className={styles.Comment__input__avatar}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <TextArea
            className={styles.Comment__input__avatar}
            style={{
              flex: 1,
              minHeight: "35px",
            }}
            allowClear={true}
            placeholder="Viết gì đó...."
            autoSize={{ minRows: 1, maxRows: 5 }}
          />
        </div>
        <div className={styles.Comment__timeLine}>
          <div
            style={{
              width: "100%",
              borderLeft: "2px solid #f0f0f0",
              height: 50,
              marginLeft: 4,
            }}
          ></div>
          <Timeline>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>
              <p>Solve initial network problems 1</p>
              <p>Solve initial network problems 2</p>
              <p>Solve initial network problems 3 2015-09-01</p>
            </Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>
              Network problems being solved 2015-09-01
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
    );
  }
}
