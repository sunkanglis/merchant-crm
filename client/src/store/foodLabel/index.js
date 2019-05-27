import {observable} from 'mobx'

class FoodLabelsStore{
  @observable list
  @observable conditions

  constructor() {
    this.list = [
        {
          value : 1 ,
          label : '家常菜'
        },
        {
          value : 2 ,
          label : '烧烤'
        },
        {
          value : 3 ,
          label : '主食'
        },
        {
          value : 4 ,
          label : '甜品'
        },
        {
          value : 5 ,
          label : '饮品'
        },
        {
          value : 6 ,
          label : '海鲜'
        },
        {
          value : 7 ,
          label : '凉菜'
        }
    ]
    this.conditions = [
      {
        value : 1 ,
        label : '需要支付'
      },
      {
        value : 2 ,
        label : '无需支付'
      }
    ]
  }
}

export default new FoodLabelsStore()