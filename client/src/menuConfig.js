// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '退出',
    path: '/user/login',
    icon: 'yonghu',
  },
];

const asideMenuConfig = [
  {
    name: '工作台',
    path: '/dashboard',
    icon: 'home2',
  },
  {
    name: '资产管理',
    path: '/asset',
    icon: 'cascades',
  },
  {
    name: '菜品管理',
    path: '/goods',
    icon: 'shopcar',
  },
  {
    name: '添加菜品',
    path: '/add/goods',
    icon: 'publish',
  },
  {
    name: '预约管理',
    path: '/reserve',
    icon: 'clock',
  },
  {
    name: '添加预约',
    path: '/add/reserve',
    icon: 'edit2',
  },
  {
    name: '订单管理',
    path: '/order',
    icon: 'shopcar',
  },
  {
    name: '会员管理',
    path: '/membership',
    icon: 'menu',
  },
];

export { headerMenuConfig, asideMenuConfig };
