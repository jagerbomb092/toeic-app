import { List, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import './css/main.css'
import _ from "lodash";
import { Select } from "antd";
import React from "react";
import ReactCardFlip from "react-card-flip";
import ReactAudioPlayer from "react-audio-player";

const { Option } = Select;
interface ListCustomProps {
  allData: any[];
}
interface ListCustomState {
  dataChunk: any[][];
  dataSource: any[];
  index: number;
  isFlipped?: boolean;
  key?: number;
  status?: [];
}

export class ListCustom extends BaseComponent<
  ListCustomProps,
  ListCustomState
> {
  public sizePage = 3;
  constructor(props: ListCustomProps) {
    super(props);
    this.state = {
      dataChunk: _.chunk(this.props.allData, this.sizePage),
      dataSource: _.chunk(this.props.allData, this.sizePage)[0],
      index: 0,
      // isFlipped: false,
    };
  }
  // componentDidUpdate(){
  //   // let card = document.querySelectorAll('')
  // }
  previous = () => {
    this.setState({
      index: this.state.index - 1,
      dataSource: this.state.dataChunk[this.state.index - 1],
    });
  };

  next = () => {
    this.setState({
      index: this.state.index + 1,
      dataSource: this.state.dataChunk[this.state.index + 1],
    });
  };

  changePageSize = (value: number) => {
    this.setState({
      dataChunk: _.chunk(this.props.allData, value),
      dataSource: _.chunk(this.props.allData, value)[0],
      index: 0,
    });
  };
  render() {
    let abc = this.state.dataChunk;
    console.log(abc);

    return (
      <div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 3,
            xxl: 3,
          }}
          dataSource={this.state.dataSource}
          renderItem={(item) => (
            <List.Item key={item.Id}>
              {/* for (let i = 0; i < array.length; i++) {
                const element = array[i];
                
              } */}

              <ReactCardFlip
                isFlipped={this.state.key == item.Id}
                flipDirection="horizontal"
              >
                <div
                  className="flip-front"
                  onClick={async () => {
                    await this.setState({
                      key: item.Id,
                    });
                  }}
                  style={{
                    background: `linear-gradient(to top, rgba(17, 16, 16, 0.527) 0%, rgba(5, 4, 4, 0.20) 100%), url('${item.ImgItem}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h1>{item.Title}</h1>
                  <p>{item.Spelling}</p>
                  {/* <p>Translate: {item.Translate}</p> */}
                  {/* <button>Click to flip</button> */}
                </div>

                <div
                  className="flip-back"
                  onClick={async () => {
                    await this.setState({
                      key: item.Id,
                    });
                  }}
                >
                  <h1>{item.Title}</h1>
                  <p>{item.Category}</p>
                  <ReactAudioPlayer
                    src={item.LinkAudio}
                    autoPlay={false}
                    controls
                  />
                </div>
              </ReactCardFlip>
            </List.Item>
          )}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <LeftOutlined
              style={{
                marginRight: 10,
                color: this.state.index == 0 ? "grey" : "unset",
              }}
              onClick={() => {
                this.state.index > 0 && this.previous();
              }}
            />
            Page {this.state.index + 1}
            <RightOutlined
              onClick={() => {
                this.state.index < this.state.dataChunk.length - 1 &&
                  this.next();
              }}
              style={{
                marginLeft: 10,
                color:
                  this.state.index == this.state.dataChunk.length - 1
                    ? "grey"
                    : "unset",
              }}
            />
          </div>
          <div>
            Mục trên mỗi trang{" "}
            <Select
              onChange={this.changePageSize}
              defaultValue={3}
              style={{ width: 60 }}
            >
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
            </Select>
          </div>
        </div>
      </div>
    );
  }
}
