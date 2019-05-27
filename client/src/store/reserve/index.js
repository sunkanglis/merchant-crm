import {observable} from 'mobx'

class reserveStore{
  
  @observable service
  @observable stores

  constructor(){
    this.service = [
      {
        value : 1,
        label : '生日宴'
      },
      {
        value : 2,
        label : '婚宴'
      },
      {
        value : 3,
        label : '升学宴'
      },
      {
        value : 4,
        label : '团建聚会'
      },
      {
        value : 5,
        label : '预定座位'
      },
    ]
    this.stores = [
      {
        value : 1,
        label : '理工大学(西校区)店'
      },
      {
        value : 2,
        label : '共青团团路店'
      },
      {
        value : 3,
        label : '美食街店'
      },
      {
        value : 4,
        label : '理工大学(东校区)店'
      },
      {
        value : 5,
        label : '金晶大道店'
      },
    ]
  }
  
}

export default new reserveStore()