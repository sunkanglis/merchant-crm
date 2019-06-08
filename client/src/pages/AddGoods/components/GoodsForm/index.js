/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Button,
  Message,
  NumberPicker,
  DatePicker,
  Radio,
  Select,
  Upload,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import PageHead from '../../../../components/PageHead';

import {observer, inject} from 'mobx-react';


const { Option } = Select;
const { Group: RadioGroup } = Radio;
const { RangePicker } = DatePicker;

@inject('foodLabel')
export default class GoodsForm extends Component {
  state = {
    value: {},
  };

  // formChange = (value) => {
  //   console.log('value', value);
  // };

  validateAllFormField = () => {
    let that = this;
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      // let params = new FormData()
      // for (var i in values){
      //   if(i === 'foodImage'){
      //     console.log(values[i][0])
      //     params.append(i,JSON.stringify(values[i][0]))
      //   }else{
      //     params.append(i,values[i])
      //   }
      // }
      let param = JSON.parse(JSON.stringify(values))
      param.foodImage = param.foodImage[0]
      
      that.axios({
        method:'POST',
        url:'/api/addDishes',
        data:param,
        
      }).then(res=>{
        if(res.data.code == 200){
          Message.success('提交成功');
          console.log(res.data.data)
          this.setState({
            value:{}
          })
        }else{
          Message.error(res.data.message);
        }
      })
    });
  };
  beforeUpload(file){
    console.log(file)
  }

  render() {
    const { foodLabel } = this.props
    let foodLabels = foodLabel.list.map((item)=>{
      return ( <Option value={item.value} key={item.value}>{item.label}</Option>)
    })

    return (
      <div>
        <PageHead title="添加菜品" />
        <IceContainer style={{ padding: '40px' }}>
          <IceFormBinderWrapper
            value={this.state.value}
            // onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>上传图片：</div>
              <IceFormBinder name="foodImage">
              <Upload.Card
                limit= {1}
                listType="card"
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                autoUpload={false}
                useDataURL
              />
              </IceFormBinder> 
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>菜品名称：</div>
              <IceFormBinder name="foodName" required message="菜品名称必填">
                <Input
                  placeholder="请输入菜品名称"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="foodName" />
              </div>
            </div>
            {/* <div style={styles.formItem}>
              <div style={styles.formLabel}>条形码：</div>
              <IceFormBinder name="code">
                <Input
                  placeholder="请输入数字条形码"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div> */}
            <div style={styles.formItem}>
              <div style={styles.formLabel}>库存量：</div>
              <IceFormBinder name="inventory" >
                <NumberPicker min={0} />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>菜品标签：</div>
              <IceFormBinder name="foodLabels">
                <Select
                  placeholder="请选择"
                  mode="multiple"
                  style={{ width: '400px' }}
                >
                  {foodLabels}
                </Select>
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>菜品价格：</div>
              <IceFormBinder name="foodPrices" required message="菜品价格必填">
                <Input
                  placeholder="请输入菜品价格: ￥199.99"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="foodPrices" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>售卖时间：</div>
              <IceFormBinder name="presellStartTime">
                <RangePicker style={{ width: '400px' }} />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>预约条件：</div>
              <IceFormBinder name="bookConditions">
                <RadioGroup
                  dataSource={[
                    {
                      value: '1',
                      label: '需要支付',
                    },
                    {
                      value: '2',
                      label: '无需支付',
                    },
                  ]}
                />
              </IceFormBinder>
            </div>
            <Button type="primary" onClick={this.validateAllFormField}>
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
