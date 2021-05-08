import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import {} from "antd";
import { Table, Input, Button, Space, Select, Popover } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { words600Service } from "../../00.common/02.service/words600Service";
import ReactAudioPlayer from "react-audio-player";
import React from "react";

import ModalWordToeic from "./ModalToeicWord";

import _ from "lodash";
import ModalTheme from "./ModalCreateTheme";

interface List600WordProps {}

interface List600WordState {
  searchText: string;
  searchedColumn: string;
  allData: any[];
  allCategories: { Title: string; value: string }[];
  selectedCa?: { Title: string; value: string };
  dataSource: any[];
  visibleCreateButton: boolean;
}
const { Option } = Select;
export default class List600WordsToeic extends BaseComponent<
  List600WordProps,
  List600WordState
> {
  private refModalTheme = React.createRef<ModalTheme>();
  private refModalWordToeic = React.createRef<ModalWordToeic>();
  constructor(props: List600WordProps) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      allData: [],
      allCategories: [],
      dataSource: [],
      visibleCreateButton: false,
    };
    this.onMount(async () => {
      await Promise.all([this.loadAllData()]);
    });
  }

  async loadAllData() {
    let allData = _.orderBy(
      await words600Service.getAll("600WordsToeic"),
      "OrderBy",
      "asc"
    );

    let allCategories: { Title: string; value: string }[] = allData.map(
      (item) => {
        return {
          Title: item.Title,
          value: item.KeyDoc,
        };
      }
    );

    let selectedCa = allCategories[0];

    this.setState({
      allData: allData,
      allCategories,
      selectedCa,
      dataSource: allData[0].Content,
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
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Select
            key={this.state.selectedCa?.value}
            value={this.state.selectedCa?.value}
            showSearch
            onSelect={async (value) => {
              let dataSelect = this.state.allData.find((item) => {
                return item.KeyDoc == value;
              });
              await this.setState({
                dataSource:
                  dataSelect.Content && dataSelect.Content.length > 0
                    ? dataSelect.Content
                    : [],
                selectedCa: { Title: dataSelect.Title, value: value },
              });
            }}
            style={{ width: 200 }}
            placeholder="Search to Select theme"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {this.state.allCategories.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.Title}
              </Option>
            ))}
          </Select>
          <Popover
            content={
              <div style={{ width: 150 }}>
                <Button
                  type="primary"
                  style={{ width: "100%", marginBottom: 5 }}
                  onClick={() => {
                    this.setState({
                      visibleCreateButton: !this.state.visibleCreateButton,
                    });
                    this.refModalWordToeic.current!.openModal(
                      this.state.selectedCa as { Title: string; value: string }
                    );
                  }}
                >
                  Tạo mới từ vựng
                </Button>
                <Button
                  onClick={() => {
                    this.setState({
                      visibleCreateButton: !this.state.visibleCreateButton,
                    });
                    this.refModalTheme.current!.openModal();
                  }}
                  type="primary"
                  style={{ width: "100%" }}
                >
                  Tạo mới chủ đề
                </Button>
              </div>
            }
            title="Tùy chọn"
            trigger="click"
            visible={this.state.visibleCreateButton}
            onVisibleChange={() => {
              this.setState({
                visibleCreateButton: !this.state.visibleCreateButton,
              });
            }}
          >
            <Button type="primary" icon={<PlusCircleOutlined />}>
              Tạo mới
            </Button>
          </Popover>
        </div>

        <Table
          bordered={true}
          pagination={{ pageSize: 8 }}
          columns={columns as any}
          dataSource={
            this.state.dataSource && this.state.dataSource.length > 0
              ? this.state.dataSource
              : []
          }
        />
        <ModalTheme
          onSave={async () => {
            this.loadAllData();
          }}
          ref={this.refModalTheme}
        />
        <ModalWordToeic
          onSave={async () => {
            this.loadAllData();
          }}
          ref={this.refModalWordToeic}
        />
      </div>
    );
  }
}
