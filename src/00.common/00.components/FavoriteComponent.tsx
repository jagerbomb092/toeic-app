import { BaseComponent } from "./BaseComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarAndCrescent,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { StarOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
interface FavProps {
  isFav?: boolean;
  onFav: () => void;
  onUnFav: () => void;
}
interface FavState {
  isFav: boolean;
}

export class FavComponent extends BaseComponent<FavProps, FavState> {
  constructor(props: FavProps) {
    super(props);
    this.state = {
      isFav: false,
    };
  }
  render() {
    return (
      <div style={{ marginRight: 15 }}>
        {this.props.isFav || this.state.isFav ? (
          <Tooltip title="Bỏ lưu">
            <FontAwesomeIcon
              onClick={async () => {
                this.setState({
                  isFav: false,
                });
                await this.props.onUnFav();
              }}
              style={{ color: "yellow", fontSize: 25 }}
              icon={faStar}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Lưu vào từ của tôi">
            <StarOutlined
              onClick={async () => {
                this.setState({
                  isFav: true,
                });
                await this.props.onUnFav();
              }}
              style={{ color: "#33abe5", fontSize: 25 }}
            />
          </Tooltip>
        )}
      </div>
    );
  }
}
