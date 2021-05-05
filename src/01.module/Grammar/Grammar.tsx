import { BaseComponent } from "../../00.common/00.components/BaseComponent";
import { Select } from "antd";
import styles from "./Grammar.module.scss";

import { grammarService } from "../../00.common/02.service/grammarService";

interface GrammarProps {}

interface GrammarState {
  allData: any[];
  selectdItem?: any;
}
const { Option } = Select;
export default class GrammarCom extends BaseComponent<
  GrammarProps,
  GrammarState
> {
  constructor(props: GrammarProps) {
    super(props);
    this.state = {
      allData: [],
    };
    this.onMount(async () => {
      await Promise.all([this.loadAllData()]);
    });
  }
  async loadAllData() {
    let allData = await grammarService.getAll("Grammar");

    this.setState({
      allData,
    });
  }

  render() {
    return (
      <div className={styles.Grammar}>
        <div className={styles.grammar__header}>
          <div className={styles.grammar__header__title}>
            Mời bạn chọn bài bên dưới để học NGỮ PHÁP TOEIC nhé!
            <div className={styles.grammar__header__select}>
              <Select
                showSearch
                style={{ width: "50%" }}
                placeholder="Select a unit"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option!.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                onSelect={async (value) => {
                  let selectdItem = this.state.allData.find((item) => {
                    return item.Id == value;
                  });

                  await this.setState({
                    selectdItem:selectdItem.Content,
                  });
                }}
              >
                {this.state.allData &&
                  this.state.allData.length > 0 &&
                  this.state.allData.map((item, index) => (
                    <Option value={item.Id}>{item.Title}</Option>
                  ))}
              </Select>
            </div>
          </div>
          {this.state.allData && this.state.allData.length > 0 && (
            <div
              dangerouslySetInnerHTML={{
                __html: this.state.selectdItem
                  ? this.state.selectdItem
                  : this.state.allData[0].Content,
              }}
            ></div>
          )}
        </div>
      </div>
    );
  }
}
