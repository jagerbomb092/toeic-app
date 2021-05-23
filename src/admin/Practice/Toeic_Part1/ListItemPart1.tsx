import {} from "antd";
import { Table, Input, Button, Space, Select, Popover } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";

import ReactAudioPlayer from "react-audio-player";
import React from "react";

import _ from "lodash";
import { BaseComponent } from "../../../00.common/00.components/BaseComponent";
import { toeicPart1Service } from "../../../00.common/02.service/toeicPart1Service";
import ModalToeicPart1 from "./ModalToeicPart1";
import { ANSWER_PART1 } from "../../../00.common/const";
import { ToeicPart1 } from "../../../00.common/01.model/ToeicPart1";

interface ToeicPart1Props {}

interface ToeicPart1State {
  searchText: string;
  searchedColumn: string;
  allData: ToeicPart1[];
  dataSource: ToeicPart1[];
}
const { Option } = Select;
export default class ListToeicPart1 extends BaseComponent<
  ToeicPart1Props,
  ToeicPart1State
> {
  private refModalToeicPart1 = React.createRef<ModalToeicPart1>();
  constructor(props: ToeicPart1Props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      allData: [],
      dataSource: [],
    };
    this.onMount(async () => {
      await Promise.all([this.loadAllData()]);
    });
  }

  async loadAllData() {
    let allData = await toeicPart1Service.getAll<ToeicPart1>("ToeicPart1");

    this.setState({
      allData: allData,
      dataSource: allData,
    });
  }

  getColumnSearchProps = (dataIndex: any, color?: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (
      value: string,
      record: { [x: string]: { toString: () => string } }
    ) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
      }
    },
    render: (text: { toString: () => string }) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys: any[], confirm: () => void, dataIndex: any) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters: () => void) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handelLevelColor(level: number) {
    if (level == 1) {
      return {
        Title: "Dễ",
        Color: "#007ACC",
      };
    } else if (level == 2) {
      return {
        Title: "Trung bình",
        Color: "#FFDD00",
      };
    } else {
      return {
        Title: "Khó",
        Color: "red",
      };
    }
  }

  handleAnswer(answer: string) {
    if (answer == ANSWER_PART1.A.value) {
      return "Đáp án A";
    } else if (answer == ANSWER_PART1.B.value) {
      return "Đáp án B";
    } else if (answer == ANSWER_PART1.C.value) {
      return "Đáp án C";
    } else {
      return "Đáp án D";
    }
  }
  render() {
    const columns = [
      {
        title: "Cấp độ ",
        dataIndex: "Level",
        key: "Level",
        width: "20%",

        render: (Level: any, record: any) => (
          <a
            onClick={() => {
              this.refModalToeicPart1.current?.openModal(record);
            }}
            style={{ color: this.handelLevelColor(Level).Color }}
          >
            {this.handelLevelColor(Level).Title}
          </a>
        ),
      },
      {
        title: "Câu hỏi",
        dataIndex: "AudioUrl",
        key: "AudioUrl",
        width: "20%",

        render: (AudioUrl: any) => (
          <ReactAudioPlayer src={AudioUrl} autoPlay={false} controls />
        ),
      },
      {
        title: "Ảnh trong câu hỏi",
        dataIndex: "ImgUrl",
        key: "ImgUrl",

        render: (ImgUrl: any) => <img src={ImgUrl} height={173} width={259} />,
      },
      {
        title: "Câu trả lời đúng",
        dataIndex: "Answer",
        key: "Answer",
        width: "40%",

        render: (Answer: any) => <a>{this.handleAnswer(Answer)}</a>,
      },
    ];
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Button
            onClick={() => {
              this.refModalToeicPart1.current!.openModal();
            }}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Tạo mới
          </Button>
          <Select
            defaultValue={0}
            style={{ width: 120 }}
            onChange={(value) => {
              let data: any = [];
              if (value !== 0) {
                data = this.state.allData.filter((item) => {
                  return item.Level == value;
                });
              } else {
                data = this.state.allData;
              }
              this.setState({
                dataSource: data,
              });
            }}
          >
            <Option value={0}>Tất cả</Option>
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
        </div>

        <Table
          pagination={{ pageSize: 8 }}
          columns={columns as any}
          dataSource={
            this.state.dataSource && this.state.dataSource.length > 0
              ? this.state.dataSource
              : []
          }
        />
        <ModalToeicPart1
          ref={this.refModalToeicPart1}
          onSave={async () => {
            this.loadAllData();
          }}
        />
      </div>
    );
  }
}
