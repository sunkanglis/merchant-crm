import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Filter from '../Filter';


import {observer, inject} from 'mobx-react';

@inject('foodLabel')
export default class GoodsTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
    foodName:'',
    foodLabel:'',
    total:50,
  };

  componentDidMount() {
    this.getList()
  }

  getList = () =>{
    let parmas = {
      foodName:this.state.foodName,
      foodLabel:this.state.foodLabel,
      pagerNo:this.state.current,
    }
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.axios.post('/api/dishesList',parmas).then(res => {
          if(res.data.code == 200){
            this.setState({
              data:res.data.data.items,
              total:res.data.data.pageInfo.total,
              isLoading: false,
            });
          }
        })
      }
    )
  }
   
  deleteDishes(id){
    this.axios.get('/api/deleteDishes',{ params : { id }}).then(res=>{
      if(res.data.code == 200){
        Message.success(res.data.data.message)
        this.getList()
      }else {
        Message.error('删除失败，请尝试刷新')
      }
    })
  }
  
  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.getList();
      }
    );
  };
  
  handleFilterChange = (value) => {
    // let timer = 0
    // return function () {
    //   if (timer) clearTimeout(timer)
    //     console.log(value,111)
    //   timer = setTimeout(()=>{
    //   },500)
    // }
  };

  handleDelete = ({ _id }) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.deleteDishes(_id)
      },
    });
  };

  handleDetail = (id) => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };

  renderLogo = (value) => {
    return (
      <div style={styles.imagesBox}>
        <img  style={styles.imagesBox} src={"http://localhost:4444/public"+value}></img>
      </div>
    );
  }


  renderLabel = (value) => {
    const { foodLabel } = this.props
    return (
      <div>
        {
          value.map((item) => {
            let index = item - 1
            return (
              <span key={item}>{ foodLabel.list[index].label }</span>
            )
          })
        }
      </div>
    )
  }
  renderCond = (value) =>{
    const { foodLabel } = this.props
    return (
      <span key={value}> { foodLabel.conditions[~~value-1].label} </span>
    )
  }
  renderOper = (value, rowIndex, record, context) => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={()=>this.handleDetail(record)}
        >
          详情
        </Button>
        <Button type="normal" warning onClick={()=>this.handleDelete(record)}>
          删除
        </Button>
      </div>
    );
  };

  render() {
    const { isLoading, data, current ,total} = this.state;
    console.log('data: ',data)
    return (
      <div style={styles.container}>
        <IceContainer>
          <Filter onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="菜品图片" dataIndex="merchantLogo" cell={this.renderLogo} />
            <Table.Column title="菜品名称" dataIndex="foodName" />
            <Table.Column title="菜品分类" dataIndex="foodLabels" cell={this.renderLabel}/>
            <Table.Column title="菜品价格" dataIndex="foodPrices" />
            {/* <Table.Column title="在售门店" dataIndex="store" /> */}
            <Table.Column title="总销量" dataIndex="sales" />
            <Table.Column title="菜品预约条件" dataIndex="bookConditions" cell={this.renderCond}/>
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
            onChange={this.handlePaginationChange}
            total={total}
          />
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
  imagesBox: {
    width: '120px',
    height: '80px',
    overflow: 'hidden',
    textAlign: 'center',
    lineHeight: '80px'
  },
  images: {
    width: 'auto',
    height: '100%',
    margin: '0 100%',
  }
};
