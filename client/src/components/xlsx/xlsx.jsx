/* eslint no-prototype-builtins:0, react/forbid-prop-types:0 */
import React, { Component } from "react";
import exportExcel from "./exportExcel.js";

export default class Xlsx extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const initColumn = this.props.props.listType;
    const attendanceInfoList = this.props.props.data;
    const fileName = `${this.props.props.fileName}.xlsx`;
    return (
      <div style={styles.xlsxBox}>
        <button
          type="text"
          type="primary"
          style={styles.xlsx}
          onClick={() => exportExcel(initColumn, attendanceInfoList, fileName)}
        >
          导出表格数据
        </button>
      </div>
    );
  }
}

const styles = {
  xlsxBox: {
    width: "100%",
    height: "40px",
  },
  xlsx: {
    display: "flex",
    float: "right",
    height: "36px",
    padding: "10px 20px",
    border: "1px solid #C4C6CF",
    borderRadius: "5px",
    outline: "none",
    boxSizing: "border-box",
    cursor: "pointer",
    background: 'transparent',
  },
};
