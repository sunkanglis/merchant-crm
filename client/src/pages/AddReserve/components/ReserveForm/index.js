/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Message, DatePicker , Select} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import PageHead from '../../../../components/PageHead';

import { observer , inject } from 'mobx-react'

const { Option } = Select;
const telEegexp = new RegExp('/^1[34578]\d{9}$/')

@inject('reserve')
export default class ReserveForm extends Component {
  state = {
    value: {},
    telEegexp:telEegexp,
  };

  validateAllFormField = () => {
    let timer = null
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      let params = JSON.parse(JSON.stringify(values))
      params.appointmentTime = new Date(params.appointmentTime).getTime()
      this.axios.post('/api/addReserve',params).then(res=>{
        if(res.data.code == 200){
          Message.success('提交成功')
          clearTimeout(timer)
          setTimeout(()=>{
            this.setState({
              value:{}
            },()=>{
              this.props.push('/reserve');
            })
          },600)
         
          
        }else{
          Message.error(res.data.message);
        }
      })
    });
  };

  render() {
    const { reserve } = this.props
    let reserveServeices = reserve.service.map((item)=>{
      return ( <Option value={item.value} key={item.value}>{item.label}</Option>)
    })
    let reserveStores = reserve.stores.map((item)=>{
      return ( <Option value={item.value} key={item.value}>{item.label}</Option>)
    })
    return (
      <div>
        <PageHead title="添加预约" />
        <IceContainer style={{ padding: '40px' }}>
          <IceFormBinderWrapper
            value={this.state.value}
            // onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>客户姓名：</div>
              <IceFormBinder name="clientName" required message="客户姓名必填">
                <Input style={{ width: '400px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="clientName" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>联系方式：</div>
              <IceFormBinder name="telPhone" pattern={new RegExp('^[1]([3-9])[0-9]{9}$')} required message="请输入正确的手机号">
                <Input style={{ width: '400px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="telPhone" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>到店人数：</div>
              <IceFormBinder name="personNumber" required message="到店人数必填">
                <Input style={{ width: '400px' }} />
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
                  style={{ width: '400px' }}
                >
                  {reserveServeices}
                </Select>
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>预约门店：</div>
              <IceFormBinder name="reserveStore">
                <Select
                  placeholder="请选择"
                  style={{ width: '400px' }}
                >
                  {reserveStores}
                </Select>
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>到店时间：</div>
              <IceFormBinder name="appointmentTime" required message="预约时间必填">
                {/* <Input style={{ width: '400px' }} /> */}
                <DatePicker showTime style={{ width: '400px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="service" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>预约备注：</div>
              <IceFormBinder name="description">
                <Input.TextArea style={{ width: '400px' }} />
              </IceFormBinder>
            </div>
            <Button
              type="primary"
              onClick={this.validateAllFormField}
              style={styles.button}
            >
              提 交
            </Button>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
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
  button: {
    marginLeft: '100px',
  },
};
