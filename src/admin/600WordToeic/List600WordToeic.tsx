import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { words600Service } from "../../00.common/02.service/words600Service";
import ReactAudioPlayer from "react-audio-player";
import React from "react";
import ModalWordToeicl from "./ModalToeicWord";
import ModalWordToeic from "./ModalToeicWord";
interface List600WordProps {}

interface List600WordState {
  searchText: string;
  searchedColumn: string;
  allData: any[];
}

export default class List600WordsToeic extends BaseComponent<
  List600WordProps,
  List600WordState
> {
  private refModalWordToeic = React.createRef<ModalWordToeic>();
  constructor(props: List600WordProps) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      allData: [],
    };
    this.onMount(async () => {
      await Promise.all([this.loadAllData()]);
    });
  }

  async loadAllData() {
    let allData = await words600Service.getAll("600WordsToeic");
    this.setState({
      allData: allData,
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
  render() {
    const columns = [
      {
        title: "Tên",
        dataIndex: "Title",
        key: "Title",
        width: "10%",
        ...this.getColumnSearchProps("Title"),
        render: (Title: any) => <a style={{ color: "red" }}>{Title}</a>,
      },
      {
        title: "Phiên âm",
        dataIndex: "Spelling",
        key: "Spelling",
        width: "10%",
        ...this.getColumnSearchProps("Spelling"),
        render: (Spelling: any, record: any) => (
          <a
            onClick={() => {
              this.refModalWordToeic.current!.openModal(record);
            }}
          >
            {Spelling}
          </a>
        ),
      },
      {
        title: "Phiên âm",
        dataIndex: "LinkAudio",
        key: "LinkAudio",
        width: "10%",

        render: (LinkAudio: any) => (
          <ReactAudioPlayer src={LinkAudio} autoPlay={false} controls />
        ),
      },

      {
        title: "Thể loại",
        dataIndex: "Category",
        width: "40%",
        key: "Category",
        ...this.getColumnSearchProps("Category"),
      },
      {
        title: "Giải thích",
        dataIndex: "Explain",
        width: "40%",
        key: "Explain",
        ...this.getColumnSearchProps("Explain"),
      },
    ];
    return (
      <div>
        <Table
          pagination={{ pageSize: 8 }}
          columns={columns as any}
          dataSource={
            this.state.allData.length > 0 ? this.state.allData[1].Content : []
          }
        />
        <ModalWordToeic ref={this.refModalWordToeic} />
      </div>
    );
  }
}
