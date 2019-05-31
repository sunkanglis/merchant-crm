import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import axios from 'axios';
import Xlsx from '../../../../components/xlsx/index'
import addMembership from './addMembership'
// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default class GoodsTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
    total: 1,
    query: {},
    vernier: {limit: 10, skip: 0}
  };

  componentDidMount() {
    this.fetchData();
    //随机生成n条会员数据插入数据库（参数为生成数据的条数，参数大于0）
    //数据添加完成后，下一行代码可删除，可注释
    // addMembership(50);

  }

  getData = async () => {
    //查询会员数据
    let that = this;
    let data = [];
    await axios
    .post('/api/selectMembership', {
      query: that.state.query,
      vernier: that.state.vernier
    })
    .then(res => {
      if (res.data.code == 200) {
        data = res.data.data;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    return data;
  };

  fetchData = () => {
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        let data =  await this.getData()
        this.setState({
          data: data.array,
          total: data.count,
          isLoading: false,
        });
      }
    );
  };

  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
        vernier: {limit: 10, skip: (current - 1) * 10}
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleFilterChange = (data) => {
    //目前只能筛选会员等级和归属门店
    if(data instanceof Array){
      let query = data.map(item => item.selected)
      query[0] === '全部' ? query[0] = {$nin: ['nice']} : {$in: [query[0]]}
      
      this.setState({
        query: {
          membershipGrade: query[0],
        }
      });
    } else{
      let stors = {BelongingToStores: data.state}
      if(data.state === "全部门店") { stors = {BelongingToStores: {$nin: ['nice']}} }
      this.setState({
        query: Object.assign(this.state.query, stors)
      });
    }
    
    this.fetchData();
  };

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData();
      },
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };

  renderOper = () => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail}
        >
          详情
        </Button>
        <Button type="normal" warning onClick={this.handleDelete}>
          删除
        </Button>
      </div>
    );
  };
   
  reanderList = (listType) => {
    return listType.map((item, index) => <Table.Column title={item.title} dataIndex={item.dataIndex} key={index} />)
  }

  render() {
    const { isLoading, data, current, total } = this.state;
    //传入导出表格组件的数据类型，title为每列表格数据的标题，dataIndex的值为每条数据属性的属性名
    const listType = [
      { title: "会员名称", dataIndex: "membershipName"},
      { title: "会员等级", dataIndex: "membershipGrade"},
      { title: "会员余额(元)", dataIndex: "MemberBalance" },
      { title: "累计消费(元)", dataIndex: "cumulative" },
      { title: "注册时间", dataIndex: "registerTime" },
      { title: "生日时间", dataIndex: "birthdayTime" },
      { title: "归属门店", dataIndex: "BelongingToStores" },
    ]
    return (
      <div style={styles.container}>
        <IceContainer>
          <FilterTag onChange={this.handleFilterChange} />
          <FilterForm onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            {this.reanderList(listType)}
            <Table.Column
              title="操作"
              width={200}
              dataIndex="oper"
              cell={this.renderOper}
            />
          </Table>
          <Pagination
            style={styles.pagination}
            current={current}
            total={total}
            onChange={this.handlePaginationChange}
          />
        </IceContainer>
        <IceContainer>
          <Xlsx props={{listType: listType, data: this.state.data, fileName: '会员管理表'}}></Xlsx>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
