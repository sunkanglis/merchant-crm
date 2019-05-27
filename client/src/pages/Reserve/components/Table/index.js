import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog, Input, DatePicker, Select, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Filter from '../Filter';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import {observer, inject} from 'mobx-react';
import moment from 'moment'
const { Option } = Select;
const telEegexp = new RegExp('/^1[34578]\d{9}$/')

@inject('reserve')
export default class ReserveTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
    reserveTime:[],
    total:0,
    visible : false,
    value : {},
  };

  componentDidMount() {
    this.getList()
  }


  getList(){
    let params = {
      reserveTime :this.state.reserveTime,
      pageNo : this.state.current
    }
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.axios.post('/api/reserveList',params).then(res => {
          if(res.data.code == 200){
            this.setState({
              data:res.data.data.items,
              total:res.data.data.pageInfo.total,
              isLoading: false,
            });
          }
        })
      }
    );
  }

  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.getList()
      }
    );
  };

  handleFilterChange = (value) => {
    let arr = []
    for (var i=0; i< value.length ;i++){
      arr[i] = new Date(value[i]._d).getTime()
      if(i == value.length - 1){
        arr[i] += 1000*60*60*24-(1000*1)
      }
    }
    this.setState({
      reserveTime : arr
    },()=>{
      this.getList()
    })
  };

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        
      },
    });
  };

  handleEdit = (val) => {
    let value = JSON.parse(JSON.stringify(val))
    value.appointmentTime = moment(value.appointmentTime).format()
    this.setState({
      visible : true,
      value
    });
  };

  renderPhone = (value) => {
    let str = 'tel:' + value
    return (
      <div>
        <span style={{ marginRight: '5px' }}>{value}</span>
        <a href={str} style={{fontSize:'20px'}}>
        ✆
        </a>
      </div>  
    )
  }
  renderTime = (value) =>{
    return (
      <span>
        {moment(value).format('YYYY-MM-DD HH:mm:ss')}
      </span>
    )
  }
  renderService = (value) =>{
    const { reserve } = this.props
    return (
      <span key={value}> { reserve.service[~~value-1].label} </span>
    )
  }
  renderStore = (value) =>{
    const { reserve } = this.props
    return (
      <span key={value}> { reserve.stores[~~value-1].label} </span>
    )
  }
  renderOper = (value, rowIndex, record, context) => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={()=>this.handleEdit(record)}
        >
          编辑
        </Button>
        <Button type="normal" warning onClick={()=>this.handleDelete(record)}>
          删除
        </Button>
      </div>
    );
  };

  edit = () =>{
    let { value } = this.state
    let params = JSON.parse(JSON.stringify(value))
    console.log(params)
    params.appointmentTime = new Date(params.appointmentTime).getTime()
    params.appointmentTime = Number(params.appointmentTime)
    params.telPhone = Number(params.telPhone)
    params.personNumber = Number(params.personNumber)
    console.log(params)
    this.axios.post('/api/editReserve',params).then(res => {
      if(res.data.code == 200){
        Message.success(res.data.message)
        this.onClose()
        this.getList()
      }
    })
  }
  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { isLoading, data, current } = this.state;
    const { reserve } = this.props
    let reserveServeices = reserve.service.map((item)=>{
      return ( <Option value={item.value} key={item.value}>{item.label}</Option>)
    })

    return (
      <div style={styles.container}>
        <IceContainer>
          <Filter onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="姓名" dataIndex="clientName" />
            <Table.Column title="联系方式" dataIndex="telPhone" cell={this.renderPhone}/>
            <Table.Column title="预约服务" dataIndex="reserveService" cell={this.renderService}/>
            <Table.Column title="预约门店" dataIndex="reserveStore" cell={this.renderStore}/>
            <Table.Column title="到店人数" dataIndex="personNumber" />
            <Table.Column title="到店时间" dataIndex="appointmentTime" cell={this.renderTime}/>
            <Table.Column title="预约时间" dataIndex="settledTime" />
            <Table.Column title="预约备注" dataIndex="description" />
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
            total = {this.state.total}
          />
        </IceContainer>
        <Dialog title="编辑"
          visible={this.state.visible}
          onOk={this.edit}
          onCancel={this.onClose}
          onClose={this.onClose}
        >
          <IceContainer style={{ padding: '40px' }}>
              <IceFormBinderWrapper
              value={this.state.value}
              // onChange={this.formChange}
              ref="form"
              >
                <div style={styles.formItem}>
                  <div style={styles.formLabel}>客户姓名：</div>
                  <IceFormBinder name="clientName" required message="客户姓名必填">
                    <Input style={{ width: '200px' }} />
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="clientName" />
                  </div>
                </div>
                <div style={styles.formItem}>
                  <div style={styles.formLabel}>联系方式：</div>
                  <IceFormBinder name="telPhone" pattern={new RegExp('^[1]([3-9])[0-9]{9}$')} required message="请输入正确的手机号">
                    <Input style={{ width: '200px' }} />
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="telPhone" />
                  </div>
                </div>
                <div style={styles.formItem}>
                  <div style={styles.formLabel}>到店人数：</div>
                  <IceFormBinder name="personNumber" required message="到店人数必填">
                    <Input style={{ width: '200px' }} />
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="personNumber" />
                  </div>
                </div>
                <div style={styles.formItem}>
                <div style={styles.formLabel}>预约服务：</div>
                  <IceFormBinder name="reserveService">
                    <Select
                      placeholder="请选择"
                      style={{ width: '200px' }}
                    >
                      {reserveServeices}
                    </Select>
                  </IceFormBinder>
                </div>
                <div style={styles.formItem}>
                  <div style={styles.formLabel}>到店时间：</div>
                  <IceFormBinder name="appointmentTime" required message="预约时间必填">
                    {/* <Input style={{ width: '400px' }} /> */}
                    <DatePicker showTime style={{ width: '200px' }} />
                  </IceFormBinder>
                  <div style={styles.formError}>
                    <IceFormError name="appointmentTime" />
                  </div>
                </div>
                <div style={styles.formItem}>
                  <div style={styles.formLabel}>预约备注：</div>
                  <IceFormBinder name="description">
                    <Input.TextArea style={{ width: '200px' }} />
                  </IceFormBinder>
                </div>
              </IceFormBinderWrapper>
            </IceContainer>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  formItem: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
  },
  formLabel: {
    fontWeight: '450',
    width: '80px',
  },
  formError: {
    marginTop: '10px',
  },
};
