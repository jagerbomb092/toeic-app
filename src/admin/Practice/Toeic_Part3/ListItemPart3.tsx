import {} from "antd";
import { Table, Input, Button, Space, Select, Popover, Radio } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";

import ReactAudioPlayer from "react-audio-player";
import React from "react";

import _ from "lodash";
import { BaseComponent } from "../../../00.common/00.components/BaseComponent";

import ModalToeicPart3 from "./ModalToeicPart3";
import { ANSWER_PART3 } from "../../../00.common/const";
import { toeicPart3Service } from "../../../00.common/02.service/toeicPart3Service";

interface ToeicPart3Props {}

interface ToeicPart3State {
  searchText: string;
  searchedColumn: string;
  allData: any[];
  dataSource: any[];
  visiblePopover: boolean;
}
const { Option } = Select;
export default class ListToeicPart3 extends BaseComponent<
  ToeicPart3Props,
  ToeicPart3State
> {
  private refModalToeicPart3 = React.createRef<ModalToeicPart3>();
  constructor(props: ToeicPart3Props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      allData: [],
      dataSource: [],
      visiblePopover: false,
    };
    this.onMount(async () => {
      await Promise.all([this.loadAllData()]);
    });
  }

  async loadAllData() {
    let allData = await toeicPart3Service.getAll("ToeicPart3");

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

  handleVisibleChange = (visiblePopover) => {
    this.setState({ visiblePopover });
  };

  handleAnswer(answer: string) {
    if (answer == ANSWER_PART3.A.value) {
      return "Đáp án A";
    } else if (answer == ANSWER_PART3.B.value) {
      return "Đáp án B";
    } else if (answer == ANSWER_PART3.C.value) {
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
        width: "5%",

        render: (Level: any) => (
          <a style={{ color: this.handelLevelColor(Level).Color }}>
            {this.handelLevelColor(Level).Title}
          </a>
        ),
      },
      {
        title: "Câu hỏi",
        dataIndex: "AudioUrl",
        key: "AudioUrl",
        width: "15%",

        render: (AudioUrl: any) => (
          <ReactAudioPlayer src={AudioUrl} autoPlay={false} controls />
        ),
      },
      {
        title: "Câu 1",
        dataIndex: "Question1",
        key: "Question1",
        width: "20%",

        render: (Question1: any) => (
          <Popover
            content={
              <div>
                <Space direction="vertical" style={{ width: 300 }}>
                  <Radio value={1} checked={true}>
                    {Question1.SelectA.Title}
                  </Radio>
                  <Radio value={2} checked={true}>
                    {Question1.SelectB.Title}
                  </Radio>
                  <Radio value={3} checked={true}>
                    {Question1.SelectC.Title}
                  </Radio>
                  <Radio value={3} checked={true}>
                    {Question1.SelectD.Title}
                  </Radio>
                </Space>
              </div>
            }
            title="Câu hỏi 1"
            trigger="click"
            visible={this.state.visiblePopover}
            onVisibleChange={this.handleVisibleChange}
          >
            <a style={{ textAlign: "center" }}>{Question1.Question}</a>
          </Popover>
        ),
      },
      {
        title: "Câu 1",
        dataIndex: "Question1",
        key: "Question1",
        width: "20%",

        render: (Question1: any) => (
          <Popover
            content={
              <div>
                <Space direction="vertical" style={{ width: 300 }}>
                  <Radio value={1} checked={true}>
                    {Question1.SelectA.Title}
                  </Radio>
                  <Radio value={2} checked={true}>
                    {Question1.SelectB.Title}
                  </Radio>
                  <Radio value={3} checked={true}>
                    {Question1.SelectC.Title}
                  </Radio>
                  <Radio value={3} checked={true}>
                    {Question1.SelectD.Title}
                  </Radio>
                </Space>
              </div>
            }
            title="Câu hỏi 1"
            trigger="click"
            visible={this.state.visiblePopover}
            onVisibleChange={this.handleVisibleChange}
          >
            <a style={{ textAlign: "center" }}>{Question1.Question}</a>
          </Popover>
        ),
      },
      {
        title: "Câu 1",
        dataIndex: "Question1",
        key: "Question1",
        width: "20%",

        render: (Question1: any) => (
          <Popover
            content={
              <div>
                <Space direction="vertical" style={{ width: 300 }}>
                  <Radio value={1} checked={true}>
                    {Question1.SelectA.Title}
                  </Radio>
                  <Radio value={2} checked={true}>
                    {Question1.SelectB.Title}
                  </Radio>
                  <Radio value={3} checked={true}>
                    {Question1.SelectC.Title}
                  </Radio>
                  <Radio value={3} checked={true}>
                    {Question1.SelectD.Title}
                  </Radio>
                </Space>
              </div>
            }
            title="Câu hỏi 1"
            trigger="click"
            visible={this.state.visiblePopover}
            onVisibleChange={this.handleVisibleChange}
          >
            <a style={{ textAlign: "center" }}>{Question1.Question}</a>
          </Popover>
        ),
      },
      {
        title: "Câu 1",
        dataIndex: "Question1",
        key: "Question1",
        width: "20%",

        render: (Question1: any) => (
          <Popover
            content={
              <div>
                <Space direction="vertical" style={{ width: 300 }}>
                  <Radio value={1} checked={true}>
                    {Question1.SelectA.Title}
                  </Radio>
                  <Radio value={2} checked={true}>
                    {Question1.SelectB.Title}
                  </Radio>
                  <Radio value={3} checked={true}>
                    {Question1.SelectC.Title}
                  </Radio>
                  <Radio value={3} checked={true}>
                    {Question1.SelectD.Title}
                  </Radio>
                </Space>
              </div>
            }
            title="Câu hỏi 1"
            trigger="click"
            visible={this.state.visiblePopover}
            onVisibleChange={this.handleVisibleChange}
          >
            <a style={{ textAlign: "center" }}>{Question1.Question}</a>
          </Popover>
        ),
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
              this.refModalToeicPart3.current!.openModal();
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
        <ModalToeicPart3
          ref={this.refModalToeicPart3}
          onSave={async () => {
            this.loadAllData();
          }}
        />
      </div>
    );
  }
}
