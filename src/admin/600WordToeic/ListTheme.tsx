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

interface ListThemeProps {}

interface ListThemeState {
  searchText: string;
  searchedColumn: string;
  allData: any[];
  allCategories: { Title: string; value: string }[];
  selectedCa?: { Title: string; value: string };
}
const { Option } = Select;
export default class ListTheme extends BaseComponent<
  ListThemeProps,
  ListThemeState
> {
  private refModalTheme = React.createRef<ModalTheme>();

  constructor(props: ListThemeProps) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      allData: [],
      allCategories: [],
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
        title: "Dịch nghĩa",
        dataIndex: "Title_VN",
        key: "Title_VN",
        width: "15%",
        ...this.getColumnSearchProps("Title_VN"),
        render: (Title_VN: any) => (
          <a style={{ color: "#007ACC" }}>{Title_VN}</a>
        ),
      },
      {
        title: "Thứ tự",
        dataIndex: "OrderBy",
        key: "OrderBy",
        width: "5%",

        ...this.getColumnSearchProps("OrderBy"),
        render: (Spelling: any, record: any) => (
          <a
            style={{ textAlign: "center" }}
            onClick={() => {
              this.refModalTheme.current!.openModal(record);
            }}
          >
            {Spelling}
          </a>
        ),
      },
      {
        title: "Hình nền",
        dataIndex: "ImgBanner",
        key: "ImgBanner",
        width: "40%",

        render: (ImgBanner: any) => (
          <img src={ImgBanner} height={173} width={259} />
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
              this.refModalTheme.current!.openModal();
            }}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Tạo mới
          </Button>
     
        </div>

        <Table
          pagination={{ pageSize: 8 }}
          columns={columns as any}
          dataSource={
            this.state.allData && this.state.allData.length > 0
              ? this.state.allData
              : []
          }
        />
        <ModalTheme
          onSave={async () => {
            this.loadAllData();
          }}
          ref={this.refModalTheme}
        />
      </div>
    );
  }
}
