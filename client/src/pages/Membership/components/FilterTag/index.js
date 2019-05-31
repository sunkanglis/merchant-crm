import React, { Component } from 'react';
import styles from './index.module.scss';

const MOCK_DATA = [
  {
    selected: '全部',
    label: '会员等级',
    value: ['全部', '普通会员', '白银会员', '黄金会员', '钻石会员', 'VIP 会员'],
  },
  {
    selected: '全部',
    label: '会员余额',
    value: ['全部', '小于5000', '小于10000', '小于50000', '大于50000'],
  },
  {
    selected: '全部',
    label: '累计消费',
    value: ['全部', '小于5000', '小于10000', '小于50000', '大于50000'],
  },
];

export default class FilterTag extends Component {
  state = {
    data: MOCK_DATA,
  };

  handleClick = (value, index) => {
    const { data } = this.state;
    data[index].selected = value;
    this.setState(
      {
        data,
      },
      () => {
        this.props.onChange(data);
      }
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.filterContent}>
        {data.map((item, index) => {
          const lastItem = index === data.length - 1;
          const lastItemStyle = lastItem ? { marginBottom: 10 } : null;
          return (
            <div className={styles.filterItem} style={lastItemStyle} key={index}>
              <div className={styles.filterLabel}>{item.label}:</div>
              <div className={styles.filterList}>
                {item.value.map((text, idx) => {
                  const activeStyle =
                    item.selected === text ? styles.activeText : styles.filterText;
                  return (
                    <span
                      onClick={() => this.handleClick(text, index)}
                      className={activeStyle}
                      key={idx}
                    >
                      {text}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
