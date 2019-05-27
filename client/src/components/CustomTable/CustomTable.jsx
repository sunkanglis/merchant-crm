/* eslint no-prototype-builtins:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import { Table, Pagination } from '@alifd/next';
import SearchFilter from './SearchFilter';
import axios from 'axios';
export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {
    enableFilter: PropTypes.bool,
    searchQueryHistory: PropTypes.object,
  };

  static defaultProps = {
    enableFilter: true,
    searchQueryHistory: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchQuery: cloneDeep(this.props.searchQueryHistory),
      pageIndex: 1,
      dataSource: [],
      total:0
    };
  }
  componentDidMount() {
    this.fetchDataSource();
  }
  // 更新列表数据
  fetchDataSource = () => {
    this.setState({
      loading: true,
    });
    // 获取订单列表数据
    axios.post('/api/order/list',{
      "pageIndex":this.state.pageIndex,
    }).then(res=>{
      this.state.dataSource = []
      this.setState({
        loading: false,
        dataSource:res.data.data,
        total:res.data.total
      })
    })
  };
   // 点击分页
   onPaginationChange = (pageIndex) => {
    this.setState({
       pageIndex,
      },
      this.fetchDataSource
    );
  };
  // 传递的属性改变时执行
  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('searchQueryHistory')) {
      this.setState(
        {
          searchQuery: Object.assign(
            cloneDeep(this.props.searchQueryHistory),
            nextProps.searchQueryHistory
          ),
          pageIndex: 1,
        },
        this.fetchDataSource
      );
    }
  }
  onSearchChange = (searchQuery) => {
    this.setState({
      searchQuery,
    });
  };
  // 点击搜索
  onSearchSubmit = (searchQuery) => {
    this.setState(
      {
        searchQuery,
        pageIndex: 1,
      },
      this.fetchDataSource
    );
  };
  // 点击重置
  onSearchReset = () => {
    this.setState({
      searchQuery: cloneDeep(this.props.searchQueryHistory),
    });
  };
 
  render() {
    const { enableFilter, columns, formConfig, hasAdvance } = this.props;
    const { searchQuery, dataSource, loading, pageIndex, total} = this.state;
    return (
      <div>
        {enableFilter && (
          <SearchFilter
            formConfig={formConfig}
            value={searchQuery}
            onChange={this.onSeacrhChange}
            onSubmit={this.onSearchSubmit}
            onReset={this.onSearchReset}
            hasAdvance={hasAdvance}
          />
        )}
        <Table dataSource={dataSource} hasBorder={false} loading={loading}>
          {columns.map((item) => {
            return (
              <Table.Column
                title={item.title}
                dataIndex={item.dataIndex}
                key={item.key}
                sortable={item.sortable || false}
                cell={item.cell}
                width={item.width || 'auto'}
                lock={item.lock}
              />
            );
          })}
        </Table>
        <Pagination
          style={styles.pagination}
          current={pageIndex}
          total = {total}
          onChange={this.onPaginationChange}
        />
      </div>
    );
  }
}

const styles = {
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
};
