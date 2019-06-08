## 新添目录结构及介绍



```
project

├── client

│     ├── src       

│     │    ├── components       

│     │    │    └──xlsx                                        // 添加lsx组件， 使用时引入并传参   

│     │    └── pages            

│     │         └── Membership

│     │               └── components

│     │                       └── Table

│     │                         ├── addMembership.js  // 向会员表添加数据的脚本

│     │                          └── index.js                  // 会员管理

│     └── package.json                                     // 添加xlsx模块处理导出表格

└── server

​      └── src

​           ├── controller       // 添加memebership.js控制会员添加和查询

​           ├── middleware   // 修改了图片处理函数的调用形式，还未解决图片存储（传过来的图片为base64格式，不能直接存储）

​           ├── model            // 添加emebership.js创建会员表

​           └── router            // 添加了addMembership和selectMembership两个接口
```



### 会员管理 

* 会员管理目录 client/src/pages/Membership/components/Table/index.js 

* componentDidMount 钩子函数中的 addMembership(50)是用来向会员表中插入数据的，传入的参数即要插入的数据数量，当数据插入完成时可注释此行代码

* 会员管理页面 筛选条件只有会员等级和归属门店可用，分页器功能完整

### 表格导出

* 表格导出组件目录 client/src/components/xlsx， 可在xlsx.jsx中修改组件样式

* 以会员管理为例，引入Xlsx组件，在IceContainer组件中使用Xlsx组件

- ```javascript
  `<Xlsx props={{listType: listType, data: this.state.data, fileName: '会员管理表'}}></Xlsx>`
  ```

- 向组件中传入参数props，props对象有两个属性：listType 是一个表格数据格式说明的数组，data 是要导出的数据，fileName 是要导出的表格的名字

-  

  ```javascript
  const listType = [
  
  ​      { title: "会员名称", dataIndex: "membershipName"},
  
  ​      { title: "会员等级", dataIndex: "membershipGrade"},
  
  ​      { title: "会员余额(元)", dataIndex: "MemberBalance" },
  
  ​      { title: "累计消费(元)", dataIndex: "cumulative" },
  
  ​      { title: "注册时间", dataIndex: "registerTime" },
  
  ​      { title: "生日时间", dataIndex: "birthdayTime" },
  
  ​      { title: "归属门店", dataIndex: "BelongingToStores" },
  
  ​    ]
  ```

* listType 数组的长度是导出表格的列数， title 为表格每列的标题， dataIndex 的属性值是数据 data中每条数据的属性名
* ![](C:\Users\Administrator\Desktop\素材\code.png)

* 

