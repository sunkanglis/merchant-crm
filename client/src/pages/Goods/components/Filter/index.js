/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import {observer, inject} from 'mobx-react';


const { Row, Col } = Grid;
@inject('foodLabel')
export default class Filter extends Component {
  state = {
    value: {},
  };

  formChange = (value) => {
    this.props.onChange(value);
  };

  render() {
    const { foodLabel } = this.props
    let foodLabels = foodLabel.list.map((item)=>{
      return ( <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>)
    })
    return (
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>菜品名称：</span>
              <IceFormBinder triggerType="onBlur" name="foodName">
                <Input placeholder="请输入" style={{ width: '200px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="foodName" />
              </div>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>菜品分类：</span>
              <IceFormBinder triggerType="onBlur" name="foodLabel">
                <Select style={{ width: '200px' }} hasClear>
                  {foodLabels}
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="cate" />
              </div>
            </div>
          </Col>
          {/* <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>归属门店：</span>
              <IceFormBinder triggerType="onBlur" name="store">
                <Select style={{ width: '200px' }}>
                  <Select.Option value="1">余杭盒马店</Select.Option>
                  <Select.Option value="2">滨江盒马店</Select.Option>
                  <Select.Option value="3">西湖盒马店</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="store" />
              </div>
            </div>
          </Col> */}
        </Row>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '80px',
  },
};
