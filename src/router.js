const routers = [
  {
    path: '/',
    meta: {
      title: '主页'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
  },
  {
    path: '/grid/:type',
    meta: {
      title: '公司列表'
    },
    component: (resolve) => require(['./views/grid.vue'], resolve)
  },
  {
    path: '/info/:id',
    meta: {
      title: '公司详情'
    },
    component: (resolve) => require(['./views/info.vue'], resolve)
  }
]
export default routers
